---
title: "Setup vim-devicons di NeoVIM"
date: 2021-10-10 09:00:00
description: "Membuat tampilan Nerdtree makin cantik dengan vim-devicons"
tags: ["Code Editor"]
draft: false
slug: setup-vim-devicons-di-neovim
---

![vim-devicons](https://raw.githubusercontent.com/wiki/ryanoasis/vim-devicons/screenshots/v0.10.x/branding-logo-3.svg?sanitize=true)

Bagaimana kalau kita pengen nampilin logo atau icon dari filetype yang bisa kita lihat di nerdtree? Kita bisa pakai plugin yang bernama vim-devicons. Jadi plugin ini berfungsi untuk menampilkan icon berdasarkan filetype yang tampil di nerdtree kita. Cuss langsung gas kita install

Langsung buka repo ini [https://github.com/ryanoasis/vim-devicons](https://github.com/ryanoasis/vim-devicons) untuk ngeliat dokumentasi nya. Jadi ada beberapa step yang akan kita kerjakan nanti.

1. Menginstall plugin vim-devicons nya
2. Menginstall Font nya

---

Pertama tambahkan plugin dibawah ini di file init.vim kalian (karena kita pakai NeoVIM).

```
Plug 'ryanoasis/vim-devicons'
```

Setelah itu langsung jalanin **:PlugInstall** di NVIM kalian. Kalau kalian lihat sekarang, ada muncul icon kotak kotak ga jelas di nerdtree kalian, ini karena memang font nya masih belum terpasang. Jadi setelah itu tugas kita selanjutnya adalah instalasi font yang nanti akan tampil di nerdtree nya.

Untuk font saya pakai ini [https://github.com/ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)

Cara instalasi nya silakan ikuti command di terminal berikut ini. Dibawah ini jika kalian menggunakan Linux
```
mkdir -p ~/.local/share/fonts
cd ~/.local/share/fonts && curl -fLo "Droid Sans Mono for Powerline Nerd Font Complete.otf" https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/DroidSansMono/complete/Droid%20Sans%20Mono%20Nerd%20Font%20Complete.otf
```

Untuk Mac bisa pakai dibawah ini

```
cd ~/Library/Fonts && curl -fLo "Droid Sans Mono for Powerline Nerd Font Complete.otf" https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/DroidSansMono/complete/Droid%20Sans%20Mono%20Nerd%20Font%20Complete.otf
```

Nah kalau udah silakan restart NVIM kalian, nanti seharusnya tampilan dari nerdtree kalian akan jadi seperti ini.

![vim-devicons neovim](https://i.ibb.co/D418w4q/vim-devicons-neovim.webp)

Selanjut nya PR kita adalah gimana agar kodingan itu bisa berwarna warni dan enak dilihat. Semoga bermanfaat :D
