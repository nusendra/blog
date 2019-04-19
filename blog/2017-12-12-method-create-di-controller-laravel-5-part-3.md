---
title: Method Create di Controller Laravel 5 - Part 3
date: 2017-12-12 15:10:23
description: "Method Create di Controller Laravel berguna untuk menampilkan halaman form input data. Bagaimana cara penggunaan nya? Mari belajar bareng ..."
slug: method-create-di-controller-laravel-5-part-3
---

Setiap aktivitas CRUD di web app manapun membutuhkan halaman form untuk menginput data, nah disinilah kegunaan dari method create. Method ini berfungsi untuk menampilkan halaman input / insert data yang umumnya berupa form.

Yaa memang tidak semua aktivitas input data melalui halaman create (khusus), kadang ada juga app yang menginput data melalui pop up modal. Nah untuk kasus input data form yang berupa pop up modal, method create ini tidak dibutuhkan. Method create ini digunakan hanya ketika kita ingin membuat halaman form input data di halaman baru.

langsung saja ke contoh implementasi nya. Untuk bisa menggunakan method ini, pertama kita tentukan dulu route nya. Oh iya, jangan lupa untuk baca part sebelumnya ya, karena masih ada sangkut paut nya dengan post sebelumnya. Silakan baca di Part 1 dan Part 2. Yuk lanjut !!

```php
Route::resource('/post','PostController');
```

atau

```php
Route::get('/post/create','PostController@create');
```

kedua route diatas sama saja. Saya merekomendasikan untuk pake yang pertama ya.

Kemudian kita bikin method create nya di controller.

```php
public function create()
{
    $teks = "Ini adalah halaman create post";
    return view('CreatePost',compact('teks'));
}
```

Setelah itu kita bisa mengakses nya melalui URL http://localhost/post/create. Kemudian silakan temen - temen create sebuah halaman view, misalnya CreatePost.blade.php. Jangan lupa untuk menampilkan teks yang di passing dari controller tadi ya. dengan cara @{{$teks}}. Maka nanti temen temen akan mendapati tulisan "Ini adalah halaman create post" di halaman CreatePost kalian.

<hr/>

Akhir kata, semoga bermanfaat ya :-)
