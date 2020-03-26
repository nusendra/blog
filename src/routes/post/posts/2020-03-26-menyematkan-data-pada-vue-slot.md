---
title: 'Menyematkan Data pada Vue Slot'
date: 2020-03-26 06:00:00
description: 'Catatan singkat tentang cara menyematkan sebuah attribute atau data kedalam vue slot'
tags: ['vuejs', javascript']
draft: false
slug: menyematkan-data-pada-vue-slot
---

Kali ini mau ngebahas singkat aja nih, tentang bagaimana cara menyematkan sebuah attribute atau data kedalam vue slot, karena fitur ini sering kali terdapat perubahan di sisi sintaks vue nya, jadi rasanya perlu saya catat juga di blog ini. Kenapa perlu dicatat? Karena saya sendiri ga pernah menghafal sintaks.

Nah kasus nya kemarin lagi develop app pake vue dan membutuhkan slot, secara konsep paham dan langsung tulis aja sintaks nya, eh ternyata dapet error karena sintaks salah. Haha yaudah deh langsung buka gugel buat beresin problem ini. Eh masalah baru muncul, kebanyakan artikel mengenai vue slot ini tidak konsisten versi vue nya, ada yang dibawah 2.6, ada yang 2.6 dll. Ternyata masih ada blog yang tidak di update dari sisi sintaks nya, yang mana sintaks itu udah *deprecated*.

## Basic Slot

Fitur slot pada Vue ini merupakan fitur tingkat lanjut yang terkadang para pemula / pendatang baru di dunia vue merasa sering kebingungan tentang kegunaan nya. Intinya fungsi dari vue slot ini adalah untuk menyematkan sebuah element / component kedalam child component. Bingung? Langsung ke kodingan nya aja yak.

```vue
<!-- Child Component -->
<template>
  <div>
    <span>Saya adalah child component</span>
    <div>
      <span>Dibawah ini adalah slot</span>
      <slot />
    </div>
  </div>
</template>
```

Kemudian pada component yang sedang kita kerjakan

```vue
<!-- Parent Component -->
<template>
  <child>
    <button>Hajar kak</button>
  <child>
</template>

<script>
import Child from "@/components/child";

export default {
  components: { Child }
}
</script>
```

Nah jika temen temen lihat, didalam child component itu saya sematkan sebuah button, yang mana button itu akan di *inject* atau disematkan kedalam child component. Nah nanti ketika di render akan jadi seperti ini

```vue
<!-- Child Component -->
<template>
  <div>
    <span>Saya adalah child component</span>
    <div>
      <span>Dibawah ini adalah slot</span>
      <button>Hajar kak</button>
    </div>
  </div>
</template>
```

Dari sini paham ya? Awas kalau masih belom paham, lu yang gue hajar haha.

## Scoped Slot

Scoped slot ini berfungsi untuk melempar / *passing* data / attribute dari slot ke parent nya. Langsung ke contoh aja yak biar makain paham.

```vue
<!-- Child Component -->
<template>
  <div>
    <span>Saya adalah child component</span>
    <div>
      <span>Dibawah ini adalah slot pertama</span>
      <slot :data="pertamax" />
    </div>
    <div>
      <span>Dibawah ini adalah slot kedua</span>
      <slot :data="keduax" name="kedua" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    pertamax: "ini slot pertamax",
    keduax: "ini slot keduax"
  })
};
</script>
```

Parent component nya seperti ini

```vue
<!-- Parent Component -->
<template>
  <child>
    <template slot-scope="props">
      <span>{{ props.data }}</span>
    </template>
    <template slot="kedua" slot-scope="props">
      <span>{{ props.data }}</span>
    </template>
  <child>
</template>

<script>
import Child from "@/components/child";

export default {
  components: { Child }
}
</script>
```

Maka nanti ketika di render, attribute yang ada pada child component akan di lemparkan / di sematkan ke parent component nya. Saya juga tambahkan disitu contoh penggunaan default slot dan named slot ya, semoga tidak bingung.

Contoh kasus nyata penggunaan dari scoped slot ini adalah, misalkan kita punya table component yang mana table ini di tiap tiap halaman pasti punya perilaku yang berbeda beda. Nah slot ini cocok dipakai untuk melengkapi table component tersebut sesuai dengan kriteria nya. Misalkan pada halaman user pada component table kita sematkan button edit, kemudian pada halaman transaksi kita sematkan button hapus, dll.

Nah proses button ini kan juga perlu mengambil data di tiap tiap row yang ada di table component kan? Maka scoped slot sangat membantu disini.

---

Sekian dulu postingan singkat ini, semata - mata untuk catatan pribadi saja yang kadang kelupaan dengan sintaks nya slot (vue slot sering gonta ganti sintaks bro haha). Oh iya, vue disini pakai versi terbaru ya, yakni 2.6++. Semoga bermanfaat bagi temen temen yang mampir kesini, thanks..
