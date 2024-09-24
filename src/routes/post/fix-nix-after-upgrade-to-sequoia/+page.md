---
draft: false
title: Fixing Nix After Upgrade to Sequoia
date: 2024-09-24 08:00:00
tags: ["nix", "os"]
description: "Sequoia Upgrade Broke my Nix"
slug: fix-nix-after-upgrade-to-sequoia
---

![nixos image](https://jdheyburn.co.uk/blog/converting-to-the-church-of-nix/cover.png)

This kind of shit happened again to me, in my previous post https://nusendra.com/post/fix-nix-after-macos-update, I got an issue with my Nix
after successfully upgraded my OS to latest version. Last week, 21 Sept I got the same shit again after upgraded from Sonoma to Sequoia. My
Nix suddenly stopped working and I just noticed this in the monday morning when I start to code.

In short, I can't run home-manager, Nix service stopped, and nvim crashed. Luckily, my zsh still up and running. So, I decided to just wipe
all of my current Nix store and reinstall them again.

First, unmount the Nix Store in Mac's `Disk Utility`, and delete it. Then install Nix with this command

```
$ sh <(curl -L https://nixos.org/nix/install)
```

But in this phase, I got alot of shit like "can't install nix and other stuff". Also I had an issue regarding the `nixbld` which made nix
failed to install. If you found this kind of issue, jump to this post https://github.com/NixOS/nix/issues/10892.

And then I was spent couple of hours to fix this, tried to restart my Macbook, reinstall again and again, and finally I managed to install
Nix in my machine. But, I face another issue after added home-manager to nix-channel and update it.

![nix-channel update failed](/images/nix-update-failed.webp)

Then i directly set the permissions in my home dir `/Users/nusendra` to 755, and
it didn't work. Shortly, I found this post and it made my day, shine like a
morning sun https://github.com/NixOS/nix/issues/3435 , the answer of my problem
is, I must set my Warp (my current terminal) to allow full access to my disk (shit
!! I was spent 30 mins just for this??)

Alright, I allowed my Warp terminal to have full access and VOILA !!!!

![warp full access disk](/images/full-disk-access.webp)

Nix channel successfully updated and God instantly gave my smile back

```
$ nix-channel --update
```

![nix-channel update succeed](/images/nix-update-succeed.webp)

After all of these, I can run my home-manager to setup my local env and start my job
:). Thanks for reading this, hope this help you out of this mess.
