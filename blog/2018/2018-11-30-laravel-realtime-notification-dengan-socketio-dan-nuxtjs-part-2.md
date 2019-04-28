---
title: Laravel Realtime Notification dengan Socket.io dan Nuxtjs - Part 2
date: 2018-11-30 22:37:07
tags: ['laravel','php','javascript','nuxtjs']
description: "Realtime notification menggunakan Laravel Echo di project Nuxt.js"
slug: laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2
---

Melanjutkan dari postingan yang [pertama](https://nusendra.com/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1) dengan judul yang sama, yakni Laravel realtime notification dengan socket.io. Pada postingan kali ini kita akan coba implementasi Laravel echo kedalam Nuxtjs. Pastikan kalian udah baca part pertama nya ya, karena kali ini kita akan coba menerapkan notifikasi di Nuxtjs menggunakan socket.io dengan private channel.

## Install Library

Langkah pertama yang patut kita lakukan adalah memasang library Laravel Echo, socket.io-client dan Push.js (yang ini optional, boleh pakai atau engga, ga ada masalah). Langsung aja yok install, masuk ke direktori project Nuxt kalian kemudian buka terminal dan ketikkan dibawah ini

```
$ yarn add laravel-echo socket.io-client push.js
```

Setelah terinstall semua, yok kita coba setting satu - persatu library nya.

Buat file laravel-echo.js dulu di foler plugins, kemudian isi file nya seperti berikut ini

```javascript
import Echo from 'laravel-echo'

window.io = require('socket.io-client')
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001'
})
```

untuk `window.location.hostname` bisa kalian ganti dengan url server socket kalian.

Kemudian pasangkan plugin nya ke dalam file nuxt.config.js

```javascript
plugins: [
  '~/plugins/laravel-echo
]
```

Setelah plugin udah terpasang, sekarang kita siap untuk pake echo nya. Sebagai contoh saja, mari kita buka file default.vue di folder layouts. Terapkan script dibawah ini

```javascript
mounted() {
  window.Echo.connector.options.auth.headers['Authorization'] =
    this.$auth.$storage._state['_token.local']
  window.Echo.private('App.User.' + this.$auth.user.id).notification(
    notif => {
      console.log(notif)
    }
  )
}
```

Pertama mari kita definisikan auth header nya dulu. Jika kalian menggunakan auth module dari nuxt, maka untuk mengeset auth headers nya seperti kodingan diatas. Jika engga pakai auth module, misalkan auth nya ada di localstorage, tinggal ambil aja trus taruh situ. Setelah itu diikuti dengan listening event dari notification nya laravel. Sebagai testing awal, bisa pakai console.log itu untuk pengecekan apakah ketika backend ngetrigger notification console.log nya bisa ngeluarin response.

Jika console.log udah bisa mendapatkan response, berarti langkah kita udah berhasil.

## Menampilkan Notif dengan Push.js (Optional)

Bagi yang belum tau apa itu push.js, silakan mampir ke web official nya disini. Singkat nya, push.js ini bisa ngebantu kita untuk menampilkan notifikasi secara native browser. Contohnya sebagai berikut, buka lagi file default.vue nya, kemudian ubah hingga jadi begini

```javascript
import Push from 'push.js'

...

mounted() {
  window.Echo.connector.options.auth.headers['Authorization'] =
    this.$auth.$storage._state['_token.local']
  window.Echo.private('App.User.' + this.$auth.user.id).notification(
    notif => {
      Push.create('Judul Notif', {
        body: notif,
        onClick: function() {
          this.close()
        }
      })
    }
  )
}
```

Nah sekian postingan hari ini, pada bagian kedua ini terbilang mudah sih, karena kita tinggal mengonsumsi notifikasi nya saja. Sebagai catatan singkat, didalam project Nuxt ini saya memakai auth module nya nuxt. Semoga bermanfaat bagi temen temen yang udah baca dan mampir.
