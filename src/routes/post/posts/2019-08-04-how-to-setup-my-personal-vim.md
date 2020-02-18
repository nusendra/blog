---
title: "How to Setup My Personal Vim"
date: 2019-08-04 19:12:00
description: "Langkah - langkah installasi sampai konfigurasi vim seperti milik saya"
tags: ['opini', 'vim']
draft: false
slug: how-to-setup-my-personal-vim
---

![nusendra vim](https://ik.imagekit.io/nusendra/Screenshot_20190804_191653_hgQ-O1VD_.png)
<br/>

Ya, saya adalah pengguna Vim, lebih tepatnya sekarang udah pindah dari vim 8 ke Neovim (nvim). Kenapa ga pake vscode? Males banget sih pake editor yang berat gitu, electron wkwk. Yuhuu, kali ini mau berbagi bagaimana pertama kali instalasi / menggunakan NVim, dan bagaimana instalasi plugin - plugin yang diperlukan.

## Install NVim

Yes, pertama install nvim dulu. Kalian bisa merujuk ke alamat [https://neovim.io/](https://neovim.io/) ini ya. Ketikkan ini di terminal kalian

```
$ sudo apt-get install software-properties-common
```

trus abis itu jalanin dibawah ini ye

```
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt update
sudo apt install neovim
sudo apt-get install python-dev python-pip python3-dev python3-pip
```

Kalau udah selesai, coba kalian ketik **nvim** atau di beberapa distro linux udah bisa langsung ketik **vim**.

## Set Konfigurasi NVim

Kalau di vim 8, file konfigurasi nya terletak di **~/.vimrc**. Nah kalau di nvim ini berbeda, letak konfigurasi nya berada di **~/.config/nvim/init.vim**. Coba cek apakah sudah ada file tersebut di komputer kalian, jika belum ada silakan langsung buat file tersebut terlebih dahulu.

## Install Plugins

List plugin yang saya pakai dan bagaimana setup vim saya bisa langsung mampir ke repo ini [https://github.com/nusendra/vimrc](https://github.com/nusendra/vimrc).

```vim
set nocompatible
set tabstop=2
set shiftwidth=2
set expandtab
set number
set autoindent
set hlsearch
set background=dark

syntax enable
filetype plugin indent on

" color theme
if (has("termguicolors"))
  set termguicolors
endif
let g:oceanic_next_terminal_bold = 1
let g:oceanic_next_terminal_italic = 1
let g:airline_theme='oceanicnext'
colorscheme OceanicNext

" feature
autocmd FileType php setlocal shiftwidth=4 tabstop=4
" autocmd vimenter * NERDTree
autocmd FileType vue syntax sync fromstart
autocmd FileType html setlocal sw=2 sts=2
autocmd BufRead,BufNewFile *.svelte setlocal ft=html
autocmd BufNewFile,BufRead *.vue set ft=vue
autocmd BufNewFile,BufRead *.ts setlocal filetype=typescript
autocmd QuickFixCmdPost *grep* cwindow
set runtimepath^=~/.vim/bundle/ctrlp.vim
let g:prettier#autoformat = 0

"ale
let b:ale_fixers = ['prettier', 'eslint']

" custom
let mapleader = ","
" let g:javascript_plugin_jsdoc = 1

" indentLine
let g:indentLine_color_term = 239

" Plugins
set rtp+=~/.vim/bundle/Vundle.vim
set rtp+=~/.fzf

call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'pangloss/vim-javascript'
Plugin 'tpope/vim-fugitive'
Plugin 'scrooloose/nerdtree'
Plugin 'ajh17/spacegray.vim'
Plugin 'posva/vim-vue'
Plugin 'digitaltoad/vim-pug'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'gorodinskiy/vim-coloresque'
Plugin 'prettier/vim-prettier'
Plugin 'tpope/vim-commentary'
Plugin 'wakatime/vim-wakatime'
Plugin 'w0rp/ale'
Plugin 'junegunn/fzf.vim'
Plugin 'Valloric/YouCompleteMe'
Plugin 'Yggdroot/indentLine'
Plugin 'leafgarland/typescript-vim'
Plugin 'bronson/vim-trailing-whitespace'
Plugin 'Raimondi/delimitMate'
Plugin 'Xuyuanp/nerdtree-git-plugin'
Plugin 'airblade/vim-gitgutter'
Plugin 'tiagofumo/vim-nerdtree-syntax-highlight'

" vim code formatter
Plugin 'google/vim-maktaba'
Plugin 'google/vim-codefmt'
Plugin 'google/vim-glaive'
call vundle#end()
call glaive#Install()
filetype plugin indent on

" Map NerdTree
map <C-b> :NERDTreeToggle<CR>

" Map Toggle IndentLine
map <C-i> :IndentLinesToggle<CR>

function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
 exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
 exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

" NerdTree Highlight File Color
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1

" keymap Split
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

" FZF exclude files based on .gitignore
nnoremap <c-p> :GFiles<cr>

" Window Tab
nnoremap <C-N> :tabnew<cr>
nnoremap <C-Up> :tabprevious<CR>
nnoremap <C-Down> :tabnext<CR>

" syntastic
let g:syntastic_always_populate_loc_list=1
let g:syntastic_error_symbol='✗'
let g:syntastic_warning_symbol='⚠'
let g:syntastic_style_error_symbol = '✗'
let g:syntastic_style_warning_symbol = '⚠'
let g:syntastic_auto_loc_list=1
let g:syntastic_aggregate_errors = 1

" Autoformatting using codefmt
augroup autoformat_settings
  autocmd FileType bzl AutoFormatBuffer buildifier
  autocmd FileType c,cpp,proto,javascript AutoFormatBuffer clang-format
  autocmd FileType dart AutoFormatBuffer dartfmt
  autocmd FileType go AutoFormatBuffer gofmt
  autocmd FileType gn AutoFormatBuffer gn
  autocmd FileType html,css,sass,scss,less,json AutoFormatBuffer js-beautify
  autocmd FileType java AutoFormatBuffer google-java-format
  autocmd FileType python AutoFormatBuffer yapf
  " Alternative: autocmd FileType python AutoFormatBuffer autopep8
  autocmd FileType vue AutoFormatBuffer prettier
augroup END

set splitbelow
set splitright
```

Konfigurasi diatas bisa kalian langsung copy-paste ke dalam folder / file ini ya guys **~/.config/nvim/init.vim**.

Pertama kali yang harus dilakukan setelah instalasi nvim dan membuat file konfig nya adalah meng-install Plugin Manager, disini saya menggunakan Vundle [https://github.com/VundleVim/Vundle.vim](https://github.com/VundleVim/Vundle.vim)

```
$ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

Kalau udah instalasi seperti diatas, silakan masuk ke vim lagi dengan mengetikkan **vim** kemudian ketikkan berikut ini `:PluginInstall`. Nah disini, si Vundle akan mengunduh semua plugin yang ada di list di file konfigurasi tersebut. Namun perlu dicatat, tidak semua nya bakal terinstall otomatis, ada beberapa plugin yang harus kita install manual di local machine kita.

Kalau kita lihat di list tersebut, yang perlu kita install manual adalah YouCompleteMe dan FZF. Mari kita hajar satu satu.

### Install YouCompleteMe

Ketik berikut ini

```
$ sudo apt install build-essential cmake python3-dev
$ sudo apt install cmake
$ cd ~/.vim/bundle/YouCompleteMe
$ python3 install.py
```

yeah, as simple as that.

### Install FZF

Langsung hajar seperti dibawah ini

```
$ git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
$ ~/.fzf/install
```

Beres. Coba masuk ke vim lagi, trus ketik CTRL+P, harusnya fitur file searching nya udah muncul. Kalau belum muncul bisa dicoba lagi untuk jalanin `:PluginInstall`

### Setup Color Scheme

Pastinya colorscheme / tema dari vim kita juga perlu di setting dong. Saya lebih suka style oceanic next, kalau temen temen ada preferensi lain silakan untuk di setup sendiri. Nah karena kali ini kita coba untuk pakai Oceanic Next, kuy langsung mulai setup nya.

Pertama bikin folder disini `~/.config/nvim/colors` trus bikin file dengan nama OceanicNext.vim, kemudian copy-paste [https://raw.githubusercontent.com/mhartington/oceanic-next/master/colors/OceanicNext.vim](https://raw.githubusercontent.com/mhartington/oceanic-next/master/colors/OceanicNext.vim) ini kedalam file tersebut. Kalau udah silakan restart vim temen temen dan coba perhatikan perubahan dari style vim nya.

![nusendra's vim](https://ik.imagekit.io/nusendra/Screenshot_20190805_063407_PeO6dPKoF.png)

Oh iya, settingan diatas jangan langsung di telen bulet bulet ya, plugin nya wajib dipelajari satu satu biar kita tau apa tuh fungsi nya. Contohnya wakatime, kalau temen temen pakai wakatime, ntar setelah jalanin `:PluginInstall` bakal di minta untuk masukin API Key nya wakatime. Kalau temen temen ga pakai wakatime, bisa di hapus saja dari daftar list.

---

Yes, segitu dulu. Sebetulnya tulisan ini untuk konsumsi pribadi sih, biar ntar kalau pakai OS baru bisa langsung install vim nya dengan enak dan nyaman. Thanks udah mampir bre, moga bermanfaat :)
