---
title: Struktur Folder pada Laravel 5.5
date: 2017-11-27 06:34:50
description: "Setiap framework memiliki struktur direktori / folder yang berbeda, nah memahami struktur folder di Laravel pun sangat wajib diketahui bagi para pengguna Laravel"
tags: ["laravel", "php"]
draft: false
slug: struktur-folder-pada-laravel-55
---

Sebelum benar benar menggunakan Laravel (saat postingan ini dibuat, Laravel masih di versi 5.5 LTS), kita harus memahami betul apa aja sih kegunaan dan fungsi dari masing - masing foldernya. Dengan memahami kegunaan dan struktur folder yang ada di Laravel, kita nantinya akan sangat mudah dalam membangun sebuah aplikasi. mari kita mulai ...

```
app
|--Console
|--Exceptions
|--Http
|  |--Controllers
|  |  |--Auth
|  |--Middleware
|--Providers
bootstrap
|--cache
config
database
|--factories
|--migrations
|--seeds
public
|--css
|--js
resource
|--assets
|  |--js
|  |  |--components
|  |--sass
|--lang
|--views
routes
storage
|--app
|  |--public
|--framework
|  |--cache
|  |--sessions
|  |--testing
|  |--views
|--logs
tests
|--Feature
|--Unit
vendor
```

## app/Http/Controllers

Seperti biasanya framework PHP yang berbasis MVC (Model, View, Controller), di folder inilah nantinya seluruh controller ditempatkan. Di dalam folder Controllers ini sendiri kita juga bisa bikin sub folder lagi untuk memilah milah controller sesuai dengan kebutuhan.

## app/Http/Controllers/Auth

Folder Auth ini bawaan dari Laravel. Ketika kita membuat sistem authentifikasi milik laravel, nanti nya controller yang dipakai terletak di folder ini.

## app/Http/Middleware

Middleware bisa dikatakan sebagai jembatan yang menghubungkan antara request yang masuk dengan controller. Jadi request tidak langsung menuju ke controller, akan tetapi akan di filter dulu di Middleware. Contoh singkat nya, Untuk mengakses Post Controller diharuskan user untuk login ke sistem terlebih dahulu, jika user belum terauthentifikasi, maka halaman akan di redirect ke halaman lain / home. Biasanya middleware ini dijadikan gerbang untuk mengakses controller utama, jadi user harus login terlebih dahulu untuk bisa menggunakan fitur khusus di web (backend).

## config

Folder ini berisi konfigurasi dari sistem core Laravel maupun package tambahan. Misalnya file app.php yang akan sering di akses untuk mendaftarkan package tambahan di laravel.

## database/factories

Namanya aja pabrik, jadi model factories ini berfungsi sebagai pembuatan data dummy (fake). Biasa nya digunakan ketika dalam masa pengembangan aplikasi yang membutuhkan data dummy.

## database/migrations

Biasanya kita kalo bikin table kan langsung pake terminal / command, terkadang juga bikinnya via SQL Client. Nah kalo di Laravel sendiri ada fitur migrations yang berfungsi untuk bikin table table di database.

## database/seeds

sub folder ini berisi file database seeder. Biasanya digunakan untuk mengisi data awal di dalam database. Misalnya mendaftarkan user admin didalam table, agar user bisa langsung memakai aplikasi (kalau sudah production).

## public/js dan public/css

Setiap web aplikasi pasti membutuhkan javascript dan css. Nah di folder inilah nantinya berbagai file js dan css ditempatkan. Selain file js dan css, temen temen juga bisa nyimpen berbagai gambar di sub folder ini.

## resource/assets

Jika kita menggunakan Laravel Mix, file - file yang perlu di compile harus di letakkan di folder ini. Jadi nanti semua file yang ada di sub folder ini akan di compile oleh Laravel Mix yang kemudian akan di letakkan di folder public ketika selesai di kompilasi. Bagi pengguna VueJS, folder ini akan sering diakses untuk menempatkan file component (.vue)

## resource/views

Nah ini dia salah satu anggota MVC, yup dia adalah View. Semua file yang berhubungan dengan view (blade.php) akan di tempatkan di folder ini.

## routes

Folder ini berisi file routing, yang mana route itu sendiri bisa diartikan sebagai sebuah jalur yang meneruskan request ke controller yang dituju. Selain itu, untuk membuat API routes juga diletakkan disini.

## storage

File ini berfungsi sebagai tempat penyimpanan dari proses yang terjadi di Laravel. Contohnya untuk menempatkan file backup Laravel, bisa juga sebagai tempat backup database, sebagai tempat menyimpan file logs error di Laravel dan yang terakhir berfungsi sebagai tempat index yang berasal dari bentukan Laravel Scout.

## tests

Di folder ini tersimpan data data yang diperlukan untuk unit testing. Laravel sudah mem-bundle package nya dengan PHPUnit yang memudahkan para developer untuk mengembangkan aplikasi berbasis automated testing maupun TDD (Test-Driven Development).

## vendor

Folder ini berisi seluruh file file composer package untuk mendukung development web di Laravel.

Setelah baca baca beberapa point diatas, pasti temen temen pada bertanya tanya, mana nih folder Model nya? Jika kita membuat sebuah model melalui terminal.

```
$ php artisan make:model Post
```

Maka nanti file model tersebut akan diletakkan di folder app. Dari sini bisa diketahui bahwa file model terletak di folder app. Misalnya kita tadi bikin model Post, maka lokasi nya seperti ini "app/User.php"

Demikian yang bisa saya share untuk struktur folder di Laravel ini. Silakan bertanya tanya di kolom komentar ya temen temen :)
