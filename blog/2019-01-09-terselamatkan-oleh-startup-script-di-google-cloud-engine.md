---
title: Terselamatkan oleh Startup Script di Google Cloud Engine
date: 2019-01-09 13:48:58
description: "Lupa membuka akses ssh / port 22 di ufw bisa diatasi dengan fitur Startup Script di metadata GCE"
slug: terselamatkan-oleh-startup-script-di-google-cloud-engine
---

Manusia tempat nya salah dan lupa, gak ada orang yang ga pernah lupa, adanya ya cuma keseringan lupa atau jarang mengalami kelupaan? Kalau saya termasuk yang pertama, sering lupa haha. Kelupaan ini terjadi ketika saya ingin membuka port tertentu di VPS Google Cloud melalui UFW.

Oh iya bagi yang belum tau apa itu ufw, ufw adalah sebuah sebuah fitur di Linux yang berfungsi untuk mengatur firewall. Nah biasanya ufw ini dipakai untuk ngebatasin port port mana saja yang boleh diakses. Oke lanjut ke cerita, Jadi saya install tuh ufw untuk allow beberapa port di vps. Setelah berhasil dan selesai semua, saya logout dari ssh. Kemudian ketika ingin login kembali, muncul informasi bahwa saya tidak diperbolehkan untuk login ke ssh karena port nya engga terbuka (ternyata saya lupa untuk allow port 22 di ufw nya haha).

Waduh, gimana cara allow port 22 jika kita ga bisa masuk ssh. Setelah ngalor ngidul cari solusi, ternyata dapat nih. Caranya kita harus mainin startup script di fitur metadata nya GCE.

## How To ??

1. Login ke Console Google Cloud kalian, kemudian cari fitur "metadata", temen temen bisa cari dengan mengetikkan metadata di kolom pencarian, atau ke menu Compute Engine -> metadata
2. Kemudian buat metadata baru, dan input kolom key nya dengan nama metadata nya, misalkan "ssh"
3. Untuk value nya isikan seperti berikut ini

```
#! /bin/bash
sudo ufw allow 22/tcp
```

4. Simpan
5. Stop instance nya, kemudian start kembali

Penjelasannya, ketika instance VM nya dihidupkan, maka VM akan menjalankan script diatas, yaitu menambahkan / membuka port 22 di ufw. Jadi ketika VM sudah jalan, kita bisa login ke ssh dengan aman dan nyaman :D.

<hr/>

Sekian postingan nya, cuma catatan kecil saja haha. Sebagai pengingat kalau suatu hari ada kejadian atau kelupaan seperti ini lagi. Moga bermanfaat bagi yang baca..
