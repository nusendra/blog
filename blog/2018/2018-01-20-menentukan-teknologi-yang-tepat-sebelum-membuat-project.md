---
title: Menentukan Teknologi Sebelum Membuat Project
date: 2018-01-20 14:59:09
tags: ['opini']
description: "Banyak programmer yang salah dalam menentukan teknologi sebelum membuat project, hal ini bisa mengakibatkan proses development kita jadi terganggu, bahkan bisa bikin pindah jalur. Duhh..."
slug: menentukan-teknologi-yang-tepat-sebelum-membuat-project
---

Sebelum mulai melangkah untuk membuat project baru, alangkah bijaknya jika **kita menentukan teknologi sebelum membuat project**. Kenapa kita perlu memikirkan teknologi apa yang akan kita pakai untuk project kita, karena jika kita salah pilih maka ditengah tengah proses development, kita akan merasa tersesat dan tidak bisa mengembangkan aplikasi secara maksimal. Misalnya kita pengen bikin aplikasi internal untuk kantor, kemudian kita asal aja pake C# untuk aplikasi desktop. Eh ternyata di kemudian hari, si bos minta dibuatin aplikasi mobile nya, nah loh ujung ujungnya kita bakal create new project untuk handle API nya. Jadi nya kita kerja dua kali, huuhuuhuu...

## BERPIKIR PANJANG DEMI JANGKA PANJANG

Maksudnya disini, sebelum kita menentukan sebuah teknologi yang akan membantu kita untuk membuat sebuah apps, kita harus mengerti dulu scope apps kita nanti seperti apa. Misalkan app kita nanti hanya untuk client dan berjalan di desktop windows, dan jangka panjang tidak ada pengembangan lagi. Maka tidak masalah jika memakai C# atau java (misalnya). Misalkan lagi kita pengen bikin app yang nanti nya bisa dibuka pake mobile, di web juga bisa. Maka kita perlu menentukan teknologi backend dan frontend apa yang cocok untuk apps kita. 

Jangan sampai kita asal asalan bikin app tanpa berpikir panjang nanti kedepannya seperti apa, karena di tengah jalan pasti mengalami kesulitan jika salah menentukan teknologi. Contoh gampang nya, seorang mahasiswa kalo salah ambil jurusan, mayoritas membutuhkan waktu yang lama untuk lulus. Bahkan ada yang sampai pindah jurusan. Begitu juga dengan apps kita, jangan sampai kita salah pilih teknologi, yang nanti ditengah jalan malah beralih ke teknologi lain, wasting time bro.

> Nah karena kita udah ngerti apa yang harus dilakukan sebelum bikin apps, sekarang mari kita pilih pilih teknologi yang cocok. FYI sebelum lanjut, postingan ini opini saya pribadi dan gak bisa di generalisasi.

## DESKTOP, MOBILE, ATAU WEB APPS ?

Jika jangka panjang bisa dipastikan hanya butuh desktop app, maka yang perlu temen temen perhatikan selanjutnya adalah apakah nantinya app ini multi platform atau hanya berjalan di OS Windows. Ingat, kita perlu memikirkan tujuan kedepan, karena jaman now apps berbasis desktop sudah mulai ditinggalkan. Di Windows, kita bisa pakai C#.NET untuk app yang hanya bisa berjalan di sistem operasi Windows saja. Jika app nya bisa jalan di multi platform, bisa pakai Python atau Java. Nah jika saya pribadi, lebih baik pakai java / python saja dikarenakan komunitas dan jobs yang membutuhkan bahasa ini lebih besar. Dan juga multi platform tentu nya

Jika pengen bikin mobile apps, tentunya temen temen juga harus berpikir panjang, apakah pengen bikin native apps atau web based app? Jika native app temen temen bisa pake java / Kotlin atau bisa juga pakai React Native yang berbasis Javascript. Sedangkan jika temen temen udah sering bikin web dan gak pengen belajar hal baru di dunia mobile, bisa pakai Ionic untuk membangun mobile app yang berbasis web view. Nah karena performa adalah segalanya, maka sebisa mungkin kita menggunakan teknologi native untuk membangun nya. Pilihan kita persempit dan jatuh kepada Java / Javascript. Jika kalian udah terbiasa bermain dengan Javascript, temen temen bisa pakai React Native besutan Facebook. Dan jika kalian udah terbiasa di lingkungan Java, temen temen bisa langsung pakai Kotlin saja. Dan jangan lupa ya, mobile app ini juga butuh sebuah backend untuk melayani ketersediaan data.

> Backend kerjanya sebagai penyedia data (Data Service) sedangkan frontend adalah UI / tampilan dari sebuah apps yang ada di sisi client

Yang terakhir Web app. Web app ini yang pualing banyak dicari dan digunakan, bahkan mayoritas perusahaan kalau mau ngerekrut programmer, umumnya yang bisa bikin web app. Web ini jangkauan nya luas, terbagi menjadi beberapa layer. Ada frontend dan backend atau Full Stack Web app. Jika temen - temen pengen bikin web app yang engga perlu ribet di frontend (maksudnya satu project itu ada backend dan frontend nya), maka temen temen bisa pakai CodeIgniter / Laravel / Yii2.

Jika temen temen pengen bikin web yang terpisah repository nya, misalkan backend project sendiri dan frontend project sendiri. Di Backend kita bisa milih lagi, mau pake bahasa apa, misalkan kita persempit secara umum saja yaitu PHP dan Javascript. Untuk Backend sebagai penyedia API yang menggunakan PHP, kita bisa pakai Lumen / Slim / Silex. Sedangkan jika udah terbiasa bermain dengan Javascript, bisa pakai nodeJS dengan Express / AdonisJS misalnya sebagai framework JS nya.

Oh iya, sebagai catatan. Untuk backend penyedia API berbasis PHP, disarankan untuk menggunakan microframework saja karena dengan tujuan memberikan response yang cepat dan tanggap, bisa pakai Lumen / Slim / Silex. Boleh sih pakai Full Framework seperti Laravel / Yii2, tapi engga disarankan karena mereka ini sebenernya ada di posisi full stack web. Jika dipakai untuk kebutuhan API, apalagi nanti app nya udah gede, bisa dipastikan response yang diberikan akan melambat karena framework mereka ini kaya akan fitur yang gak kita pakai. Contoh sederhananya, kita pengen liburan nih. Tentunya barang barang yang kita bawa ya sesuai keperluan dong ya, seperti pakaian dan peralatan mandi. Kan engga mungkin kita bawa satu lemari, bawa TV, bawa kasur, dll. Itulah perumpamaan sebaiknya kita bawa seperlu nya (Lumen / Slim) daripada bawa perlengkapan yang engga penting (Laravel / Yii ).

Balik lagi bahas Web app ya. Backend udah kita jelasin, sekarang bagian frontend. Frontend ini kita bisa pakai Javascript (sangat disarankan) dan framework JS yang bisa kita gunakan adalah Angular / React / Vue. Silakan temen temen pilih satu diantara tiga itu yang paling disenangi. Kalau saya pribadi sih pilih VueJS ya, karena emang dari learning curve nya sangat mudah, dan two way data binding nya bikin jatuh hati. Nah ngomong - ngomong masalah frontend ini nanti juga harus ditentukan, pengen bikin Traditional Web App atau Single Page Application? Insya allah akan saya bahas di postingan berikut nya.

<hr/>

Setelah pembahasan yang puanjang diatas, pertanyaan akan balik lagi ke kita. Mau pake teknologi apa? Dan jangan sampai salah pilih ya. Sekedar mau mengingatkan lagi, bahasa - bahasa / teknologi diatas yang saya sebutkan merupakan teknologi yang paling banyak dipake oleh temen temen programmer. Jika ada salah kata dari saya mohon dimaafkan, dan semoga berguna bagi temen - temen yang mau memulai bikin project. Ingat, jangan salah pilih yaaaa..
