---
title: Jabber / XMPP menggunakan Nodejs
date: 2018-08-26 22:08:54
description: "Mari belajar membuat Jabber / XMPP client menggunakan Nodejs. XMPP ini adalah sebuah protocol komunikasi yang berbasis XML"
slug: jabber-xmpp-menggunakan-nodejs
---

Jabber atau yang sekarang disebut dengan XMPP ini adalah sebuah protocol komunikasi yang berbasis XML. Perusahaan yang memakai protocol XMPP untuk bertukar text atau komunikasi adalah Google Talk (Hangout), Live Journal, dan Ovi. Facebook chat juga memperbolehkan XMPP untuk mengaksees protocol komunikasi mereka. Ya intinya begini, kalau dulu kita mengenal Yahoo Messenger, karena sekarang sudah mati maka komunikasi kebanyakan memainkan protocol XMPP ini.

Nah kali ini kita akan belajar bareng gimana sih cara bikin XMPP client untuk melakukan aktifitas chatting atau saling berkomunikasi melalui XMPP, dengan menggunakan Nodejs. Library yang akan kita pakai adalah [simple-xmpp](https://github.com/simple-xmpp/node-simple-xmpp). Pertama siapkan dulu npm init nya

```
$ npm init
```

kemudian silakan isi sesuai kebutuhan saja. Setelah itu kita install dulu simple-xmpp nya

```
$ npm install simple-xmpp
```

Lanjut lagi. Kita siapkan file index.js untuk tempat kita ngoding xmpp nya. Jika sudah selesai bikin file nya, mari kita isi dengan script kita

```javascript
// Import library simple-xmpp
var xmpp = require('simple-xmpp');

// Connect ke server XMPP
xmpp.connect({
	jid: 'xmpp_saya@jabbim.com',
	password: 'testing123',
	host: 'jabbim.com',
	port: 5222
});

// Kirim pesan ke penerima
xmpp.send('xmpp_penerima@jabbim.com', 'Ini adalah pesan testing yang dikirim dari xmpp_saya ke xmpp_penerima', false);

// Jika xmpp client kita berhasil terhubung / login ke xmpp server, maka tampilkan pesan berikut
xmpp.on('online', function(data) {
	console.log('Terkoneksi dengan Jabber ID : ' + data.jid);
});

// Jika ada error di xmpp, munculkan pesannya
xmpp.on('error', function (err) {
	console.error(err);
})

// Jika ada yang melakukan permintaan pertemanan, kita accept secara otomatis
xmpp.on('subscribe', function (from) {
	console.log(from + ' ingin menambahkan anda sebagai teman')
	xmpp.acceptSubscription(from)
	console.log(from + ' telah ditambahkan sebagai teman')
})

// Tampilkan pesan jika ada pesan masuk (terima pesan)
xmpp.on('chat', function(from, message) {
  console.log(message);
});
```

Untuk menjalankan script diatas, kalian hanya perlu buka terminal di folder root project kalian, kemudian jalankan

```
$ node index.js
```

Ngomong dari tadi kita ngomongin XMPP client melulu, lalu untuk XMPP server apa ya? Nah XMPP server ini tempat / host untuk kita melakukan komunikasi. XMPP server ini banyak tersebar dimana mana, bahkan kita sendiri pun bisa membangun nya dengan mudah. Jadi kalau kita analogikan, XMPP server ini bisa jadi seperti Facebook chat, Line, whatsapp, telegram, dll. Dan kita bisa berkomunikasi dari whatsapp ke akun telegram, dan seterusnya. Nah kalian bisa coba daftar ke [Jabbim.com](https://www.jabbim.com/).

FYI, saya menggunakan XMPP / Jabber ini untuk kebutuhan bertukar pesan ketika melakukan transaksi pulsa H2H, dan yang jelas script nya tidak sesimple diatas ya hehehe.

<hr/>

Nah itu tadi sekilas tentang bagaimana cara bikin XMPP client buatan kita sendiri. Selamat mencoba dan semoga bermanfaat, makasih udah mampir.
