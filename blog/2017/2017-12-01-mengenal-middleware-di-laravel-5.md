---
title: Mengenal Middleware di Laravel 5
date: 2017-12-01 16:23:55
tags: ['laravel','php']
description: "Mengenal middleware di Laravel 5 wajib dilakukan, karena fitur ini sangat berguna untuk melakukan aksi filter request ke Controller. Yuk simak pembahasannya berikut ini"
slug: mengenal-middleware-di-laravel-5
---

Setelah mengenal sistem routing, sekarang kita belajar bareng - bareng tentang Middleware. Apa itu middleware? Middleware adalah  jembatan antara validasi request terhadap controller. Bahasa gampang nya sih Middleware itu sama seperti Polisi yang ada di Laravel. Perumpamaan nya, ketika ada razia para pengendara harus menunjukkan surat - surat kendaraan bermotor, kalo ada yang gak lengkap ya kena tilang. Sedangkan yang bawa surat - surat nya lengkap, dia boleh melanjutkan perjalanan.

Alur kerja nya seperti berikut ini. User memanggil Route 1, kemudian Middleware akan memproses apakah user sudah tervalidasi (login) atau belum. Jika sudah login maka request akan dilanjutkan ke Controller. Sedangkan jika user belum tervalidasi, maka akan dialihkan / redirect ke route lain.

## Membuat Middleware

Untuk membuat sebuah middleware, bisa langsung create new file di `app/Http/Middleware`, atau yang paling gampang melalui artisan command.

```
php artisan make:middleware UserAuth
```

Setelah itu silakan temen temen buka file middleware yang barusan dibuat, kemudian edit file nya seperti dibawah ini (sesuaikan dengan kondisi temen temen sekalian)

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserAuth
{
   public function handle($request, Closure $next)
   {
      if(Auth::check())  //Proses check otentikasi
      {
         //user terauthentikasi, boleh lanjut ke controller
      }else
      {
         return redirect('/');  // User tidak terotentikasi, redirect ke route lain
      }
      return $next($request);
    }
}
```

Setelah itu silakan temen temen buka file Kernel di `app/Http/Kernel.php`, kemudian tambahkan kode dibawah ini di property $routeMiddleware.

```php
'UserAuth' => \App\Http\Middleware\UserAuth::class,
```

Setelah itu kita tinggal taruh saja pak polisi (middleware) nya di file route. Oh iya, untuk middleware ini sebaiknya kita bikinkan route group saja, dengan tujuan agar kode kita lebih simple dan minimalis

```php
Route::view('/','Home');
Route::group(['middleware' => 'UserAuth'],function(){
   Route::resource('/admin','AdminController');
   Route::resource('/posts','PostController');
});
```

Contoh diatas jika kita baca. Semua route yang akan melewati '/admin' dan '/posts' akan diperiksa terlebih dahulu oleh Middleware UserAuth. Jika user sudah login, maka user bisa mengakses controller AdminController dan PostController. Sebaliknya jika user ternyata belum terotentifikasi (login), maka akan di redirect ke route '/' Home.

<hr/>

Sekian pembahasan singkat middleware, jika ada yang temen temen perlu tanyakan, silakan komentar di bawah ya..
