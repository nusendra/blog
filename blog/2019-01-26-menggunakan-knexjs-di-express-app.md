---
title: Menggunakan Knexjs di Express App
date: 2019-01-26 12:53:35
tags: ['expressjs']
description: "Menggunakan Knexjs di Express App untuk memudahkan penulisan query di database."
slug: menggunakan-knexjs-di-express-app
---

Ketika kita membangun sebuah aplikasi dengan Express js, seringkali kita dihadapkan dengan sebuah pertanyaan besar, ORM mana yang akan kita pakai untuk memudahkan penulisan query database. Di MongoDB kita bisa menggunakan mongoose, di dunia RDBMS kita bisa pakai Sequelize, Knexjs, node-orm2, dll. Nah kali ini saya akan jelaskan bagaimana cara mudah pakai Knexjs di proyek aplikasi kita.

> Sebelumnya saya ingin menginformasikan bahwa disini saya pakai typescript dan express, untuk database saya pakai PostgreSQL. Bagi temen - temen yang pakai javascript ES5++ bisa menyesuaikan sendiri ya

## Install Knexjs dan driver

Pertama kuy kita install dulu Knexjs dan driver nya.

```
$ yarn global add knex
```

Diatas ini berfungsi untuk memasang knexjs secara global di local environment kita, sehingga nanti nya kita bisa menginisiasi file config knexjs di project kita. Selanjutnya mari install knex dan driver nya

```
$ yarn add knex pg
```

Diatas akan menginstall knex dan driver postgres di project kita. Kalau temen temen pakai mysql, bisa pakai `mysql2`.

## Setup

Masuk ke folder project kita dan buka terminal disana, ketik seperti dibawah ini untuk generate file konfigurasi Knexjs

```
$ knex init
```

Maka nanti di root project kalian akan muncul satu file baru bernama knexfile.js. Silakan temen temen setup sesuai dengan kebutuhan.

```javascript
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: localhost,
      port: 5432,
      database: database_saya,
      user: postgres,
      password: rahasiadong
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    useNullAsDefault: true
  }
}
```

Saya contohkan config development env saya seperti diatas. Untuk file migrations saya taruh di folder `/database/migrations`.

> Jika temen temen pernah bermain dengan Laravel / Lumen / AdonisJS, maka kalian gak akan kesulitan dengan ORM ini.

## Migrations

Migration disini memudahkan kita untuk membuat table di database kita, juga bisa berfungsi sebagai version control terhadap desain database kita. Untuk mulai membuat file migration, masuk ke root folder dan buka terminal kemudian ketikkan dibawah ini

```
$ knex migrate:make user
```

Perintah diatas berfungsi untuk membuat file migration yang akan digunakan untuk membuat table bernama user (atau users). Silakan masuk ke folder /database/migrations yang tadi sudah dibuat dan disana kalian akan menemukan sebuah file migration yang bernama user. Yuk kita modif file nya sehingga kita bisa pakai untuk membuat table.

```javascript
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('phone', 20).unique();
    table.date('register_date').defaultTo(knex.fn.now());
    table.string('address');
    table.boolean('status');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
```

Untuk mengetahui schema / tipe data apa saja yang bisa kita pakai, silakan langsung cek ke docs nya Knex karena disana udah lengkap banget. Nih link nya [https://knexjs.org/#Schema-Building](https://knexjs.org/#Schema-Building)

Oh iya, di file migration tadi ada Promise juga yang berfungsi semacam transaction. yang artinya kita bisa menjalankan migrasi lebih dari satu table didalam Promise itu. Dan jika terdapat salah satu table migrasi yang gagal, maka knex akan membatalkan keseluruhan proses migrasi di file itu (Pelajari transaction di Database). Tapi untuk best practice nya, dalam satu file migrasi, kita usahakan untuk dipakai oleh satu table saja.

Kemudian kita jalankan migration nya agar table nya terbentuk, ketik perintah

```
$ knex migrate:latest
```

Untuk menghapus migrasi sebelumnya, bisa pakai

```
$ knex migrate:rollback
```

Konsep nya sama dengan Laravel hahaha.

## Menggunakan Knexjs

Pertama buat sebuah file konfigurasi untuk menghubungkan knex dan file knexfile nya (belibet yak ngomongnya haha). Buat sebuah folder baru di `/database/config` dan beri nama knex.js

```javascript
const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];

module.exports = require('knex')(config);
```

Kemudian pada apps kita (Bisa berada di index.js, controller, atau router. Bebas teman teman taruh mana) kita import knex nya dan kita jalankan. Pada kasus berikut ini saya pakai controller menggunakan typescript.

```javascript
import { Request, Response, NextFunction } from 'express';
import * as knex from '../../database/config/knex.js';

class UserController {
  public async index (req: Request, res: Response) {
    knex.select().form('users').then( response =>
      res.status(200).json(response)
    );
  };
};

export default UserController;
```

Diatas adalah query untuk memanggil semua data users.

<hr/>

Demikian adalah pengenalan singkat tentang Knexjs, untuk penggunaan selanjut nya insya allah akan saya sampaikan di postingan berikut nya. Semoga bermanfaat buat temen temen, jika masih ada pertanyaan atau tambahan mohon untuk di tulis di kolom komentar dibawah ya. Thanks for stopping by..
