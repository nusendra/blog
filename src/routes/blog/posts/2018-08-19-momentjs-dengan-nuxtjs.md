---
title: MomentJS dengan NuxtJS
date: 2018-08-09 04:52:31
tags: ['javascript','nuxtjs']
draft: false
description: "Menggunakan Momentjs di Nuxtjs untuk memanipulasi dan menampilkan tanggal dengan keren"
slug: momentjs-dengan-nuxtjs
---

Hari ini mau post yang ringan ringan, yaitu menggunakan Momentjs di Nuxtjs. Sebelumnya saya jelaskan dahulu secara singkat kegunaan momentjs. Momentjs ini berfungsi untuk memparse, memanipulasi, dan menampilkan tanggal / waktu dengan mudah.

Contoh kita biasanya menggunakan format tanggal dengan new Date() yang kemudian kita get data nya sesuai dengan kebutuhan kita. Contoh sederhana seperti ini

```javascript
const date = new Date();
console.log(date.getFullYear()); // 2018
console.log(date.getMonth()); // 8
console.log(date.getDate()); // 9
```

Jadi kalau pengen dapat format tanggal 2018-08-09 kita harus ribet seperti dibawah ini

```javascript
const date = new Date();
console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
```

Panjang kan? hehehe

Selain itu kalau kita pengen buat tampilan seperti notifikasi `2 hours ago` atau `5 days ago` kita harus pikirkan kembali logic nya.

Nah disini Momentjs hadir untuk menyederhanakan semua itu. Oke langsung saja kita mulai instalasi moment di Nuxtjs. Pertama install moment menggunakan npm, buka terminal kalian dan ketik seperti dibawah ini

```
$ npm i moment @nuxtjs/moment
```

Kemudian tambahkan module nya

```javascript
{
  modules: [
    '@nuxtjs/moment',
 ]
}
```

Untuk settingan lebih lengkap silakan mampir kemari

Setelah itu kita coba implementasi momentjs di vue component.

```javascript
<template>
  <div>
    {{ tanggal | moment }}
  </div>
</template>

<script>
export default {
  filters: {
    moment(val) {
      return this.$moment(val, "YYYY-MM-DD").fromNow();
    }
  },
  data: () => ({
    tanggal: "2018-01-01"
  })
};
</script>
```

Script diatas tidak akan menampilkan tanggal `2018-01-01`, melainkan `7 months ago`

<hr/>

Nah itu tadi cara mudah memanfaatkan  Momentjs di Nuxtjs, semoga bermanfaat bagi temen - temen yang udah mampir kemari..
