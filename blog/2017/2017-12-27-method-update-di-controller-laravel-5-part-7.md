---
title: Method Update di Controller Laravel 5 - Part 7
date: 2017-12-27 05:17:40
tags: ['laravel','php']
description: "Method Update data di Controller Laravel 5 sangat penting untuk dipelajari, karena method ini merupakan salah satu keluarga dari marga CRUD. Mari simak penjelasan singkat nya disini.."
slug: method-update-di-controller-laravel-5-part-7
---

Setelah kita belajar method edit, lanjut kita belajar mengenai method update di Controller Laravel 5. Method update ini berfungsi untuk melakukan perubahan data yang ada di dalam database. Sebenarnya kita juga bisa sih melakukan update data di method store, tapi itu tidak direkomendasikan karena tujuan kita adalah menjadikan route kita RESTful.

Baiklah langsung saja ke koding. Pertama silakan temen - temen bikin route untuk handle update data ini

```php
Route::put('post/{id}','PostController@update');
```

Atau yang paling disarankan pakai resource route

```php
Route::resource('post','PostController');
```

Setelah kita menentukan route nya, sekarang kita lanjut ke Controller

```php
public function update(Request $request, $id)
{
    $model = Post::find($id);
    $model->judul = $request->judul;
    $model->content = $request->content;
    $model->save();
    return 'success';
}
```

Penjelasannya, function update ini menangkap request data dan post id yang dikirimkan oleh user.

> Untuk pengiriman datanya akan saya jelaskan nanti di postingan berikut nya yang membahas tentang CRUD. Pengiriman data ini bisa melalui ajax dengan method PUT.

Setelah itu model post mencari data post dengan parameter id $id. Kemudian model post melakukan update data di masing - masing field yang sudah ditentukan. Setelah proses update selesai, controller akan mengembalikan / me-return kata 'success' yang nantinya response ini akan ditangkap oleh ajax (misalnya) dan mengeluarkan alert bahwa update data telah sukses.

<hr/>

Demikian penjelasan singkat dari saya. Semoga bermanfaat bagi yang membacanya. Terima kasih ...
