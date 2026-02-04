---
draft: false
title: How to Setup OpenClaw in Ubuntu
date: 2026-02-05 04:30:00
tags: ['openclaw','ubuntu','ai assistant', 'setup']
description: "Step-by-step guide to install and configure OpenClaw AI assistant on Ubuntu"
slug: how-to-setup-openclaw-in-ubuntu---
---

<img src="/images/openclaw-ubuntu.webp" />

This guide will walk you through the complete installation and setup of OpenClaw, an AI assistant that can handle messaging, file operations, web browsing, and more, all running locally on your Ubuntu system.

## Prerequisites

Before we begin, make sure you have:

- Ubuntu 20.04 LTS or later
- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- At least 2GB RAM (4GB recommended)

## Step 1: Install Node.js and npm

If you don't have Node.js installed, you can install it using the NodeSource repository:

```bash
# Update package list
sudo apt update

# Install curl if not present
sudo apt install -y curl

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 2: Install OpenClaw

OpenClaw is available through npm. Install it globally:

```bash
# Install OpenClaw globally
sudo npm install -g openclaw

# Verify installation
openclaw --version
```

## Step 3: Initialize OpenClaw

Create a new workspace for your OpenClaw instance:

```bash
# Create workspace directory
mkdir -p ~/openclaw-workspace
cd ~/openclaw-workspace

# Initialize OpenClaw
openclaw init
```

The `init` command will create the basic structure with essential files like `SOUL.md`, `USER.md`, and `AGENTS.md`.

## Step 4: Configure Your OpenClaw

### Set up your identity

Edit the `IDENTITY.md` file to define who your assistant is:

```markdown
# IDENTITY.md - Who Am I?

- **Name:** OpenClaw
- **Creature:** AI Assistant
- **Vibe:** Helpful and efficient
- **Emoji:** 🐺
- **Avatar:** /path/to/avatar.png
```

### Configure user details

Edit the `USER.md` file with your information:

```markdown
# USER.md - About Your Human

- **Name:** Your Name
- **Timezone:** Asia/Jakarta
- **Notes:** Any preferences or special instructions
```

## Step 5: Set Up Messaging Channels

OpenClaw supports multiple messaging platforms. Let's set up WhatsApp:

```bash
# Start WhatsApp configuration
openclaw whatsapp setup
```

This will generate a QR code. Scan it with your WhatsApp to link your account.

## Step 6: Start OpenClaw

Now you're ready to start your OpenClaw assistant:

```bash
# Start OpenClaw
openclaw start
```

You should see output indicating that OpenClaw is running and ready to receive messages.

## Step 7: Test Your Setup

Send a message to your WhatsApp number that's linked to OpenClaw. You should receive a response from your assistant.

Try asking:
- "Who are you?"
- "What can you do?"
- "Tell me a joke"

## Optional: Configure Advanced Features

### Set up background services

For persistent operation, you can configure OpenClaw to run as a system service:

```bash
# Create systemd service file
sudo nano /etc/systemd/system/openclaw.service
```

Add the following content:

```ini
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=nusendra
WorkingDirectory=/home/nusendra/openclaw-workspace
ExecStart=/usr/bin/openclaw start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable openclaw
sudo systemctl start openclaw

# Check status
sudo systemctl status openclaw
```

### Configure environment variables

Create a `.env` file in your workspace for custom configuration:

```bash
# OpenClaw environment variables
OPENCLAW_MODEL=openrouter/arcee-ai/trinity-large-preview:free
OPENCLAW_THINKING=off
OPENCLAW_DEFAULT_CHANNEL=whatsapp
```

## Common Issues and Solutions

### Port conflicts

If you encounter port conflicts, you can change the default port:

```bash
# Set custom port
export OPENCLAW_PORT=3001
openclaw start
```

### Memory issues

If OpenClaw crashes due to memory constraints, try:

```bash
# Reduce memory usage
export OPENCLAW_MEMORY_LIMIT=2048
openclaw start
```

### Update OpenClaw

To update to the latest version:

```bash
sudo npm update -g openclaw
```

## Security Considerations

### File permissions

Ensure your workspace files have appropriate permissions:

```bash
# Set secure permissions
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

### Firewall configuration

If you're exposing OpenClaw to the internet, configure your firewall:

```bash
# Allow OpenClaw port
sudo ufw allow 3000/tcp
```

## Next Steps

Now that OpenClaw is running, you can:

1. **Customize your assistant** by editing the various `.md` files in your workspace
2. **Add skills** by installing additional OpenClaw skills
3. **Integrate with other services** like calendars, email, and more
4. **Create automation workflows** using the built-in tools

## Troubleshooting

### OpenClaw won't start

Check the logs:

```bash
openclaw logs
```

### WhatsApp not working

Verify the WhatsApp gateway:

```bash
openclaw whatsapp status
```

### Memory issues

Monitor memory usage:

```bash
free -h
```

## Conclusion

You now have a fully functional AI assistant running on your Ubuntu system! OpenClaw can handle messaging, file operations, web browsing, and much more, all while keeping your data private and secure.

Enjoy your new AI companion!