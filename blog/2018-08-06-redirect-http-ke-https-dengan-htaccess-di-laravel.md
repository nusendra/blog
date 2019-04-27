---
title: Redirect HTTP ke HTTPS dengan .htaccess di Laravel
date: 2018-08-06 03:24:24
tags: ['laravel','php']
description: "Bagi kalian pengguna Laravel di shared hosting, berikut ini adalah cara redirect http ke https menggunakan .htaccess"
slug: redirect-http-ke-https-dengan-htaccess-di-laravel
---

Bagi beberapa pengguna apache mungkin pernah mengalami bagaimana redirect http ke https menggunakan .htaccess di Laravel. Karena disini kita punya 2 pekerjaan yang harus di kerjakan, yakni

1. Bagaimana cara redirect http ke https
2. Menghapus public url (default di laravel, url selalu ada public nya)

OK langsung saja kita setting. Pertama silakan masuk ke VPS / shared hosting kalian masing - masing. Sesuaikan dengan cara kalian mengakses hosting, bisa pakai ssh atau file manager di cpanel. Kemudian buat / edit file .htaccess di dalam root folder (public_html) seperti berikut ini.

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /blog/

  # Force SSL
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  # Remove public folder form URL
  RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

Penjelasannya, pertama .htaccess menentukan base dari folder app / web nya. Kemudian htaccess akan meredirect http ke https yang setelah itu htaccess akan melemparkan ke folder public dan menghapus / rewrite url public nya.

Sehingga jika setting seperti diatas, contoh ketika kita masuk ke url nusendra.com maka kita akan diarahkan ke https://nusendra.com

<hr/>

Nah itu tadi cara untuk redirect http ke https menggunakan .htaccess bagi pengguna apache dan Laravel. Semoga bermanfaat teman - teman.
