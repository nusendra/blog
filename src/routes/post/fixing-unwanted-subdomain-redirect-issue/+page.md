---
draft: false
title: Fixing Unwanted Subdomain Redirect Issue
date: 2026-05-26 10:00:00
tags: ['ploi','cloudflare','nginx','ssl']
description: "How I diagnosed and fixed a new subdomain that was unexpectedly redirecting to an unrelated admin URL, due to a missing SSL certificate on the origin server."
slug: fixing-unwanted-subdomain-redirect-issue
is_featured: false
---

I deployed a new site to Ploi on the subdomain `staging.example.com`, opened it in a browser, and landed on `https://admin.legacy-app.com/admin/login` instead, via a 301. Here's how I tracked down the real cause.

---

## The problem

The first `curl` test:

```
$ curl -I https://staging.example.com/
HTTP/2 301
date: Mon, 25 May 2026 18:21:56 GMT
location: https://admin.legacy-app.com/
server: cloudflare
```

The `server: cloudflare` header made it look like a Cloudflare-level redirect. It wasn't.

---

## Root cause

Two things were compounding.

### 1. Missing DNS record

There was no specific A record for the new subdomain in Cloudflare DNS. A wildcard A record (`*.example.com → <ORIGIN_IP>`) was matching it instead.

The wildcard did point at the correct server IP, so this wasn't what caused the redirect. The request was reaching the right server; Nginx just wasn't handling it properly, which is the second issue.

### 2. Missing SSL certificate on the Ploi site

The new site `staging.example.com` had no SSL certificate provisioned on the Ploi server.

So when Cloudflare proxied HTTPS requests to the origin, Nginx couldn't find a server block on port 443 matching the hostname. It fell through to the default HTTPS server block, which happened to be the admin site, and that site issued a 301 to `https://admin.legacy-app.com/`.

A direct HTTP request to Nginx, bypassing Cloudflare and HTTPS entirely, confirmed it:

```bash
$ curl -I -H "Host: staging.example.com" http://localhost/
HTTP/1.1 200 OK
Server: nginx
...
Set-Cookie: <app_session_cookie>=...
```

The site config was fine on port 80, so the problem was isolated to port 443, which is to say the missing certificate.

---

## The solution

### Step 1: add a specific DNS record

In Cloudflare DNS for the `example.com` zone, add an A record for the subdomain. Type A, name `staging`, IPv4 address set to your Ploi server IP, TTL auto, and proxy status set to DNS only (grey cloud) for now.

Grey cloud matters here because Let's Encrypt needs to validate the domain directly against your origin server, and the Cloudflare proxy interferes with the HTTP-01 challenge.

### Step 2: activate Let's Encrypt SSL in Ploi

1. Log into Ploi → Servers → select the server
2. Sites → click `staging.example.com`
3. SSL → activate Let's Encrypt
4. Wait about 30 seconds for provisioning to complete

### Step 3: verify the fix

```bash
$ curl -I https://staging.example.com/
HTTP/2 200
```

The site now responds with the deployed app instead of redirecting.

### Step 4 (optional): re-enable the Cloudflare proxy

If you want the CDN and DDoS protection back:

1. Cloudflare → SSL/TLS → Overview → set SSL mode to Full or Full (Strict), not Flexible
2. Cloudflare → DNS → toggle the `staging` record back to orange cloud (Proxied)

Do not use Flexible SSL mode once the origin has a valid certificate. Flexible leaves the connection between Cloudflare and your origin unencrypted.

---

## The commands that pinpointed it

Check DNS resolution:

```bash
dig staging.example.com +short
```

Cloudflare IPs (usually `104.21.x.x` or `172.67.x.x`) mean the proxy is on. The origin IP directly means it's off.

Check through Cloudflare, which is what a visitor sees:

```bash
curl -I https://staging.example.com/
```

Then check directly against Nginx from the origin server itself, no root needed:

```bash
curl -I -H "Host: staging.example.com" http://localhost/
```

If that returns 200 OK while the public URL returns 301, your problem is in the HTTPS layer: either the Cloudflare config or a missing certificate on the origin.

---

## What I took away from it

`server: cloudflare` does not mean Cloudflare issued the redirect. Cloudflare rewrites the `server` header on every proxied response, so the redirect can be coming from your origin with Cloudflare merely relaying it.

HTTP and HTTPS server blocks are separate in Nginx. A site can work fine on port 80 and fail on 443 when SSL isn't provisioned, and the fallback to the default HTTPS server block produces exactly the kind of confusing redirect I hit.

Let's Encrypt validation needs direct access to the origin, so toggle the Cloudflare proxy to grey cloud before provisioning a certificate and turn it back on afterwards if you want it.

Wildcard DNS records are a footgun. A wildcard `*.example.com` catches any new subdomain that lacks its own explicit record, which is how the misrouting stayed invisible. Add specific records for subdomains you care about.

And when you're debugging origin behaviour, bypass Cloudflare. The fastest way to answer "is this Cloudflare or is this my server?" is a request straight to the origin with the correct `Host` header.

---

## Final working DNS state

```
staging.example.com.    1    IN    A    <YOUR_ORIGIN_SERVER_IP>
```

Proxy status can be either orange or grey cloud, as long as SSL mode is Full or Full (Strict) when it's proxied.
