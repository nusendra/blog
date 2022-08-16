---
title: "Transform Absolute Path ke Relative Path di TypeScript"
date: 2021-10-11 21:09:00
description: "Secara alami compiler TypeScript tidak bisa mentransform absolute ke relative path, begini caranya."
tags: ['Typescript']
draft: false
slug: transforms-absolute-ke-relative-path-di-typescript
---

Ketika kita bermain - main dengan typescript, memang mesti banyak melakukan instalasi tools - tools pendukung nya. Apalagi kalau kalian lebih suka atau memilih untuk mengimplementasikan TS ke unopinionated framework macam ExpressJS, sudah harus siap untuk oprek tools sana sini supaya app kita berjalan sesuai dengan ekspektasi. Kalau ga mau ribet, mending pakai opinionated framework seperti NestJS saja. Tinggal install, maenin, deploy. Gampang...

Nah kalau kalian suka yang repot, ini artikel yang tepat :D

Misalkan saja kalian sedang ngoding ExpressJS + TypeScript. Kemudian kalian ga pengen path nya seperti dibawah ini 

```
import BlaBlaController from "../../../../../../../controllers/BlaBlaController"
```

Akhir nya kan kalian harus setup tsconfig nya biar bisa maenin absolute path. Seperti dibawah ini contohnya

```
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./app/*"],
  },
}
```

Nah kalau udah di setup seperti diatas, ntar kalian bisa pakai absolute path sepeti dibawah ini

```
import BlaBlaController from "@/controllers/BlaBlaController"
```

Keren bukan? Tapi tunggu ketika kalian menjalankan command **tsc** kemudian coba untuk menjalankan app nya setelah di compile melalui build folder. Kalian bakal dapet error bahwa hasil daril compile tadi ga merubah absolute path ke relative path.

Harusnya path **@/controllers/BlaBlaController** berubah jadi **../../../../../../../controllers/BlaBlaController** kan ya? Biar node nya bisa nemuin file tersebut, karena node nya ga bisa ngebaca absolute path (Ntah juga kalau ada tools biar bisa ngebaca ini di production).

Nah sekarang pertanyaannya, gimana biar ketika setelah TS nya di compile ke folder build, absolute path tersebut berubah menjadi relative path? Jawabannya adalah kita harus setup transformer untuk mengubah itu. Karena secara alamiah, command **tsc** nya TypeScript engga bisa ngerubah itu.

Sebenernya banyak jalan menujur Roma, cuman kali ini kita akan pakai 2 tools keren yakni [ttypescript](https://github.com/cevek/ttypescript) yang berfungsi untuk menggantikan fungsi bawaan **tsc** dan [typescript-transform-paths](https://github.com/LeDDGroup/typescript-transform-paths) untuk transformer nya.

Langsung aja yok kita install 2 tools tersebut
```
yarn add ttypescript -D
yarn add typescript-transform-paths -D
```

Kemudian setup compiler options nya di tsconfig.json

```
"compilerOptions": {
  "plugins": [
    { "transform": "typescript-transform-paths" },
  ]
}
```

Setelah itu jangan lupa untuk mengupdate file package.json kalian untuk merubah cara menjalankan app nya.

Contoh sebelum diubah
```
"tsc": "rm -rf build/ && tsc",
"ts": "rm -rf build/ && tsc -w"
```

Ubah menjadi berikut ini
```
"tsc": "rm -rf build/ && ttsc",
"ts": "rm -rf build/ && ttsc -w"
```

Command tsc untuk mengcompile TS ke js ke folder build (Atau apapun itu tergantung dari setup tsconfig kalian). Sedangkan command ts untuk menjalankan compiler dengan mode watch.

Nah setelah kalian setup persis seperti diatas, harusnya ketika kalian menjalankan command untuk build atau watch, absolute path kalian akan berubah menjadi relative path di folder build. Semoga bermanfaat kawan kawan :D
