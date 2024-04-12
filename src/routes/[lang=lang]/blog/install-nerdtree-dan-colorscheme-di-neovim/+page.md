---
draft: false
title: Install NerdTree dan Colorscheme di NeoVIM
date: 2021-10-08 18:54:00
tags: ['Code Editor']
description: "Langkah - langkah installasi plugin Nerdtree dan colorscheme di NeoVIM"
slug: install-nerdtree-dan-colorscheme-di-neovim
---

![nerdtree](https://github.com/preservim/nerdtree/raw/master/screenshot.png)

Lanjut lagi untuk setup NeoVIM dan beberapa plugin nya. Kali ini akan ngebahas cara install nerdtree dan juga memasang colorscheme di NeoVIM kita agar tampilannya makin ciamik.

Di postingan sebelumnya sudah dibahas sedikit tentang install nerdtree pakai vim-plug. Daripada cari cari postingan kemarin, kita ulang lagi aja yak dimari :D

Langsung cuss ke file config nvim nya. ketik ini di terminal klean.

```
nvim ~/.config/nvim/init.vim
```

Trus bikin jadi kayak begini

```
call plug#begin()
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
call plug#end()

"nerdtree
map <C-b> :NERDTreeToggle<CR>
```

Ketikkan **:PlugInstall** untuk memulai instalasi Nerdtree nya. Dengan config seperti diatas, kita nantinya bisa dengan mudah membuka dan menutup nerdtree dengan cara **CTRL + B**.

---

Lanjut lagi untuk memasang colorscheme untuk NeoVIM kita tercinta. Kalian bisa cari colorscheme sesuai selera kalian disini [https://github.com/rafi/awesome-vim-colorschemes](https://github.com/rafi/awesome-vim-colorschemes)

Kalau saya dari dulu selalu suka pakai OceanicNext. Cek dimari gan [https://github.com/mhartington/oceanic-next](https://github.com/mhartington/oceanic-next).

Cara install nya gampang bet, tinggal kalian tambahin di config nya hingga jadi seperti berikut ini

```
call plug#begin()
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'mhartington/oceanic-next'
call plug#end()

"colorscheme
if (has("termguicolors"))
 set termguicolors
endif

syntax enable
colorscheme OceanicNext

"nerdtree
map <C-b> :NERDTreeToggle<CR>
```

Jangan lupa jalanin **:PlugInstall** lagi ya. Setelah itu silakan reload nvim kalian, nanti seharusnya bakal jadi seperti ini.

![nerdtree dan colorscheme](https://i.ibb.co/XLzjmCw/nerdtree-and-colorscheme.webp)

Semoga bermanfaat :D

