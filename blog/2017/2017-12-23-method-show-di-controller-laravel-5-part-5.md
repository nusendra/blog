---
title: Method Show di Controller Laravel 5 - Part 5
date: 2017-12-23 09:48:50
tags: ['laravel','php']
draft: false
description: "Menampilkan detail dari sebuah data merupakan salah satu fitur dari sebuah web yang harus ada. Bagaimana cara implementasi nya? Saya akan memaparkan nya secara ringkas di postingan kali ini."
slug: method-show-di-controller-laravel-5-part-5
---

Udah sekitar seminggu nih belum update blog hehe. Kali ini saya akan bahas sedikit tentang method show yang ada di Controller. Show ini berfungsi untuk menampilkan single row dari database. Single row disini maksudnya kita menampilkan detail data dari sebuah row. Contoh mudahnya, kita menampilkan blog post, menampilkan detail dari suatu barang di inventory, menampilkan user profile, dll.

Yuk langsung kita lanjut ke koding nya, biar tambah paham pengimplementasiannya.

Untuk route yang diperlukan untuk action show ini bisa menggunakan salah satu dibawah ini.

```php
Route::get('post/{id}','PostController@show');
```

Atau yang paling saya sarankan memakai resource route seperti dibawah ini

```php
Route::resource('post','PostController');
```

Jadi ketika user melakukan request (dengan cara klik sebuah tombol atau langsung masuk melalui URL) dengan alamat localhost/post/2, Maka controller di Laravel akan mengambil segment yang ada di route tersebut, yakni 2. Kemudian route mempassing segment tersebut ke method show.

Setelah itu tambahkan kode berikut ini di controller kalian.

```php
public function show($id)
{
    $model = Post::find($id);
    return view('SinglePost',compact('model'));
}
```

Penjelasan dari koding diatas adalah. Si method show menerima sebuah variable hasil dari segment tadi, yaitu angka 2. Kemudian controller melakukan pencarian data dengan parameter id  = 2. Setelah ditemukan object datanya, kemudian controller akan menampilkan view SinglePost dan melempar data object $model ke view tersebut.

Setelah itu buatlah sebuah file view untuk menampilkan detail dari sebuah post. Misalkan saja kita bikin dengan nama SinglePost.blade.php
Kemudian pada file ini silakan temen temen tambahkan koding seperti dibawah

```php
<?php
Judul Post = {{$model->judul}} <br>
Isi Content = {{$model->content}}
```

Dengan begitu halaman view SinglePost ini akan menampilkan judul dan content dari sebuah post yang memiliki id = 2.

<hr/>

Nah sekian postingan kali ini. Semoga temen - temen yang lagi belajar Laravel bisa merasa terbantu. Makasih udah mau baca ya :-)
