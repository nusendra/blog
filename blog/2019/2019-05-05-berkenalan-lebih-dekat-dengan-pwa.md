---
title: "Berkenalan Lebih Dekat dengan PWA"
date: 2019-05-05 15:29:00
description: "Mengenal lebih dekat dengan Progressive Web App"
tags: ['opini']
draft: false
slug: berkenalan-lebih-dekat-dengan-pwa
---

<img class="center-image-post" src="https://cdn.staticaly.com/img/46c4ts1tskv22sdav81j9c69-wpengine.netdna-ssl.com/wp-content/uploads/sites/33/2018/02/cbb9dba164838b28c748310da3d4c188.png" style="width:100%;height:auto;">
<br/>

Artikel kali ini akan memulai seri baru yang akan membahas topik mengenai Progressive Web App (PWA). Langsung saja, PWA adalah sebuah website / aplikasi web yang dibangun diatas teknologi berbasis web modern (html, css dan js) yang berperilaku layaknya mobile native apps. Konsep PWA ini dikeluarkan oleh Google pada tahun 2015, saya sendiri tahu konsep ini dari mas Yohan Totting ketika pertama kali bikin challenge di [Artikel Medium](https://medium.com/wwwid/tantangan-web-developer-untuk-membuat-aplikasi-web-bisa-digunakan-kurang-dari-5-detik-70bb7431741d) ini.

Tujuan utama dari konsep PWA ini adalah untuk meningkatkan dan memberikan pengalaman pengguna yang lebih baik, sama seperti ketika menggunakan aplikasi native. Bagi yang pengen benar - benar mendalami PWA, bisa langsung merujuk ke official page nya [disini](https://developers.google.com/web/progressive-web-apps/)

## PROS

### Responsive Layout

Pada PWA wajib untuk menggunakan layout yang responsif, sehingga ketika aplikasi dibuka di device manapun, tidak akan ada kebocoran tampilan yang bisa merembet ke kanan layar (Kalau masih bisa scroll ke kanan, berarti engga responsif). Apalagi pada PWA ini pengembangannya harus *mobile first design* sehingga aplikasi yang dibuat bisa beradaptasi di ukuran layar manapun.

### Offline Mode

Ketika web pertama kali di load di browser, maka browser akan menyimpan file file asset dan halaman html kedalam cache. Ketika kita memuat web tersebut tanpa koneksi internet, yang tampil pada halaman web tersebut bukanlah gambar dinosaurus (Downsaurus), melainkan halaman yang sudah berhasil masuk ke dalam cache. Dengan begini sudah tidak ada lagi tampilan downsaurus ketika tidak ada internet di device kalian.

### Add to Homescreen (A2HS)

Sama seperti halnya pada aplikasi native yang sudah berhasil di install di device, pasti da icon launcher yang tersedia di home screen / menu ponsel nya. Begitupun dengan PWA, dengan PWA kita bisa membuat sebuah fitur untuk menambahkan icon launcher kedalam device / ponsel kita. Add to Homescreen juga bisa berjalan offline. Jadi ketika membuka aplikasi PWA melalui icon A2HS, yang muncul adalah sebuah aplikasi (seperti native) yang berjalan di atas webview browser.

### Push Notification

Kita bisa menambahkan fitur push notification yang berfungsi untuk memberikan notifikasi kepada pengguna. Fitur ini biasanya dipakai ketika ada postingan blog terbaru ataupun ada produk yang ingin kita tawarkan kepada pengguna.

### Development yang Murah

Bagi pengembang aplikasi berbasis web, PWA adalah solusi bagi para developer untuk mmebuat aplikasi serasa native yang bisa dibuat menggunakan teknologi web modern. Alih - alih harus belajar bahasa baru untuk membuat sebuah aplikasi native, kan mending bikin aplikasi yang kita sudah kuasai bahasa nya :)

### Ga Makan Tempat

Sisi negatif dari native app adalah berada di ukuran / kapasitas aplikasi dan data nya. Sering kali ponsel dengan kapasitas minim akan menjerit dengan memunculkan sebuah notifikasi bahwa kapasitas di ponsel nya sudah hampir penuh. Dengan PWA, kita ga perlu di bingungkan lagi dengan ukuran yang besar, karena PWA pada dasarnya adalah aplikasi yang berjalan di atas web browser. Maka disini PWA tidak membutuhkan space yang besar di device.

Poin - poin tersebut diatas adalah beberapa fitur / kelebihan yang paling utama, tentunya masih banyak kelebihan yang lain (mungkin akan terjawab pada postingan blog berikutnya, ketika implementasi).

## CONS

### Membutuhkan Peramban yang Modern

Saat artikel ini ditulis, PWA hanya bisa dijalankan pada browser modern, sejauh yang saya tahu hanya Chrome saja yang mampur menjalankan PWA secara sempurna. Sedangkan browser lain seperti Firefox dan Opera masih ada beberapa yang dalam tahap pengembangan.

### Wajib HTTPS

Bukan wajib lagi sih kalau yang ini, melainkan fardhu'ain haha. Untuk menjalankan PWA ini membutuhkan koneksi jaringan yang aman (Secure TL Connection / SSL). Hal ini untuk mengakomodasi kebutuhan keamanan dan push notification (misalnya).

### Masih Dini

Konsep PWA ini baru saja keluar, maka disini masih banyak lagi yang perlu di explore dan kembangkan. Beberapa fitur yang terdapat di ponsel pun masih belum sepenuhnya bisa di implementasikan di PWA (Tidak seperti native yang sudah full support untuk mengakses beberapa API yang terdapat pada device / ponsel).

<hr/>

Mungkin segini dulu pada seri pertama ini, sengaja bikin artikel yang singkat tapi langsung *to the point* biar ga bikin pembaca bosan :)
