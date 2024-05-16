---
title: "SvelteKit Bukan Mainan Untuk Para Pemula dan Pemarah"
date: 2024-05-16 07:55:00
description: "Pemula yang gampang marah-marah, kesel dan bosenan dilarang pakai Sveltekit"
tags: ['sveltekit', 'svelte']
draft: false
slug: sveltekit-bukan-mainan-untuk-para-pemula-dan-pemarah
---

<img src="https://media.istockphoto.com/id/1369139581/photo/confused-arab-man-talking-on-mobile-phone-using-laptop.jpg?s=612x612&w=0&k=20&c=ad73buCnD2TAlOgNevnSfx7C7W30UvzUXX8dwbPVGMc=" width="100%">

Kenapa saya bilang kalau sveltekit ini bukan untuk orang yang gampang marah? Apalagi pemula? Singkatnya, kalian ga akan bisa tidur tenang setelah
melalukan `yarn upgrade` atau ketika file `yarn.lock` anda sudah outdated dan dipaksa untuk upgrade versi dependencies.

Sedikit informasi, blog ini menggunakan svelte sebagai framework, mdsvex untuk ngurusin hal - hal yang berkaitan dengan konten artikel (markdown)
dan svelte-kit as framework juga yang dibangun diatas svelte. Sebagai perbandingan, svelte-kit ini sama halnya seperti Nuxt untuk Vue, dan Next untuk Reactjs.

Kita kembali ke topik marah - marahnya. Dari awal saya menggunakan framework ini, sudah beberapa kali dibikin ribet ketika melakukan upgrade versi.
Mulai dulu ketika svelte masih pakai Sapper, setiap update banyak breaking changes dan harus mengupdate disana sini, dan sebagainya.

Nah ini saya sebutin beberapa yang saya masih ingat (sebenernya masih banyak yang lain lagi) kasus breaking changes yang saya alami ketika
menggunakan svelte.

- Awal awal menggunakan sapper, setiap ada upgrade selalu ada saja breaking changes. Jadi ketika menjalankan build, harus fix dulu dibanyak tempat 🤯
- Masih di jaman Sapper, ketika ada url yang salah, si svelte selalu mengembalikan pesan error. Misalkan `/post/svelte-ribet` ini ga ada, yang
    bener tuh `/post/svelte-ribet-pake-banget`. Itu bisa bikin gagal build 🤯
- Trus masuk ke jamannya Rich Harris join vercel. Diganti lah tuh yang awalnya file cuma `page.js` jadi dipecah antara server dan ui nya (khusus
    prerender & SSR) dengan tambahan file `page.server.js`. Oh iya akhirnya Nextjs juga ngikutin *convention* ini 🤯
- Lanjut lagi masih di jaman yang sama, ada tambahan lagi untuk `page` dan `layout` harus pakai `+` jadinya `+page.server.js` dan `+layout.js`.
    Masih ingat seharian debugging error karena lupa di filenamenya ga ada `+`. Bajingaaaaaannnnn 🤯.
- Pernah juga kejadian, adapter untuk ngehandle web prerender bawaan sveltekit gak work di netlify. Ternyata ada adapter khusus untuk netlify yaitu
    `adapter-netlify`. Udah kelar pakai ini, eh beberapa kemudian disarankan untuk balik ke `adapter-static` karena udah bisa ngehandle proses
    build di netlify juga. 🤯

Dan baru baru ini kejadian lagi (yang ngetrigger saya untuk bikin artikel ini) yakni prerendernya ga jalan karena ada update di adapter dan
sveltekitnya 😡.

<img src="https://res.cloudinary.com/duuokdtuv/image/upload/v1715822525/sveltekit_error_wd1k44.webp">

Solusinya :

- Hapus opsi prerender yang adi di `svelte.config.js`
- Bikin file baru di `routes` folder dengan nama `+layout.js`. dan isinya
    ```
    const export prerender = true;
    ```
- Begitupun yang ada di folder `/api`, tambahin kode diatas di file `+page.server.js` nya
- Trus ada lagi error yang nyempil di artikel markdownnya, karena ada link yang salah. Link yang salah pun bisa jadi gagal build loh. Ngeri gak tuh
    svelte, strict bet.


Tapi mau bagaimanapun, saya masih cinta Svelte. Sejauh ini (sepengalaman nyobain framework lain untuk bikin blog), framework ini yang performanya enteng banget, maklum karena doi adalah compiler.

Satu kata untuk pecinta Svelte (Svelte-kit). **KALAU ADA YANG SUSAH, KENAPA PILIH YANG MUDAH?**


🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
