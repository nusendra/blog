---
title: "Hanya modal domain untuk punya email pribadi dan website"
date: 2023-04-9 11:20:00
description: "Ga perlu web hosting, ga perlu beli layanan email, hanya dengan domain saja udah bisa"
tags: ["Others"]
draft: false
slug: hanya-modal-domain-untuk-email-pribadi-dan-website
---

<img src="https://lh4.googleusercontent.com/Bv2KF8hORY9RmCPHrR0NJN-z9WBT0ig3yJdwVBnxT5uZ2icuXWxh1M5_1InrJ6vogyHPIuRiNo0itDRDvVzddCT4ATEJetqsblGYZ7f63_LLJsti_oTzoCCsUTKU3FJeO9-p5Vus" alt="email-domain-nusendra" border="0">

Jaman sekarang sudah banyak sekali pilihan platform dan solusi untuk menyelesaikan
banyak masalah. Misalkan dalam contoh kasus yang akan saya bahas di postingan kali
ini adalah, apakah kita masih perlu untuk membayar / membeli layanan untuk email
dan hosting? Bagi mereka yang ga mau pusing untuk setup email forwarding, mungkin
bakal beli layanan email dan hosting untuk menyimpan file website mereka.

Sebenarnya tergantung kebutuhan juga, misalkan kita memang pengen punya app atau
web yang membutuhkan hosting dan database, ya mungkin perlu untuk membayar lebih.
Tapi untuk kasus saya, blog ini hanya perlu static generator, yang mana ga akan
membutuhkan sesuatu untuk di render di server ataupun akses database.

## Hosting Web Gratis (SSG)

Jadi semua file assets, html, js dan css saya serahkan ke Netlify selaku penyedia
layanan. Caranya adalah, saya hanya perlu create project di Netlify kemudian setup
project nya dengan mengintegrasikan Netlify dan Github. Ketika ada commit baru ke
master branch, maka secara otomatis Netlify akan nge-build web kita dan men-deploy
nya ke host mereka.

<img src="https://i.ibb.co/nPCbkmy/Screenshot-2023-04-09-at-13-06-20.webp" alt="netlify-nusendra">

Lalu bagaimana caranya agar domain yang kita punya bisa mengarah ke DNS milik Netlify? Dalam kasus ini saya menggunakan layanan Jagoanhosting untuk domain. Nah karena domain ini berada di Jagoanhosting, secara default DNS nya bakal mengarah ke Jagoanhosting, jadi kita perlu setup DNS nya untuk diganti mengarah ke Netlify.

## Email Forwarding

Lalu bagaimana dengan Email? Kalau kita membayar layanan email, misalkan dengan
domain nusendra.com, bakal dapat email custom seperti admin@nusendra.com, nah nanti
dari pihak hosting bakal menyediakan web client untuk mengakses email kita.
Masalahnya disini ada 2

1. Harus bayar lebih untuk layanan email
2. Terkadang email dari hosting tidak bisa menerima dan mengirim email, entah
   karena masalah apa, yang jelas dulu ketika pakai layanan ini, terkadang email
   server nya bermasalah sehingga tidak bisa menerima maupun mengirim email

Kemudian terpikir bagaimana cara agar email ini bisa jadi satu dengan email gmail
saya yang satu nya? Jadi misalkan ada orang kirim email ke admin@nusendra.com, maka
emailnya juga bakal masuk ke gmail. Jadi saya ga perlu memantau 2 email di web
berbeda. Hanya perlu untuk memantau gmail, sudah bisa memantau 2 email tersebut.

Muncullah satu layanan keren yang namanya `improvmx`. Platform ini menyediakan
layanan email forwarding yang berguna untuk mengalihkan (forward) email ke
nameserver tujuan. Misalkan nih, ada orang ngirim email ke admin@nusendra.com, maka
oleh improvmx akan diarahkan ke gmail.

<img src="https://i.ibb.co/yn6GcKg/Screenshot-2023-04-09-at-13-25-32.webp"
alt="improvmx-nusendra">

Gimana caranya?

1. Pertama setup domain dan email yang bakal di forward di halaman
   improvmx.
2. Setup Improvmx SMTP dengan gmail https://help.improvmx.com/en/articles/4633032-how-to-use-improvmx-smtp-with-gmail
3. Kemudian arahkan mx record dan SPF ke Netlify, karena web kita tadi sudah kita
   arahkan ke DNS nya Netlify, maka untuk MX dan SPF dari Improvmx juga harus
   diarahkan ke Netlify.

## Kesimpulan

Dalam kasus kali ini, saya hanya beli domain saja dari Jagoanhosting. Kemudian
untuk email forwarding pakai Improvmx dan hosting web dengan Netlify. Berikut ini
ringkasannya :

- Setup DNS record dari Jagoanhosting ke Netlify (Di admin panel Jagoanhosting).
  Ketentuan DNS record tujuan tersedia di admin panel Netlify. Sehingga website
  dengan domain kita bisa mengakses web yang di host di Netlify
- Setup MX dan SPF dari Improvmx ke Netlify, karena DNS domain kita sudah diarahkan
  ke Netlify, maka Improvmx juga perlu di arahkan ke Netlify sehingga email bisa
  menemukan DNS yang sudah resolved di Netlify
- Setup Improvmx SMTP dengan gmail.

Setelah melakukan semua hal diatas, jangan lupa untuk mengecek DNS kalian dengan
memasukkan domain name kesini https://dnschecker.org/. Kalau masih ada yang merah
merah, berarti ada yang perlu dibenerin lagi.

Dengan setup seperti diatas saya dapat banyak keuntungan :

1. Ga perlu bayar lebih untuk layanan hosting dan email (yaa meskipun murah sih
   haha).
2. Server gmail lebih solid dibandingkan dengan server email lokal, jadi
   kemungkinan email tidak terkirim atau tidak bisa menerima email akan sangat
   kecil sekali.
3. Bisa memantau 2 email sekaligus dalam 1 platform, yaitu GMAIL

Credit untuk mas Aldino Wildhan yang beberapa hari lalu ngebantuin untuk resolve
masalah ini dan ngasih perspektif yang berbeda. Customer support dari Jagoanhosting
memang top markotop, tanggap dan solutif.
