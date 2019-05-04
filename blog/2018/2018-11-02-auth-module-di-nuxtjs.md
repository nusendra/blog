---
draft: false
title: Auth Module di Nuxtjs
date: 2018-11-02 21:58:52
tags: ['nuxtjs']
description: "Autentikasi jadi lebih mudah menggunakan Auth Module di Nuxtjs"
slug: auth-module-di-nuxtjs
---

Hai hai mumpung lagi bikin project baru pake Nuxtjs, sekalian bikin postingan tentang auth module di Nuxtjs. Nah dari beberapa kasus ada temen temen yang tanya ke saya mengenai authentikasi di nuxtjs itu seperti apa, apakah dilakukan secara manual atau mungkin ada package / library yang bisa memudahkan? Saya bilang ada, silakan coba install Auth module nya Nuxtjs. Silakan baca docs dulu [kesini](https://auth.nuxtjs.org/).

![](https://cdn.staticaly.com/img/cdn-images-1.medium.com/max/800/0*Jd5jjU4iiJcaCrXd)

Alasan kenapa saya bikin postingan ini adalah karena mungkin bagi para pemula Nuxtjs kadang ketika pake module ini agak kebingungan harus bagaimana cara pake nya. Saya akan coba untuk jelasin gimana sih package ini bekerja, dan saya akan jelasin sesederhana mungkin ya, untuk settingan yang lebih advance bisa langsung coba sendiri sambil ber eskperimen. 

Auth module ini bekerja secara global (bisa juga per component sih), ketika kita berpindah halaman maka secara otomatis auth module ini menjalankan auth middleware nya dengan cara memeriksa apakah user sudah login atau belum (token disimpan di cookies), jika di cookies kosong (ga ada token, atau mungkin expired) maka module ini secara otomatis akan me-redirect kita ke halaman login. Nah mungkin ada yang bertanya, trus data data user nya disimpan dimana? Bebas disimpan dimana, tapi untuk saya pribadi lebih suka simpan di vuex, jadi ketika user melakukan refresh halaman, auth module ini melakukan get data user yang kemudian datanya disimpan di vuex.

## Cara setting nya

Pertama install dulu dong

```
$ yarn add @nuxtjs/auth @nuxtjs/axios
```

Kenapa kok install axios juga? Yap karena auth module menggunakan axios untuk proses authentication nya. Kemudian di file nuxt.config.js tambahin ini

```javascript
modules: [ '@nuxtjs/axios', '@nuxtjs/auth' ],
router: {
  middleware: ['auth']
},
```

Sampai sini settingan dasar udah beres, setelah itu kita atur mau pakai strategi yang bagaimana. Strategi yang paling gampang begini aja sih, silakan kalau temen temen mau kustomisasi lebih jauh lagi

```javascript
auth: {
  redirect: {
    login: '/login',
    home: '/',
    logout: '/login'
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/api/login',
          method: 'post',
          propertyName: 'api_token'
        },
        user: {
          url: '/api/user/details',
          method: 'get',
          propertyName: 'user'
        },
        logout: {
          url: '/api/logout',
          method: 'post'
        }
      }
    }
  },
  token: {
    name: 'token'
  },
  cookie: {
    name: 'token'
  }
},
```

Penjelasannya sebagai berikut

Pada element redirect, tentukan dimana halaman login, home, logout nya. Jadi ketika user belum terotentikasi, maka diarahkan ke halaman login. Jika user sudah terotentikasi, langsung lempar ke halaman home. Dan juga kalau user udah berhasil logout, langsung diarahkan ke halaman login lagi.

Pada strategies, saya menggunakan local yang mana authentikasi nya memakai backend kita sendiri. Kalau pengen pake OAuth juga bisa, cek aja sendiri di docs nya :D. Disini terbagi menjadi 3 endpoint, yaitu

1. Endpoint login berfungsi untuk melakukan proses login, yang mana propertyName ini adalah nama variable token yang didapat dari response login nya. Untuk method nya kita pake post (masa iya pake put).
2. Endpoint user berfungsi untuk get data user yang sedang login. Misalnya ketika kita refresh halaman, karena kita udah terotentikasi (udah login), maka kita pengen dapatin data data user seperti nama, alamat, jabatan, dll. Method nya pake get dan propertyName nya bebas, disini saya pake user aja.
3. Endpoint logout bisa pakai get dan bisa pakai post. Bebas

## Bikin Vuex Store

Kenapa perlu bikin vuex store? Karena Auth module ini akan bekerja dengan menggunakan vuex untuk menyimpan state auth nya. Bikin simple saja untuk awal, nanti bisa dikembangkan sendiri.

```javascript
import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store ({
  // ini tempate module / getter / setter / state / actions
})

export default createStore;
```

## Cara pake nya

Untuk proses login, pake method begini

```javascript
this.$auth
.loginWith("local", {
  data: {
    name: this.username,
    password: this.password
  }
})
.catch(() => {
  console.log('gagal');
});
```
Untuk logout tinggal gini aja, easy..

```javascript
this.$auth.logout();
```

Untuk ngambil data yang didapat dari backend (masih inget gak? Ketika refresh kan kita dapet tuh data data user nya).

```javascript
console.log(this.$auth.user);
```

Catatan : Auth module akan selalu memeriksa `this.$auth.user` , so pastikan ketika kalian fetch user data, return response nya harus didalam elemen user. Sebagai contoh jika kalian menggunakan Laravel di backend nya. Return response nya harus begini

```php
return response()->json(['user' => Auth::user()]);
```

Kalo `this.$auth.user` ga ada isinya, maka auth module ini akan menganggap bahwa kalian belum login, jadi kalian akan selalu di redirect ke halaman login.

<hr/>

Nah demikian postingan kali ini, singkat sih dan sederhana. Kalau temen temen pembaca pengen mengimplementasikan yang lebih pro lagi, silakan mampir aja di docs nya. Yang penting kita tau dulu gimana cara kerjanya module ini dan gimana cara pake nya sesederhana mungkin. Suwun wes mampir rek :D
