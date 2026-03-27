---
draft: false
title: Migrating WordPress from Apache to OpenLiteSpeed with Docker
date: 2026-03-28 10:00:00
tags: ['docker','wordpress','devops','coolify']
description: "A walkthrough on migrating a WordPress site from Apache to OpenLiteSpeed using Docker, deployed via Coolify."
slug: migrating-wordpress-from-apache-to-openlitespeed-with-docker
---

If you're running a WordPress site on Apache inside Docker and you're looking for something faster and more efficient, OpenLiteSpeed might be worth checking out. I recently migrated a WordPress site from Apache to OpenLiteSpeed, deployed via Docker on Coolify, and it went pretty smooth. Here's how it went and what I learned along the way.

---

## Why OpenLiteSpeed?

Before jumping into the how, here's why I decided to make the switch:

- **It reads `.htaccess` natively** — so WordPress plugins that write rewrite rules (like Yoast SEO or eps-301-redirects) keep working without any changes. That's a big deal.
- **Better PHP performance** — LSAPI outperforms both PHP-FPM (used by NGINX) and mod_php (used by Apache) in most benchmarks.
- **LiteSpeed Cache plugin** — arguably the best free WordPress caching solution. Page cache, object cache, image optimization, CDN support — all built in.
- **HTTP/3 out of the box** — no extra config needed.
- **Lower resource usage** — event-driven architecture means it can handle more concurrent connections with less memory than Apache's prefork model.

---

## Before vs After

Here's what changed at a high level:

| | Before | After |
|---|--------|-------|
| **Web Server** | Apache 2.x | OpenLiteSpeed 1.8.5 |
| **PHP Version** | 8.1 (mod_php) | 8.2 (LSAPI) |
| **Base Image** | `wordpress:php8.1-apache` | `litespeedtech/openlitespeed:1.8.5-lsphp82` |
| **Document Root** | `/var/www/html` | `/var/www/vhosts/localhost/html` |
| **Process Owner** | `www-data` | `nobody:nogroup` |

---

## What Actually Changed

### Dockerfile

Replaced the Apache-based WordPress image with the official OpenLiteSpeed image. The base image comes with a fully configured web server, PHP, vhost templates, and a working entrypoint — we just add WordPress files on top.

Some key differences from the old Apache Dockerfile:

- No need to enable `mod_rewrite` or configure `AllowOverride` — OLS handles `.htaccess` natively through its vhost template.
- No `CMD` or `ENTRYPOINT` override — the base image's entrypoint takes care of OLS startup, config initialization, and PHP process management.
- PHP extensions (`imagick`, `redis`, `memcached`) are installed as `lsphp82-*` packages instead of using `docker-php-ext-install`.
- File ownership is set to `nobody:nogroup` instead of `www-data:www-data`.

### docker-compose.yml

The only real change here is the uploads volume mount path. It went from `/var/www/html/wp-content/uploads` to `/var/www/vhosts/localhost/html/wp-content/uploads` to match OLS's document root structure.

### .dockerignore

Added to keep the Docker build clean and prevent unnecessary files from ending up in the document root:

- `lsws/` — leftover custom config experiments
- `Dockerfile`, `docker-compose.yml`, and other compose/dev files
- `.git`, `.DS_Store`, `uploads/`

### PHP Version Bump (8.1 to 8.2)

PHP 8.1 was dropped from OpenLiteSpeed 1.8.5 (the latest version that still had 8.1 was 1.8.4). WordPress 6.7.1 is fully compatible with PHP 8.2, so this is a safe and straightforward upgrade.

---

## How It Works Under the Hood

The `litespeedtech/openlitespeed` base image does a lot of heavy lifting:

1. **Default vhost template** (`docker.conf`) maps all requests to a `localhost` virtual host at `/var/www/vhosts/localhost/html/`.
2. **Auto `.htaccess` loading** — the vhost template has `autoLoadHtaccess 1` and a rewrite context that reads `.htaccess` files, so WordPress permalinks just work.
3. **PHP via LSAPI** — the entrypoint sets up `lsphp82` as an external processor through OLS's cgid daemon, handling process spawning and user switching.
4. **HTTP listener on port 80** — Coolify's reverse proxy (Traefik/Caddy) handles SSL termination and forwards traffic to the container on port 80.

---

## Post-Migration Cleanup

A few things I had to clean up manually after the migration:

### Remove SiteGround leftovers from wp-config.php

If you migrated from SiteGround hosting, you might have these lines sitting in your `wp-config.php`:

```php
@include_once('/var/lib/sec/wp-settings-pre.php'); // Added by SiteGround WordPress management system
@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system
```

They do nothing outside of SiteGround, so just remove them.

### Replace SiteGround Optimizer plugin

The `sg-cachepress` plugin is SiteGround-specific and won't do anything on Coolify. Swap it out with the [LiteSpeed Cache](https://wordpress.org/plugins/litespeed-cache/) plugin, which gives you:

- Full page caching
- Object caching (Redis/Memcached)
- Image optimization (WebP conversion)
- CSS/JS minification
- CDN integration

---

## Troubleshooting

### Site downloads a file instead of rendering

This means PHP is not being processed. The scripthandler isn't mapping `.php` files to the lsphp processor. Make sure you're using the base image's default config and not overriding `httpd_config.conf`.

### 503 Service Unavailable

Check the error log inside the container:

```bash
docker exec <container> cat /usr/local/lsws/logs/error.log | tail -30
```

Common causes:

- **`cgidSuEXEC failed`** — don't override the base image's `httpd_config.conf` or entrypoint. The cgid daemon has very specific requirements for how `extprocessor` and `autoStart` are configured.
- **PHP binary not found** — check if the symlink exists: `ls -la /usr/local/lsws/fcgi-bin/lsphp`

### Bad Gateway

Coolify's reverse proxy can't reach the container. Check these:

- Container is listening on port 80: `ss -tlnp | grep :80`
- Container is on the `coolify` network: double check your `docker-compose.yml`
- OLS is actually running: `docker exec <container> /usr/local/lsws/bin/lswsctrl status`

### Checking OLS Logs

```bash
# Error log
docker exec <container> cat /usr/local/lsws/logs/error.log

# Access log
docker exec <container> cat /usr/local/lsws/logs/access.log
```

---

## The Biggest Lesson

The OpenLiteSpeed Docker image has a carefully orchestrated config initialization pipeline — backup configs in `.conf/`, entrypoint restore, cgid daemon, vhost templates. If you override `httpd_config.conf` or the entrypoint, you'll break this pipeline and spend hours debugging weird issues.

The right approach is to just use the base image's defaults and only overlay your application files into the document root. Don't fight the image — work with it.
