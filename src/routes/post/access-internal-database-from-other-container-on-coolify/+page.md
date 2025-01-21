---
draft: false
title: Access Internal Database from Other Container on Coolify
date: 2025-01-21 18:00:00
tags: ["docker", "coolify"]
description: "This guide covers best practices for container-to-container communication on coolify"
slug: access-internal-database-from-other-container-on-coolify
---

<div align="center">
    <img src="/images/docker-coolify.webp" alt="coolify and docker">
</div>

## Problems

Let me explain about the app first. I'm using Coolify to manage my apps on my own VM. I have 2 apps,
the first one is backend app (containerized) and the second is MariaDB database (containerized).

Previously, whenever I wanted to access my database, I always use public IP address as host. Here is an
example of my .env file

```
DB_HOST="123.123.123.123" #this is public ip address (accessible through internet)
DB_NAME=test
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306
```

To make it more understandable and easy to read, look at this schema

<div align="center">
    <img src="/images/docker-before.webp" alt="access database through internet ip">
</div>

As you can see, I always access my database through internet. This approach adds more latency, not secure, and if the internet goes down then the app won't get fetch the data from that database.

## Solutions

Change the IP address in `DB_HOST` as container name. Here is the expected schema

<div align="center">
    <img src="/images/docker-after.webp" alt="access database through container name">
</div>

The problem now is how do we access the container from the other container? Because, as you can see
here, coolify allows this database to accessible from other container (internally in coolify's docker
daemon).

<div align="center">
    <img src="/images/coolify-internal-access.webp" alt="coolify internal access">
</div>

### Here is how to do that
1. First of all, you need to know the database's container name. You can open the eye button in that
   `MariaDB URL (internal)` in the right side. You will see container name in the input element, like
   this
```
mysql://mariadb:sk7yRRLNfoDfzduhOOfJlAiJswjjMW0@a40k0sgowg0ckw4w448k4gko:3306/default
```

`a40k0sgowg0ckw4w448k4gko` is the container name

2. Then you need to setup a docker-compose file to allow your container access the coolify's network.
   Here is the example

```yml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    networks:
      - coolify
    depends_on: []

networks:
  coolify:
    external: true
```

The Dockerfile part is depends on your needs, let's just focus on networks part in this yml file. In
this file, we are trying to access coolify network so that we can access other containers in
coolify's docker daemon

3. Last thing is, update your `.env` file like this

```
DB_HOST="a40k0sgowg0ckw4w448k4gko"
DB_NAME=test
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306
```

After you've done setup your docker-compose, Dockerfile and coolify, your app will access database to
the database container directly. This way will reduce latency, better security and if the internet is
down, the app still can access the database.

Hope this help, thanks for stopping by.
