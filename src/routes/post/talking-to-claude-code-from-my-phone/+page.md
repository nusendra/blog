---
title: "Talking to Claude Code from my phone"
date: 2026-05-12 09:00:00
description: "Building a small Rust Telegram bot that pipes messages to Claude Code running on my Raspberry Pi 5, so I can chat with Claude from anywhere."
tags: ['claude-code', 'rust', 'telegram', 'raspberry-pi']
draft: false
slug: talking-to-claude-code-from-my-phone
---

I run a Raspberry Pi 5 as a home server. Anthropic doesn't ship an official Telegram integration for Claude Code, so I figured I'd write my own wrapper, a small bot that lets me chat with Claude from Telegram, anywhere I go.

The idea was simple. Claude Code already runs as a CLI. Telegram already has a perfectly good chat interface on my phone. All I needed was a thin pipe between them.

This is the story of that pipe.

---

## The premise

The whole thing is about 300 lines of Rust. The flow is exactly what you'd expect:

```
Me (Telegram) → bot on the Pi → claude CLI → response back to me
```

When I send a message, the bot runs:

```bash
claude -p "<my message>" --output-format json --dangerously-skip-permissions
```

Claude returns a JSON blob with two fields I care about: `result` (the text it generated) and `session_id`. I hold onto that `session_id` in memory and pass it back via `--resume <id>` on the next message. That's how Claude remembers what we were talking about.

`/new` clears the session. `/cd <path>` changes the working directory so Claude can operate on different projects. That's basically the whole bot.

---

## Why not Python?

I built the first version in Python with `python-telegram-bot`. It worked. It also:

- used ~50 MB of RAM at idle
- needed a venv and a half-dozen pip dependencies
- took two seconds to cold start

On a Pi 5 with 8 GB of RAM, none of that matters. But it bothered me anyway. The bot is doing almost nothing, it's a glorified `subprocess.run`. Spending 50 MB on it felt wrong.

The Rust rewrite uses about 3 MB and starts instantly. It's a single static binary I can scp to the Pi and run. No runtime, no venv, no `requirements.txt`. That's the kind of thing Rust is good at, and small enough that the rewrite took an evening.

The stack:

- **teloxide** for the Telegram bot framework
- **tokio** for async (claude runs as a subprocess, so we never block the runtime)
- **serde_json** to parse Claude's output
- **tracing** for structured logging
- **dotenvy** for config

About the only interesting Rust bit is the typing indicator. Telegram lets you send a "typing..." action that lasts five seconds. While the claude subprocess is running, I `tokio::spawn` a task that refreshes that indicator every four seconds, and `abort()` the task as soon as Claude returns. The result feels like a real chat, the bot looks like it's thinking while it's actually shelling out.

```rust
let typing = tokio::spawn(async move {
    loop {
        let _ = bot.send_chat_action(chat_id, ChatAction::Typing).await;
        tokio::time::sleep(Duration::from_secs(4)).await;
    }
});

let result = claude::run(...).await;
typing.abort();
```

---

## The interesting design decisions

**Single user only.** This is a personal bot. The config has an `ALLOWED_USER_ID` field, and any message from anyone else is silently dropped. Telegram bots don't really have a concept of "private", anyone who finds your bot's username can message it, so the whitelist is the only real auth.

**`--dangerously-skip-permissions` is on by default.** Claude Code normally asks before running tools. There's no way to answer "yes" from a Telegram message, so the bot bypasses the prompts. This sounds scary, but the security boundary has moved: instead of relying on Claude's per-tool consent, I'm relying on the Telegram user ID check. One auth check at the door instead of many checks inside.

**Sessions live in memory only.** If the Pi reboots, I start fresh. No database, no serialization. For a chat bot this is the right call, conversations naturally have short lifespans, and `/new` is just a button press away.

**Output gets ANSI-stripped and chunked.** Claude sometimes emits color codes that look terrible in a chat. A regex strips them. And Telegram caps messages at 4096 characters, so longer responses get split at newline boundaries.

---

## The cross-compilation rabbit hole

Building the binary locally on the Pi worked fine, `cargo build --release`, wait 5–10 minutes, done. But I wanted GitHub Actions to build it for me on every release tag, so I could update with a `curl` one-liner instead of an SSH session.

This is where it got fun.

**First attempt:** Standard `x86_64 → aarch64-unknown-linux-gnu` cross-compile with `gcc-aarch64-linux-gnu`. The build immediately failed on `openssl-sys` because there's no ARM64 OpenSSL on the runner. The standard fix is to pull in `libssl-dev:arm64` via dpkg multiarch, but that's fragile and adds repos that can break the runner.

**Second attempt:** Switch the TLS stack entirely. `teloxide` (via `reqwest`) supports `rustls` as an alternative to `native-tls`. Rustls is pure Rust, no C, no system libraries. One line in `Cargo.toml`:

```toml
teloxide = { version = "0.13", default-features = false, features = ["macros", "rustls"] }
```

The build succeeded. I downloaded the binary, ran it on the Pi, and immediately got:

```
/lib/aarch64-linux-gnu/libc.so.6: version `GLIBC_2.39' not found
```

GitHub's `ubuntu-latest` runs Ubuntu 24.04, which ships glibc 2.39. Raspberry Pi OS Bookworm ships 2.36. The binary I built required a newer glibc than the Pi had.

**Third attempt:** Static linking with musl. Instead of linking against glibc at all, target `aarch64-unknown-linux-musl`, which produces a fully static binary with no libc dependency whatsoever. The standard tool for this is `cross`, which runs builds inside a Docker container with the right toolchain pre-installed:

```yaml
- uses: taiki-e/install-action@v2
  with:
    tool: cross

- name: Build
  run: cross build --release --target aarch64-unknown-linux-musl
```

The resulting binary is ~11 MB and runs on anything ARM64. No matching glibc version required, no shared libraries to worry about, no surprises.

That's the version that ships now. Cross-compilation in 2026 is mostly a solved problem if you're willing to abandon dynamic linking, and for a small bot like this there's no real cost.

---

## The install script

The last piece was making it actually easy to install for anyone (including future me, six months from now, when I've forgotten everything).

The whole installation is one command:

```bash
curl -fsSL https://raw.githubusercontent.com/nusendra/claude-code-telegram/main/install.sh | bash
```

The script:

1. Downloads the latest release binary to `/usr/local/bin/claude-telegram`
2. Asks for the bot token, user ID, claude path, working dir, and timeout
3. Writes a `.env` file (chmod 600)
4. Writes a systemd unit
5. Enables and starts the service

One subtle bug almost shipped: when the script runs via `curl | bash`, stdin is connected to the curl pipe, not the terminal. The `read` commands return EOF immediately and every prompt gets the default answer. The fix is to read from `/dev/tty` explicitly:

```bash
read -r OVERWRITE </dev/tty
```

This is one of those things you only discover by piping the script and watching it skip all the prompts in one frame.

---

## What I'd add next

The bot is feature-complete for what I needed, but a few things are tempting:

- **Streaming output.** Claude's CLI supports `--output-format stream-json` which emits tokens as they're generated. The bot could edit its Telegram message progressively instead of waiting for the whole response. Faster perceived latency.
- **Voice messages.** Telegram → Whisper → Claude is a one-shot voice assistant. Tempting, but I haven't needed it yet.
- **File uploads.** Right now I can ask Claude to read files on the Pi, but not files I send from my phone. Wiring up Telegram document handling → write to working dir → forward to Claude would close that gap.

For now it's exactly what I wanted: a small, fast, single-purpose tool that does one thing well. The Pi keeps humming on its shelf. My phone is now a Claude Code terminal.

That seems like enough.

---

*Code: [github.com/nusendra/claude-code-telegram](https://github.com/nusendra/claude-code-telegram)*
