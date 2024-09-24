---
draft: false
title: Fixing Nix After MacOS Update Breaks It
date: 2024-09-02 08:00:00
tags: ["nix", "os"]
description: "Resolving Nix Issues After macOS Upgrades"
slug: fix-nix-after-macos-update
---

![nixos image](https://jdheyburn.co.uk/blog/converting-to-the-church-of-nix/cover.png)

So, last week I upgraded my macOS because I got a notification that a new version was available. I went ahead and installed it without thinking there might be any issues like before. Turns out, when I started work today (Monday), my Nix stopped working. I had to fix it before I could begin working. The issue appeared when I tried to use a command alias that I normally use, and I got this error:

```
$ zsh: command not found
```

It seemed like there was a mistake in the zsh configuration. Since the zsh config is managed by home-manager, it was clear that something was wrong with Nix. After googling around, I found that sometimes upgrading macOS can cause this issue. After trying a bunch of things, I concluded that I needed to reinstall Nix. But before reinstalling, I had to clean up the existing Nix store from the system.

When reinstalling, I encountered an error saying I couldn’t modify the `/etc/synthetic.conf` file because of permission issues. So, I had to change the permissions:

```
$ sudo chmod 644 /etc/synthetic.conf
```

Oh, and don’t forget to delete the Nix store first through `Disk Utility`. Then you can install Nix again:

```
$ sudo sh <(curl -L https://nixos.org/nix/install)
```

At this point, everything should be fine. Then, continue by installing home-manager:

```
$ nix-channel --add https://github.com/nix-community/home-manager/archive/release-24.05.tar.gz home-manager
$ nix-channel --update
$ nix-shell '<home-manager>' -A install
```

But there was another issue—the old home-manager needed to be removed. So, I just deleted it:

```
$ rm /Users/<username>/.local/state/nix/profiles/home-manager*
$ rm /Users/<username>/.local/state/home-manager/gcroots/current-home
```

Then, install it again using nix-shell:

```
$ nix-shell '<home-manager>' -A install
```

Now everything was fixed, but zsh still wasn’t working because home-manager needed to run the nix flake (switch). To do this, go into your nix config directory and run this:

```
$ home-manager switch --flake .#nusendra@macbook-pro-m2
```

#nusendra@macbook-pro-m2 is my homeConfiguration, so you’ll need to adjust it for your setup. Here’s my Nix home repository: https://github.com/nusendra/nix-home.
