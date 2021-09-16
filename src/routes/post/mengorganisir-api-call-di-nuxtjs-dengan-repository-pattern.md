---
title: 'Mengorganisir API Call di Nuxtjs dengan Repository Pattern'
date: 2020-02-28 22:24:00
description: 'Mengorganisir dan membuat abstraksi pada setiap fungsi API call kita di Nuxtjs dengan Repository Pattern'
tags: ['vuejs', 'nuxtjs', javascript']
draft: false
slug: mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern
---

Jika kalian pernah membaca tentang beberapa design pattern, maka kalian akan sering menjumpai repository pattern. Yak, repository pattern adalah sebuah pola / pendekatan untuk memisahkan beberapa logic menjadi suatu fungsi individu (_separation of concern_), biasanya pattern ini dipakai untuk memisahkan proses antara logic dengan persistensi data. Contoh gampang nya adalah seperti berikut ini

```js
// File Controller

const store = async payload => {
  await db.users.insert({
    // insert logic
  });
};

const update = async payload => {
  await db.users.update({
    // update logic
  });
};
```

Kodingan diatas adalah salah satu contoh proses melakukan manipulasi data yang dilakukan di file controller. Gak ada yang salah sebenernya, namun jika suatu saat aplikasi yang kita bangun semakin besar dan pada saat itu terdapat beberapa perubahan yang harus dilakukan ketika akan _insert_ atau _update_, maka kita harus merubah semua proses CRUD di seluruh controller kita.

Nah dengan adanya repository pattern, maka kita simpan logic persistensi data nya kedalam file khusus yang berfungsi untuk melakukan query / berhubungan langsung dengan database. Sehingga jika suatu saat terdapat perubahan ketika akan melakukan CRUD, kita hanya perlu merubah file khusus tersebut saja (repository) tanpa harus merubah keseluruhan file controller.

```js
// File Controller
const store = async payload => {
  await UserRepository.create({
    // create logic
  });
};

// File Repository
const create = async payload => {
  await db.users.create({
    // create logic
  });
};
```

Gimana? Masih bingung? Rasain haha.. Ya intinya gitu lah ya, kita misahin logic antara business logic dan persistence logic. Sama seperti namanya, controller hanya sebagai pelayan (yang menerima dan menyampaikan request ke client), sedangkan file repository sebagai koki nya (baca lagi _separation of concern_).

Nah kasus tersebut terjadi di backend, lalu bagaimana dengan di bagian frontend? Nah dalam kasus frontend juga sama, pada artikel kali ini kita bahas bagaimana mengabstraksi pemanggilan API kedalam berkas khusus, sehingga ketika nanti ada perubahan dalam hal pemanggilan API, kita hanya mengubahnya di satu file saja.

## Getting Started

Sebelum kita mulai, saya berekspektasi bahwa pembaca sudah pernah pakai Nuxtjs sebelumnya, jadi ga perlu dijelasin bagaimana setup awal dari framework ini. Pertama yang perlu dilakukan adalah install plugin axios milik Nuxt, yakni [Axios Module](https://axios.nuxtjs.org/)

```
$ yarn add @nuxtjs/axios
```

Kemudian setup di file **nuxt.config.js**

```js
// nuxt.config.js

module.exports = {
  modules: ['@nuxtjs/axios'],

  axios: {
    // proxyHeaders: false
  },
};
```

Setelah itu bikin sebuah file repository untuk menampung logic api call kita, misalkan kita taruh di **api/repository.js**.

```js
// api/repository.js

export default $axios => resource => ({
  index() {
    return $axios.$get(`${resource}`);
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`);
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload);
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload);
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`);
  },
});
```

File logic repository sudah beres, sekarang kita inject axios nya kedalam repository tersebut dengan melalui plugin.

```js
// plugins/Repository.js

import repository from '~/api/repository';

export default (ctx, inject) => {
  const repositoryWithAxios = repository(ctx.$axios);

  inject('userRepository', repositoryWithAxios('/users'));
};
```

Kemudian kita daftarkan plugin tersebut kedalam file nuxt.config.js

```js
// nuxt.config.js

plugins: ['~/plugins/Repository'],
```

Penjelasannya adalah kita tidak bisa memanggil axios yang ada di dalam context nuxt kedalam external js file (kalau kita import axios kedalam file tersebut, itu sudah beda bahasan lagi). Maka yang perlu kita lakukan adalah meng-inject **\$axios** kedalam file external js tersebut.

Lihat perbedaan antara sebelum memakai repository dan setelahnya.

### Sebelum

```js
\\ Dalam vue file

methods: {
  create() {
    this.$axios.post('/users', payload)
  }
}
```

### Setelah

```js
\\ Dalam vue file

methods: {
  create() {
    this.$userRepository.create(payload)
  }
}
```

Maka jika suatu ketika aplikasi kita semakin besar, dan terdapat perubahan yang mengharuskan kita memodifikasi api call, maka kita hanya perlu melakukan perubahan di file **api/repository.js** saja _instead of_ melakukan perubahan di semua file vue.

Sekian artikel singkat nya, semoga bermanfaat bagi teman teman semua nya :)
