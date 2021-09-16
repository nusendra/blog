---
title: Method Destroy di Controller Laravel 5 - Part 8
date: 2017-12-31 06:46:59
tags: ['laravel','php']
draft: false
description: "Method Destroy di Controller Laravel 5 merupakan salah satu dari keluarga besar yang bermarga CRUD. Method ini berfungsi untuk menghapus sebuah atau beberapa data sekaligus. Yuk mari kita cari tau.."
slug: method-destroy-di-controller-laravel-5-part-8
---

Method terakhir yang akan saya bahas disini adalah method destroy di controller laralel 5. Method destroy ini berfungsi untuk menghapus row berdasarkan id yang dicari. Bisa juga sih langsung menghapus beberapa / banyak row. Tergantung situasi dan kondisi.

Baiklah kita langsung saja melangkah ke baris kode kita.

Pertama silakan temen - temen buat route untuk menangani proses hapus data ini

```php
Route::delete('post','PostController@destroy');
```

Atau sangat disarankan untuk menggunakan fitur resource, agar script di route tidak berantakan

```php
Route::resource('post','PostController');
```

Kemudian lanjut ke Controller kalian dan edit kodenya seperti dibawah ini

```php
public function destroy($id)
{
   $model = Post::find($id);
   $model->delete();
   return 'delete sukses';
}
```

That's it !! Cuma gitu doang kok. Jadi bagaimana cara pengimplementasiannya? Misalkan temen temen untuk melakukan manipulasi data menggunakan ajax (jQuery, superagent, vue-resource, atau axios) bisa menggunakan method delete. Tentunya hal ini akan saya bahas di postingan kedepan.

<hr/>

Akhir kata, semoga pembahasan tentang controller yang saya bagi menjadi beberapa part ini bisa berguna buat temen - temen yang sedang belajar. Terima kasih sudah membaca :-)
