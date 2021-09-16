---
draft: false
title: Optimasi Aset Berbasis Teks untuk Performa Web dengan GZIP Nginx
date: 2018-12-26 18:11:40
tags: ['devops']
description: "Menggunakan fitur GZIP pada Nginx untuk meningkatkan kecepatan load suatu website dengan memperkecil bundle size aset berbasis teks."
slug: Optimasi Aset Berbasis Teks untuk Performa Web dengan GZIP Nginx
---

Pada suatu halaman website, ada jenis file text yang sering bikin gendut halaman web, tentunya kedua hal ini juga bisa memperlambat loading web, kedua file ini adalah CSS dan Javascript. Ada banyak sekali cara untuk mengoptimalkan javascript dan css, salah satu nya ada GZIP yang akan kita bahas kali ini. Sederhananya, GZIP ini membantu untuk mengkompresi file berbasis text menjadi bundle yang lebih kecil, sehingga browser bisa lebih cepat dalam load website nya. Sama seperti beberapa file yang di kompress menjadi .rar atau .zip yang ukurannya jadi lebih kecil.

Nah kali ini kita akan coba mengoptimalkan aset js, css, dll yang berbasis teks dengan cara mengecilkan ukuran mereka menggunakan GZIP di Nginx. Sebelum kita implementasi, baiknya kita lihat dulu sebuah web yang di load tanpa pakai GZIP.

![aset sebelum gzip](https://cdn.staticaly.com/img/farm5.staticflickr.com/4850/46419296102_2856651815_b.jpg)

Berikut ini hasil dari Lighthouse

![lighthouse sebelum gzip](https://cdn.staticaly.com/img/farm5.staticflickr.com/4850/44653374610_2d5778dd04_b.jpg)

## Enable GZIP di Nginx

Buka file nginx.conf di folder /etc/nginx/ kemudian pada block http edit / tambahkan beberapa baris kode berikut ini

```
gzip on;

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

Setelah selesai, restart Nginx nya dengan perintah

```
$ sudo service nginx restart
```

Kemudian coba hard reload web nya dan tes kembali menggunakan Light House. Berikut ini hasil yang saya dapatkan

![aset setelah gzip](https://cdn.staticaly.com/img/farm5.staticflickr.com/4840/45746737674_f89ac49bb5_b.jpg)

Test Light house setelah GZIP

![aset setelah gzip](https://cdn.staticaly.com/img/farm5.staticflickr.com/4878/44653374410_7c8513b196_b.jpg)

Setelah setting gzip di nginx tadi, kita mendapati bahwa file yang di load oleh browser menjadi lebih kecil, sehingga load web jadi lebih cepat. Tapi ingat, optimasi web tidak hanya berhenti sampai disini. Masih banyak cara lain yang bisa ditempuh untuk mendapatkan hasil (web optimal) yang lebih baik lagi.

<hr/>

Sekian postingan singkat dan ringan dari saya, semoga bermanfaat bagi teman - teman sekalian.
