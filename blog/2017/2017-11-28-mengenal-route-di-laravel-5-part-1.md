---
title: Mengenal Route di Laravel 5 - Part 1
date: 2017-11-28 15:58:19
tags: ['laravel', 'php']
description: Routing adalah salah satu fitur terpenting yang disediakan oleh Laravel. Kita wajib memahami penggunaan route ini, karena ketika proses development, route akan sangat sering diakses.
slug: mengenal-route-di-laravel-5-part-1
---

Kebanyakan para programmer yang baru mencoba suatu framework pasti kebingungan harus mulai darimana, sentuh yang mana dulu, harus ngapain dulu, dll. Dari dasar itulah saya bikin postingan ini mulai dari yang paling dasar banget (dari post sebelumnya).

Sekarang ini kita akan belajar mengenal apa itu routing. Route adalah salah satu bagian paling penting yang ada di Laravel, tanpa adanya route request yang diminta oleh user tidak akan sampai ke dalam sistem. Nah URI yang akan diaksees harus kita cantumkan terlebih dahulu di file routes/web.php atau routes/api.php untuk bikin web API. Jika route sudah di definisikan didalam file routes tersebut (ambil contoh web.php), maka request yang diminta user akan diproses lebih lanjut oleh sistem Laravel.

<br/>

## Routing Dasar

Sebelum melangkah jauh, mari kita mengenal route lebih dekat dengan melihat contoh sederhana dibawah ini

```
Route::get('home', function() {
  return 'ini adalah halaman home';
});
```

Mari kita pelajari susunan dari satu route diatas

1. Pertama kita wajib memberi kata "Route::" diawal route nya.
2. Kemudian kita tentukan method nya. Didalam route ini ada beberapa method yang bisa digunakan, diantaranya get, post, put / patch, delete, resource, view, dll. (Akan saya jabarkan satu persatu di postingan mendatang, Inshallah).
3. Setelah itu kita masukkan URI nya, dalam contoh kasus ini menggunakan "home".
4. Function akan menjalankan hasil return yang berisi kata "ini adalah halaman home".

Nah dari sini, ketika temen temen mengakses web dengan url "localhost/home" maka akan tampil tulisan "ini adalah halaman home".

<br/>

## Redirect Routes

Redirect route ini berfungsi untuk mengarahkan url pertama ke URL kedua. Contoh kasus nya seperti ini, misalnya kita punya halaman post yang memiliki jumlah viewer tinggi dengan url nusendra.com/post-bagus. Nah karena halaman ini sudah terindeks google dan rate nya bagus, url dan judul jangan sampai berubah karena nanti berpengaruh pada SEO. Jika kita ingin merubah url nya (misalkan), kita membutuhkan redirect route ini. Jadi ketika si user mengakses nusendra.com/post-bagus, maka otomatis akan dialihkan ke url lain misalnya nusendra.com/post-baru. Berikut ini syntax nya

```
Route::redirect('/post-bagus','/post-baru');
```

<br/>

## View Routes

Route ini berfungsi untuk mengarahkan route langsung ke view. Di Laravel versi 5.4, view routes ini masih belum ada. Di Laravel 5.5 kebawah, untuk menjalankan view route ini harus dengan syntax berikut

```
Route::get('home', function() {
  return view('halaman_home');
});
```

Nah kalo di Laravel 5.5 sudah di sederhanakan lag menggunakan view route

```
Route::view('home', 'halaman_home');
```

Jika kita pengen passing variable ke tampilan view melalui view route ini, bisa menggunakan syntax dibawah ini

```
Route::view('home', 'halaman_home',['var' => 'Ini variable']);
```

Segini dulu part pertama ini tentang masalah route. Di part selanjutnya akan dibahas lebih detail lagi. Semoga bermanfaat temen temen :-)
