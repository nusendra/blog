---
title: "Fixing Telegram Triggers in n8n with Coolify & Cloudflare"
date: 2025-08-10 09:26:00
description: "How I solved HTTPS and DNS issues for Telegram triggers in n8n by running it via Docker in Coolify and exposing it securely through Cloudflare Tunnel."
tags: ['coolify', 'n8n']
draft: false
slug: n8n-telegram-cloudflare-coolify
---

<img src="https://blog.n8n.io/content/images/size/w1200/2021/03/cover-2.png" />

When I first tried running n8n on my Raspberry Pi 5 through [Coolify](https://coolify.io), I hit a wall. My goal was simple:  
💡 **Build a money-tracking app that gets inputs from Telegram via n8n triggers.**

## The Problem: HTTPS and Telegram

Coolify makes it easy to “install” n8n as a service, but the default deployment had one fatal flaw for my case:  
- The service URL was **HTTP** only.  
- Telegram **requires HTTPS** for webhooks.  
- Even if I set `N8N_PROTOCOL=https` and `WEBHOOK_URL=https://…`, n8n still generated HTTP webhook URLs internally.  
- Result: `Bad Request: bad webhook: An HTTPS URL must be provided`.

Without full control over n8n’s networking or Traefik config inside Coolify, there was no clean way to fix this.

## The Solution: Run n8n as a Custom Docker Service

Instead of using Coolify’s one-click n8n service, I created a custom service **from a Dockerfile**. This way I had full control over:
- Ports (exposed `5678`)
- Environment variables
- External URL configuration

I then:
1. Created a service from Docker in Coolify.
2. Set `N8N_HOST`, `N8N_PROTOCOL=https`, `WEBHOOK_URL`, and `N8N_EDITOR_BASE_URL` properly.
3. Used **Cloudflare Tunnel** to expose the service securely on `https://n8n.leskoding.com`.

Now the webhook URL in n8n was **actually HTTPS**.

## The DNS & Cloudflare Twist

Even after fixing HTTPS, Telegram still failed with:

`Bad Request: bad webhook: Failed to resolve host`

Turns out:
- My Cloudflare DNS was fine (proxied CNAME to the tunnel).
- The real issue was Cloudflare’s security features blocking Telegram’s bot servers.

I fixed it by deleted the old webhook from Telegram. That's it, good lord

## Registering the Webhook Correctly

This part tripped me up: **you can’t just set the webhook to your domain root**.  
Telegram needs the **exact path** that n8n generates for your trigger.

Example:

First clear the old one
```
$ curl -s "https://api.telegram.org/bot<NEW_TOKEN>/deleteWebhook?drop_pending_updates=true"
```

Then set the full HTTPS path
```
$ curl -s -X POST "https://api.telegram.org/bot<NEW_TOKEN>/setWebhook" \
  -d "url=https://n8n.leskoding.com/webhook/<uuid>/webhook"
```

Once I did this, Telegram triggers fired instantly.

Lessons Learned
	1.	Don’t use Coolify’s built-in n8n app if you need Telegram triggers — HTTPS handling is too limited.
	2.	Deploy n8n via a custom Dockerfile in Coolify for full control.
	3.	Use Cloudflare Tunnel for secure public access.
	4.	Always set Telegram’s webhook to the full HTTPS path, not just the domain.

Now my n8n workflows trigger reliably from Telegram, and the money-tracking app is alive. Thanks for stopping by folks !
