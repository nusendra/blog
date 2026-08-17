---
title: "Talking to Claude Code from my phone"
date: 2026-05-12 09:00:00
description: "Building a small Rust Telegram bot that pipes messages to Claude Code running on my Raspberry Pi 5, so I can chat with Claude from anywhere."
tags: ['claude-code', 'telegram']
draft: false
slug: talking-to-claude-code-from-my-phone
is_featured: true
---

I run a Raspberry Pi 5 as a home server. Anthropic doesn't ship an official Telegram integration for Claude Code, so I figured I'd write my own wrapper: a small bot that lets me chat with Claude from Telegram, anywhere I go.

The idea was simple. Claude Code already runs as a CLI. Telegram already has a perfectly good chat interface on my phone. All I needed was a thin pipe between them.

---

## The premise

The whole thing is about 300 lines of Rust, and the flow is exactly what you'd expect:

```
Me (Telegram) → bot on the Pi → claude CLI → response back to me
```

When I send a message, the bot runs:

```bash
claude -p "<my message>" --output-format json --dangerously-skip-permissions
```

Claude returns a JSON blob with two fields I care about: `result`, the text it generated, and `session_id`. I hold onto that `session_id` in memory and pass it back with `--resume <id>` on the next message. That's how Claude remembers what we were talking about.

`/new` clears the session. `/cd <path>` changes the working directory so Claude can operate on different projects. That's basically the whole bot.

---

## Why not Python?

I built the first version in Python with `python-telegram-bot`. It worked. It also used about 50 MB of RAM at idle, needed a venv and a half-dozen pip dependencies, and took two seconds to cold start.

On a Pi 5 with 8 GB of RAM none of that matters. It bothered me anyway. The bot is doing almost nothing, it's a glorified `subprocess.run`, and spending 50 MB on it felt wrong.

The Rust rewrite uses about 3 MB and starts instantly. It's a single static binary I can scp to the Pi and run, with no runtime or venv to install alongside it. That's the kind of thing Rust is good at, and the job was small enough that the rewrite took an evening.

The stack is teloxide for the Telegram bot framework, tokio for async (claude runs as a subprocess, so we never block the runtime), serde_json to parse Claude's output, tracing for structured logging, and dotenvy for config.

About the only interesting Rust bit is the typing indicator. Telegram lets you send a "typing..." action that lasts five seconds. While the claude subprocess is running, I `tokio::spawn` a task that refreshes that indicator every four seconds and `abort()` it as soon as Claude returns. It makes the bot look like it's thinking while it's actually shelling out.

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

It's single user only. The config has an `ALLOWED_USER_ID` field, and any message from anyone else is silently dropped. Telegram bots don't really have a concept of "private", since anyone who finds your bot's username can message it, so the whitelist is the only real auth.

`--dangerously-skip-permissions` is on by default. Claude Code normally asks before running tools, and there's no way to answer "yes" from a Telegram message, so the bot bypasses the prompts. That moves the security boundary rather than removing it: instead of relying on Claude's per-tool consent, I'm relying on the Telegram user ID check. One auth check at the door instead of many checks inside.

Sessions live in memory only. If the Pi reboots I start fresh, with no database and no serialization. For a chat bot that's the right call, since conversations have short lifespans anyway and `/new` is a button press away.

Output gets ANSI-stripped and chunked. Claude sometimes emits color codes that look terrible in a chat, so a regex strips them. Telegram also caps messages at 4096 characters, so longer responses get split at newline boundaries.

---

## The cross-compilation rabbit hole

Building the binary locally on the Pi worked fine: `cargo build --release`, wait 5 to 10 minutes, done. But I wanted GitHub Actions to build it for me on every release tag, so I could update with a `curl` one-liner instead of an SSH session.

My first attempt was a standard `x86_64 → aarch64-unknown-linux-gnu` cross-compile with `gcc-aarch64-linux-gnu`. The build immediately failed on `openssl-sys` because there's no ARM64 OpenSSL on the runner. The usual fix is pulling in `libssl-dev:arm64` via dpkg multiarch, but that's fragile and adds repos that can break the runner.

So the second attempt swapped the TLS stack entirely. `teloxide`, via `reqwest`, supports `rustls` as an alternative to `native-tls`, and rustls is pure Rust with no C and no system libraries. One line in `Cargo.toml`:

```toml
teloxide = { version = "0.13", default-features = false, features = ["macros", "rustls"] }
```

The build succeeded. I downloaded the binary, ran it on the Pi, and immediately got:

```
/lib/aarch64-linux-gnu/libc.so.6: version `GLIBC_2.39' not found
```

GitHub's `ubuntu-latest` runs Ubuntu 24.04, which ships glibc 2.39. Raspberry Pi OS Bookworm ships 2.36. The binary needed a newer glibc than the Pi had.

The third attempt was static linking with musl. Instead of linking against glibc at all, target `aarch64-unknown-linux-musl` and get a fully static binary with no libc dependency. The standard tool for this is `cross`, which runs builds inside a Docker container with the right toolchain already installed:

```yaml
- uses: taiki-e/install-action@v2
  with:
    tool: cross

- name: Build
  run: cross build --release --target aarch64-unknown-linux-musl
```

The resulting binary is around 11 MB and runs on anything ARM64, with no shared libraries and no glibc version to match. That's the version that ships now. Cross-compilation is mostly a solved problem once you're willing to abandon dynamic linking, and for a bot this small there's no real cost to that.

---

## The install script

The last piece was making it easy to install for anyone, including future me six months from now, when I've forgotten everything.

The whole installation is one command:

```bash
curl -fsSL https://raw.githubusercontent.com/nusendra/claude-code-telegram/main/install.sh | bash
```

The script downloads the latest release binary to `/usr/local/bin/claude-telegram`, asks for the bot token, user ID, claude path, working dir and timeout, writes a `.env` file with chmod 600, writes a systemd unit, then enables and starts the service.

One subtle bug almost shipped. When the script runs via `curl | bash`, stdin is connected to the curl pipe rather than the terminal, so the `read` commands return EOF immediately and every prompt takes the default answer. Reading from `/dev/tty` explicitly fixes it:

```bash
read -r OVERWRITE </dev/tty
```

You only discover that by piping the script and watching it skip all the prompts in a single frame.

---

## What I'd add next

The bot does what I needed, but a few things are tempting.

Streaming output is the obvious one. Claude's CLI supports `--output-format stream-json`, which emits tokens as they're generated, so the bot could edit its Telegram message progressively instead of waiting for the whole response.

Voice messages would make it a one-shot voice assistant: Telegram to Whisper to Claude. I haven't needed it yet.

File uploads would close a real gap. Right now I can ask Claude to read files on the Pi, but not files I send from my phone. Handling Telegram documents, writing them to the working dir and forwarding them to Claude would cover that.

For now it's what I wanted, a small single-purpose tool, and my phone is a Claude Code terminal.

---

*Code: [github.com/nusendra/claude-code-telegram](https://github.com/nusendra/claude-code-telegram)*
