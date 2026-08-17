---
title: "Ployer: A Lightweight Self-Hosted PaaS That Doesn't Eat Your RAM"
date: 2026-06-01 09:00:00
description: "Ployer is a single-binary, Git-driven self-hosted PaaS built in Rust and SvelteKit, doing roughly what Coolify does at about 30% of the memory."
tags: ['ployer', 'coolify']
draft: false
slug: ployer-lightweight-self-hosted-paas
is_featured: true
---

Spin up Coolify on a small VPS and you watch your free memory evaporate. Ployer is my attempt at the same job with a smaller appetite: a self-hosted, Git-driven PaaS built in Rust and SvelteKit that deploys your apps with automatic SSL, health checks and webhooks, without spending a gigabyte of RAM to do it.

## What is Ployer?

It's a single-binary PaaS for people who want the "push to Git, get a deployed app with HTTPS" workflow but don't want to dedicate a beefy server to the control plane itself.

Ployer manages Docker containers on one or more servers, fronts them with Caddy for automatic Let's Encrypt certificates, and gives you a SvelteKit dashboard for everything else. The backend is Rust (Axum, sqlx, bollard), the frontend compiles to static assets embedded in the binary, and the database is SQLite in WAL mode. No separate Postgres, no Redis, no message queue. The whole runtime is one binary, one SQLite file, Caddy, and Docker.

## What it actually does

- One-command deploys from a Git URL, Dockerfile, Nixpacks (no Dockerfile needed), or Docker Compose
- Automatic SSL through Caddy and Let's Encrypt, with no certbot wrangling
- Webhooks for GitHub and GitLab push events
- Health checks over HTTP polling, with auto-restart on failure
- Build and runtime logs streamed live over WebSocket
- Container stats for CPU, memory and network I/O
- Env vars encrypted at rest with AES-256-GCM
- Multi-server support, so you can manage apps across more than one host
- LAN access, so `http://192.168.x.x` or `http://hostname.local` still reaches the dashboard when your domain doesn't
- Self-update from inside the dashboard, so upgrading is a button instead of an SSH session

Install is a single `curl | sudo bash`. The installer detects your OS and architecture, pulls the prebuilt binary from GitHub Releases so you don't need a Rust toolchain on the target machine, sets up Caddy and two systemd units, and prints your dashboard URL.

## Why Ployer over Coolify

Coolify is genuinely good software and covers more ground than Ployer does today. But if what you want is to run a few apps on a small server without the control plane being the heaviest thing on the box, the trade-offs look different.

### The memory difference

On the same server:

| | Coolify | Ployer |
|---|---|---|
| Idle memory usage | 1.3 GB | 400 MB |

I installed Coolify and memory usage sat at 1.3 GB. I uninstalled it, switched to Ployer, and it dropped to 400 MB. That's about a 70% cut in baseline RAM.

On a 1 GB or 2 GB VPS, which is what people actually use for side projects and small production workloads, that gap decides whether there's room left to run your app at all.

The reason is architectural. Coolify runs as a PHP/Laravel app plus Postgres, Redis, a queue worker, Soketi, and a few helper containers. Ployer is one Rust binary and a SQLite file.

### Other advantages

Ployer itself runs natively under systemd, so there's no docker-in-docker control plane. Only your apps run in Docker, which means less startup time, less log noise, and less to dig through when something breaks. Systemd restarts are sub-second, so you're not waiting for half a dozen containers to come up healthy.

SQLite means one file: no separate database container, no tuning, and no backup pipeline beyond `cp ployer.db`. Rust and a static SvelteKit bundle give you flat memory usage, with no PHP-FPM workers ballooning under load and no queue worker sitting on heap.

Caddy is there from day one, so automatic HTTPS is built in rather than a checkbox you have to go find. And updates happen from the dashboard, so you don't have to remember install commands.

Ployer is scoped for small to medium self-hosted deployments, and the surface area reflects that.

### Where Coolify still wins

Coolify has more integrations, more one-click app templates, a larger team, and a longer track record. If you want a big catalog of preconfigured services, or you're running a deployment platform for a team that needs all the bells and whistles, Coolify is the more feature-complete choice today.

## Architecture at a glance

```
Internet
    │
    ▼
 Caddy (80/443)          ← TLS termination, automatic SSL
    │
    ▼
 Ployer (3001)           ← Rust/Axum API + SvelteKit frontend (single binary)
    │
    ├── SQLite            ← Persistent database
    ├── Docker socket     ← Container management
    └── Caddy Admin API   ← Dynamic reverse proxy routes
```

That's the whole thing, with no sidecars behind it.

## Getting started

Point your domain's DNS A record at your server, then:

```bash
curl -fsSL https://ployer.nusendra.com/install.sh | sudo bash
```

The installer asks for your domain, or auto-detects your IP if you run it non-interactively. It generates a JWT secret, installs Caddy, sets up systemd, and prints the dashboard URL. HTTPS gets provisioned automatically once you use a real domain.

Install it on a fresh, dedicated server. Ployer owns ports 80 and 443 through Caddy, so it will conflict with Nginx, Apache, or Coolify if any of those are still running. If you're migrating from Coolify, uninstall that first, which is also when you'll see the memory drop.

## Closing thought

Most self-hosters don't need everything Coolify does, and they pay for it in RAM anyway. If you want a Git-driven PaaS workflow on a small server and you'd rather spend your memory on the apps you're actually running, that's the case Ployer was built for.

Repo and install instructions: <https://ployer.nusendra.com>
