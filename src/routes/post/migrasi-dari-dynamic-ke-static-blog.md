---
title: "Migrasi dari Dynamic ke Static Blog"
date: 2019-05-04 07:27:00
description: "Cerita singkat migrasi dari blog dinamis ke static blog"
tags: ['opini', 'tips']
draft: false
slug: migrasi-dari-dynamic-ke-static-blog
---

<img class="center-image-post" src="https://cdn.staticaly.com/img/snipcart.com/media/204009/static-site-generators.png" style="width:100%;height:auto;">
<br/>

Saya termasuk orang yang demen ngeblog, udah bertahun tahun melanglang buana di dunia per-blog-an mulai dari yang jadul (blogspot) hingga yang kekinian. Nah cerita kali ini sebagai ulasan singkat kenapa saya harus migrasi dari dynamic ke static blog.

Cerita cerita dulu kali yee. Dulu jaman SMA mulai ngeblog pake blogspot, blog nya masih ada sampe sekarang dan udah ga pernah keurus, kalau penasaran bisa mampir [kesini](http://andrachemical.blogspot.com/). Nah karena perkembangan zaman, akhir nya dari blogspot beralih ke Wordpress hingga tahun 2016 an. Waktu itu udah beli domain sendiri (ya domain sekarang ini). Kemudian karena sebagai anak IT, masa iya ngeblog aja harus pake WP? Lantas apa bedanya ama orang orang diluar sana yang bukan dari background IT? Mulai dari sinilah saya harus bikin blog buatan sendiri, ga boleh pake CMS lagi :)

Tahun 2017 mulai bikin CMS buat blog pribadi pake Laravel & Vuejs. Laravel dipake untuk handle public web (karena hostingnya engga mendukung nodejs sehingga ga bisa mainin SSR di hosting), for SEO reasons. Kemudian Vuejs dipake untuk admin panel (bikin blog post, kategori blog, dll). Memang melelahkan dan banyak yang harus diurusin, mulai dari pake laravel (males banget aslinya), trus bikin admin panel nya juga. Menurut saya terlalu overkill kalau hanya untuk sekedar blog saja.

## Memutuskan untuk migrasi ke static blog

Sekarang jamannya static blog, dulu ada yang namanya jekyll, github pages, Hugo, dll. Kalau pengen ngerasain development pakai react / vue, di React ada yang namanya Gatsby.js dan di vue ada Gridsome. Karena saya anak vue, maka pilihan jatuh ke Gridsome, sebuah static site generator yang biasa dipakai untuk bikin blog atau docs.

Kenapa lebih milih static daripada dynamic?

1. *Cost Saving*, dengan menggunakan static blog, saya udah ga butuh hostingan lagi. Tinggal pakai repo di github, trus lempar hosting nya ke netlify. Beres
2. Ga ribet ngurusin backend. Kalau pakai dinamis, biasa kita juga harus ada database untuk simpan artikel kan? Pun juga demikian dengan service nya.
3. Ga butuh admin panel. Kalau dinamis, kita perlu sebuah halaman untuk input artikel, maka disini kita harus bikin admin panel nya. Duh males
4. Cepat, performa yang kita dapatkan dari static site jauh lebih cepat daripada web dinamis. Karena pada static site kita hanya mengunduh halaman html nya saja. Sedangkan pada web dinamis, kita harus menunggu web nya ngambil data dari database yang kemudian di render ke client side.
5. Lebih bisa bereksplorasi dengan modern web seperti PWA.
6. *the main reason is, I don't wanna play with PHP anymore :)*

## Exploring the world of modern web

Ketika artikel ini ditulis, blog ini hanya sekedar static site saja. Saya masih belum mengimplementasikan PWA disini. Niatnya nanti akan saya implementasikan sembari menulis post ber seri yang bakal ngebahas PWA.

<hr/>

Sekian curhatan singkat ini, semoga saya masih punya komitmen kuat untuk ngeblog terus XD.
