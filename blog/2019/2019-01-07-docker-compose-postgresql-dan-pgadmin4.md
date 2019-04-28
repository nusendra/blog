---
title: Docker Compose PostgreSQL dan pgAdmin4
date: 2019-01-07 10:57:25
tags: ['devops']
description: "Install PostgreSQL dan pgAdmin4 di docker menggunakan Docker Compose."
slug: docker-compose-postgresql-dan-pgadmin4
---

Di dunia teknologi, sangat banyaaakkk sekali yang harus dipelajari apalagi bagi seorang Full Stack seperti saya. Di development perlu belajar bahasa pemrograman nya, belajar konsep konsep / pattern dalam development, mempelajari framework, belajar backend development, frontend development, unit testing, dan segala tetek bengek nya. Belum sampai disitu, setelah app sudah selesai di develop pun, masih harus mikir gimana cara deployment ke server secara tepat. Disini bisa mempelajari Docker, Continous Integration, Continous Deployment, dll. Banyak bener haha.

Nah kali ini mau bahas sedikit saja tentang docker dan docker compose. Saya ga akan bahas tentang tata cara instalasi docker dan docker compose, temen temen bisa mencari sendiri artikel artikel diluar sana. Oh iya, selain itu untuk tau apa itu docker, temen temen juga bisa baca atau liat youtube. Saya lebih menyarankan nonton youtube nya saja, karena bisa lebih mudah dipahami.

## Docker Compose
Yang akan kita bahas kali ini adalah, bagaimana install Database PostgreSQL dan pgAdmin4 di docker dan menjalankan nya. Btw kita pakai docker-compose untuk memudahkan membuat container nya. Baik, pertama masuk ke folder project kalian, kemudian bikin sebuah file yang bernama docker-compose.yml

```
$ touch docker-compose.yml
```

Kemudian Kita isi file tersebut seperti dibawah ini

```
version: "3"

services:
  postgres:
    image: postgres:alpine
    ports:
      - "5432:5432"
    volumes:
      - ./dbdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=rahas1a
  pgadmin4:
    image: dpage/pgadmin4
    ports:
      - "5433:80"
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@nusendra.com
      - PGADMIN_DEFAULT_PASSWORD=rahas1a
```

Penjelasan :

Pertama kita butuh 2 services, yaitu postgreSql dan pgAdmin nya. Maka kita buat postgres dan pgAdmin4. Kemudian untuk image dari postgres kita pakai alpine, agar size image nya kebih kecil. Untuk persistent data nya, kita tentukan volumes nya. Fungsi nya agar data di database kita ga hilang ketika kita menjalankan container baru dengan docker compose ini, ya inti nya biar data kita masih ada di db gitu lah. Kemudian isi password postgres nya, untuk username postgres saya biarkan kosong (default nya 'postgres')

Kemudian pada service pgAdmin4 kita pakai image dari dpage/pgadmin4. Untuk port bebas temen temen pakai mana, kalau saya pribadi pakai port 5433. Jangan lupa juga tentukan default email dan password nya.

Jika sudah selesai, simpan file tersebut dan jalankan dibawah ini

```
$ docker-compose up -d
```

Maka docker akan secara otomatis mendownload image yang dibutuhkan, kemudian menjalankan container nya.

## Coba Jalankan

Setelah selesai semuanya, silakan buka browser kalian dan ketik url `localhost:5433` untuk masuk ke pgAdmin4. Sebelum konek ke postgre, ketik ini dulu di terminal untuk mengetahui ip dari postgre nya.

```
$ docker inspect <nama container postgreSQL>
```

Setelah itu cari dibagian bawah yang ada tulisan IPAddress, catat dan masukkan ke pgAdmin4. Setelah dapat IP nya, kita masuk ke pgAdmin4, login ke web nya kemudian bikin server baru. Pada inputan IP, masukkan ip dari postgre yang didapat barusan, setelah itu isi credential yang lain nya. Voila, seharusnya temen temen sekarang sudah bisa menikmati sajian pgAdmin4 dan PostgreSQL :D.

<hr/>

Enaknya pakai docker ini, sistem kita bersih. Ga perlu install postgre di sistem kita. Selain itu ketika deployment juga lebih dimudahkan jika memakai docker, insyall allah akan saya bahas di postingan kedepan. Insya Allah ya.

Sekian dulu, semoga bermanfaat.
