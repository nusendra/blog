---
title: Migrasi ke VIM
date: 2018-11-13 06:46:35
description: "Cerita singkat kenapa saya akhirnya migrasi ke VIM, yang awalnya memakai Atom dan Visual Studio Code"
slug: migrasi-ke-vim
---

Cerita singkat kenapa saya akhirnya migrasi ke VIM, yang awalnya memakai Atom dan Visual Studio Code. VSCode adalah sebuah text editor yang saat ini lagi hits banget, siapa sih programmer yang belum pernah pake ini? Mayoritas orang orang banyak yang pake editor ini, karena memang fitur fitur yang ditawarkan disini sangatlah lengkap, apalagi didukung oleh plugin - plugin yang kece. Postingan kali ini kita bahas vscode ama vim doang yak, Atom gak ikut soalnya udah lama ga pake Atom :D.

VScode dengan segala kekerenannya punya segudang fitur yang udah tersedia, jika masih kurang atau butuh plugin kita juga bisa install sendiri. Singkat nya, VSCode ini udah include Git control, syntax highlighting, code completion, code refactoring dan snippets. Kalo pengen tampilan yang beda, bisa install berbagai macam tema, kalo pengen munculin code map, tinggal install, dll. Enak kan? butuh apa apa langsung install, udah lengkap banget. Terus kenapa saya migrasi ke vim? Apa alasannya ?

![](https://cdn.staticaly.com/img/farm2.staticflickr.com/1964/30912919047_1394ebe190_b.jpg)

## Latar Belakang

Haha latar belakang, udah kayak ngerjain skripsi aja. Oke, pertama alasan kenapa pindah ke vim, karena VSCode berat. Maklum lah ya, karena emang dia dibikin pake Electron. Saya pribadi sebagai orang yang ga suka app berat berat harus mikir gimana cara biar ga berat, bahkan laptop pun di install Debian tanpa UI yang menarik haha. 

Alasan kedua, Meminimalisir penggunaan mouse. Kadang ribet juga pas enak enak ngoding, harus switch pake mouse buat klik ini itu. Ya memang sih ada shortcut keyboard nya, tapi saya ga mau menuh menuhin otak untuk ngehafalin shortcut key yang engga penting.

Yang ketiga, buat keren kerenan aja haha.

## Plugin yang saya pake

Karena saya emang bener bener baru di vim, jadi plugin yang saya install juga masih sederhana, yang penting udah cukup buat kebutuhan ngoding saya.

1. [Vundle](https://github.com/VundleVim/Vundle.vim). Plugin yang satu ini berguna untuk memanajemen berbagai plugin. Plugin yang memanajemen plugin, bingung gak? Cobain aja biar ga bingung :D
2. [vim-javascript](https://github.com/pangloss/vim-javascript). Bagi javascript developer, wajib install plugin ini. berfungsi untuk indentation dan syntax support.
3. [vim-fugitive](https://github.com/tpope/vim-fugitive). Sebagai Git wrapper, kamu bisa melakukan aktivitas git menggunakan plugin ini.
4. [Nerdtree](https://github.com/scrooloose/nerdtree). File explorer berbentuk tree di sebelah kiri / kanan vim. Fitur ini umum dipakai di semua editor.
5. [Spacegrey-vim](https://github.com/ajh17/Spacegray.vim). Colorscheme yang saya pake di vim, warna nya kalem dan enak dimata.
6. [Vim-vue](https://github.com/posva/vim-vue). Syntax highlighting untuk Vuejs
7. [Vim-pug](https://github.com/digitaltoad/vim-pug). Bagi pengguna Pugjs, wajib install ini. Berfungsi untuk syntax highlighting di vuejs yang pakai pug.
8. [Vim-airlines](https://github.com/vim-airline/vim-airline). Status bar untuk VIM
9. [Vim-coloresque](https://github.com/gko/vim-coloresque). Color highlighter, fungsi nya kalau ada kodingan warna, dia akan muncul warna di kodingan itu. Bingung cara jelasinnya haha.
10. [Vim-prettier](https://github.com/prettier/vim-prettier). Prettier untuk VIM
11. [Vim-commentary](https://github.com/tpope/vim-commentary). Untuk bikin komentardi vim
12. [Vim-wakatime](https://github.com/wakatime/vim-wakatime). Buat tracking aktivitas ngoding.
13. [ale](https://github.com/w0rp/ale). Linting di vim, saya pake buat deteksi kalau ada kesalahan koding.
14. [FZF](https://github.com/junegunn/fzf). Berfungsi untuk pencarian file di vim.
15. [YouCompleteMe](https://valloric.github.io/YouCompleteMe/). Code completion di vim
16. [IndentLine](https://github.com/Yggdroot/indentLine). Untuk menampilkan indent line

## Kesan pake VIM

Karena masih awal banget pake vim, ga banyak keyboard shortcut yang dipake di vim. Hanya beberapa yang sering saya pake untuk kebutuhan ngoding sederhana. Males banget sih kalau harus nonton youtube atau baca key shortcut cheatsheet untuk cari tau key nya. Mending langsung pake aja, kalau bingung pengen ngapain ya gugling bentar buat cari tau key shortcut yang dibutuhkan. Selama seminggu ini pake vim masih agak meraba raba shortcut nya, tapi udah lumayan lancar sih. Enak banget pake nya, udah ga ngurusin mouse lagi. Ngoding jadi lebih efisien dan cepat, serta yang paling enak performa nya mantep, ga lemot kaya si vscode.

## Yang belum ada di VIM

Mungkin di luar sana sudah ada plugin yang siap untuk dipakai, saya belum nemu aja sih dan juga belum butuh. Seperti code mapping (sama seperti di vscode dan atom), snippet yang udah siap untuk templating awal, dll. Saya yakin udah ada plugin nya, dan saya belum nemu aja. Nanti seiring berjalannya waktu, VIm saya akan lengkap sesuai dengan kebutuhan saya :D.

Kalo pengen liat setting dofile .vimrc saya, silakan mampir [kesini](https://gist.github.com/nusendra/0a2a27ea7b0b657276c12c44e99ebb3c)

Segitu aja postingan singkat ini, semoga bermanfaat bagi temen - temen pembaca.
