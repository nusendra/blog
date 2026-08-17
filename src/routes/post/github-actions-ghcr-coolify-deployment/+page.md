---
draft: false
title: "Faster Deployments with GitHub Actions, GHCR, and Coolify"
date: 2026-04-05 10:00:00
tags: ['docker','github-actions']
description: "How to offload Docker builds to GitHub Actions with GHCR and trigger Coolify deployments, cutting deploy time from 10 minutes to 30 seconds."
slug: github-actions-ghcr-coolify-deployment
is_featured: false
---

If you deploy Docker-based apps with Coolify, build times on the production server get slow once that server is doing the building and the serving at the same time. Moving the Docker build to GitHub Actions and GitHub Container Registry (GHCR) leaves Coolify with nothing to do but pull and run a pre-built image.

## The problem

With a default Coolify setup, every deployment means:

1. Coolify clones the repo on the production server
2. Builds the Docker image locally
3. Runs the container

That took about 10 minutes, because the server was building and serving the application at once.

## The solution

Offload the build to GitHub Actions:

1. GitHub Actions builds the Docker image on GitHub's CI runners
2. Pushes the image to GHCR
3. Triggers Coolify via webhook to pull and run the pre-built image

The Coolify deployment step now takes about 30 seconds.

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

## Setup

### 1. Add GitHub repository secrets

Go to your GitHub repository, then Settings > Secrets and variables > Actions > Secrets tab > Repository secrets.

Add these two:

| Secret Name       | Description                                      |
|-------------------|--------------------------------------------------|
| `COOLIFY_WEBHOOK` | The webhook URL from Coolify to trigger a deploy |
| `COOLIFY_TOKEN`   | The Coolify API token with `deploy` permission   |

GitHub Actions provides `GITHUB_TOKEN` itself, so that one needs no setup.

### 2. Create a Coolify API token

1. Log in to your Coolify dashboard
2. Navigate to Keys & Tokens (or API Tokens)
3. Create a new API token with `deploy` permission, which is the minimum required
4. Copy the token and add it as `COOLIFY_TOKEN` in GitHub secrets

### 3. Get the Coolify webhook URL

1. In the Coolify dashboard, go to your application or service
2. Navigate to the Webhooks section
3. Copy the webhook URL and add it as `COOLIFY_WEBHOOK` in GitHub secrets

### 4. Authenticate Docker on the Coolify server

For a private repository, the Coolify server needs to authenticate with GHCR before it can pull the image.

Create a GitHub Personal Access Token (Classic) with the `read:packages` scope, then SSH into your Coolify server:

```bash
sudo su -
echo "<YOUR_GITHUB_PAT>" | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
```

You should see `Login Succeeded`.

Run this as root. Coolify runs Docker as root, so the credentials have to land in `/root/.docker/config.json` rather than your own user's home directory.

### 5. Configure the Coolify build pack

Set Coolify to use the Docker Compose build pack. The `docker-compose.yml` references the pre-built GHCR image directly, with no `build:` directive, so Coolify pulls instead of building.

## The GitHub Actions workflow

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

Every build gets tagged with both `latest` and the commit SHA, which is what makes rollbacks easy. The `type=gha` cache means later builds only rebuild the layers that changed. And the Coolify webhook fires only when the build succeeds.

## Docker Compose for Coolify

Your `docker-compose.yml` should point at the GHCR image instead of building locally:

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

Push to `master`:

```bash
git push origin master
```

Then watch the build in the Actions tab of your GitHub repository.

## Troubleshooting

### "unauthorized" when Coolify pulls the image

Docker on the Coolify server isn't authenticated with GHCR, or the login happened as a non-root user. Run `docker login` as root on the server.

### The Actions build fails at the login step

The repository probably lacks the right `GITHUB_TOKEN` permissions. Go to Settings > Actions > General > Workflow permissions and set it to Read and write permissions.

### Actions succeeds but Coolify doesn't deploy

Check that both `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` are correct, and that the API token carries `deploy` permission.

### Rolling back

Every build is tagged with its commit SHA, so a rollback is an image tag change in `docker-compose.yml`:

```yaml
image: ghcr.io/your-org/your-repo:<commit-sha>
```

Then trigger a redeploy in Coolify, or push the change.

## Conclusion

With the build living in GitHub Actions and the image living in GHCR, the production server only pulls and runs. Deploys drop from ten minutes to about thirty seconds, and the server spends its cycles serving the application instead of compiling it.
