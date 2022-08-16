---
draft: false
title: Laravel Realtime Notification dengan Socket.io dan Nuxtjs - Part 1
date: 2018-11-26 20:25:55
tags: ['laravel','php','javascript','nuxtjs']
description: "Membuat notifikasi dengan Laravel Broadcast Notifications dan Socket.io"
slug: laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1
---

Mau bahas Laravel lagi, mumpung ada project yang balik pake Laravel lagi. Kali ini mau bahas Laravel broadcast notification menggunakan socket.io. Sebenernya bingung mau bikin judul apa, karena nanti insya allah bakal lumayan panjang, bahkan judul segitu pun kayaknya belum cukup untuk menampung apa yang mau kita bahas kali ini. Yak secara singkat kita akan belajar bikin sebuah sistem notifikasi menggunakan Laravel, gak berhenti sampai disitu kita akan coba pakai socket.io untuk server websocket nya (engga pakai Pusher, soalnya ada limitasi) yang berfungsi untuk mengirimkan sebuah notifikasi jika ada event yang sedang / telah dilakukan. Lebih jauh lagi kita akan coba terapkan socket listener nya di Nuxtjs. Oh iya untuk channel nya kita pake Private Channel ya, karena ini kan notifikasi, jadi ga semua orang bisa dapat notifikasi nya.

Baik, kita akan coba ngurusin Laravel (backend) nya dulu, pertama yang harus kita persiapkan adalah :

1. Install Laravel
2. Install Redis server
3. Project Nuxtjs (Boleh pakai Vuejs atau framework JS yang lain, ga masalah)

Package / library yang akan kita pakai adalah :

1. Socket.io
2. Laravel Echo
3. laravel-echo-server
4. Push.js (Optional)

Oke, pertama kita buat dulu konsep yang akan kita jalankan nanti.

User Event  --->  Save Database ---> Socket server ---> Client.

Sederhana nya seperti itu, detail nya begini. User pertama melakukan suatu aktifitas / event. Kemudian aktifitas itu di simpan ke dalam database dengan table notifications (tujuannya agar user yang menerima notifikasi bisa melihat list notifikasi nya), setelah itu event tersebut akan di tembak ke server socket (socket.io) yang kemudian diteruskan ke client (Nuxtjs). Sehingga di frontend, user B bisa mendapat notifikasi bahwa (misalnya) si user A telah menambahkan data pesanan, realtime tanpa refresh halaman. Apabali suatu saat si user B pengen liat daftar notifikasi nya, maka dari backend akan mengirim data nya yang diambil dari table notifications.

Baik langsung kita eksekusi...

## Install Redis, Predis dan Laravel Echo Server

Pertama silakan install redis nya dulu

```
$ sudo apt install redis-server
$ redis-cli --version
```

Kalau udah muncul versi nya, berarti udah sukses install redis. Setelah itu masuk ke project laravel dan install package laravel echo server dan predis

```
$ yarn global add laravel-echo-server
$ composer require predis/predis
```

Kalau udah sukses, lanjut kita inisiasi server socket nya pake Laravel

```
$ laravel-echo-server init
```

Settingan nya sesuaikan kebutuhan ya. Kemudian coba jalankan server laravel-echo nya

```
$ laravel-echo-server start
```

## Konfigurasi Laravel

Untuk socket server nya udah beres nih, sekarang kita setting di sisi backend nya. Pertama buka file .env nya dan edit seperti dibawah ini

```
BROADCAST_DRIVER=redis
```

Kemudian buka file `config/app.php` kemudian uncomment ini `App\Providers\BroadcastServiceProvider::class,`

Then buka file `app/Providers/BroadcastServiceProvider.php` kemudian edit seperti dibawah ini

```php
Broadcast::routes(['middleware' => ['auth:api']]);
```

Karena backend kita hanya untuk API, maka kita wajib setting seperti diatas.

## Laravel Broadcast Notification

Pertama kita bikin table notifications nya dulu untuk nampung data notifikasi.

```
$ php artisan notifications:table
$ php artisan migrate
```

```
$ php artisan make:notification Notifikasi
```
Buka file `app/notifications/Notifikasi.php` Tambahkan seperti dibawah ini

```php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
```

Kemudian kita set global variable nya

```php
protected $event;

public function __construct($event)
{
    $this->event = $event;
}

public function via($notifiable)
{
    return ['broadcast', 'database'];
}

public function toDatabase($notifiable)
{
    return [
        'event' => $this->event
    ];
}

public function toBroadcast($notifiable)
{
    return new BroadcastMessage([
        'event' => $this->event
    ]);
}
```

Sampai sini udah nih settingan nya, tinggal kita coba jalanin aja. Bikin route dulu di api.php dan controller nya.

```php
// api.php
Route::get('test-broadcast-notification', 'NotifikasiController@send');
// NotifikasiController.php
use Notification;
use App\User;

...

public function send() {
    $user = User::first();
    $event = 'Pembeli telah menambahkan order baru';
    Notification::send($user, new \App\Notifications\Notifikasi($event));
}
```

Penjelasan nya, pertama kita set dulu route untuk notifikasi kita, jika sudah pada controller yang telah ditentukan diatas, kita import Notification dan model user nya. Kemudian pada method send, kita ambil user yang pertama untuk target yang akan mendapat notifikasi, dan kita tentukan juga event apa yang akan kita simpan (atau kirim). Setelah udah di siapkan variablenya, kita bisa mulai membuat sebuat notifikasi seperti pada akhir baris kode tersebut.

Nah sekarang coba akses route, jika ga ada error, coba buka MySQL GUI kalian dan lihat pada table notifications. Jika disana sudah terdapat data yang sesuai dengan pesan notifikasi diatas, berarti kita sudah berhasil mengimplementasikan membuat notification dengan Laravel

<hr/>

Pada part pertama ini kita hanya membuat sistem notifikasi saja, Insya allah pada part 2 kita akan lanjut lagi bahas bagaimana cara mengirim notifikasi dari laravel backend ke frontend Nuxtjs secara realtime. Oh iya, postingan ini bersifat catatan pribadi sih, kalau ada temen temen yang merasa terbantu, ya syukur alhamdulillah. Terima kasih udah mampir :D
