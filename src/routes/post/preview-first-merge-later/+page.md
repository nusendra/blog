---
draft: false
title: "Preview First, Merge Later: Wiring an AI Agent Into a Container Deploy Loop"
date: 2026-08-17 09:00:00
tags: ['ai','docker','coolify','devops']
description: "Building a Slack-driven agent loop where the running app is the review artifact. Four assumptions I had about containers, caches and process managers turned out to be wrong, and all of them failed silently."
slug: preview-first-merge-later
is_featured: true
---

I wanted a specific loop: type a request in Slack, have an AI agent change the code, watch the change appear on a real URL, and only after I'd looked at it with my own eyes let the agent open a pull request.

The point is that the running application becomes the review artifact, with a human gate sitting between "it works" and "it's proposed." Not the agent committing to main, and not the agent opening a PR I review cold without ever seeing the thing run.

It took an afternoon, and most of that afternoon went on discovering that four things I assumed were true weren't.

## The setup

A small dev VPS running a PaaS layer, Coolify in my case, that builds Docker images from git and runs them behind a reverse proxy. Two PHP/Laravel apps. An AI agent process on the same box, connected to Slack, able to run shell commands.

The target loop:

```
Slack request
  → agent edits code
  → change goes live on the preview URL
  → agent posts the URL and STOPS
  → human looks, replies "approve"
  → agent commits, pushes a branch, opens a PR
```

## The design mistake I almost made

My first sketch had the agent patch the container first, then go back after approval and make the same edit in the git working copy to build the PR from.

That looks reasonable and it's wrong. It writes the same change twice, in two places, from two separate reasoning steps, so the bytes you approved on the preview URL are not necessarily the bytes that land in the PR. Any divergence between the two edits is invisible precisely because you already said "looks good."

Inverting it fixes the problem: edit the git folder first, then push those exact bytes into the container. The folder is the source of truth and the preview is a projection of it, so approval means the PR contains the file you actually looked at. The Slack experience is identical either way. The correctness guarantee is not.

## Trap 1: the container will lie to you about your own code

Production PHP images typically ship with `opcache.validate_timestamps=0`. That's a good production setting. PHP compiles each script to bytecode once and never stats the file again, which cuts syscalls and speeds up requests.

It also means that if you copy a new version of a file into a running container, PHP keeps serving the old one forever.

That's quietly fatal for this particular workflow. The agent copies the file and the copy succeeds, with no error and the correct bytes on disk that `cat` will happily show you. It reports "done, check the URL." You check the URL, see the old page, and conclude the agent is broken or lying. Everything worked except one invisible step, and the failure points toward looking fine: nothing errors, nothing logs, and the only symptom is a page that looks like nothing happened.

### How I nearly missed it

I wrote a probe. Copy a file printing `v1`, fetch it, overwrite it with `v2`, fetch again. If opcache were caching, I'd see `v1` twice.

I saw `v1` then `v2`, fresh content with no staleness, and almost concluded that no cache reset was needed.

Then I ran a second probe, a completely different script, copied to the same path. It returned `v2`, which wasn't the new script at all but the previous test's output. That's the cache, unmistakably.

The first probe had misled me. The file was new, so the first request compiled and cached it, and my timing happened to land in a window where the entry wasn't committed yet. A single test told me the opposite of the truth.

The lesson I keep relearning is that when a negative result means "skip the safety step," test it twice, in two different ways. A cache that looks absent is more dangerous than one that looks present.

Checking from inside the FPM worker settled it. The CLI has its own separate opcache configuration and will happily report unrelated values:

```
sapi=fpm-fcgi
validate_timestamps='0'
opcache_enabled=true
```

So the copy step is always followed by a process restart. It costs about a second and it isn't optional.

## Trap 2: your process manager has a name you didn't expect

The obvious way to clear opcache is to restart PHP-FPM. Inside the container, supervisord is PID 1, so:

```bash
supervisorctl restart php-fpm
```

```
php-fpm: ERROR (no such process)
```

The program was configured with multiple processes, so supervisor namespaced it into a group. Its real name is `php-fpm:php-fpm_00`, and the working invocation is:

```bash
supervisorctl restart "php-fpm:*"
```

What makes this nasty for automation is how it fails. The `docker cp` before it succeeded. The restart failed with a non-zero exit that an unattended script may not check. The net result is a stale page and a green log. Check `supervisorctl status` for the real names rather than trusting the `[program:...]` headers in the config file.

## Trap 3: container names are not stable identifiers

PaaS-managed containers are often named `<prefix>-<deploy-id>`, and the deploy ID changes on every redeploy. Hardcode the full name and your automation works perfectly until the next deployment, then fails with something unhelpful like "no such container."

Resolve by prefix at runtime, every time:

```bash
C=$(docker ps --filter "name=^${PREFIX}" --format '{{.Names}}' | head -1)
[ -z "$C" ] && { echo "container not running"; exit 1; }
```

Worth knowing before you lean on hot-patching: patched files live in the container's writable layer. They survive `docker restart`, but any redeploy erases them, because a redeploy rebuilds from the image. The patched container is a scratch pad that happens to have a URL. The PR is the durable artifact.

## Trap 4: the build needs things that only exist inside the image

The apps use a JS bundler for assets. Pure backend changes don't need a rebuild, but any CSS or JS change does.

The containers ship no build toolchain at all, only the language runtime, so the plan was to build on the host and copy the output in.

The asset build immediately failed on a CSS import reaching into a backend dependency directory, an admin-panel package that ships its own stylesheet. So the frontend build depends on backend dependencies being installed, and the host had no backend runtime to install them with.

The way out was pleasingly circular. The running container already contains a fully installed dependency tree, built during deployment, so I copied it out:

```bash
docker cp "$C:/app/vendor" "$FOLDER/vendor"
```

The build worked after that, and it has a useful side effect. You're building against exactly the dependency versions the running app uses, not whatever a fresh install would resolve to today.

## The trap after the traps: gitignore gaps

Pulling dependencies into the working copy created a new hazard. Those directories are build artifacts, and each repo ignored a different subset of them. One ignored the dependency directory but not the built assets. The other did exactly the reverse.

An agent running `git add -A` would have committed a few hundred megabytes of vendored code into a PR.

Two things fix that, and both are worth having. `.git/info/exclude` is a per-clone ignore file that never gets committed, which is ideal for machine-local artifacts you don't want to push into a shared `.gitignore`. And the agent stages explicit paths instead of running `git add -A`, which also caught something subtler: the package manager mutated a lockfile as a side effect of installing, and that would otherwise have ridden along in every PR.

## A systemd detail that costs an hour

To let the agent talk to Docker, I added its user to the `docker` group. Then restarted the agent service. Then watched it still fail with permission denied.

Group membership is captured when a process starts, but for a systemd user service the relevant process isn't your service. It's the per-user service manager (`user@<UID>.service`) that spawns it, and children inherit its group set. Restarting the leaf unit changes nothing.

```bash
sudo systemctl restart user@1000.service
```

Verify against the actual process rather than trusting the restart:

```bash
grep ^Groups /proc/<pid>/status   # look for the docker gid
```

## The approval gate is really a threading problem

The last piece surprised me most, and it has nothing to do with containers.

The agent derives conversation sessions from Slack's threading model. A new top-level message starts a fresh session. A reply inside a thread continues that session.

Which means that if you approve with a new top-level message instead of a thread reply, the agent has no memory of the patch: no branch name, no changed files, no rollback snapshot. The approval gate doesn't error, it dissolves, and what you see reads like the agent forgetting what it was doing.

So the workflow has a rule that has nothing to do with infrastructure and everything to do with getting the loop to work. The approval has to be a reply in the same thread as the work.

More generally, if your human-in-the-loop gate spans two messages, you need to know exactly what your platform considers "the same conversation." That boundary is your gate. Get it wrong and the gate is decorative.

## What I'd tell you before you build this

Make the repo the source of truth and the running app a projection of it. Never let the agent edit the deployed artifact directly, because the thing you approve and the thing you merge have to be the same bytes.

Assume every caching layer is lying to you. Bytecode caches, template caches, asset manifests, reverse-proxy caches: each one can make a successful write invisible, and each needs two different probes before you trust a negative result.

Prefer failures that are loud. Most of the bugs here failed silently toward "looks like it worked," so have the agent verify over HTTP and report the status code. A broken step then surfaces as a wrong number instead of a confident message.

And give the agent a preview URL, not merge rights. Feature branches that trigger no deployment, merges gated behind a human. The agent gets a fast loop, the deploy pipeline keeps its guarantees, and nothing the agent does on its own can reach production.

The hard part of agent workflows turns out not to be the agent. Automating a task forces you to confront every implicit assumption a human operator was silently absorbing: the stale page you'd have hard-refreshed on instinct, the process name you'd have looked up, the group membership you'd have fixed by logging out and back in. The agent does none of that. It tells you it's done.
