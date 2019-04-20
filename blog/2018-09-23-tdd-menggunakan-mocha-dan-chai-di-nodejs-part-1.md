---
title: TDD Menggunakan Mocha dan Chai di Nodejs - Part 1
date: 2018-09-23 14:29:38
description: "Implementasi konsep Test Driven Development (TDD) menggunakan Mocha dan Chai di Nodejs"
slug: tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1
---

Halo man teman, kali ini saya akan share tentang TDD menggunakan mocha dan chai di nodejs. Sebelum kita belajar bikin testing nya, lebih baik kita harus paham dan tau dulu mengenai apa itu TDD. TDD adalah singkatan dari Test Driven Development, kalian dapat dengan mudah mencari artikel mengenai TDD ini di mbah kita, yaitu google. Namun saya akan jelaskan secara singkat disini, TDD adalah sebuah konsep development yang berbasis test.

1. Pertama kita bikin sebuah konsep / mockup / testing nya.
2. Kemudian kita mulai menuliskan kode (ngoding / develop) untuk aplikasi yang sedang dibuat
3. Jalankan test hingga seluruh pengujiannya lolos (passed).
4. Jika semua pengujian sudah lolos, kita me refactor sebaik mungkin kode yang telah dibuat.
Masih bingung? Silakan temen temen mampir di blog teman saya (mas Nafies Lutfi) yang sudah panjang lebar membahas tentang TDD, silakan cek kemari [https://blog.nafies.id/laravel/testing-laravel-tentang-test-driven-development/](https://blog.nafies.id/laravel/testing-laravel-tentang-test-driven-development/).

Saya ga akan panjang lebar membahas TDD, karena di link rujukan diatas sudah bisa menjawab kebutuhan dan keingintahuan kita tentang TDD. Namun teknologi yang dipakai mas nafies di blog nya tersebut menggunakan PHP Laravel, sedangkan disini kita akan belajar TDD menggunakan Nodejs.

Baik mari kita mulai belajar TDD nya. Oh iya, untuk project nya kita akan memanfaatkan yang sudah ada ya. Silakan clone repository yang sudah saya buat disini [https://github.com/nusendra/nodejs-express-typescript](https://blog.nafies.id/laravel/testing-laravel-tentang-test-driven-development/). Dan bagi yang belum atau baru kenal nodejs dan typescript, bisa baca baca di blog saya sebelumnya. Kebutuhan teknologi yang akan kita pakai adalah

- Nodejs : Javascript runtime server
- Mocha : Test framework
- Chai : Test Assertion
- Chai-http : HTTP Test

Oke, kalau udah di clone, masuk ke folder nya dan ketik ini di terminal.

```
$ yarn add mocha chai chai-http -D
```

Setelah itu tambahkan test command nya di file package.json seperti berikut

```
"test": "mocha -r ts-node/register src/**/*.spec.ts --timeout 10000"
```

Kasus kali ini kita akan menjalankan sebuah fitur test untuk register user. Pertama buat folder `tests` dan didalam folder nya bikin file dengan nama `auth.spec.ts`. Pada file test isikan seperti berikut ini, tenang nanti akan saya jelaskan per line nya.

```javascript
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../../models/User';

import app from '../../server';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication', async () => {
  beforeEach( done => {
    User.collection.drop( () => {
      done();
    });
  });

  const object:Object = {
    name: 'nusendra',
    username: 'nusendra',
    password: 'password'
  };

  it('user can register', async () => {
    // Post Data
    const response = await chai.request(app).post('/users').send(object).then(res => res);

    // Check Database
    const data = await User.findOne(object).then(result => result);

    expect(data).to.deep.include(object);
    expect(response.text).to.be.a('string');
    expect(response.text).to.have.string('User nusendra berhasil di daftarkan');
  });

  it('user cannot register if username is exists', async () => {
    await chai.request(app).post('/users').send(object).then(res => res);
    const response = await chai.request(app).post('/users').send(object).then(res => res);

    expect(response).to.have.status(400);
    expect(response.text).to.have.string('User nusendra sudah terdaftar, silakan pakai username yang lain');
  });
});
```

Baik mari kita uraikan baris per baris kode nya.

```javascript
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../../models/User';

import app from '../../server';

chai.use(chaiHttp);
const expect = chai.expect;
```

Disini kita import package chai dan chai-http, kemudian kita juga import file server yang nantinya akan dimanfaatkan oleh chai-http. Untuk assertion kita menggunakan expect dari chai.

```javascript
describe('Authentication', async () => {
  beforeEach( done => {
    User.collection.drop( () => {
      done();
    });
  });
```

diatas ini kita kasih penjelasan test apa yang akan kita lakukan. Yaitu menggunakan describe. Setelah itu kita bikin sebuah fungsi untuk menghapus data dari collection ketika akan memulai test, di setiap test yang akan diuji.

```javascript
const object:Object = {
    name: 'nusendra',
    username: 'nusendra',
    password: 'password'
  };
```

Kita bikin juga sebuah object untuk data yang akan kita post ke route register user.

```javascript
it('user can register', async () => {
  // Post Data
  const response = await chai.request(app).post('/users').send(object).then(res => res);

  // Check Database
  const data = await User.findOne(object).then(result => result);

  expect(data).to.deep.include(object);
  expect(response.text).to.be.a('string');
  expect(response.text).to.have.string('User nusendra berhasil di daftarkan');
});
```

Pengujian pertama kita bikin testing untuk register user. Langkah yang kita inginkan seperti berikut ini, Pertama kita kirim data object ke post url diatas. Kemudian kita juga cek ke dalam database, apakah data yang sudah masuk ke dalam database. Setelah itu kita cek apakah response yang kita dapat sudah sesuai dengan response yang kita inginkan.

```javascript
it('user cannot register if username is exists', async () => {
  await chai.request(app).post('/users').send(object).then(res => res);
  const response = await chai.request(app).post('/users').send(object).then(res => res);

  expect(response).to.have.status(400);
  expect(response.text).to.have.string('User nusendra sudah terdaftar, silakan pakai username yang lain');
});
```

Pengujian kedua ini ini kita lakukan untuk pengecekan bahwa user tidak bisa register dengan username yang sama. Jika ada user yang mendaftar dengan username yang sama, maka user akan dapat response bahwa pendaftaran gagal karena username sudah dipakai oleh orang lain.

Mari kita jalankan test nya dengan mengetik

```
$ yarn test
```

![nusendra-tdd-fail](https://farm2.staticflickr.com/1917/44136674284_0665742a57_c.jpg)

Jika kalian mendapat hasil seperti ini, jangan bingung dan khawatir, memang TDD pada awalnya harus error seperti ini. Karena memang kita belum membuat route di backend nya. Nanti di part 2 akan kita perbaiki app kita agar pengujian yang dilakukan bisa lolos (passed).

Demikian part 1 ini teman teman, disini kita masih belum selesai ya, karena hasil dari pengujian kita masih pada tahap gagal / fail. Nanti di part 2 akan kita perbaiki. Semoga bermanfaat
