---
title: 'Tips dan Trik Array pada Javascript'
date: 2019-10-27 20:53:00
description: 'Banyak sekali metode atau trik dalam memanipulasi data pada sebuah array, berikut ini adalah tips dan trik dalam mengolah array pada JavaScript'
tags: ['opini', 'javascript']
draft: false
slug: tips-dan-trik-array-pada-javascript
---

Array pada bahasa pemrograman merupakan salah satu konsep / fitur yang sangat penting, dalam mengelola data pada array pun ada banyak sekali caranya. Nah kali ini saya akan berbagi sedikit tentang pengelolaan elemen / data pada sebuah array dengan cara yang engga biasa. Yok mulai...

## 1. Menghapus duplikat data pada Array

Ada 2 cara

```js
let animals = ['tiger', 'elephant', 'monkey', 'tiger', 'ant', 'monkey'];

let uniqueAnimals = Array.from(new Set(animals));
console.log(uniqueAnimals); // ['tiger', 'elephant', 'monkey', 'ant']

let uniqueAnimals = [...new Set(animals)];
console.log(uniqueAnimals); // ['tiger', 'elephant', 'monkey', 'ant']
```

## 2. Replace value tertentu pada Array

```js
let animals = ['tiger', 'elephant', 'monkey', 'tiger', 'ant', 'monkey'];

animals.splice(0, 3, 'cat', 'dog', 'snake');
console.log(animals); // ['cat', 'dog', 'snake', 'tiger', 'ant', 'monkey']
```

## 3. Map array tanpa menggunakan .map()

terkadang kita sering menggunakan `.map` untuk memanipulasi data dengan cara `looping` array nya. Berikut ini cara lain tanpa menggunakan `.map`

```js
let animals = [
  { name: 'tiger', legs: 4 },
  { name: 'elephant', legs: 4 },
  { name: 'monkey', legs: 2 },
  { name: 'ant', legs: 6 },
  { name: 'octopus', legs: 8 },
  { name: 'chicken', legs: 2 },
];

let animalNames = Array.from(animals, item => item.name);
console.log(animalNames); // ["tiger", "elephant", "monkey", "ant", "octopus", "chicken"]
```

## 4. Mereset atau mengosongkan array

Biasanya kita pakai sintaks begini untuk me reset / mengosongkan isi array

```js
array = [];
```

Kalian juga bisa coba sintaks dibawah ini

```js
let animals = ['tiger', 'elephant', 'monkey', 'ant'];

animals.length = 0;
console.log(animals); // []
```

## 5. Konversi dari Array ke Object

```js
let animals = ['tiger', 'elephant', 'monkey', 'ant'];

let animalsObject = { ...animals };
console.log(animalsObject); // { 0: "tiger", 1: "elephant", 2: "monkey", 3: "ant" }
```

## 6. Mengisi array dengan function .fill()

```js
let newArray = new Array(5).fill('wow');
console.log(newArray); // ["wow", "wow", "wow", "wow", "wow"]
```

## 7. Menggabungkan beberapa array

Misalkan kita punya beberapa array yang pengen digabungin, kalian bisa coba cara berikut ini.

```js
let animals = ['tiger', 'elephant', 'monkey'];
let flowers = ['rose', 'jasmine', 'orchid'];
let vegetables = ['carrot', 'tomato', 'spinach'];

let mergedArrays = [...animals, ...flowers, ...vegetables];
console.log(mergedArrays); // ["tiger", "elephant", "monkey", "rose", "jasmine", "orchid", "carrot", "tomato", "spinach"]
```

## 8. Mengambil data yang sama pada array yang berbeda

```js
let array1 = ['tiger', 'elephant', 'monkey'];
let array2 = ['chicken', 'tiger', 'elephant'];

var duplicatedValues = [...new Set(array1)].filter(item =>
  array2.includes(item),
);
console.log(duplicatedValues); // [ 'tiger', 'elephant' ]
```

## 9. Menghapus falsy value

Misal kita pengen menghapus semua falsy data (null, undefined, dll) pada sebuah array, kita bisa coba cara berikut ini.

```js
var mixedArray = [“tiger”, 0, NaN, 100, true, undefined, “cat”, false, ""];
var trueArray = mixedArray.filter(Boolean);
console.log(trueArray); // returns [“tiger”, 10, true, “cat”]
```

## 10. Mengambil data random

```js
let animals = ['tiger', 'elephant', 'monkey', 'ant'];

let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
console.log(randomAnimal); // 'monkey'
```

## 11. Membalikkan data dari depan ke belakang

```js
let animals = ['tiger', 'elephant', 'monkey', 'ant'];

let reversed = animals.reverse();
console.log(reversed); // ["ant", "monkey", "elephant", "tiger"]
```

## 12. Menjumlah semua nilai pada array

Dalam hal ini, cara yang paling benar adalah menggunakan reduce

```js
let nums = [1, 2, 3, 4, 5];
let sum = nums.reduce((x, y) => x + y);
console.log(sum); // 15
```

Jika kalian bingung dengan penggunaan reduce, coba ubah kode diatas menjadi seperti berikut ini

```js
let nums = [1, 2, 3, 4, 5];
let sum = nums.reduce((x, y) => {
  console.log('x : ' + x);
  console.log('y : ' + y);
  return x + y;
});
console.log(sum); // 15
```

---

Nah demikian yang bisa saya sajikan, jika ada tambahan dari temen - temen, silakan tulis du kolom komentar :D

source : https://dev.to/duomly/13-useful-javascript-array-tips-and-tricks-you-should-know-2jfo
