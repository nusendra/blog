---
title: 'VIM Keyboard Cheatsheet'
date: 2020-10-14 06:00:00
description: 'Bagi yang sering lupa shortcut yang ada di VIM'
tags: ['opinion']
draft: false
slug: vim-keyboard-cheatsheet
---

VIM adalah editor yang paling bikin kita pusing, apalagi dengan shortcut keyboard dari VIM yang aneh aneh kadang juga bikin kita pusing, ga jarang juga banyak yang lupa.

Nah kali ini saya mau share cheatsheet VIM. Silakan menikmati

<table>
  <thead>
    <tr>
      <th>Shortcut</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Esc</td>
      <td>Command Mode</td>
    </tr>
    <tr>
      <td>i</td>
      <td>Insert Mode</td>
    </tr>
    <tr>
      <td>:ter</td>
      <td>Membuka terminal window didalam VIM</td>
    </tr>
    <tr>
      <td>h</td>
      <td>Berpindah kursor kekiri sebanyak 1 karakter</td>
    </tr>
    <tr>
      <td>j</td>
      <td>Berpindah kursor ke bawah sebanyak 1 line</td>
    </tr>
    <tr>
      <td>k</td>
      <td>Berpindah kursor ke atas sebanyak 1 line</td>
    </tr>
    <tr>
      <td>l</td>
      <td>Berpindah kursor kekanan sebanyak 1 karakter</td>
    </tr>
    <tr>
      <td>0</td>
      <td>Memindahkan kursor ke paling kiri / awal dari line saat ini</td>
    </tr>
    <tr>
      <td>$</td>
      <td>Memindahkan kursor ke paling kanan / akahir dari line saat ini</td>
    </tr>
    <tr>
      <td>^</td>
      <td>Memindahkan kursor ke awal line, tepat diawal karakter / teks</td>
    </tr>
    <tr>
      <td>w</td>
      <td>Memindahkan kursor ke kata berikutnya</td>
    </tr>
    <tr>
      <td>W</td>
      <td>Memindahkan kursor ke kata berikutnya (tanpa spasi)</td>
    </tr>
    <tr>
      <td>3w</td>
      <td>Memindahkan kursor ke 3 kata berikutnya</td>
    </tr>
    <tr>
      <td>b</td>
      <td>Memindahkan kursor ke kata sebelumnya</td>
    </tr>
    <tr>
      <td>B</td>
      <td>Memindahkan kursor ke kata sebelumnya (tanpa spasi)</td>
    </tr>
    <tr>
      <td>3b</td>
      <td>Memindahkan kursor ke 3 kata sebelumnya </td>
    </tr>
    <tr>
      <td>gg</td>
      <td>Memindahkan kursor ke awal file</td>
    </tr>
    <tr>
      <td>G</td>
      <td>Memindahkan kursor ke akhir file</td>
    </tr>
    <tr>
      <td>(</td>
      <td>Memindahkan kursor ke kalimat sebelumnya</td>
    </tr>
    <tr>
      <td>)</td>
      <td>Memindahkan kursor ke kalimat berikutnya</td>
    </tr>
    <tr>
      <td>{</td>
      <td>Memindahkan kursor ke paragraf sebelumnya</td>
    </tr>
    <tr>
      <td>}</td>
      <td>Memindahkan kursor ke paragraf berikutnya</td>
    </tr>
    <tr>
      <td>a</td>
      <td>Masuk ke mode insert setelah kursor</td>
    </tr>
    <tr>
      <td>A</td>
      <td>Masuk ke mode insert ke akhir line</td>
    </tr>
    <tr>
      <td>i</td>
      <td>Masuk ke mode insert sebelum kursor</td>
    </tr>
    <tr>
      <td>o</td>
      <td>Masuk ke mode insert ke line berikutnya</td>
    </tr>
    <tr>
      <td>O</td>
      <td>Masuk ke mode insert ke line sebelumnya (keatas)</td>
    </tr>
    <tr>
      <td>x</td>
      <td>Menghapus karakter di kursor saat ini</td>
    </tr>
    <tr>
      <td>dw</td>
      <td>Menghapus kata kekanan</td>
    </tr>
    <tr>
      <td>d0</td>
      <td>Menghapus text sampai ke paling awal line</td>
    </tr>
    <tr>
      <td>d$</td>
      <td>Menghapus text sampai ke paling akhir line</td>
    </tr>
    <tr>
      <td>d)</td>
      <td>Menghapus text ke paragraf sebelumnya</td>
    </tr>
    <tr>
      <td>dgg</td>
      <td>Menghapus text sampai ke awal file</td>
    </tr>
    <tr>
      <td>dG</td>
      <td>Menghapus text sampai ke akhir file</td>
    </tr>
    <tr>
      <td>dd</td>
      <td>Menghapus line saat ini</td>
    </tr>
    <tr>
      <td>3dd</td>
      <td>Menghapus 3 line kebawah</td>
    </tr>
    <tr>
      <td>r{text}</td>
      <td>Menimpa 1 karakter, kemudian insert pada kursor dengan text</td>
    </tr>
    <tr>
      <td>R</td>
      <td>Menimpa karakter dengan text</td>
    </tr>
    <tr>
      <td>yy</td>
      <td>Copy line saat ini (disimpan ke buffer)</td>
    </tr>
    <tr>
      <td>p</td>
      <td>Paste text yang ada di buffer ke karakter / line berikutnya</td>
    </tr>
    <tr>
      <td>P</td>
      <td>Paste text yang ada di buffer ke karakter / line sebelumnya</td>
    </tr>
    <tr>
      <td>u</td>
      <td>Undo</td>
    </tr>
    <tr>
      <td>CTRL + r</td>
      <td>Redo</td>
    </tr>
    <tr>
      <td>/{text}</td>
      <td>Mencari text di file saat ini (maju)</td>
    </tr>
    <tr>
      <td>?{text}</td>
      <td>Mencari text di file saat ini (mundur)</td>
    </tr>
    <tr>
      <td>n</td>
      <td>Berpindah ke text pencarian berikutnya (maju)</td>
    </tr>
    <tr>
      <td>N</td>
      <td>Berpindah ke text pencarian sebelumnya (mundur)</td>
    </tr>
    <tr>
      <td>:%s/{original}/{replacement}</td>
      <td>Cari text original pertama dan me-replace nya dengan text replacement</td>
    </tr>
    <tr>
      <td>:%s/{original}/{replacement}/g</td>
      <td>Cari semua text original dan me-replace nya dengan text replacement</td>
    </tr>
    <tr>
      <td>:%s/{original}/{replacement}/gc</td>
      <td>Cari semua text original dan me-replace nya dengan text replacement, tetapi membutuhkan konfirmasi terlebih dahulu</td>
    </tr>
    <tr>
      <td>v</td>
      <td>Masuk ke mode Visual per karakter (seleksi karakter)</td>
    </tr>
    <tr>
      <td>V</td>
      <td>Masuk ke mode Visual per line (seleksi line)</td>
    </tr>
    <tr>
      <td>~</td>
      <td>Mengubah text menjadi lower case / upper case</td>
    </tr>
    <tr>
      <td>></td>
      <td>Mengatur indentasi ke kanan</td>
    </tr>
    <tr>
      <td><</td>
      <td>Mengatur indentasi ke kiri</td>
    </tr>
    <tr>
      <td>:q</td>
      <td>Keluar dari VIM (masa iya jaman sekarang ga bisa keluar dari VIM?)</td>
    </tr>
    <tr>
      <td>:w</td>
      <td>Menyimpan file (save)</td>
    </tr>
    <tr>
      <td>:w {nama file}</td>
      <td>menyimpan file dengan nama (save as)</td>
    </tr>
    <tr>
      <td>:wq</td>
      <td>Simpan file, kemudian keluar dari VIM</td>
    </tr>
    <tr>
      <td>:q!</td>
      <td>Keluar dari VIM (force)</td>
    </tr>
    <tr>
      <td>ZZ</td>
      <td>Sama seperti :wq</td>
    </tr>
    <tr>
      <td>ZQ</td>
      <td>Sama seperti :q!</td>
    </tr>
  </tbody>
</table>

Mungkin ada beberapa key yang belum masuk, tapi diatas ini udah banyak banget. Masa iya mau nambah key yang lain buat dihafal? muahahaha

Semoga bermanfaat ya gais, thanks for stopping by
