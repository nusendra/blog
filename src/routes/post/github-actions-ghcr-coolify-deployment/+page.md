---
draft: false
title: "Faster Deployments with GitHub Actions, GHCR, and Coolify"
date: 2026-04-05 10:00:00
tags: ['devops','docker','github-actions','coolify','ci-cd']
description: "How to offload Docker builds to GitHub Actions with GHCR and trigger Coolify deployments, cutting deploy time from 10 minutes to 30 seconds."
slug: github-actions-ghcr-coolify-deployment
---

If you're using Coolify to deploy Docker-based apps, you might notice that build times on your production server can get slow — especially when the server is handling both building and serving. In this post, I'll show you how to move the Docker build step to GitHub Actions with GitHub Container Registry (GHCR), so Coolify only needs to pull and run a pre-built image.

## The Problem

With the default Coolify setup, every deployment means:

1. Coolify clones the repo on the production server
2. Builds the Docker image locally
3. Runs the container

This took **~10 minutes** because the server handled both building and serving the application.

## The Solution

Offload the build to GitHub Actions:

1. GitHub Actions builds the Docker image on GitHub's CI runners
2. Pushes the image to GHCR
3. Triggers Coolify via webhook to pull and run the pre-built image

The Coolify deployment step now takes **~30 seconds**.

## Architecture

```
Developer pushes to master
        |
        v
GitHub Actions (CI runner)
        |
        ├── 1. Builds Docker image
        ├── 2. Pushes image to ghcr.io
        └── 3. Triggers Coolify webhook
                    |
                    v
            Coolify (production server)
                    |
                    ├── Pulls pre-built image from ghcr.io
                    └── Restarts the container
```

## Step-by-Step Setup

### 1. Add GitHub Repository Secrets

Go to your GitHub repository: **Settings > Secrets and variables > Actions > Secrets tab > Repository secrets**.

Add these two secrets:

| Secret Name       | Description                                      |
|-------------------|--------------------------------------------------|
| `COOLIFY_WEBHOOK` | The webhook URL from Coolify to trigger a deploy |
| `COOLIFY_TOKEN`   | The Coolify API token with `deploy` permission   |

> `GITHUB_TOKEN` is automatically provided by GitHub Actions — no manual setup needed.

### 2. Create a Coolify API Token

1. Log in to your Coolify dashboard
2. Navigate to **Keys & Tokens** (or **API Tokens**)
3. Create a new API token with **deploy** permission — this is the minimum required
4. Copy the token and add it as `COOLIFY_TOKEN` in GitHub secrets

### 3. Get the Coolify Webhook URL

1. In the Coolify dashboard, go to your application/service
2. Navigate to the **Webhooks** section
3. Copy the webhook URL and add it as `COOLIFY_WEBHOOK` in GitHub secrets

### 4. Authenticate Docker on the Coolify Server

Since the GitHub repository is private, the Coolify server needs to authenticate with GHCR to pull the image.

Create a GitHub **Personal Access Token (Classic)** with the `read:packages` scope, then SSH into your Coolify server:

```bash
sudo su -
echo "<YOUR_GITHUB_PAT>" | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
```

You should see `Login Succeeded`.

> **Important:** Run this as root. Coolify runs Docker as root, so credentials must be in `/root/.docker/config.json`, not your regular user's home directory.

### 5. Configure Coolify Build Pack

Set Coolify to use the **Docker Compose** build pack. The `docker-compose.yml` references the pre-built GHCR image directly (no `build:` directive), so Coolify will pull instead of build.

## The GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - master

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Trigger Coolify deploy
        if: success()
        run: |
          curl -X GET "${{ secrets.COOLIFY_WEBHOOK }}" \
            -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            --fail --silent --show-error
```

Key things to note:
- Each build gets tagged with both `latest` and the commit SHA — this enables easy rollbacks
- `type=gha` cache means subsequent builds only rebuild changed layers
- The Coolify webhook is only triggered on successful builds

## Docker Compose for Coolify

Your `docker-compose.yml` should reference the GHCR image instead of building locally:

```yaml
services:
  wordpress:
    image: ghcr.io/your-org/your-repo:latest
    networks:
      - coolify
    volumes:
      - ./uploads:/var/www/vhosts/localhost/html/wp-content/uploads

networks:
  coolify:
    external: true
```

## Deploying

Just push to `master`:

```bash
git push origin master
```

Monitor the build in the **Actions** tab of your GitHub repository.

## Troubleshooting

### "unauthorized" error when Coolify pulls the image

Docker on the Coolify server isn't authenticated with GHCR, or the login was done as a non-root user. Fix by running `docker login` as root on the server.

### GitHub Actions build fails at login step

The repository may not have the correct `GITHUB_TOKEN` permissions. Go to **Settings > Actions > General > Workflow permissions** and set it to **Read and write permissions**.

### GitHub Actions succeeds but Coolify doesn't deploy

Verify both `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` secrets are correct. Check that the API token has `deploy` permission.

### Rolling back

Each build is tagged with the commit SHA. To roll back, update the image tag in `docker-compose.yml`:

```yaml
image: ghcr.io/your-org/your-repo:<commit-sha>
```

Then trigger a redeploy in Coolify or push the change.

## Conclusion

Moving the Docker build from Coolify to GitHub Actions with GHCR is a simple but impactful optimization. Your production server only pulls and runs pre-built images, reducing deployment time significantly and freeing up server resources for actually serving your application.
