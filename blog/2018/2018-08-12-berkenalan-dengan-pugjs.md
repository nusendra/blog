---
title: Berkenalan dengan PugJS
date: 2018-08-23 14:20:46
tags: ['javascript']
description: "Pug hadir untuk menyederhanakan format html kalian sehingga kode html kalian bisa lebih mudah dan enak dibaca"
slug: berkenalan-dengan-pugjs
---

Pernahkah kalian pusing melihat baris kode html yang berjejer tak beraturan? Saya sering haha. Ribet nya koding html kini bisa di sederhanakan berkat kehadiran **Pugjs**. Pugjs merupakan template engine yang akan membaca template yang berformat *lang="pug"* dan mengkonversikan nya kedalam format html. Lebih jelas nya silakan mampir e [official site](https://pugjs.org/api/getting-started.html) nya.

Saya secara pribadi sangat membenci menulis kode dummy html, karena memang kode html itu banyak, bejibun, kadang ga beraturan. Beruntung ketika saya kenal Javascript framework (Vuejs), hal tersebut sudah bisa diminimalisir dengan memanfaatkan directive dan component nya. Namun saya rasa hal itu masih kurang efektif, saya butuh sesuatu yang bisa menyederhanakan format html saya. Nah ternyata ketemu juga yang namanya **pugjs**. Langsung deh tanpa ba bi bu, saya install tuh si anjing, eh pug (nama ras anjing) maksudnya hehehe.

Untuk nyobain si pug ini, kita coba implementasi di Vuejs dan Nuxtjs. Pertama, ketik ini di terminal root folder project kalian.

```
$ npm install pug pug-loader --save-dev
```

Kemudian pada component kalian

```javascript
<template>
```

ubah menjadi

```javascript
<template lang="pug">
```

Sebelum kita lanjut ke contoh kasus, kita pelajari dulu bagaimana cara menggunakan pug dan apa saja kelebihannya.

## TANPA CLOSING TAG

Biasanya di html kita akan menuliskan seperti dibawah ini

```javascript
<template>
  <div class="row">
    <p>Isi dibawah ini</p>
  </div>
</template>
```

Maka di pug, kita hanya menuliskan seperti dibawah ini

```javascript
<template lang="pug">
  .row
    p Isi dibawah ini
</template>
```

Sangat simple bukan ?

## ELEMEN DENGAN ATTRIBUTE

Untuk attribut biasa kita ketik seperti ini

```javascript
<template>
  <div class="row">
    <button class="button" type="primary" @click="buttonClicked">
      Simpan
    </button>
  </div>
</template>
```

Maka di pug jadi seperti dibawah ini

```javascript
<template lang="pug">
  .row
    button(class="button" type="primary" @click="buttonClicked") Simpan
</template>
```

Mantep kan?

Untuk penggunaan lebih lanjut, silakan kunjungi official web nya saja. Tetapi pada umumnya, pug akan menggunakan format seperti diatas. Oh iya, pasti temen temen ada yang bertanya, bagaimana cara membedakan bahwa button adalah anak dari elemen div (lihat contoh diatas)? Gampang, pug menggunakan indent spacing yang mana akan mengkonversi anak dari elemen berdasarkan indentasi spasi nya.

Coba lihat template berikut

```javascript
<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="panel panel-default">
        <div class="panel-heading">
          Kategori Baru
        </div>
        <div class="panel-body">
          <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px">
            <el-form-item label="Nama Kategori" prop="nama">
              <el-input v-model="form.nama"/>
            </el-form-item>
            <el-form-item label="Tipe Barang">
              <el-radio-group v-model="form.tipe_barang">
                <el-radio :label="1">Raw Material</el-radio>
                <el-radio :label="2">Bahan Baku</el-radio>
                <el-radio :label="3">Barang Jadi / Produk</el-radio>
                <el-radio :label="4">Aset</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Keterangan" prop="keterangan">
              <el-input v-model="form.keterangan" placeholder="..."/>
            </el-form-item>
          </el-form>
        </div>
        <div class="panel-footer">
          <el-button class="pull-right" type="primary" plain @click="save('close')">Save & Close</el-button>
          <el-button class="pull-right" type="primary" plain @click="save('noClose')">Save</el-button>
          <el-button class="pull-right" type="primary" plain @click="reset">Reset</el-button>
          <el-button class="pull-right" type="primary" plain @click="cancel">Cancel</el-button>
          <div class="clearfix"/>
        </div>
      </div>
    </div>
  </div>
</template>
```

Kalau pakai pug, bisa jadi seperti ini

```javascript
<template lang="pug">
  .row
    .col-lg-8
      .panel.panel-default
        .panel-heading Kategori Baru
        .panel-body
          el-form(ref="form" :model="form" :rules="rules" status-icon label-width="150px")
            el-form-item(label="Nama Kategori" prop="nama")
              el-input(v-model="form.nama")
            el-form-item(label="Tipe Barang")
              el-radio-group(v-model="form.tipe_barang")
                el-radio(:label="1") Raw Material
                el-radio(:label="2") Bahan Baku
                el-radio(:label="3") Barang Jadi / Produk
                el-radio(:label="4") Aset
            el-form-item(label="Keterangan" prop="keterangan")
              el-input(v-model="form.keterangan" placeholder="...")
        .panel-footer
          el-button(class="pull-right" type="primary" plain @click="save('close')") Save & Close
          el-button(class="pull-right" type="primary" plain @click="save('noClose')") Save
          el-button(class="pull-right" type="primary" plain @click="reset") Reset
          el-button(class="pull-right" type="primary" plain @click="cancel") Cancel
          .clearfix
</template>
```

Nah bagi temen - temen yang masih belum pake pug, yuk kita pake biar kodingan kita jadi lebih rapi dan enak dibaca. Terima kasih udah mampir dan baca, semoga bermanfaat buat temen - temen.
