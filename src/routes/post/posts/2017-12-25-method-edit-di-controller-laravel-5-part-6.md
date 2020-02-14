---
title: Method Edit di Controller Laravel 5 - Part 6
date: 2017-12-25 23:24:10
tags: ['laravel', 'php']
draft: false
description: 'Method edit hampir sama dengan method show. Mereka memang bersaudara, tetapi ada hal lain yang membedakan mereka. Mau tau perbedaan nya? Yuk mari belajar bareng disini.'
slug: method-edit-di-controller-laravel-5-part-6
---

Menginjak ke part 6 saya akan membahas tentang method edit di controller Laravel 5. Method ini berisi perintah yang akan menampilkan halaman edit data dari sebuah row. Sebenarnya method edit ini hampir sama dengan method show (baca Method Show di Controller Laravel 5 - Part 5), cuman bedanya kalau show hanya menampilkan data saja, sedangkan edit kita nanti bisa mengedit data nya. Bisa juga sih kita melakukan edit data menggunakan method show, tapi itu tidak disarankan dan memang bukan tempat nya.

Langsung aja yuk kita ke baris kode nya. Seperti biasa, siapkan sebuah route untuk handle method edit ini.

```php
Route::get('post/{id}/edit','PostController@edit');
```

atau paling enak pakai route resource, sehingga seluruh method (CRUD) di controller sudah termasuk didalamnya

```php
Route::resource('post','PostController');
```

Setelah kita membuat route, mari lanjut ke controller. di PostController tambahkan / ubah method edit nya.

```php
public function edit($id)
{
    $model = Post::find($id);
    return view('editPost',compact('model'));
}
```

Setelah itu pada file editPost silakan isi minimal seperti dibawah ini

```php
<input type="text" value="{{$model->judul}}">
<textarea>{{$model->content}}</textarea>
<input type="submit" value="Submit">
```

Kemudian coba temen - temen ketik di browser localhost/post/1/edit maka nanti dalam input text di view nya akan muncul data yang siap untuk di edit.

<hr/>

Sekian pembahasan singkat ini, semoga membantu temen - temen yang sedang belajar. Terima kasih sudah membaca :)
