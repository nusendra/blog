---
title: "Setting Vhost di Nginx"
date: 2019-06-15 10:36:00
description: "Virtual Host berguna untuk membuat domain lokal pada mesin kita untuk memudahkan proses development"
tags: ['devops']
draft: false
slug: setting-vhost-di-nginx
---

<img class="center-image-post" src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" style="width:100%;height:auto;">
<br/>

## WTF is Nginx?

Nginx adalah sebuah lightweight web server yang saya tahu saat ini paling banyak digunakan, performa nya yang mantap mampu mengalahkan apache. Nah Nginx ini sendiri punya banyak segudang fitur, tetapi yang akan saya bahas kali ini adalah fitur vhost nya. Apa itu Vhost? Adalah Virtual Host (ealaaaahh). Gampang nya, biasanya ketika kita development web app, akses ke web nya kan biasa pakai ***http://localhost*** atau ***http://127.0.0.1*** atau ***http://localhost:8000***, dst.

Nah Vhost ini nanti akan kita manfaatkan agar kita bisa mengakses web local menggunakan domain seperti ***http://local.test*** atau ***http://blabla.test*** pada mesin lokal kita.

## How To ...

Sebelum melangkah lebih jauh, akan saya terangkan terlebih dahulu kondisi yang akan kita setup. Pertama saya ga akan bahas setup php-frm misalnya, saya akan pakai proxy_pass saja. Sederhana. Kedua saya menggunakan OS Debian dan Nginx versi terbaru (saat artikel ini ditulis 1.16), silakan sesuaikan dengan OS kalian masing - masing ya..

Domain vhost yang akan kita pakai `local1.test` dan `local2.test`. Jika temen temen pengen pakai domain lain silakan sesuaikan sendiri.

Pertama silakan install nginx nya terlebih dahulu
```
$ sudo apt install nginx
```
Di setiap OS, kadang struktur folder pada Nginx nya bisa beda. Setahu saya di Debian gak ada folder `sites-available` dan `sites-enabled`, sedangkan di Ubuntu ada. Entah ini karena perbedaan OS atau beda versi Nginx nya, belum saya cek sampai sejauh itu. Tapi yang jelas konsep nya sama saja. pada Nginx yang engga ada `sites-available` nya, config nya disimpan di folder `conf.d/default.conf`.

Oke kita lanjut, setelah itu copy file default.conf nya ke direktori yang sama, namun dengan nama domain kita, yakni local1.test.conf dan local2.test.conf
```
$ sudo cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/local1.test.conf
$ sudo cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/local2.test.conf
```
Kemudian edit file conf yang baru
```
$ sudo vim /etc/nginx/conf.d/local1.test.conf
```
Karena kita hanya akan menggunakan reverse proxy nya saja (fokus ke penggunaan vhost), bagi temen temen yang pengen implementasi php-fpm misalnya, silakan di sesuaikan sendiri.
```
server {
  listen 80;
  server_name local1.test;

  location / {
    proxy_pass http://127.0.0.1:8000;
  }
}
```

Kemudian pada vhost yang kedua

```
$ sudo vim /etc/nginx/conf.d/local2.test.conf
```
dan isi nya
```
server {
  listen 80;
  server_name local2.test;

  location / {
    proxy_pass http://127.0.0.1:9000;
  }
}
```

## Config Hosts

Edit file hosts nya
```
$ sudo vim /etc/hosts
```
Kemudian tambahkan domain lokal kita
```
127.0.0.1 localhost
127.0.0.1 local1.test
127.0.0.1 local2.test
```

## Restart Nginx

Setelah semua nya siap, silakan restart Nginx nya
```
$ sudo service nginx restart
```

Nah karena kita hanya reserve proxy, maka silakan jalankan app masing - masing, misalkan jalanin laravel di ***php artisan serve --port=8000*** dan ***php artisan serve --port=9000***. Setelah itu jika kita akses ***http://local1.test*** maka web akan menampilkan aplikasi laravel dengan port 8000, sedangkan jika kita akses ***http://local2.test*** maka akan tampil laravel dengan port 9000.

Mungkin kalian akan bertanya tanya. Kenapa pada vhost semuanya menggunakan port 80? Apakah tidak bentrok? Jawabannya tidak akan bentrok karena masing - masing vhost punya domain yang berbeda. Justru jika tidak pakai port 80 di vhost nya, nanti nya ketika akses web harus mencantumkan port nya juga, misalnyaseperti ***http://local1.test:81***.

---

Demikian post sederhana ini mengenai vhost. Jika kalian menggunakan Mac, bisa menggunakan Laravel Valet yang mana fungsi nya sama seperti vhost ini. Semoga bermanfaat....
