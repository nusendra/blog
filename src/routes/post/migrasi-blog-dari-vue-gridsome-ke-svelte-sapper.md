---
title: 'Migrasi Blog dari Vue Gridsome ke Svelte Sapper'
date: 2020-03-13 19:46:00
description: 'Cerita mengenai perpindahan / migrasi stack blog dari Gridsome ke Sapper'
tags: ['vuejs', javascript', 'svelte']
draft: false
slug: migrasi-blog-dari-vue-gridsome-ke-svelte-sapper
---

Artikel kali ini akan membahas tentang kenapa saya migrasi blog dari yang awalnya menggunakan Vue dengan framework Gridsome ke Svelte dengan Sapper nya. Mungkin sebelum masuk kesana saya pengen cerita bentar tentang stack apa saja yang saya pakai ketika menggeluti dunia blogging ini.

Note : Tenang, postingan kali ini ga ada kodingan nya kok :)

## Blogspot dan Wordpress

Dimulai ketika SMP kelas dunia pertama kali kenal blogging, waktu itu iseng iseng coba daftar blogspot trus ngatur ngatur themes blogspot sedemikian rupa alay nya haha. Jangan tanya isi blog nya apaan, yang jelas isinya dari hasil copas semua haha. Yaa maklum lah umur segitu masih ga ada pengalaman di dunia IT. Setelah itu di masa SMA mulai ngerasa kalo blogspot ini tampilannya norak banget, akhirnya beralih ke Wordpress karena lebih simple dan elegan. Disini sudah mulai nulis nulis sendiri, tapi ya gitu tulisan ga jelas dan cuma singkat singkat doang.

Singkat cerita waktu kuliah mulai beli domain https://nusendra.com ini yang waktu itu hosting di JagoanHosting kemudian diinstall Wordpress. Dari sini sudah mulai nulis nulis tentang IT yang alakadarnya sepengetahuan saya, terlebih lagi ngebahas tentang C#.NET. Selain itu juga sering dapet kerjaan freelance sebagai network engineer untuk ngerjain mikrotik (Dulu search di google dengan keyword "jasa mikrotik surabaya gresik sidoarjo" dapet rank 1 dong).

## Laravel

Mulai sadar sebagai programmer, masa iya masih pakai wordpress yang tinggal next next kelar? haha. Akhirnya menginjak tahun 2016 dimana saya mulai belajar tentang web, langsung ga pake belajar fundamental melainkan langsung lompat ke framework Laravel. Dari kenal framework keren ini langsung coba bikin blog yang mana pakai Laravel untuk halaman depannya (blade) dan pakai Vuejs di admin dashboard nya (CMS).

Pakai stack ini berjalan cukup lama, kira kira 1,5 tahun. yang akhir nya udah bosen sama bahasa ini dan mulai melirik js :P

## Vuejs

Tahun 2018 mulai mendalami Vuejs dan berniat untuk mengubah stack blog saya menjadi static web menggunakan Vuejs. Mulai baca baca gimana bikin web static generate yang pake vuejs dan konten nya dibikin pake markdown, pilihan jatuh kepada Nuxtjs / Gridsome. Nah karena Nuxtjs ini terlalu kompleks dan terlalu luas (Bisa jadi SSR, bisa static generate, bisa SPA, dll) sedangkan Gridsome sendiri dikhususkan untuk static generate saja, maka pilihan jatuh kepada Gridsome.

Main Gridsome ini asik banget, struktur nya ga jauh beda dengan Nuxtjs, jadi jika kalian udah pernah pake Nuxtjs, maka ga bakalan kesusahan deh untuk main main dengan Gridsome. Lebih lanjut lagi, tinggal baca baca docs nya Gridsome, ikutin arahannya, voila !! kelar. Dalam hal deployment pun juga gampang banget, di docs nya udah di arahin gimana cara deployment ke netlify / zeit now, gampang banget. Jika dibandingkan kalau kita build static web menggunakan Nuxtjs, ada beberapa step yang harus dibikin manual dan itu lumayan pusing.

## Svelte

Nah akhir nya jagoan kita muncul juga, yak Svelte versi 3. Si Svelte ini bandel banget, baru muncul di akhir 2016, eh sekarang udah versi 3 aja. Jadi sedikit informasi, svelte ini ga bisa dikatakan sebagai framework, ga bisa juga dikatakan sebagai library. Jadi posisi dia di tengah tengah, yakni Semi-Framework.

Berbeda dengan Vue dan React yang mana mereka disebut dengan framework dan Library, Svelte ini lebih ke JS Compiler. Jika pada Vue dan React, library nya ikut di sematkan ke production bundle (yang mana size nya juga lumayan, sekitar 150kb++), Svelte ini berbeda, library dia hanya hidup di lingkungan Development saja. Gampang nya kalau kita lihat di package.json, Vue dan React dependency nya di taruh di block dependencies, sedangkan Svelte sendiri di taruh di devDependencies.

Artinya libs Svelte ini ga ikut dimuat ke production / live, karena bundle js yang dimuat sudah di compile terlebih dahulu dibelakang. Maka hasil akhirnya, bundle js yang di muat di production hanya berkas vanilla js yang mungil sehingga web yang dihasilkan pun akan jauh lebih cepat.

## Bacot mulu, mana cerita intinya?

Sabar njeng, ini mau mulai haha. Jadi tuh sebagai developer yang ingin berkembang, kita ga bisa dong stuck di satu tempat aja, mulai dari blogspot, naik dikit ke WP, naik dikit ke Laravel, trus ke JAMStack pake Vue, dan sekaranglah stack paling tinggi (yang saya rasakan saat ini) yakni Svelte. Bikin static web pake Svelte ga semudah di Gridsome Ferguso !! Kalau di Gridsome kita bisa tinggal pake beberapa libs yang udah tersedia, macam sitemap, markdown, dll. Nah kalau di Svelte sendiri bener bener bikin, yaa meski ga 100% bikin sendiri sih karena kalau kita pakai Sapper (Setara seperti Next nya React, atau Nuxt nya Vue) udah ada boilerplate how to make a blog with Sapper nya.

Yang paling susah adalah kurangnya library yang tersedia untuk Svelte, ya karena emang doi masih bayi (Tapi bayi bayi ini udah jago loh) sehingga masih dikit lib yang beredar. Contoh yang paling kita butuhkan untuk blog adalah sitemap. Di Svelte / Sapper, belum ada lib yang mendukung untuk mengimplementasikan fitur ini, sehingga harus bener bener putar otak biar bisa jadi. Beruntung skill googling saya lumayan jago (haha), akhir nya dapet _how to_ nya, tapi tetep harus di oprek dulu biar bisa dipake di app kita. Nih hasil nya kalau mau liat, https://gist.github.com/nusendra/05a6ccab0b4e1ad0c21dae362d1b3b98.

Yaa gitulah kira kira, kalau temen temen mau bikin static blog pake Svelte Sapper, bisa intip repository saya kesini ya

https://github.com/nusendra/blog

Silakan di clone, di modif, trus dipake :)
