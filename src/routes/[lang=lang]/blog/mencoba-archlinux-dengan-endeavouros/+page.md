---
title: "Mencoba Archlinux dengan EndeavourOS"
date: 2022-07-27 06:20:00
description: "Bosan pakai Ubuntu, pas ada critical error langsung reinstall ke Arch aja"
tags: ["OS", "Linux"]
draft: false
slug: mencoba-archlinux-dengan-endeavouros
---

<img src="https://i.ibb.co/JjvgRYZ/endeavouros-nusendra.webp" alt="endeavouros-nusendra" border="0">

Ubuntu sebagai OS paling laris di linux yang merupakan turunan dari Debian ini memang sangat mudah digunakan, cocok untuk kalangan programmer atau non-tech people. Penggunaannya sangat mudah, komunitasnya merupakan yang
terbesar jika dibandingkan dengan distro linux yang lain. Nah minggu lalu ada kesempatan untuk install Ubuntu versi 22.04 karena entah kenapa ada critical error di DE Ubuntu 20.04. Setelah coba benerin sana sini masih
belum berhasil juga, yaudah lah sekalian aja reinstall ke versi latest 22.04.

Seminggu kemudian dapet error tentang ACPI blablabla apa gitu lupa, kalo ga salah sebelumnya ngejalanin `apt update && apt upgrade` doang. Setelah googling, memang pada saat itu juga banyak yang kena problem ini. Cobain
beberapa cara yang disaranin, tetep ga berhasil dan Ubuntu nya gagal untuk load DE nya. Trus juga, di versi 22.04 ini terasa belum banyak app yang di support, dan behavior nya jadi aneh. Seperti Firefox Dev yang cursor nya bisa nyangkut di text yang ga seharusnya disabled. Trus juga beberapa app ga berjalan dengan semestinya, salah satunya AnyDesk.

Nah karena beberapa kendala tadi, akhirnya yaudah cobain Arch aja lah yang kemudian pilihan jatuh ke EndeavourOS. Ga ada alasan tertentu sih, cuman ngeliat distro ini lagi naik daun berdasarkan data dari DistroWatch.

Kendala pertama yang dialami ketika pakai distro ini adalah, package manager yang dipakai bukan pacman seperti arch pada umumnya, tetapi pakai yay. Setelah dicoba coba ternyata oke juga
nih yay, lebih memudahkan ketika pengen install app apapun. dengan tinggal ketik perintah `yay -S <app-name>` udah langsung terinstall.

Kendala kedua adalah, ternyata driver TP-Link untuk wifi tidak terinstall otomatis sebagaimana yang ada di Ubuntu. Jadi perlu ribet dulu koneksikan komputer ini ke internet pakai HP.
Setelah konek, tinggal ketik `yay -S 8188eu-dkms-git` dan ikutin perintah selanjutnya, otomatis driver udah terinstall dengan sempurna.

So far, distro ini enak banget, ringan dan enak dipandang. Apalagi distro ini lebih condong ke terminal based, yang bisa diketahui ketika ana ngebuka system monitor. Sebagai kodinger yang
lebih milih VIM daripada vscode, distro ini sempurna !!!!

Akhir kata, ternyata pakai distro ini jauh melebihi ekspektasi saya sebelumnya. Karena dulu pernah coba install arch from scratch, ribet banget gila.
