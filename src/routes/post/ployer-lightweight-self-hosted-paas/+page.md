---
title: "Ployer: A Lightweight Self-Hosted PaaS That Doesn't Eat Your RAM"
date: 2026-06-01 09:00:00
description: "Ployer is a single-binary, Git-driven self-hosted PaaS built in Rust and SvelteKit, doing roughly what Coolify does at about 30% of the memory."
tags: ['ployer', 'rust', 'sveltekit', 'self-hosted', 'paas', 'coolify']
draft: false
slug: ployer-lightweight-self-hosted-paas
is_featured: true
---

If you've ever spun up Coolify on a small VPS and watched your free memory evaporate, this post is for you. Ployer is a self-hosted, Git-driven Platform-as-a-Service built in Rust + SvelteKit, designed to do roughly what Coolify does, deploy your apps with automatic SSL, health checks, and webhooks, without taking a gigabyte of RAM to do it.

## What is Ployer?

Ployer is a single-binary PaaS for people who want the "push to Git, get a deployed app with HTTPS" workflow but don't want to dedicate a beefy server to the control plane itself.

It manages Docker containers on one or more servers, fronts them with Caddy for automatic Let's Encrypt certificates, and exposes a SvelteKit dashboard for everything else. The backend is Rust (Axum + sqlx + bollard), the frontend is compiled to static assets and embedded into the binary, and the database is SQLite with WAL mode, no separate Postgres, no Redis, no message queue.

The whole runtime is: **one binary, one SQLite file, Caddy, and Docker.**

## What it actually does

- **One-command deploys** from a Git URL, Dockerfile, Nixpacks (no Dockerfile needed), or Docker Compose
- **Automatic SSL** via Caddy + Let's Encrypt, zero certbot wrangling
- **Webhooks** for GitHub and GitLab push events
- **Health checks** with HTTP polling and auto-restart on failure
- **Real-time logs** streamed over WebSocket (build + runtime)
- **Container stats**, CPU, memory, network I/O
- **Encrypted secrets**, env vars stored with AES-256-GCM at rest
- **Multi-server**, manage apps across more than one host
- **LAN access**, the dashboard is also reachable over plain HTTP on the local network, so `http://192.168.x.x` or `http://hostname.local` works when your domain doesn't
- **In-dashboard self-update**, upgrade by clicking a button instead of SSHing in

Install is a single `curl | sudo bash`. The installer detects your OS and architecture, pulls the prebuilt binary from GitHub Releases (no Rust toolchain needed on the target machine), sets up Caddy and two systemd units, and prints your dashboard URL.

## Why Ployer over Coolify

Coolify is genuinely good software and has a wider feature surface than Ployer does today. But if your goal is "run a few apps on a small server without the control plane being the heaviest thing on the box," the trade-offs look different.

### The memory difference

This is the headline. On the same server:

| | Coolify | Ployer |
|---|---|---|
| Idle memory usage | **1.3 GB** | **400 MB** |

> Before: installed Coolify, memory usage became **1.3 GB**.
> After: uninstalled Coolify and switched to Ployer, memory usage dropped to **400 MB**.

That's roughly a **70% reduction** in baseline RAM usage. On a 1 GB or 2 GB VPS, the kind of box people actually use for side projects and small production workloads, that gap is the difference between "no room left for my app" and "room to actually run things."

The reason is architectural: Coolify runs as a PHP/Laravel app plus Postgres, Redis, a queue worker, Soketi, and a few helper containers. Ployer is one Rust binary and a SQLite file. Fewer moving parts, less memory.

### Other advantages

- **Single binary, no docker-in-docker control plane.** Ployer itself runs natively under systemd. Only your *apps* run in Docker. Less startup time, less log noise, easier to debug.
- **SQLite, not Postgres.** One file. No separate database container, no tuning, no backup pipeline beyond `cp ployer.db`.
- **Predictable footprint.** Rust + a static SvelteKit bundle gives you flat memory usage, no PHP-FPM workers ballooning under load, no queue worker holding heap.
- **Fast cold start.** Systemd restart is sub-second. No waiting for a half-dozen containers to come up healthy.
- **Caddy from day one.** Automatic HTTPS is built in, not a checkbox you have to find.
- **In-dashboard self-update.** Click "Update", no SSH, no remembering install commands.
- **Honest scope.** Ployer is for small-to-medium self-hosted deployments. It doesn't pretend to be a Kubernetes replacement, and the surface area reflects that.

### Where Coolify still wins

Worth being honest: Coolify has more integrations, more one-click app templates, a larger team, and a longer track record. If you want a giant catalog of preconfigured services or you're running a deployment platform for a team that needs all the bells and whistles, Coolify is the more feature-complete choice today.

Ployer is the right pick when you want **the core workflow without the overhead**.

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

That's the whole thing. No hidden sidecars.

## Getting started

Point your domain's DNS A record at your server, then:

```bash
curl -fsSL https://ployer.nusendra.com/install.sh | sudo bash
```

The installer asks for your domain (or auto-detects your IP if you run it non-interactively), generates a JWT secret, installs Caddy, sets up systemd, and prints the dashboard URL. HTTPS is provisioned automatically when you use a real domain.

> **Heads up:** install on a fresh, dedicated server. Ployer owns ports 80 and 443 via Caddy, so it will conflict with Nginx, Apache, or Coolify if any of those are still running. If you're migrating from Coolify, uninstall it first, that's also when you'll see the memory drop.

## Closing thought

The pitch isn't "Ployer does everything Coolify does." The pitch is: **most self-hosters don't need everything Coolify does, and they're paying for it in RAM.** If you want a Git-driven PaaS workflow on a small server and you'd rather spend your memory on the apps you're actually running, Ployer is built for exactly that case.

Repo and install instructions: <https://ployer.nusendra.com>
