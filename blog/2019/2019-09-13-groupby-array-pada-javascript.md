---
title: "Groupby Array pada JavaScript"
date: 2019-09-13 10:38:00
description: "Catatan / snippet singkat tentang bagaimana cara membuat fungsi groupby array pada JavaScript"
tags: ['opini', 'snippet']
draft: false
slug: groupby-array-pada-javascript
---

Kadangkala kita menemukan suatu kondisi yang mengharuskan kita untuk melakukan group by pada koleksi didalam data array kita. Nah cara yang paling mudah adalah menggunakan lodash. Tapi masa iya sih hal yang begini saja harus pake lodash? Kalau bisa bikin sendiri, kenapa harus pake lodash? Betul ga?

Nah kali ini kita akan coba bikin fungsi group by sendiri. Katakanlah kita punya kasus seperti dibawah ini.

```javascript
let array = ['satu', 'dua', 'tiga', 'empat', 'lima'];
```

Kita pengen huruf huruf diatas dikumpulkan berdasarkan jumlah karakter nya, jadi ekspektasi nya seperti ini

```javascript
hasil = {
  3: ['dua'],
  4: ['satu', 'tiga', 'lima'],
  5: ['empat']
};
```

Atau mungkin yang lebih ke real case, seperti ini

```javascript
let array = [
  { id: 1, name: 'Abdul', city: 'Surabaya' },
  { id: 2, name: 'Budi', city: 'Sidoarjo' },
  { id: 3, name: 'Candra', city: 'Surabaya' },
  { id: 4, name: 'Dedy', city: 'Surabaya' },
  { id: 5, name: 'Eko', city: 'Gresik' },
  { id: 6, name: 'Faruq', city: 'Gresik' },
  { id: 7, name: 'Gibran', city: 'Sidoarjo' },
  { id: 8, name: 'Hadi', city: 'Malang' }
]
```

Dan ekspektasi nya seperti dibawah ini

```javascript
hasil = {
  Surabaya: [
    { id: 1 , name: "Abdul" , city: "Surabaya" },
    { id: 3 , name: "Candra", city: "Surabaya" },
    { id: 4 , name: "Dedy", city: "Surabaya" }
  ],
  Sidoarjo: [
    { id: 2, name: 'Budi', city: 'Sidoarjo' },
    { id: 7, name: 'Gibran', city: 'Sidoarjo' },
  ],
  Gresik: [
    { id: 5, name: 'Eko', city: 'Gresik' },
    { id: 6, name: 'Faruq', city: 'Gresik' },
  ],
  Malang: [
    { id: 8, name: 'Hadi', city: 'Malang' }
  ]
};
```

## Pembuatan Function

```javascript
let groupBy = (element, key) => {
  return element.reduce((value, x) => {
    (value[x[key]] = value[x[key]] || []).push(x);
    return value;
  }, {});
};
```

## Eksekusi

```javascript
let array1 = ['satu', 'dua', 'tiga', 'empat', 'lima'];

let array2 = [
  { id: 1, name: 'Abdul', city: 'Surabaya' },
  { id: 2, name: 'Budi', city: 'Sidoarjo' },
  { id: 3, name: 'Candra', city: 'Surabaya' },
  { id: 4, name: 'Dedy', city: 'Surabaya' },
  { id: 5, name: 'Eko', city: 'Gresik' },
  { id: 6, name: 'Faruq', city: 'Gresik' },
  { id: 7, name: 'Gibran', city: 'Sidoarjo' },
  { id: 8, name: 'Hadi', city: 'Malang' }
];

const groupArray1 = groupBy(array1, 'length');
const groupArray2 = groupBy(array2, 'city');

console.log(groupArray1);
console.log(groupArray2);
```

Tambahan dikit, hasil diatas akan berbentuk object, jika kalian pengen object tersebut di convert ke array, bisa pakai fungsi dibawah ini

```javascript
const toArray1 = Object.values(groupArray1);
const toArray2 = Object.values(groupArray2);
```

Maka nanti hasil nya akan jadi array dan bisa di `looping`.

---

Demikian snippet singkat, semoga membantu buat temen - temen yang mungkin butuh solusi seperti diatas :). Semoga bermanfaat dan silakan dicoba :D
