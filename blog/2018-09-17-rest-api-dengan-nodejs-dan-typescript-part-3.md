---
title: REST API dengan Nodejs dan Typescript - part 3
date: 2018-09-17 07:48:05
description: "Cara membuat REST API menggunakan Nodejs, Expressjs, Typescript dan MongoDB"
slug: rest-api-dengan-nodejs-dan-typescript-part-3
---

Di penghujung tutorial series ini, kita menginjak part 3 cara membuat REST API dengan Nodejs dan Typescript. Kita kilas balik sebentar, pada [part 1](https://nusendra.com/post/rest-api-dengan-nodejs-dan-typescript-part-1) kita sudah belajar bagaimana memulai membuat project ini, dengan menambahkan dependencies yang diperlukan. Kemudian lanjut ke [part 2](https://nusendra.com/post/rest-api-dengan-nodejs-dan-typescript-part-1) kita membuat file core server yang mana ini akan menjalankan server REST API kita. Nah di penghujung tutorial series part 3 ini kita akan belajar bareng bagaimana membuat routes dan model mongodb nya.

Pertama mari kita buka file yang sudah kita buat seperti di part 1. Kita buka `src/models/user.ts` kemudian isikan seperti berikut ini

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

Pada file model ini kita membuat sebuah model dari collection users. Setelah itu kita buat file route nya, buka file `src/routers/UserRoutes.ts` kemudian isikan seperti berikut ini

```javascript
import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.store);
  }

  public index(req: Request, res: Response): void {
    User.find().then(result => {
      res.status(200).json(result);
    });
  }

  public store(req: Request, res: Response): void {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    }).then(result => {
      res.status(200).json(`User ${result['name']} berhasil dibuat`);
    });
  }

  public update(req: Request, res: Response): void {
    // silakan pelajari update data
  }

  public delete(req: Request, res: Response): void {
    // silakan pelajari delete data
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
```

Pada file ini kita buat router untuk REST API nya. Disini saya hanya mencontohkan method store saja, sisa nya temen temen bisa pelajari sendiri ya :-). Penjelasannya, pertama class UserRouter memanggil constructor routes nya, dimana function routes ini sebagai pendeklarasi untuk menuju ke method mana ketika ada request yang masuk.

Nah untuk models dan routes sudah siap, sekarang kita kembali file `src/server.ts` untuk mengimportkan router kita. Tambahkan kodingan seperti berikut

```javascript
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
require('dotenv').config();

// import router
import UserRouter from './routers/UserRouter';  // Tambahkan baris ini

// server class
class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    const MONGO_URI = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DBNAME}?authSource=admin`;
    mongoose.set('useCreateIndex', true);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(cors());
  }

  public routes():void {
    this.app.route('/').get((req, res) => {
      res.status(200).json('Catatan Keuangan Rest API');
    });

    this.app.use('/users', UserRouter);  // Tambahkan baris ini
  }
}

export default new Server().app;
```

Pada file server ini kita sudah menambahkan router untuk model user. Silakan temen temen run server nya.

Pertama kita siapkan dulu 2 terminal yang sudah berada di lokasi folder project kita. Terminal pertama ketikkan

```
$ yarn ts
```

perintah diatas untuk menjalankan compiler typescript. Kemudian pada terminal kedua ketikkan sebagai berikut

```
$ yarn server
```

perintah diatas untuk menjalankan server kita dengan hot reload.

Kemudian silakan temen temen akses ke `localhost:4444/users`, jika kalian menemukan response nya seperti ini `[]` berarti server kita sudah sukses terhubung dengan mongodb. Nah sekarang coba kita post data untuk registrasi user (misalnya)

Buka Postman, ubah methode nya ke `POST` dan arahkan url nya ke `localhost:4444/users`, setelah itu masuk ke section body, pilih radio button `raw` dan set tipe raw nya menjadi ,JSON (aplication/json). isikan data json nya seperti dibawah ini

```javascript
{
    "name": "andra",
    "username": "nusendra",
    "password": "password"
}
```

Jika berhasil anda akan mendapatkan response code 200. Kemudian silakan cek ke database mongodb anda, harus nya sih sudah  berhasil ya. Kalau belum berhasil mungkin ada beberapa langkah yang terlewat, kalian temen temen bisa komentar dibawah untuk tanya tanya dan diskusi mengenai topik kita kali ini.

Silakan clone repo tutorial ini kesini [https://github.com/nusendra/nodejs-express-typescript](https://github.com/nusendra/nodejs-express-typescript)

Makasih udah mampir, semoga bermanfaat...
