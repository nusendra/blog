---
title: Method Store di Controller Laravel 5 - Part 4
date: 2017-12-15 03:49:06
description: "Method Store di Controller Laravel 5 berfungsi untuk melakukan aktivitas insert / create data ke dalam database. Bagaimana cara mengimplementasikannya? Disini kita akan belajar bareng."
slug: method-store-di-controller-laravel-5-part-4
---

Setelah kita di post sebelumnya belajar bareng tentang method index dan method create yang mana keduanya adalah action dengan method GET. Sekarang mari kita lanjut belajar mengenal method Store di Controller, yang mana action ini menggunakan method POST sebagai HTTP request nya.

Method Store ini akan bekerja ketika kita mengirimkan data dengan method POST pada ajax misalnya. Langsung saja kita masuk ke contoh implementasi nya.

Pada route, siapkan baris kode seperti dibawah ini

```php
Route::resource('/post','PostController');
```

atau bisa juga seperti dibawah ini

```php
Route::post('/post','PostController@store');
```

Kedua route bersifat sama, tapi karena dari awal kita udah sepakat untuk pake resource, maka lebih disarankan untuk pake route yang pertama.

Kemudian pada method store nya isi seperti dibawah ini

```php
public function store(Request $request)
{
   \App\Post::create([
      'judul' => $request->judul
    ]);
   return 'sukses';
}
```

Cara baca function diatas adalah, pertama function store mengambil semua data request dari user kedalam variable $request. kemudian model Post melakukan create data yang berisi judul, dimana judul itu diisi dengan variable `$request->judul`. Setelah model Post berhasil menginsert data ke database, method store ini mengembalikan kata sukses sebagai response, nah baru setelah itu view nya bertugas untuk menampilkan alert sukses.

Untuk tambahan pengetahuan temen temen yang baru belajar Laravel, didalam method store ini kita juga bisa menambahkan validasi data, yang mana jika data POST sudah memenuhi rules, maka model Post akan menyetujui untuk input data, dan jika rules nya tidak terpenuhi, maka function store ini mengirimkan pesan error ke view.

Untuk membuat form isian nya (sebelum di POST), akan saya jelaskan di postingan lain (karena sekarang kita lagi fokus membahas method store).

<hr/>

Sekian dulu pembahasan mengenai Method Store di Controller Laravel 5, untuk tutorial CRUD (khususnya insert data) akan saya bahas di postingan mendatang. Makanya stay tuned ya guys #SokKayakAnakMuda hehe :P
