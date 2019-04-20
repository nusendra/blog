---
title: Berkenalan dengan VueJS
date: 2018-01-15 07:29:36
description: "Berkenalan dengan VueJS merupakan sebuah awal untuk menjalin cinta dengan si dia. Untuk mempelajari dan mendalami si dia (VueJS), maka kita perlu kenalan dulu sama si dia. Yuk belajar bareng.."
slug: berkenalan-dengan-vuejs
---

Judul kali ini pengen bahas frontend yakni Berkenalan dengan VueJS. Setelah sebelumnya kita berkecimpung di dunia Backend PHP (Laravel dan Lumen), yuk refreshing dulu dengan belajar tentang dunia frontend. Saya pilih VueJS untuk pembahasan kali ini bukan tanpa alasan, berdasarkan situs ini [https://risingstars.js.org/2017/en/](https://risingstars.js.org/2017/en/) VueJS menduduki peringkat pertama dan mengalahkan ReactJS yang sekarang ini juga lagi banyak digandrungi para programmer frontend. Bahkan di web official nya vuejs sendiri mengatakan bahwa vuejs itu seperti mengambil kekuatan Angular + React dan membuang kelemahannya, serta menambahkan jurus jurus pamungkas baru yang kemudian terbentuklah VueJS (Ini bahasa saya sendiri sih hehe).

Mari kita tarik lagi ke depan, apa sih VueJS itu? VueJS adalah javascript framework yang berfungsi untuk membangun sebuah UI / tampilan dari sebuah web. Jika pada laravel kita menemukan bentuk MVC (Model, View, Controller), berbeda dengan VueJS ini yang hanya menangani masalah di View nya saja dan sangat fokus pada pembangunan halaman frontend web. VueJS mempunyai tagline The Progressive Javascript Framework. Dan memang benar, setelah saya berselancar di lautan vue, saya merasakan sekali betapa reactive nya framework ini. Two way data bindingnya bikin saya jatuh cinta pada pandangan pertama #cieCie

Kelebihan lain yang bisa kita rasakan dengan adanya VueJS ini, kita bisa membangun sebuah website SPA (Single Page Application). Apa itu SPA? SPA adalah sebuah app / website dimana ketika kita berpindah halaman, browser tidak lagi melakukan reload seluruh element halaman, hanya content saja yang di load. Dengan begini sebuah web akan memberikan response yang lebih cepat. Selain itu, dengan SPA browser tidak perlu mendownload ulang element element yang sebelumnya sudah ada, dengan begini user bisa menghemat bandwidth dan paket data mereka. Insya Allah akan saya bahas khusus mengenai SPA vs Tradisional web di postingan berikutnya.

Ada lagi yang gak asing di telinga para pemain framework, yaitu component. VueJS ini merupakan framework yang berbasis component (seperti React, entah di framework yang lain juga sama atau engga, soalnya engga pernah nyobain selain react dan vue). Dengan menggunakan component ini, kita bisa memanfaatkan component ini di banyak halaman web. Kita perlu membuat satu component, dan bisa kita panggil di halamana manapun. Sangat praktis dan pastinya mempercepat development web kita.

## LALU, APA BEDANYA DENGAN JQUERY ?

Pertanyaan ini juga dulu pernah saya tanyakan kepada teman saya (ketika itu saya belum mengenal framework JS). Sebenarnya pertanyaan ini sama dengan ketika kita bertanya, lalu apa bedanya php dengan javascript?? Gak akan nyambung, karena emang scope mereka berbeda. Contoh paling gampang dalam memandingkan jquery dengan vuejs adalah, kita tidak bisa membangun web frontend dengan jquery murni, pasti html akan ikut terlibat. Sedangkan vuejs (atau framework JS yang lain) bisa membuat sebuah frontend web tanpa bantuan dari html native.

## INSTALASI NODEJS DAN NPM

Jika temen temen memakai Laravel 5.5, disana sudah disiapkan vuejs untuk membangun frontend. Selain itu juga sudah ada contohnya. Tapi kali ini saya gak akan bahas vuejs yang ada di Laravel, kita akan belajar vuejs murni yang bisa kita install memakai CLI milik vuejs yang bernama Vue-CLI. Mari kita coba instalasi.

pertama pastikan terlebih dahulu kalian udah menginstall nodeJS dan npm nya.

```
$ sudo apt-get update
$ sudo apt-get install nodejs
```

Setelah proses instalasi nodejs selesai, silakan install npm nya

```
$ sudo apt-get install npm
```

Jika udah. Silakan temen - temen cek apakah keduanya sudah terinstall dengan benar dengan mengetikkan dibawah ini

```
$ node -v
$ npm -v
```

## INSTALASI VUEJS

Silakan temen temen buka terminal kalian, kemudian ketika seperti dibawah ini

```
$ npm install --global vue-cli
```

Dengan adanya vue-cli ini, kita bisa membuat project vue pertama kita. Lanjut ketik seperti dibawah

```
$ vue init webpack nama-project-kalian
```

Setelah itu ada proses isian data mengenai project yang akan kita buat

![nusendra-success-install-vue](https://farm5.staticflickr.com/4708/24831388627_754f8093d4_o.png "vue install")

```
$ cd nama-project-kalian
$ npm install
$ npm run dev
```

maka akan muncul tulisan seperti dibawah ini.

`Your application is running here: http://localhost:8080`

![nusendra-success-install-vue](https://farm5.staticflickr.com/4701/24831538637_ace51db60e_o.png "success vue install")

Yeahhh, kita berhasil menginstall vuejs

<hr/>

Di postingan berikut nya saya akan bahas secara random mengenai Laravel / Lumen / VueJS / NuxtJS. Silakan temen temen mengunjungi di masing - masing kategori nya untuk bisa mengikuti serial blog ini secara urut. Akhir kata, semoga bermanfaat buat temen - temen yang lagi belajar frontend...
