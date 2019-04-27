---
title: Mengenal Route di Laravel 5 - Part 2
date: 2017-11-29 13:27:53
tags: ['laravel','php']
description: "Part lanjutan dari pembahasan route di Laravel ini akan sedikit masuk kedalam samudra routing nya Laravel. Yuk mari kita simak biar kita pinter :-)"
slug: mengenal-route-di-laravel-5-part-2
---

Lanjutan dari postingan sebelumnya Mengenal Route di Laravel 5 - Part 1 yang membahas tentang routing dasar. Kali ini kita akan sedikit masuk kedalam palung Laravel untuk mempelajari rahasia apa aja sih yang bisa dimanfaatkan di route ini.

## Segment pada Route
Segment ini berfungsi untuk mem pass / melempar parameter (variable) kedalam suatu method di controller, atau bisa juga langsung digunakan pada fungsi di route. Contohnya seperti dibawah ini

```php
Route::get('home/{nama}', function () {
     return $nama;
});
```

Script diatas ketika dijalankan di browser dengan url `localhost/home/nusendra` maka akan menghasilkan tampilan "nusendra" di browser.

Jika ingin passing variable dengan escape string, bisa pakai cara seperti dibawah ini

```php
Route::get('home/{nama?}', function () {
     return $nama;
});
```

Jika kita coba url `localhost/home/nusendra&kamu-iyakamu` maka akan muncul tampilan "nusendra&kamu-iyakamu". Kenapa kita perlu menambahkan tanda "?" ? Karena aturan dalam segment route ini tidak boleh menggunakan tanda / simbol yang aneh aneh. untuk pemisah kalimat bisa menggunakan "\_", kalo pake "-" pasti ditolak.

## Memberi Nama pada Route

Aplikasi besar pasti akan membutuhkan banyak baris script route. Nah untuk memudahkan kita mengakses route dan agar kita mudah mengingatnya, kita bisa memberi nama pada masing - masing route.

```php
Route::get('home', function () {
     return "ini halaman home";
})->name('home');
```

Bagaimana cara men generate url route di php? Gampang, tinggal kita ketik seperti ini

```php
$url = route('home'); // maka pada variable $url akan berisi localhost/home
```

## Prefix pada Route

Dengan menggunakan prefix group, kita bisa lebih menyederhanakan kodingan kita. Coba bandingkan syntax dibawah ini.

```php
Route::get('admin/kategori', function () {
     return "ini halaman kategori";
})->name('kategori');
Route::get('admin/post', function () {
     return "ini halaman post";
})->name('post');
Route::get('admin/portofolio', function () {
     return "ini halaman portofolio";
})->name('portofolio');
```

Bandingkan dengan

```php
Route::prefix('admin')->group(function () {
     Route::get('kategori', function () {
         return "ini halaman kategori";
     })->name('kategori');
     Route::get('post', function () {
         return "ini halaman post";
     })->name('post');
     Route::get('portofolio', function () {
         return "ini halaman portofolio";
     })->name('portofolio');
});
```

Jelas lebih teratur syntax nomor 2 kan? hehe.

<hr/>

Demikian part route ini berakhir, semoga berguna buat temen temen yang sedang belajar Laravel 5 :-)
