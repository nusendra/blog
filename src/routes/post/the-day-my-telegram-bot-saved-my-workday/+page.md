---
title: "The day my Telegram bot saved my workday"
date: 2026-05-23 09:00:00
description: "My home server's Tailscale expired while I was working from a cafe. I couldn't SSH in to fix it, but I could still talk to Claude Code over Telegram, and that turned out to be enough."
tags: ['claude-code', 'telegram', 'tailscale']
draft: false
slug: the-day-my-telegram-bot-saved-my-workday
is_featured: true
---

A few days ago I packed my laptop and went to work from a cafe. Nothing unusual, I do it most weeks. What was unusual was that, about ten minutes after I sat down with my coffee, none of my apps could reach the database.

That database lives on my home server. It's the shared backend for a few of my side projects, and I reach it from anywhere over Tailscale. Tailscale on the home server had silently expired, probably the day before, and I hadn't noticed.

The obvious fix is to SSH in and re-authenticate. Except SSH also goes over Tailscale. The whole reason Tailscale is there is so I don't have to expose SSH to the public internet. With Tailscale down on the server, there was no path in.

So there I was, sitting in a cafe with a flat white going cold next to me, locked out of my own home server.

---

## Remembering the bot

I sat there for a minute trying to think of a workaround. Drive home? An hour each way. Ask someone at the house to plug in a monitor? Nobody was there. Wait it out and hope Tailscale would re-auth itself? It wouldn't, that's the whole point of the expiry.

Then I remembered the [Telegram bot I'd written a couple of weeks ago](/post/talking-to-claude-code-from-my-phone).

The bot is a tiny Rust program that runs on the Pi, takes messages from my Telegram account, and pipes them to `claude` running locally. I built it so I could chat with Claude Code from my phone while I'm out. I had not, at any point, considered it a disaster-recovery tool.

But the bot doesn't go through Tailscale. It connects out to Telegram's servers from the home network. As long as the Pi has internet, the bot is reachable.

I opened Telegram and typed:

> tailscale on this pi is expired 1 day ago. can you reauthenticate and make it up again?

And then I waited.

---

## Watching Claude fix it from across town

Claude checked `tailscale status`, confirmed the device was logged out, and ran `sudo tailscale up`. That command prints an auth URL that you have to visit in a browser to complete the login. Claude pasted it back to me in the chat.

I tapped the link on my phone, logged in, approved the device, and went back to the Telegram chat. Claude ran `tailscale status` again, saw the Pi was back online with its full peer list, and reported success.

The whole thing took maybe three minutes. My coffee was still warm.

A minute later my database client reconnected. I went back to work.

---

## Why this worked

The interesting thing isn't that Claude could run `tailscale up`, anyone with shell access could do that. The interesting thing is the path that *got* a shell to the right machine.

Normally my mental model of "remote access to home server" is a single chain:

```
laptop → Tailscale → Pi → shell
```

If any link breaks, I'm out. That morning, Tailscale was the broken link, and it happened to be the link closest to the destination, the one I couldn't reach over the chain itself.

The Telegram bot gave me a completely independent path:

```
phone → Telegram cloud → Pi (outbound) → Claude → shell
```

No incoming connections, no VPN, no port forwards. The Pi reaches out to Telegram's servers and stays connected. As long as the Pi has any working internet connection at all, I can send it commands. Even if every other remote-access tool on the box is broken.

I didn't design it that way. I built the bot because I wanted to chat with Claude from the train. The fact that it doubles as an out-of-band recovery channel was a happy accident, the kind you only appreciate when you're sitting in a cafe staring at a connection timeout.

---

## The lesson, such as it is

There's a real principle hiding in here, and it's older than Tailscale or Telegram or Claude: **your recovery channel must not depend on the thing it's trying to recover.** If the only way to fix your VPN is through your VPN, you don't have a recovery channel, you have a single point of failure with extra steps.

For home labs this usually means a dumb second path: a static IP with port-forwarded SSH, a cellular dongle, a friend who can power-cycle a box for you. Those all work. But they're also all things I'd have to *set up*, and historically I have not set them up, because the day they're needed feels infinitely far away, right up until the moment it isn't.

What's nice about the Telegram-bot path is that I didn't set it up *as* a recovery channel. I set it up because chatting with Claude from my phone is genuinely useful for normal work. The recovery property came along for free, and "free" is the only price at which I'll reliably maintain a backup system.

If you've got a home server and an LLM-CLI you like talking to, this is a pattern worth copying. The bot itself is small, [it lives here](https://github.com/nusendra/claude-code-telegram). Configure the user-ID allowlist properly so you're the only one who can drive it, point it at a Claude session with sensible permissions, and forget about it until the day you really, really need it.

That day, for me, was last Tuesday. I'll take it.
