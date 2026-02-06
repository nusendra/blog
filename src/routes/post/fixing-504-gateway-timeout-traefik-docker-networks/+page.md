---
draft: false
title: Fixing 504 Gateway Timeout in Traefik with Multi-Network Docker Compose
date: 2026-02-07 02:30:00
tags: ['traefik','docker','nginx','devops','coolify']
description: "How to diagnose and fix 504 Gateway Timeout errors in Traefik when using Docker Compose with multiple networks"
slug: fixing-504-gateway-timeout-traefik-docker-networks
---

When you're running a Laravel application via Coolify with separate PHP-FPM and Nginx containers, you might encounter a frustrating **504 Gateway Timeout** error through your public domain, even though both containers show as `running:healthy`. This guide walks you through diagnosing and fixing this issue.

---

## The Problem

A Laravel application deployed via Coolify (using Docker Compose with separate PHP-FPM and Nginx containers) was returning **504 Gateway Timeout** when accessed via its public domain. The containers showed as `running:healthy` in Coolify, and health checks passed every 30 seconds.

Accessing the site returned a 504 after exactly 30 seconds (Traefik's default backend dial timeout), with zero bytes received from the backend.

## What Was Working

- Both containers (PHP-FPM `app` and Nginx `web`) were healthy and running
- Nginx responded correctly when accessed directly inside the container
- Traefik could reach the Nginx container by name (`wget` from inside the Traefik container worked)
- The TLS certificate for the domain was valid
- HTTP-to-HTTPS redirect was working (Traefik returned 307)
- Traefik was connected to the correct Coolify Docker network

## What Was Failing

- HTTPS requests through Traefik timed out after 30 seconds with 504
- No external traffic appeared in Nginx access logs at all — only health check entries from `127.0.0.1`

## The Root Cause

The `docker-compose.prod.yml` defined a custom `laravel_network` for inter-container communication between `app` (PHP-FPM) and `web` (Nginx). Coolify also automatically adds its own external network to each container for Traefik routing.

This meant the `web` container was connected to **two Docker networks**:

| Network | Purpose | Traefik Connected? |
|---|---|---|
| Coolify external network | Traefik routing | Yes |
| `laravel_network` | Internal app-to-nginx communication | **No** |

**The Issue:** When a container is on multiple networks, Traefik's Docker provider has to pick one to route traffic through. There is no guaranteed order — it can pick either network. In this case, Traefik was picking `laravel_network`, which it had no connectivity to.

**The Result:** Traefik found the correct router and matched the domain, terminated TLS successfully, then tried to forward the request to the Nginx container's IP on `laravel_network`. Since Traefik wasn't on that network, the connection hung until the 30-second dial timeout, producing the 504.

## How to Confirm This

From inside the Traefik container, test connectivity to both IPs of the backend container:

```bash
# Coolify network IP - works
docker exec coolify-proxy wget -qO- --timeout=5 http://<coolify-network-ip>:80/health
# Returns: healthy

# laravel_network IP - times out
docker exec coolify-proxy wget -qO- --timeout=5 http://<laravel-network-ip>:80/health
# Returns: wget: download timed out
```

If the second one times out, Traefik is likely picking that network.

## The Fix

Add the `traefik.docker.network` label to the `web` service in `docker-compose.prod.yml` to explicitly tell Traefik which network to use:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: ./nginx/Dockerfile.nginx
    depends_on:
      - app
    networks:
      - laravel_network
    restart: always
    expose:
      - "80"
    labels:
      - "traefik.docker.network=<coolify-network-name>"
      - "traefik.http.services.web.loadbalancer.server.port=80"
    healthcheck:
      test: ["CMD-SHELL", "wget -q --spider http://localhost/health || exit 1"]
      interval: 30s
      retries: 3
      timeout: 10s
      start_period: 5s
```

The Coolify network name is typically the application UUID (visible in the Coolify dashboard URL or container names).

After updating the compose file, **force deploy** the application so Coolify recreates the containers with the new labels.

## Key Takeaway

Whenever a Docker Compose service is connected to multiple networks and uses Traefik as a reverse proxy, **always set `traefik.docker.network`** to the network that Traefik is connected to. Without this label, Traefik picks a network non-deterministically, which can cause intermittent or persistent 504 errors that are difficult to diagnose because the containers themselves appear perfectly healthy.

This is a subtle but critical detail that can save you hours of debugging. 🎯
