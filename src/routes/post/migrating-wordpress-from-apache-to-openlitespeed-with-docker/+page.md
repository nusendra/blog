---
draft: false
title: Migrating WordPress from Apache to OpenLiteSpeed with Docker
date: 2026-03-28 10:00:00
tags: ['docker','wordpress','devops','coolify']
description: "A walkthrough on migrating a WordPress site from Apache to OpenLiteSpeed using Docker, deployed via Coolify."
slug: migrating-wordpress-from-apache-to-openlitespeed-with-docker
is_featured: false
---

I recently moved a WordPress site off Apache and onto OpenLiteSpeed, still in Docker, still deployed through Coolify. It went smoothly. Here's what the migration actually involved.

---

## Why OpenLiteSpeed?

The deciding factor was that OpenLiteSpeed reads `.htaccess` natively, so WordPress plugins that write rewrite rules, like Yoast SEO or eps-301-redirects, keep working without any changes. For a WordPress site that alone is worth a lot.

Beyond that, LSAPI outperforms both PHP-FPM (what NGINX uses) and mod_php (what Apache uses) in most benchmarks. The LiteSpeed Cache plugin is one of the better free WordPress caching options, with page cache, object cache, image optimization and CDN support built in. HTTP/3 works without extra config. And the event-driven architecture handles more concurrent connections on less memory than Apache's prefork model.

---

## Before and after

| | Before | After |
|---|--------|-------|
| Web server | Apache 2.x | OpenLiteSpeed 1.8.5 |
| PHP version | 8.1 (mod_php) | 8.2 (LSAPI) |
| Base image | `wordpress:php8.1-apache` | `litespeedtech/openlitespeed:1.8.5-lsphp82` |
| Document root | `/var/www/html` | `/var/www/vhosts/localhost/html` |
| Process owner | `www-data` | `nobody:nogroup` |

---

## What actually changed

### Dockerfile

I replaced the Apache-based WordPress image with the official OpenLiteSpeed image. That base image ships a fully configured web server, PHP, vhost templates and a working entrypoint, so all you add is the WordPress files on top.

Compared to the old Apache Dockerfile: there's no `mod_rewrite` to enable and no `AllowOverride` to configure, because OLS handles `.htaccess` through its vhost template. There's no `CMD` or `ENTRYPOINT` override either, since the base image's entrypoint handles OLS startup, config initialization and PHP process management. PHP extensions (`imagick`, `redis`, `memcached`) install as `lsphp82-*` packages rather than through `docker-php-ext-install`. And file ownership goes to `nobody:nogroup` instead of `www-data:www-data`.

### docker-compose.yml

The only real change is the uploads volume mount path, which moves from `/var/www/html/wp-content/uploads` to `/var/www/vhosts/localhost/html/wp-content/uploads` to match the OLS document root.

### .dockerignore

Added to keep the build clean and stop stray files landing in the document root: `lsws/` (leftover custom config experiments), the `Dockerfile` and `docker-compose.yml` plus other compose and dev files, and `.git`, `.DS_Store` and `uploads/`.

### PHP 8.1 to 8.2

PHP 8.1 was dropped from OpenLiteSpeed 1.8.5; 1.8.4 was the last version that still had it. WordPress 6.7.1 is fully compatible with PHP 8.2, so the bump is straightforward.

---

## How it works under the hood

The `litespeedtech/openlitespeed` base image does most of the work. Its default vhost template (`docker.conf`) maps all requests to a `localhost` virtual host at `/var/www/vhosts/localhost/html/`. That template sets `autoLoadHtaccess 1` and includes a rewrite context that reads `.htaccess` files, which is why WordPress permalinks work without intervention.

PHP runs through LSAPI: the entrypoint registers `lsphp82` as an external processor via the OLS cgid daemon, which handles process spawning and user switching. The container listens on port 80, and Coolify's reverse proxy (Traefik or Caddy) terminates SSL and forwards traffic there.

---

## Post-migration cleanup

### Remove SiteGround leftovers from wp-config.php

If the site came from SiteGround hosting, you may find these lines in `wp-config.php`:

```php
@include_once('/var/lib/sec/wp-settings-pre.php'); // Added by SiteGround WordPress management system
@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system
```

They do nothing outside SiteGround. Delete them.

### Replace the SiteGround Optimizer plugin

`sg-cachepress` is SiteGround-specific and does nothing on Coolify. Swap it for [LiteSpeed Cache](https://wordpress.org/plugins/litespeed-cache/), which covers full page caching, object caching via Redis or Memcached, image optimization with WebP conversion, CSS and JS minification, and CDN integration.

---

## Troubleshooting

### The site downloads a file instead of rendering

PHP isn't being processed. The scripthandler isn't mapping `.php` files to the lsphp processor. Make sure you're using the base image's default config and not overriding `httpd_config.conf`.

### 503 Service Unavailable

Check the error log inside the container:

```bash
docker exec <container> cat /usr/local/lsws/logs/error.log | tail -30
```

`cgidSuEXEC failed` means you overrode the base image's `httpd_config.conf` or entrypoint. The cgid daemon is very particular about how `extprocessor` and `autoStart` are configured. If PHP binary is not found instead, check whether the symlink exists with `ls -la /usr/local/lsws/fcgi-bin/lsphp`.

### Bad Gateway

Coolify's reverse proxy can't reach the container. Confirm the container is listening on port 80 with `ss -tlnp | grep :80`, that it's attached to the `coolify` network in your `docker-compose.yml`, and that OLS is actually running:

```bash
docker exec <container> /usr/local/lsws/bin/lswsctrl status
```

### Reading the OLS logs

```bash
# Error log
docker exec <container> cat /usr/local/lsws/logs/error.log

# Access log
docker exec <container> cat /usr/local/lsws/logs/access.log
```

---

## The biggest lesson

The OpenLiteSpeed Docker image has a carefully orchestrated config initialization pipeline: backup configs in `.conf/`, entrypoint restore, cgid daemon, vhost templates. Override `httpd_config.conf` or the entrypoint and you break that pipeline, then spend hours debugging symptoms that have nothing to do with the change you made.

Use the base image's defaults and overlay only your application files into the document root.
