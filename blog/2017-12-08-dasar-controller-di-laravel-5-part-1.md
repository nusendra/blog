---
title: Dasar Controller di Laravel 5 - Part 1
date: 2017-12-08 00:40:57
tags: ['laravel','php']
description: "Dasar Controller di Laravel 5 merupakan postingan tentang controller yang membahas method - method maupun fungsi - fungsi dasar dari sebuah Controller."
slug: dasar-controller-di-laravel-5-part-1
---

Setelah kemarin bahas hal yang paling dasar di Laravel 5, sekarang waktu nya kita masuk ke bahasan tentang Controller. Apa sih Controller itu? Controller adalah salah satu komponen inti dari MVC yang berfungsi sebagai penghubung antara request user (View) ke model yang nantinya akan di kembalikan lagi ke View dalam bentuk response.

Controller ini juga bisa diartikan sebagai otak nya suatu web, karena seluruh aktivitas backend akan banyak berkutat di controller ini. Controller ini akan banyak berisi logika - logika dalam menyusun suatu fungsi tertentu. Contohnya adalah aktivitas CRUD (Create, Read, Update, Delete) yang prosesnya berjalan di dalam Controller. So, Controller ini sangat penting untuk dipahami karena dia ini termasuk salah satu keluarga inti yang ada di laravel.

![nusendra-mvc](https://farm5.staticflickr.com/4639/25137016468_451a3c2cd8_o.jpg "nusendra mvc")

Saya akan jelaskan alur singkat dari cara kerja MVC ini terlebih dahulu, sebelum beranjak lebih jauh menyelami samudra MVC.

1. User melakukan request ke Controller (Misalnya User ingin menampilkan data produk)
2. Kemudian Controller akan memeriksa / Mengakses Database melalui Model yang nantinya data dari database tersebut disimpan di dalam object Model.
3. Setelah itu Model akan mengirimkan kembali hasil dari pencarian data produk ke Controller (dalam bentuk object).
4. Kemudian Controller akan melempar data produk ke View berupa response (Biasanya berupaJSON ). Yang nanti nya data tersebut bisa diolah lagi di Frontend untuk menampilkan data produk yang diinginkan si user.

Kalo udah paham, yuk langsung melangkan ke dasar - dasar Controller

> Sekedar catatan, mulai dari sini sampai kedepan kita akan menggunakan resource Controller dan route resource. Karena ini mempermudah proses development dan kodingan kita terlihat lebih cantik.

## Membuat Controller

Sebelum mulai memakai controller, ada beberapa cara untuk membuat controller. Bisa melalui php artisan yang disediakan Laravel, atau bisa create secara manual di dalam folder app/Http/Controllers. Sangat diasarankan untuk membuat controller melalui php artisan, berikut caranya. Buka terminal kalian dan masuk ke direktori project nya.

```
php artisan make:controller PostController --resource
```

Dengan menambahkan tag "--resource", maka file Controller yang telah dibuat tadi sudah berisi beberapa method yang siap untuk digunakan dalam aktivitas CRUD. Dalam contoh kasus ini kita membuat Controller yang memproses data post.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // Method untuk menampilkan halaman daftar post (Halaman utama)
    }

    public function create()
    {
        // Method untuk menampilkan halaman form create post
    }

    public function store(Request $request)
    {
        // Method untuk melakukan insert / input data kedalam database
    }

    public function show($id)
    {
        // Method untuk menampilkan single post / detail dari sebuah post
    }

    public function edit($id)
    {
        // Method untuk menampilkan halaman edit post
    }

    public function update(Request $request, $id)
    {
        // Method untuk melakukan update data post ke database
    }

    public function destroy($id)
    {
        // Method untuk menghapus data post
    }
}
```

Berikut ini adalah beberapa route yang ditangani oleh resource controller.

Verb | URI | Action
--- | --- | ---
GET  | /post | index
GET | /post/create | create
POST | /post | store
GET | /post/{id}/edit | edit
PUT / PATCH | /post/{id} | update
DELETE | /post/{id} | destroy

Apa sih maksud dari table diatas ??? Table diatas menunjukkan beberapa URI yang ketika diakses, maka route akan secara otomatis bisa mengenali maksud dan tujuan si user dalam menentukan action, yang kemudian route akan meneruskan ke controller yang cocok. Nah karena di setiap action method pada controller membutuhkan satu buah route (URI), maka sangat boros sekali jika kita menuliskan masing - masing route nya seperti contoh dibawah ini

```php
Route::get('/post','PostController@post');
Route::get('/post/create','PostController@create');
Route::post('/post','PostController@store');
Route::get('/post/{id}','PostController@show');
Route::get('/post/{id}/edit','PostController@edit');
Route::put('/post/{id}','PostController@update');
Route::delete('/post/{id}','PostController@destroy');
```

Ini adalah route normal untuk aktivitas crud adalah. Ini hanya untuk 1 controller saja loh, bagaimana kalo ada ratusan controller? Bayangin aja sendiri gimana banyak nya script seperti diatas. Nah di Laravel ada route resource yang membantu menyederhanakan script diatas, kita cuma ketik seperti dibawah ini

```php
Route::resource('/pos','PostController);
```

Keren kan? Hanya 1 baris saja sudah bisa mendefinisikan dari ke 7 baris kode diatas.

<hr/>

Sampai sini dulu ya belajar controller nya, karena saya emang mau bahas yang dasar banget dari controller. Nanti part selanjutnya perlahan - lahan akan masuk dan mempelajari controller nya sedetail yang saya pahami. Semoga bermanfaat teman - teman :-)
