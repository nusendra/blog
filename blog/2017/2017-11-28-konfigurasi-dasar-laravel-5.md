---
title: Konfigurasi Dasar Laravel 5
date: 2017-11-28 02:31:58
tags: ['laravel', 'php']
draft: false
description: Sebelum melangkah lebih jauh dalam mengarungi lautan Laravel, kita perlu melakukan konfigurasi dasar terlebih dahulu. Agar nanti kita ngoding nya lebih nyaman
slug: konfigurasi-dasar-laravel-5
---

Sebelum melangkah lebih jauh dalam mengarungi samudra Laravel, temen temen harus melakukan konfigurasi dasar terlebih dahulu. Gak mau kan kalo pas nanti udah terlanjut ngoding sampe tengah jalan, eh ternyata konfigurasi nya gak sesuai dengan kebutuhan kita. Nah berikut ini akan saya sebutkan poin - poin nya.

*Karena kita akan melakukan konfigurasi di Laravel, maka nanti kita akan sering bergulat di folder config*

Yuk pertama kita masuk kedalam folder config dulu. Buka file app.php, gak banyak yang bisa kita modifikasi disini karena modifikasi yang sebenernya justru ketika melakukan pengembangan aplikasi (seiring berjalannya waktu). Tapi untuk memulai kita bisa modif seperlu nya saja.

```
Ubah ini
'timezone' => 'UTC',
Menjadi ini
'timezone' => 'Asia/Jakarta',
```
Masih di file yang sama, dibagian bawah ada key array bernama "providers" dan "aliases". Ini tidak perlu kita rubah, biarkan saja seperti itu. Nantinya providers dan aliases ini kita tambahin seiring berjalannya waktu (ketika kita memasang external packages di Laravel).

## Maintenance Mode

Ketika kita lagi asik ngoding, eh tau tau ada user yang pengen nyobain app kita. Atau mungkin ketika app kita sedang mode production, eh tau tau ada bug parah yang mana user gak boleh akses aplikasi kita dulu. Nah dalam hal ini Laravel sudah punya cara untuk mensiasati nya. Yup, dibikin maintenance mode aja.

Ketik ini di terminal dan di direktori tempat project kalian berada.

```
$ php artisan down
```

Seketika ketika kita akses web, akan muncul tulisan "Be right back". Kalau bug sudah kita bereskan, saat nya mode production lagi, ketik ini di terminal kalian

```
$ php artisan up
```

## File .env

Untuk mengatur koneksi ke database kita, kita bisa mengkonfigurasi nya di file .env ini

File .env ini terletak di root folder aplikasi kita. Jika file ini tidak ada, anda bisa coba untuk unhide folder (Kalau di Ubuntu bisa pakai CTRL + H untuk menampilkan file yang tersembunyi. Tapi kalau file .env masih gak ketemu juga, temen temen bisa ubah nama .env.example menjadi .env saja).

Silakan temen temen sesuaikan settingan pada file .env dibawah ini

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=nama_user
DB_PASSWORD=password_user
```

Selesai deh pengaturan dasar Laravel nya. Memang sangat simple, tapi nanti ketika ngoding udah berjalan, kemudian kita install banyak package ke project kita, maka nanti kita juga akan melakukan konfigurasi pelengkapnya saja. Sekian dari saya, semoga bermanfaat bagi temen temen sekalian :-).
