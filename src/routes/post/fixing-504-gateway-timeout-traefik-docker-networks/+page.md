---
draft: false
title: Fixing 504 Gateway Timeout in Traefik with Multi-Network Docker Compose
date: 2026-02-07 02:30:00
tags: ['coolify','traefik']
description: "How to diagnose and fix 504 Gateway Timeout errors in Traefik when using Docker Compose with multiple networks"
slug: fixing-504-gateway-timeout-traefik-docker-networks
is_featured: false
---

A Laravel application running on Coolify with separate PHP-FPM and Nginx containers can return a 504 Gateway Timeout on its public domain while both containers sit there reporting `running:healthy`. Here is what causes that and how to fix it.

---

## The problem

The app was deployed via Coolify using Docker Compose, with `app` running PHP-FPM and `web` running Nginx. Coolify showed both containers as `running:healthy`, and health checks passed every 30 seconds. Loading the site returned a 504 after exactly 30 seconds, which is Traefik's default backend dial timeout, with zero bytes received from the backend.

Almost everything checked out. Both containers were healthy and running. Nginx responded correctly when accessed directly inside its container. Traefik could reach the Nginx container by name, verified with `wget` from inside the Traefik container. The TLS certificate was valid, the HTTP-to-HTTPS redirect worked and Traefik returned 307, and Traefik was connected to the correct Coolify Docker network.

Two things did not work. HTTPS requests through Traefik timed out after 30 seconds with a 504, and no external traffic appeared in the Nginx access logs at all, only health check entries from `127.0.0.1`.

## The root cause

`docker-compose.prod.yml` defined a custom `laravel_network` so that `app` and `web` could talk to each other. Coolify separately adds its own external network to each container for Traefik routing.

That left the `web` container on two Docker networks:

| Network | Purpose | Traefik Connected? |
|---|---|---|
| Coolify external network | Traefik routing | Yes |
| `laravel_network` | Internal app-to-nginx communication | No |

When a container is on multiple networks, Traefik's Docker provider has to pick one to route traffic through, and the order is not guaranteed. It can pick either. Here it picked `laravel_network`, which it had no connectivity to.

So Traefik found the correct router, matched the domain, terminated TLS successfully, then tried to forward the request to the Nginx container's IP on `laravel_network`. Since Traefik was not on that network, the connection hung until the 30-second dial timeout and produced the 504.

## How to confirm it

From inside the Traefik container, test connectivity to both IPs of the backend container:

```bash
# Coolify network IP - works
docker exec coolify-proxy wget -qO- --timeout=5 http://<coolify-network-ip>:80/health
# Returns: healthy

# laravel_network IP - times out
docker exec coolify-proxy wget -qO- --timeout=5 http://<laravel-network-ip>:80/health
# Returns: wget: download timed out
```

If the second one times out, Traefik is probably picking that network.

## The fix

Add the `traefik.docker.network` label to the `web` service in `docker-compose.prod.yml` so Traefik knows which network to use:

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

The Coolify network name is usually the application UUID, which you can read off the Coolify dashboard URL or the container names.

After updating the compose file, force deploy the application so Coolify recreates the containers with the new labels.

The general rule: any Docker Compose service that sits on more than one network and is proxied by Traefik needs `traefik.docker.network` set to the network Traefik is actually on. Without the label Traefik picks a network non-deterministically, and the resulting 504s are hard to chase down precisely because the containers look perfectly healthy the whole time.
