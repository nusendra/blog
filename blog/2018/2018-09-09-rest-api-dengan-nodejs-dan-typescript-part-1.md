---
title: REST API dengan Nodejs dan Typescript - part 1
date: 2018-09-09 18:56:03
tags: ['typescript','expressjs','nodejs']
draft: false
description: "Cara membuat REST API menggunakan Nodejs, Expressjs, Typescript dan MongoDB"
slug: rest-api-dengan-nodejs-dan-typescript-part-1
---

Baik kali ini saya akan sharing sedikit bagaimana membuat REST API menggunakan Nodejs dan typescript. Sebagai informasi awal, NodeJS adalah runtime Javascript yang berjalan diatas mesin Javascript Chrome V8. Bagi kalian yang suka bikin frontend web pake javascript framework, maka tentunya dibagian backend paling enak dan cocok bisa pake Nodejs karena natively Nodejs menggunakan json sebagai komunikasi dan pertukaran data nya. Sedangkan TS (Typescript) sendiri adalah bahasa pemrograman berbasis javascript yang memiliki fitur strong-typing & konsep pemrograman OOP klasik ( class, interface), cocok banget bagi kalian yang suka main OOP.

Pada bagian pertama ini saya akan menjelaskan terlebih dahulu environment dan packages apa saja yang akan kita pakai nanti. Secara garis besar di sisi environment kita akan menggunakan NodeJS sebagai backend server nya dan MongoDB sebagai database persistent nya. Untuk package standart kita akan pakai sebagai berikut:

1. Typescript untuk superset javascript
2. Body Parser untuk parse body request
3. Compression untuk nodejs compression middleware
4. CORS untuk handle Cross Origin
5. Dotenv untuk mengatur environment variable
6. Express untuk framework nodejs
7. Helmet untuk pengaman express app
8. Mongoose untuk database ORM
9. Morgan untuk app logger
10. Nodemon untuk refresh otomatis server ketika ada perubahan file
11. Nah diatas itu penjelasan secara singkat, untuk lebih detail nya silakan gugling sendiri ya :-)

Struktur project yang akan kita buat standart banget, seperti berikut ini

```
src
--models
----User.ts
--routers
----UserRoutes.ts
--index.ts
--server.ts
.env
package.json
tsconfig.json
```

Baik langsung saja kita mulai bikin struktur folder nya dulu ya. Oh iya, disini saya pake yarn. Kalo pake npm silakan sesuaikan sendiri ya

```
$ mkdir node-express-typescript
$ cd node-express-typescript
$ mkdir src
$ mkdir src/models
$ touch src/models/User.ts
$ mkdir src/routers
$ touch src/models/UserRoutes.ts
$ touch src/index.ts
$ touch src/server.ts
$ touch .env
$ touch tsconfig.json
```

Setelah struktur folder sudah selesai dibuat, sekarang saat nya instalasi package nya

```
$ yarn add body-parser compression cors dotenv express helmet mongoose morgan nodemon --save
```

dan devdepencies nya

```
$ yarn add -D @types/compression @types/cors @types/express @types/helmet @types/mongoose @types/morgan @types/node typescript
```

Saya sudah bikin [boilerplatenya](https://github.com/nusendra/nodejs-express-typescript), jadi bisa langsung copy file package.json nya kemudian yarn install saja .

Setelah itu kita isi file tsconfig.json nya seperti berikut ini

```javascript
{
  "compilerOptions": {
    "outDir": "./build",
    "module": "commonjs",
    "target": "es6"
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

Kemudian isi file .env nya seperti berikut ini

```
USERNAME=USERNAME_MONGODB_KAMU
PASSWORD=PASSWORD_MONGODB_KAMU
HOST=HOST_DAN_PORT_MONGODB_KAMU
PORT=4444
DBNAME=NAMA_DATABASE_MONGODB_KAMU
```

Nah part 1 ini sudah selesai kita buat. Di part 1 ini kita sudah bikin boilerplate untuk app nodejs kita. Dan lagi disini server kita masih belum bisa jalan ya. Akan kita lanjut di part berikut nya. Terima kasih sudah mampir teman teman, semoga bermanfaat
