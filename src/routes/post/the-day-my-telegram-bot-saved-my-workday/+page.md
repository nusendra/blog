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

So there I was, sitting in a cafe with an untouched flat white next to me, locked out of my own home server.

---

## Remembering the bot

I sat there for a minute looking for a workaround. Driving home was an hour each way, and nobody was at the house to plug in a monitor for me. Waiting it out was pointless, since Tailscale expiring on purpose is the entire point of Tailscale expiring.

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

Anyone with a shell on that Pi could have run `tailscale up`. The hard part was getting a shell onto the Pi in the first place.

Normally my mental model of "remote access to home server" is a single chain:

```
laptop → Tailscale → Pi → shell
```

If any link breaks, I'm out. That morning Tailscale was the broken link, and it sat at the far end of the chain, so the only tool that could have fixed it was the tool that was down.

The Telegram bot gave me a completely independent path:

```
phone → Telegram cloud → Pi (outbound) → Claude → shell
```

The Pi dials out to Telegram and holds that connection open, so nothing ever has to come in: no VPN to keep alive, no port to forward. As long as the Pi has some kind of working internet, I can send it commands, even when every other remote-access tool on the box is dead.

None of that was deliberate. I built the bot so I could talk to Claude from the train. It doubling as an out-of-band recovery channel was luck, and I only noticed the luck while staring at a connection timeout in a cafe.

---

## The lesson, such as it is

The principle here is old and fairly boring: your recovery channel should not depend on the thing it is recovering. If the only way to fix your VPN is through your VPN, it isn't a recovery channel.

For a home lab that usually means a dumb second path. SSH on a port-forwarded static IP, a cellular dongle, a friend who can power-cycle the box. All of them work, and all of them need setting up, which is why I had never set any of them up. The morning you need one always feels far away until it's the morning.

The Telegram bot survived that problem by not being a recovery tool. I keep it running because talking to Claude from my phone is useful on ordinary days, so it stays maintained without me deciding to maintain it. The recovery path came along for free, which is roughly the only price at which I keep a backup system alive.

If you've got a home server and an LLM CLI you like talking to, the pattern is worth copying. The bot is small and [it lives here](https://github.com/nusendra/claude-code-telegram). Configure the user-ID allowlist so you're the only one who can drive it, point it at a Claude session with sensible permissions, and then forget it exists until the day you need it.

Mine was last Tuesday.
