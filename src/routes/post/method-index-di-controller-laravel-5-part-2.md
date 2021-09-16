---
title: Method Index di Controller Laravel 5 - Part 2
date: 2017-12-10 18:40:44
tags: ['laravel','php']
draft: false
description: "Apa sih kegunaan method index di Controller Laravel 5 ?? Yuk mari kita belajar bareng - bareng mengenai method index di Controller, serta bagaimana menggunakannya."
slug: method-index-di-controller-laravel-5-part-2
---

Kali ini saya akan melanjutkan postingan tentang Controller di Laravel 5. Bagi yang belum baca dasar - dasar controller, bisa dilihat di postingan berikut ini [Dasar Controller di Laravel 5 - Part 1](https://nusendra.com/post/dasar-controller-di-laravel-5-part-1). Setelah kita pahami bersama bagaimana sebuah Controller bekerja, sekarang yuk mari kita lanjut selami salah satu method yang ada di Resource Controller, yaitu Index.

Method index ini bisa diartikan sebagai halaman awal / basis dari suatu fitur web. Misalnya dalam kasus Halaman Post, Index ini merupakan daftar seluruh / sebagian dari Post. Sehingga nantinya user / admin bisa mengolah halaman Post dengan klik tombol edit / tambah di halaman Post.

Nah untuk memanggil method index ini, kita perlu mendefinisikan di resource / get route, perhatikan script dibawah ini.

```php
Route::get('/post','PostController@index');
```

Atau jika memakai resource route, bisa juga seperti dibawah ini.

```php
Route::resource('/post','PostController');
```

Kemudian kita coba modifikasi file PostController di bagian index nya, seperti dibawah ini.

```php
public function index()
{
    return "ini adalah halaman index";
}
```

Jika kita mengakses url http://localhost/post, maka akan tampil halaman dengan tulisan "ini adalah halaman index".

Tentunya jika temen - temen ingin menampilkan list / daftar dari post, kita bisa menampilkan nya dengan script yang lebih kurang seperti dibawah ini (tinggal disesuaikan saja dengan kondisi yang diinginkan).

```php
public function index()
{
    $post = \App\Post::all();
    return view('PostPage',compact('post'));
}
```

`$post = \App\Post::all();` Pada baris ini, kita melakukan pemanggilan data dari model Post, yang kemudian kita dapatkan dalam bentuk object collection.

`return view('PostPage',compact('post'));` Kemudian pada baris ini, kita menampilkan halaman view Post kita, serta kita mem passing / melempar variable object dari model post tadi. Sehingga nantinya kita bisa menampilkan data di halaman view kita dari variable yang sudah didapat dari controller.

```php
<ul>
@foreach($post as $singlePost)
    <li>{{$singlePost->judul}}</li>
@endforeach
```

<hr/>

Demikian penjelasan singkat dari method Index yang ada di Controller. Tungguin postingan saya selanjutnya ya dan semoga bermanfaat bagi temen - temen yang sedang belajar framework Laravel 5.
