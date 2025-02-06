---
draft: false
title: How to Setup Wildcard Subdomain in Coolify using Traefik
date: 2025-02-05 17:05:52
tags: ['coolify', 'traefik']
description: "Do you want to build your own Saas and wonder how to do that with wildcard subdomain in Coolify?"
slug: how-to-setup-wildcard-subdomain-in-coolify-using-traefik
---

![traefik](https://blog.networkprofile.org/content/images/size/w2000/2019/01/architecture.png)

Have you ever wondered how to do wildcard subdomain in your VM especially in Coolify. A Couple of days ago I ran into an issue with this thing, I thought if I
wanna use wildcard subdomain in one of my projects, I could simply add a (*) to a domains field like this `https://*.mywebsite.com`. That's totally wrong !!! You can't do that in Coolify. So my goal is, think about the Saas. If i go to user1.mywebsite.com then it should go to route A, if I go to user2.mywebsite.com should go to route B, and so on.

After doing some research, read the docs, and experimenting, Mother Fortune came to me and she said "Voila motherfucker, you made it !!". So let's jump to it

First, let me breakdown what I used :
1. Cloudflare DNS
2. Coolify
3. Project with docker compose

## Setup Cloudflare

<div align="center">
    <img src="/images/cloudflare.webp" alt="cloudflare">
</div>

Make sure you have wildcard (*) with A record. That's all !

## Coolify

As I told in this post title, I'm using Coolify to manage my VM. Make sure you are using Docker compose as Build pack and put your domain in Domains field.

## Traefik

Follow the configuration in this Docs https://coolify.io/docs/knowledge-base/traefik/wildcard-certificates/#configuration and make sure you setup the cloudflare
environment. Now go to `Servers > Choose your server (localhost maybe?) > Traefik config`

Here is my proxy config in Coolify

```yml
networks:
  coolify:
    external: true
services:
  traefik:
    container_name: coolify-proxy
    image: 'traefik:v3.1'
    restart: unless-stopped
    environment:
      - CF_API_EMAIL=<YOUR_EMAIL_IN_CLOUDFLARE>
      - CF_API_KEY=<YOUR_CLOUDFLARE_API_KEY>
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    networks:
      - coolify
    ports:
      - '80:80'
      - '443:443'
      - '443:443/udp'
      - '8080:8080'
    healthcheck:
      test: 'wget -qO- http://localhost:80/ping || exit 1'
      interval: 4s
      timeout: 2s
      retries: 5
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/data/coolify/proxy:/traefik'
    command:
      - '--ping=true'
      - '--ping.entrypoint=http'
      - '--api.dashboard=true'
      - '--api.insecure=false'
      - '--entrypoints.http.address=:80'
      - '--entrypoints.https.address=:443'
      - '--entrypoints.http.http.encodequerysemicolons=true'
      - '--entryPoints.http.http2.maxConcurrentStreams=50'
      - '--entrypoints.https.http.encodequerysemicolons=true'
      - '--entryPoints.https.http2.maxConcurrentStreams=50'
      - '--entrypoints.https.http3'
      - '--providers.docker.exposedbydefault=false'
      - '--providers.file.directory=/traefik/dynamic/'
      - '--providers.file.watch=true'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=http'
      - '--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare'
      - '--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=0'
      - '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
      - '--providers.docker=true'
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=http
      - traefik.http.routers.traefik.middlewares=traefik-basic-auth@file
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.routers.traefik.tls.certresolver=letsencrypt
      - traefik.http.routers.traefik.tls.domains[0].main=mywebsite.com
      - traefik.http.routers.traefik.tls.domains[0].sans=*.mywebsite.com
      - traefik.http.services.traefik.loadbalancer.server.port=8080
      - traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
      - traefik.http.middlewares.gzip.compress=true
```

Make sure you changed this line using your own domain

```
      - traefik.http.routers.traefik.tls.domains[0].main=mywebsite.com
      - traefik.http.routers.traefik.tls.domains[0].sans=*.mywebsite.com
```

## Docker compose

Now in your docker compose, add traefik configs labels. Here is the example of wordpress app

```yml
services:
  wordpress:
    build:
      context: .
      dockerfile: Dockerfile
    networks:
      - coolify
    volumes:
      - ./uploads:/var/www/html/wp-content/uploads
    depends_on: []
      labels:
        - traefik.http.routers.my-app-router-https.rule=HostRegexp(`^.+\.mywebsite\.com$`)
        - traefik.http.routers.my-app-router-https.priority=0
        - traefik.http.routers.my-app-router-https.entryPoints=https
        - traefik.http.routers.my-app-router-https.tls=true
        - traefik.http.routers.my-app-router-https.tls.certresolver=letsencrypt
        - traefik.http.routers.my-app-router-https.middlewares=gzip
        - traefik.http.routers.my-app-router-https.service=my-app-service

        - traefik.http.routers.my-app-router-http.rule=HostRegexp(`^.+\.mywebsite\.com$`)
        - traefik.http.routers.my-app-router-http.priority=0
        - traefik.http.routers.my-app-router-http.entryPoints=http
        - traefik.http.routers.my-app-router-http.middlewares=redirect-to-https

        - traefik.http.middlewares.gzip.compress=true
        - traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
        - traefik.http.services.my-app-service.loadbalancer.server.port=80

networks:
  coolify:
    external: true
```

Please take note that `my-app-router-https` and `my-app-router-http` is a unique router name, you can change anything you want. I also found that there is an
issue / typo in coolify's docs. And I made some PR for that, hope that can be deployed soon https://github.com/coollabsio/documentation-coolify/pull/159

---

And that's about it !!! You can push your code to Coolify and see the results.
