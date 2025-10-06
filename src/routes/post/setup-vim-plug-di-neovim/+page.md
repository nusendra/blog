---
draft: false
title: Setup Vim Plug di NeoVIM
date: 2021-10-08 15:26:52
tags: ['Code Editor']
description: "Langkah - langkah setup vim plug di NeoVIM"
slug: setup-vim-plug-di-neovim
---

![neovim](https://ichi.pro/assets/images/max/724/1*5UlKPl_PKAor556Smxkykw.png)

Kebetulan lagi pengen banget nyobain NeoVIM dan beralih dari VIM 8, sekalian aja dibuat dokumentasi nya dari awal setup sampai bener bener siap untuk dipakai ngoding. Oh iya, sekedar informasi, setup NeoVIM ini bener bener dari scratch ya, dan juga OS yang dipakai kali ini adalah Ubuntu 20.04.

Langsung aja yak ga usah banyak intro. Untuk instalasi NeoVIM nya sendiri cukup mudah, bisa kalian install melalui download dulu [kesini](https://github.com/neovim/neovim/releases). Atau paling gampang bisa install pakai Ubuntu repository. Lebih jelasnya langsung cuss kesini [https://github.com/neovim/neovim/wiki/Installing-Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim)

Nah ini part yang seru, setup vim-plug ke NeoVIM.

Kalau pengen nyobain sendiri, langsung aja kesini [https://github.com/junegunn/vim-plug](https://github.com/junegunn/vim-plug).

### Steps

Pertama jalanin ini di terminal kalian

```
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

Jangan lupa juga kalian perlu tau dimana letak config nvim nya. Kalian bisa masuk ke nvim dulu dengan mengetik ***nvim*** di terminal kalian, kemudian ketikkan

```
:echo stdpath('config')
```

Nanti akan muncul sebuah path untuk config nvim kalian, kalau di saya contoh nya seperti ini ***/home/nusendra/.config/nvim***

Setelah itu buat sebuah file bernama ***init.vim*** didalam folder tersebut diatas. Buka file nya dengan perintah ***nvim init.vim*** untuk mulai mengetik didalam file init.vim tersebut.

```
call plug#begin()
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
call plug#end()
```

Pertama kita akan install plugin `nerdtree` terlebih dahulu. Kalau sudah di ketik sepeti diatas, silakan simpan dan keluar dari nvim dengan perintah **:wq**.

Setelah itu buka nvim lagi dan ketikkan perintah **:PlugInstall**, nanti dia akan secara otomatis menginstall plugin yang ada di daftar plugins tersebut. Silakan reload nvim nya untuk melihat hasil nya.
