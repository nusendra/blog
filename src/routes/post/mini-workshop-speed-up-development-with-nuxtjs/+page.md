---
title: "Mini Workshop Speed Up Vuejs Development with Nuxtjs"
date: 2019-05-06 15:37:00
description: ""
tags: ['opini', 'nuxtjs', 'vuejs']
draft: false
slug: mini-workshop-speed-up-development-with-nuxtjs
---

Cerita sedikit mengenai pengalaman bulan Februari 2019 kemarin ketika ngisi acara mini workshop di komunitas SurabayaDev, dengan judul Speed Up Vuejs Development with Nuxtjs. Kebetulan di komunitas ini masih belum ada yang bahas Nuxt, yaudah deh bawain topik itu. Singkatnya, Nuxt ini dipakai untuk mempersingkat dan mempermudah proses development seperti vuejs tanpa route, memudahkan proses SSR, simple vuex module, dll.

<img class="center-image-post" src="https://cdn.staticaly.com/img/live.staticflickr.com/65535/33909719568_0ee0af34a8_c.jpg" style="width:100%;height:auto;" alt="workshop">

## PROS

Manfaat yang paling besar ketika menggunakan Nuxt adalah

### Simple Routing

Jika kita pakai Vuejs, kita harus mendaftarkan component kedalam file vue-router. Nah di Nuxtjs, kita tak perlu melakukan hal yang membosankan tersebut, kita hanya perlu membuat file `.vue` kedalam folder pages, dan #boom secara otomatis nuxt sudah ngurusin route nya untuk kita.

### Layout System

Salah satu yang melelahkan ketika pakai vue adalah, kita harus bikin layout sendiri (seperti dashboard layout, login / register layout, dll). Di Nuxt sendiri sudah disediakan template layout yang bisa langsung kita pakai.

### Server Side Rendering

Urusan SSR? Ketika install pilih mode Universal, kemudian pada component bikin manfaatin fitur asyncData, yarn run build, yarn run start. Kelar deh SSR nya.

### Directory Structure

Di Vue kita harus menyusun sendiri struktur folder dari aplikasi kita, sedangkan di Nuxt sudah ada struktur nya yang sudah jadi standart. Jadi langsung pakai, developer Nuxt yang lain ga akan kebingungan karena struktur ini udah jadi standart ketika pengembangan web menggunakan Nuxt.

### Built-in Loading

Coba liat loading bar yang ada di youtube, nah Nuxt secara default udah tersedia loading bar seperti itu.

### Simplify Vuex

Module di Vuex jadi makin gampang, tinggal bikin file `.js` dan export beberapa function disana, udah jadi module vuex.

<img class="center-image-post" src="https://cdn.staticaly.com/img/live.staticflickr.com/65535/33909718908_f9a3428b8f_c.jpg" style="width:100%;height:auto;" alt="workshop">

## CONS

Mungkin Cons nya, size lebih besar dikit daripada Vue. Hal ini wajar saja, karena di Nuxt sudah terinstall Vue-router dan Vuex secara otomatis.

<hr/>

Mini workshop ini adalah kegiatan awal yang nanti nya akan dijadikan full workshop yang akan ngebahas Vuejs basic. Bagi yang pengen liat slide saya, bisa [klik link ini](https://docs.google.com/presentation/d/1gHl1dErhOjIJf5MkHqSialDh52s96_8Eaqf9KGqjENs/edit?usp=sharing)

<img class="center-image-post" src="https://cdn.staticaly.com/img/live.staticflickr.com/65535/32843294567_2dfb3c408a_c.jpg" style="width:100%;height:auto;" alt="workshop">
