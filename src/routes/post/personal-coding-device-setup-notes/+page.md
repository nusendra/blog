---
draft: false
title: "My Dev Setup Notes: Getting New Devices Coding-Ready"
date: 2025-04-22 02:05:52
tags: ['nix', 'macos']
description: "This is just my personal notes on how to setup coding environment on new devices. Fast, reproducible, and reusable"
slug: personal-coding-device-setup-notes
---

![nixos](https://upload.wikimedia.org/wikipedia/commons/c/c4/NixOS_logo.svg)

I just bought a new Mac Mini M4 chipset today with 16 Memory RAM and 512GB. So I excited to setup my coding environment to this incredible machine. Everyone is always ask, or some youtube videos said what you should
install when you have a new device. For developer, to me Nix is the only answer, no debate !!

Don't call yourself as a developer / programmer if you always setup everything from zero when you purchased new devices. Like install php, nodejs, mysql, blablablablabla manually. Bro, don't you ever learn that `reuse` or
`Don't Repeat Yourself` is a basic thing in coding, so why you setup everything from the ground esp when you bought a new machine? Thats ridiculous.

As a developer, I won't do that !!! I will reuse all my environments from previous machine (My Macbook Pro M2) without installing everything one by one. Here is my repository to store all my coding env https://github.com/nusendra/nix-home

OK, Let's start !!!

## Nix
First, I did install Warp terminal as a main weapon. https://www.warp.dev/download

And then directly install Nix, https://nixos.org/download/
```
sh <(curl -L https://nixos.org/nix/install)
```

Just follow along the instructions and make sure you can run this command
```
nix-shell -p nix-info --run "nix-info -m"
```

## Home Manager
I need Home Manager to manage my zsh / dotfiles. Here is how to install it
```
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update

nix-shell '<home-manager>' -A install
```

Don't forget to create a `.config` folder in home. But I guess this home manager will create it automatically after install it.

## Get Up and Ready !
If everyhing is in order, Nix and Home Manager are successfully installed, now clone this repo https://github.com/nusendra/nix-home to `.config` folder.

Run this command
```
home-manager switch --flake .#nusendra
```

This command will setup and install everything in my home-manager config. That's all, now what I can do is to finalize the minor things. Like setup terminal font and install nvm

Here is how to setup font in my Warp Terminal, First thing to do is install homebrew then continue to install Droid Sans Mono Nerd
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install --cask font-droid-sans-mono-nerd-font
```

But, some of my LSP need nodejs to run, So I just installed nvm to handle that

One more thing that i found, I have to turn off the hold enable feature in this machine. Here is how I did that
```
defaults write -g ApplePressAndHoldEnabled -bool false
```

---

Now everything is ready to use. I just need to do all those thing in 30 minutes. I don't have to do everything from the beginning manually, Thanks Nix !!!!
