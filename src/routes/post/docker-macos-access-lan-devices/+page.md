---
draft: false
title: Access LAN Devices from Docker Containers on macOS (e.g., MariaDB)
date: 2025-06-04 08:00:00
tags: ["docker"]
description: "Steps on how to access database that live in internal network"
slug: docker-macos-access-lan-devices
---

Couple of weeks ago, I bought Raspberry Pi 5 and use it as my home server (currently only for entertainment and database). And this raspi5 live in my internal home network with IP 192.168.100.100. I can access it
easily through my Linux, Windows, and Mac machine.

After updating Docker Desktop, I found that my docker containers can no longer access devices on my local network (e.g., `192.168.100.100`). After doing some research, this is because Docker Desktop runs containers inside a VM, which is **isolated from physical LAN** — especially on macOS (I'm using Mac Mini M4 btw).

In this post, I’ll show how to work around this limitation using a simple but powerful tool: `socat`.

---

### The Problem

On macOS, Docker runs in a VM that uses NAT networking. This means:

- Containers can access the internet (e.g., `ping 8.8.8.8`)
- But they **cannot access local devices** (e.g., `192.168.100.100`)
- Bridged networking is **not supported** natively

---

### The Solution: Create a Proxy in my Mac

I can make my Mac Mini act as a **bridge** between the container and LAN using `socat`, a lightweight TCP proxy.

#### Example Use Case

Access a **MariaDB server** running on `192.168.100.100:3306` from inside a Docker container.

---

### Step-by-Step Guide

#### 1. Install `socat` on macOS

```
$ brew install socat

```

#### 2. Start the TCP Proxy
```
$ socat TCP-LISTEN:33060,fork TCP:192.168.100.100:3306
```

This tells socat to listen on my Mac port 33060 and forward the traffic to MariaDB server on my LAN.

#### 3. Connect from Docker Container

You can try to connect from container like this
```
$ mysql -h host.docker.internal -P 33060 -u root -p
```

Thanks for stopping by. This post is honestly for my personal note, hope this helps. See ya
