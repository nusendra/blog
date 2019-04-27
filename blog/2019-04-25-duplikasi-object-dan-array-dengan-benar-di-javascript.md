---
title: "Duplikasi Object dan Array dengan Benar di JavaScript"
date: 2019-04-25 11:55:00
description: "Cara cloning / duplikasi data object atau array dengan benar di JavaScript"
tags: ['javascript','tips']
slug: duplikasi-object-atau-array-dengan-benar-di-javascript
---

Udah lama ga nulis di blog, kali ini mau bahas gimana sih caranya kita nge-*clone* / duplikasi object dan array ke variable lain. Terkadang kita ada di suatu kondisi yang memaksa kita untuk *cloning* sebuah value dari satu variable ke variable yang lain. Yang jadi masalah adalah ketika kita *cloning* data, data tersebut masih terikat dengan variable asal, sehingga data di variable yang baru akan terus bergantung pada variable asal. Contoh nya seperti ini

```js
let asli = [1,2,3];
let duplikat = asli;

console.log(duplikat); // [1,2,3]

asli.push(4);
console.log(asli); // [1,2,3,4]
console.log(duplikat); // [1,2,3,4]
```

Perhatikan, Disini kita menambahkan elemen ke variable asli, eh ketika kita akses variable duplikat malah datanya terupdate (value nya sama seperti yang ada pada variable asli). Pun jika kita mengubah value dari variable duplikat, maka variable asli akan berubah juga.

## Kenapa ga bisa pake **=** ?

Karena pada JavaScript, array dan object adalah value yang bernilai *reference*. Maksudnya adalah ketika kita copy / *clone* sebuah value dengan menggunakan `=`, maka yang kita copy hanya lah referensi (ke alamat memory yang sama) dari value awalnya saja. Jadi cara yang benar untuk menduplikasi data array / object adalah dengan cara mengcopy isi dari value nya, bukan referensi ke alamat memory nya. Di ES6 kita bisa menggunakan spread operator (...variable), atau kalau pengen pakai *old fashion way* bisa menggunakan `slice()`.

## Contoh

```js
let asli = [1,2,3];
let duplikat = [...asli];

console.log(duplikat); // [1,2,3]

asli.push(4);
console.log(asli); // [1,2,3,4]
console.log(duplikat); // [1,2,3]
```

## Banyak jalan menuju Roma

Spread operator hanya bisa digunakan pada array / object *non multidimensi*. Spread operator ga bisa dipakai untuk kasus multidimensional array / object. Trus pakai apa dong? Sejauh yang saya temukan saat ini (tentunya mungkin masih banyak cara lainnya) kita bisa pakai 3 fungsi berikut ini

1. Spread Operator
2. Array.from
3. JSON.parse & JSON.stringify

```js
let asli = [1,2,3];

// dengan spread operator
let duplikat1 = [...asli];

// dengan Array.from
let duplikat2 = Array.from(asli);

// dengan JSON.parse & JSON.stringify
let duplikat3 = JSON.parse(JSON.stringify(asli));
```

<hr/>

Akhir kata, semoga tips singkat ini bisa menambah wawasan teman - teman pembaca budiman sekalian. Makasih udah mampir :-)
