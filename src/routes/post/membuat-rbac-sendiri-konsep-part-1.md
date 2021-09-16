---
draft: false
title: "Membuat RBAC Sendiri : Konsep - Part 1"
date: 2019-02-02 23:34:11
tags: ['opini','tips']
description: "RBAC menggunakan library orang lain itu ga keren. Yuk kita bikin RBAC dengan konsep kita sendiri..."
slug: membuat-rbac-sendiri-konsep-part-1
---

RBAC (Role Based Access Control) adalah fitur wajib yang harus ada di sebuah web aplikasi. RBAC ini sendiri berfungsi untuk membatasi suatu user dalam mengakses sebuah / beberapa fitur dalam sebuah aplikasi. Misalkan contoh yang paling gampang, dalam aplikasi yang akan kita buat membutuh kan 4 menu, yakni master barang, master user, transaksi penjualan, dan invoice. Sedangkan untuk user nya kita punya Andi, Budi, dan Candra.

1. Andi seorang Manager, dia bisa melakukan CRUD di menu master barang dan master user saja. Dan dia juga bisa memantau data transaksi penjualan, tetapi dia ga bisa melakukan create / update / delete.
2. Budi seorang Marketing, dia bisa melakukan CRUD di menu penjualan saja, tetapi dia juga bisa melihat data barang (tanpa bisa create / update / delete data).
3. Candra seorang Admin Penagihan, tugas nya hanya bikin invoice saja.

Nah dari contoh kasus diatas, mari kita buat sebuah table user untuk handle kasus seperti ini

username | password | write_menu | readonly_menu
--- | --- | --- | ---
andi | anditampan
budi | budibiasa
candra | candrajelek

Pada table diatas, ada field yang bernama write_menu dan readonly_menu. Untuk write_menu ini nanti isinya adalah sebuah string yang berisi id menu yang dia bisa melakukan CRUD. Sedangkan readonly_menu berisi id menu apa saja yang dia hanya bisa lihat (tanpa create / update / delete).

## Simulasi

Mari kita simulasi kan, pertama kita bikin table menu nya dulu, kemudian pada table user bisa langsung kita lengkapi. Oh iya, disini untuk table jabatan tidak saya buat, agar kita bisa fokus pada table user dan menu nya saja.

Pertama bikin table Menu

id | title | url
--- | --- | ---
1 | Master Barang | /goods
2 | Master User | /users
3 | Transaksi Penjualan | /sales
4 | Invoice | /invoices

Simple saja, diatas ini adalah table menu. Untuk url nanti kita gunakan untuk redirect ke halaman itu ketika menu selesai di render (di frontend), sementara kita abaikan dulu field url nya.

Kedua bikin table User

id | username | password | write_menu | readonly_menu
--- | --- | --- | --- | ---
1 | andi | anditampan | 1,2 | 3
2 | budi | budibiasa | 3 | 1
3 | candra | candrajelek | 4

Nah table diatas sudah bisa kita gunakan sebagai dasar untuk RBAC kita. Tinggal bagaimana kita melakukan rendering di frontend nya.

## Kesimpulan

Tulisan diatas ini hanyalah konsep saja, untuk backend teman - teman bebas bisa pakai framework atau bahasa apa saja. Tugas untuk di backend ini adalah bagaimana kita bisa menyimpan / mengupdate data user dengan menu akses seperti diatas. Kemudian, pada fitur login, ketika user berhasil login maka backend akan mengirimkan (response) data yang berupa data user, misal seperti username, nama, jabatan, dan menu apa saja yang boleh diakses / cuma di read doang. Contoh response nya seperti ini

```javascript
{
  'name': 'Andi Sangat Tamvan',
  'username': 'andi',
  'password': 'anditampan',
  'jabatan': 'Manager',
  'write_menu': '1,2',
  'readonly_menu': '3'
}
```

Nah dari response diatas, maka tugas frontend adalah me render menu apa saja yang bisa diakses oleh si Andi, Menu mana saja yang Andi bisa melakukan CRUD, dan menu mana saja yang si Andi hanya boleh read data.

<hr/>

Sekian konsep yang saya paparkan, next post insya allah akan saya bahas cara rendering menu menu nya di frontend (pakai Nuxtjs ya :D ). Untuk backend saya rasa tidak perlu dipaparkan, karena sudah sangat jelas flow nya. Tinggal bikin login, kemudian return response seperti json diatas (jika sukses login), selain itu create data user nya juga sudah jelas banget bagaimana cara nya. Semoga ga bingung sama penjelasan diatas, kalau bingung bisa tulis di kolom komentar. Thanks, moga bermanfaat XD
