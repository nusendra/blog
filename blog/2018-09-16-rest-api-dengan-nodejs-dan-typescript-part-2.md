---
title: REST API dengan Nodejs dan Typescript - part 2
date: 2018-09-16 22:57:57
tags: ['typescript','expressjs','nodejs']
description: "Cara membuat REST API menggunakan Nodejs, Expressjs, Typescript dan MongoDB"
slug: rest-api-dengan-nodejs-dan-typescript-part-2
---

Artikel lanjutan tentang membuat REST API dengan Nodejs dan Typescript. Di part 2 ini kita akan setting app server core kita dan implementasi mongoose. Kita kilas balik lagi terlebih dahulu, berikut ini package yang akan saya gunakan dan script untuk menjalankan server kita

```javascript
{
  "name": "Nodejs with TS",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "mocha -r ts-node/register src/**/*.spec.ts",
    "ts": "tsc -w",
    "server": "nodemon ./build/index.js",
    "start": "tsc && node ./build/index.js"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "compression": "^1.7.3",
    "cors": "^2.8.4",
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "helmet": "^3.13.0",
    "mongoose": "^5.2.13",
    "morgan": "^1.9.0",
    "nodemon": "^1.18.4"
  },
  "devDependencies": {
    "@types/chai": "^4.1.4",
    "@types/chai-http": "^3.0.5",
    "@types/compression": "^0.0.36",
    "@types/cors": "^2.8.4",
    "@types/express": "^4.16.0",
    "@types/helmet": "^0.0.40",
    "@types/mocha": "^5.2.5",
    "@types/mongoose": "^5.2.11",
    "@types/morgan": "^1.7.35",
    "@types/node": "^10.9.4",
    "chai": "^4.1.2",
    "chai-http": "^4.2.0",
    "mocha": "^5.2.0",
    "ts-node": "^7.0.1",
    "typescript": "^3.0.3"
  }
}
```

Yang perlu diperhatikan selanjutnya adalah dibagian script. Disana ada 4 mode, penjabarannya sebagai berikut.

1. test : Untuk melakukan unit testing dan TDD
2. ts : Untuk menjalankan compiler typescript, yang mana compiler ini akan mentransformasikan dari format ts ke js dan di simpan ke folder build.
3. server : Untuk menjalankan server kita (dengan hot reload, thanks nodemon !!)
4. start : Untuk deployment server production.

Setelah semua sudah siap, mari kita lanjut ke tahap pembuatan core server nya. Karena pada part 1 kemarin kita sudah membuat file file kosong yang siap untuk diisi, maka selanjutnya kita hanya mengisi file kosong tersebut. Pertama buka file `src/server.ts` kemudian isi seperti ini.

```javascript
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
require('dotenv').config();

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
      res.status(200).json('Hai ini adalah API menggunakan Nodejs dan Typescript');
    });
  }
}

export default new Server().app;
```

Pada tahap / file ini, kita membuat sebuah file server dan memasukkan semua dependencies / package yang kita perlukan. Pada file ini kita hanya membuat satu route saja, yakni / . Setelah semua sudah siap, kita mulai isi file  `src/index.ts` sebagai main file yang berfungsi untuk menjalankan server kita.

```javascript
import * as debug from 'debug';
import * as http from 'http';
require('dotenv').config();

import Server from './server';

debug('ts-express:server');

const port = normalizePort(process.env.PORT);
Server.set('port', port);

console.log(`Server listening on port ${port}`);

const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
```

Pada file ini kita memanggil file server untuk dijalankan, selain itu file ini juga akan menangani port mana yang sudah terbuka.

Pada tahap ini, server kita harusnya sudah bisa jalan. Caranya bagaimana?? Pertama kita siapkan dulu 2 terminal yang sudah berada di lokasi folder project kita. Terminal pertama ketikkan

```
$ yarn ts
```

perintah diatas untuk menjalankan compiler typescript. Kemudian pada terminal kedua ketikkan sebagai berikut

```
$ yarn server
```

perintah diatas untuk menjalankan server kita dengan hot reload.

Setelah selesai menjalankan server, coba buka browser anda dan ketikkan `localhost:4444` di url nya, harusnya di browser kalian akan tampil `Hai ini adalah API menggunakan Nodejs dan Typescript`.

Jika browser kalian tampil seperti diatas, berarti server kalian sudah berjalan dengan sempurna. Pada part 3, kita akan lanjut menggunakan router dan mongoose agar kodingan kita semakin terstruktur dan mudah untuk digunakan.

Sekian dari saya, terima kasih udah mampir....
