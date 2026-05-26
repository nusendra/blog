---
draft: false
title: Fixing Unwanted Subdomain Redirect Issue
date: 2026-05-26 10:00:00
tags: ['ploi','cloudflare','nginx','ssl']
description: "How I diagnosed and fixed a new subdomain that was unexpectedly redirecting to an unrelated admin URL, due to a missing SSL certificate on the origin server."
slug: fixing-unwanted-subdomain-redirect-issue
---

After deploying a new site to Ploi with the subdomain `staging.example.com`, accessing the URL in a browser resulted in an unexpected 301 redirect to `https://admin.legacy-app.com/admin/login`. Here's how I tracked down the actual cause and fixed it.

---

## The Problem

Initial `curl` test showed:

```
$ curl -I https://staging.example.com/
HTTP/2 301
date: Mon, 25 May 2026 18:21:56 GMT
location: https://admin.legacy-app.com/
server: cloudflare
```

The `server: cloudflare` header initially suggested a Cloudflare-level redirect, but the actual root cause turned out to be different.

---

## Root Cause

Two compounding issues:

### 1. Missing DNS Record (initial state)

There was **no specific A record** for the new subdomain in Cloudflare DNS. A wildcard A record (`*.example.com → <ORIGIN_IP>`) was matching the subdomain instead.

While the wildcard pointed to the correct server IP, this wasn't the actual cause of the redirect , the request was reaching the right server, but Nginx wasn't handling it properly (see issue #2).

### 2. Missing SSL Certificate on the Ploi Site (actual cause)

The new site `staging.example.com` did not have an SSL certificate provisioned on the Ploi server.

When Cloudflare proxied HTTPS requests to the origin server, Nginx could not find a server block on port 443 matching the hostname. It fell through to the **default HTTPS server block** , which happened to be the admin site , and that site issued a 301 redirect to `https://admin.legacy-app.com/`.

**Diagnostic that confirmed it:** A direct HTTP request to Nginx (bypassing Cloudflare/HTTPS) worked perfectly:

```bash
$ curl -I -H "Host: staging.example.com" http://localhost/
HTTP/1.1 200 OK
Server: nginx
...
Set-Cookie: <app_session_cookie>=...
```

This proved the site config was correct on HTTP/port 80, and the problem was isolated to HTTPS/port 443 , i.e., the missing SSL certificate.

---

## The Solution

### Step 1: Add a Specific DNS Record (if not already present)

In Cloudflare DNS for the `example.com` zone, add an A record for the subdomain:

- **Type:** A
- **Name:** `staging`
- **IPv4 address:** `<YOUR_ORIGIN_SERVER_IP>` (your Ploi server IP)
- **Proxy status:** Initially set to **DNS only** (grey cloud)
- **TTL:** Auto

> **Why grey cloud first?** Let's Encrypt needs to validate the domain directly against your origin server. Cloudflare proxy interferes with the HTTP-01 challenge.

### Step 2: Activate Let's Encrypt SSL in Ploi

1. Log into Ploi → Servers → select the server
2. Sites → click `staging.example.com`
3. SSL → activate **Let's Encrypt**
4. Wait for provisioning to complete (~30 seconds)

### Step 3: Verify the Fix

```bash
$ curl -I https://staging.example.com/
HTTP/2 200
```

The site now responds correctly with the deployed app instead of redirecting.

### Step 4 (Optional): Re-enable Cloudflare Proxy

If you want CDN/DDoS protection from Cloudflare:

1. Cloudflare → SSL/TLS → Overview → set SSL mode to **Full** or **Full (Strict)** (NOT Flexible)
2. Cloudflare → DNS → toggle the `staging` record back to **orange cloud** (Proxied)

> **Important:** Never use Flexible SSL mode when the origin has a valid certificate. Flexible mode means the connection between Cloudflare and your origin is unencrypted, which is insecure.

---

## Troubleshooting Steps That Helped Diagnose This

These commands were essential in pinpointing the actual issue:

### Check DNS resolution

```bash
dig staging.example.com +short
```

Returning Cloudflare IPs (typically in `104.21.x.x` or `172.67.x.x` ranges) means proxy is on. Returning the origin IP directly means proxy is off.

### Check via Cloudflare (sees what the user sees)

```bash
curl -I https://staging.example.com/
```

### Check directly against Nginx (bypasses Cloudflare entirely)

From the origin server itself (no root needed):

```bash
curl -I -H "Host: staging.example.com" http://localhost/
```

If this returns 200 OK but the public URL returns 301, the issue is in the HTTPS layer , either Cloudflare config or missing SSL on the origin.

---

## Key Lessons Learned

1. **`server: cloudflare` doesn't mean Cloudflare issued the redirect.** Cloudflare always rewrites the `server` header on proxied responses. The redirect may be coming from the origin server, with Cloudflare just relaying it.

2. **HTTP and HTTPS server blocks are separate in Nginx.** A site can work fine on port 80 but fail on port 443 if SSL isn't provisioned. The fallback to the "default" HTTPS server block can cause confusing redirects.

3. **Let's Encrypt validation requires direct access to the origin.** Always toggle Cloudflare proxy to grey cloud (DNS only) before provisioning a Let's Encrypt cert, then optionally re-enable proxy after.

4. **Wildcard DNS records are a footgun.** A wildcard `*.example.com` will catch any new subdomain that doesn't have its own explicit record. Always add specific records for important subdomains.

5. **Bypass Cloudflare when debugging origin behavior.** The fastest way to isolate "is this Cloudflare or is this my server?" is to send a request directly to the origin with the correct `Host` header.

---

## Reference: Final Working DNS State

```
staging.example.com.    1    IN    A    <YOUR_ORIGIN_SERVER_IP>
```

(Proxy status: can be either orange or grey cloud, as long as SSL mode is Full/Full Strict if proxied)
