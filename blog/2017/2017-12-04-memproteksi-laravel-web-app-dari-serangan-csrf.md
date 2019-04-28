---
title: Memproteksi Laravel web App dari Serangan CSRF
date: 2017-12-04 07:25:30
tags: ['laravel','php']
description: "CSRF merupakan salah satu ancaman besar bagi keamanan suatu website. Nah, di Laravel sendiri om Taylor udah nyediain fitur yang keren buat menanggulangi hal ini. Yuk simak penjelasannya."
slug: memproteksi-laravel-web-app-dari-serangan-csrf
---

Memproteksi laravel app dari serangan CSRF sangatlah penting dan wajib diimplementasikan di setiap aksi post / put / patch.  CSRF sendiri adalah cross site request forgery, apa maksudnya nih?? Maksudnya adalah csrf ini merupakan salah satu lubang di web app yang bekerja dengan cara mengeksploitasi suatu aksi dan eksploitasi ini memanfaatkan otentikasi milik salah satu user.

Setelah kita tau bahaya nya si csrf, maka om Taylor dengan kebaikan hati nya menciptakan fitur di Laravel untuk mengatasi hal seperti ini. Cara mengimplementasikan ini cukup mudah dan ada beberapa langkah. Simak langkah nya dibawah ini.

Setiap kali kalian membuat suatu form di html (blade), jangan lupa untuk menaruh kode csrf_field dibawah ini didalam tag form kalian

```php
<form method="POST" action="/post">
    {{ csrf_field() }}
    ...
</form>
```

Setelah itu temen - temen juga harus membuat meta tag untuk menangani request header X-CSRF Token. Caranya, silakan temen - temen copas script dibawah ini, dan taruh di header web.

```php
<meta name="csrf-token" content="{{ csrf_token() }}">
```

## Javascript untuk Posting Data

Untuk mengirimkan data dari view ke controller, kita bisa menggunakan method POST, PUT, dan DELETE. Method POST / PUT / DELETE ini wajib dipakai ketika kita hendak menginput data baru / mengupdate data / menghapus data dari database. Nah kebutuhan passing data ini memerlukan sebuah HTTP Client untuk melaksanakan tugasnya. Kita bisa pakai jQuery / Axios / Vue - resource, dll untuk melakukan aksi ini.

Nah karena Laravel ini memproteksi diri dari serangan CSRF, maka kita harus mencantumkan token di header HTTP Client kita. Berikut ini contoh nya.

Pada jQuery bisa pakai seperti dibawah ini

```javascript
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

Sedangkan Axios bisa pakai dibawah ini

```javascript
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
   window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
   console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
```

Nah dengan adanya pengaturan headers di HTTP client kita, maka kita bisa secara leluasa memanipulasi database kita dengan aman dan nyaman, karena HTTP client kita sudah dikenali (Karena membawa informasi berupa token yang ada di headers) oleh sistem Laravel.

<hr/>

Sekian penjelasan singkat dari saya, semoga membantu temen temen yang lagi belajar Laravel. Silakan taruh komentar dibawah jika ada sesuatu yang kurang difahami. Matur nuwun :-)
