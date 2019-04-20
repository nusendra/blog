---
title: TDD Menggunakan Mocha dan Chai di Nodejs - Part 2
date: 2018-09-23 15:32:10
description: "Implementasi konsep Test Driven Development (TDD) menggunakan Mocha dan Chai di Nodejs"
slug: tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2
---

Melanjutkan dari postingan part 1 [disini](https://nusendra.com/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1), kita akan melanjutkan implementasi konsep TDD menggunakan Mocha dan Chai di nodejs. Pada tulisan part 1, kita sudah bikin testing nya (pengujian pendaftaran user dan pengujian user tidak bisa daftar jika username sudah ada). Maka pada part 2 ini kita akan memperbaiki app kita agar lolos pengujian (passed). Baik, mari kita lihat kembali hasil test dari pengujian di part 1

![nusendra-tdd-fail](https://farm2.staticflickr.com/1917/44136674284_0665742a57_c.jpg)

Disini dikatakan bahwa pengujian kedua nya gagal karena di masing - masing pengujian tidak mendapatkan response apapun, karena memang di app kita belum menambahkan fitur registrasi. Yuk kita perbaiki satu satu. Pertama kita buat dahulu file model nya. 

`// File /src/models/User.ts`

```javascript
import {Schema, model} from 'mongoose';

let UserSchema: Schema = new Schema({
  name: String,
  dateOfBirth: Date,
  address: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  createdAt: Date,
  updatedAt: Date,

})

export default model('User', UserSchema);
```

Pada model diatas kita buat sebuah aturan bahwa username bersifat unique, yang artinya tidak boleh ada username yang sama di dalam collection. Setelah itu silakan temen temen jalankan test nya lagi dengan mengetik

```
$ yarn test
```

Bisa dipastikan bahwa test nya gagal, karena kita belum mengatur routes nya. Kemudian kita masuk ke file router nya. 

`// File /src/routers/UserRouter.ts`

```javascript
import { Router, Request, Response } from 'express';
import User from '../../models/User';

class UserRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/', this.store);
  }

  public store = async (req: Request, res: Response) => {
      User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      }).then(result => {
        res.status(200).json(`User ${result['name']} berhasil di daftarkan`);
      });
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
```

Perhatikan bagian ini

```javascript
public store = async (req: Request, res: Response) => {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    }).then(result => {
      res.status(200).json(`User ${result['name']} berhasil di daftarkan`);
    });
}
```

Di method ini kita sudah bikin sebuah fungsi untuk melakukan registrasi user. Nah sekarang kita coba jalankan lagi test nya.

![nusendra-tdd-fail](https://farm2.staticflickr.com/1951/30985883348_be6b25ffb3_c.jpg)

Keren, kita sudah berhasil meloloskan pengujian pertama, yaitu pendaftaran user. Namun pada pengujian kedua kita gagal. Mari kita perbaiki kembali  router kita. Masuk ke dalam file `UserRouter.ts`, kemudian tambahkan kode berikut dibawah ini

```javascript
public store = async (req: Request, res: Response) => {
  const exists = await User.findOne({
    username: req.body.username
  });

  if (!exists) {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    }).then(result => {
      res.status(200).json(`User ${result['name']} berhasil di daftarkan`);
    });
  } else {
    res.status(400).json(`User ${exists['name']} sudah terdaftar, silakan pakai username yang lain`);
  }
}
```

Sekarang kita coba uji kembali

![nusendra-tdd-pass](https://farm2.staticflickr.com/1901/44808553362_ece3ed26b8_c.jpg)

Mantab, sekarang pengujiannya sudah berhasil lolos. Langkah selanjut nya kita tinggal merefactor atau menyederhanakan kode kita agar semakin mudah dibaca dan lebih mudah dalam maintenance.

<hr/>

Demikian postingan lanjutan kali ini. Semoga temen temen sekalian faham, dan jika masih ada yang bingung silakan tanya tanya langsung di kolom komentar, atau bisa via telegram saya. Semoga bermanfaat, dan makasih udah mampir kesini :)
