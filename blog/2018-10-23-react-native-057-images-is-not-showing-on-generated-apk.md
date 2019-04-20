---
title: React Native 0.57 - Images is Not Showing on Generated APK
date: 2018-10-23 22:25:35
description: "Gambar ga muncul setelah generate APK di React Native 0.57? Baca postingan saya ini, insyaallah manjur :D"
slug: react-native-057-images-is-not-showing-on-generated-apk
---

Permasalahan pertama setelah upgrade React Native dari 0.56 ke 0.57. Yaitu Gambar tidak muncul ketika APK release React native 0.57 (Image Not Showing on Generated APK). Oh iya, postingan kali ini bakal singkat banget, cuma sebagai catatan bagaimana cara ngebenerin masalah seperti ini.

Terakhir saya generating signed APK di versi 0.56 ga ada masalah, eh baru kali ini ada masalah ketika generate APK. Langsung deh gugling dan nemu solusi nya. Langsung aja yok beresin masalah nya

Pertama masuk ke directory project kalian, trus masuk ke folder android

```
$ cd android/
```

Kemudian paste script dibawah ini

```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

Kalau kalian dapat error seperti dibawah ini

```
$ ENOENT: no such file or directory, open './android/app/src/main/assets/index.android.bundle'
```

berari harus bikin folder assets nya dulu, paste aja ini

```
$ mkdir app/src/main/assets
```

Nah kalo udah, jalanin lagi script yang diatas tadi.

Bingung script yang mana? ini niiiiiiiihhhhhhh .....

```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

Nah nanti di folder `android/app/src/main/assets` bakal muncul file index.android.bundle yang isi nya assets kamu

Kalo udah, silakan jalankan lagi generate APK nya

```
$ ./gradlew assembleRelease
```

Trus coba install di HP kalian. Gimana berhasil gak? Semoga bermanfaat :D

FYI sorry ye ga ada gambar, lagi males screenshot ngahaha
