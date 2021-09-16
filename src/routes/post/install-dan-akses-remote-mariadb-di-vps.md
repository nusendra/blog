---
draft: false
title: Install dan Akses Remote MariaDB di VPS
date: 2018-12-20 14:38:18
tags: ['devops']
description: "Mengakses database di VPS secara remote melalui mysql-client kita"
slug: install-dan-akses-remote-mariadb-di-vps
---

Apa banget ya bahasannya, terkesan receh memang haha. Tapi saya pribadi perlu mencatat ini karena barusan entah kenapa problem banget ngurusin hal hal receh begini. Takut lupa, maka perlu saya catat saja. Materi kali ini bagaimana cara kita install MariaDB 10.2 dan bagaimana cara akses remote database melalui mysql client (cli / GUI) di sistem lokal kita.

## Instalasi

```
$ sudo apt install build-essential
$ sudo apt-get install software-properties-common
$ sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
$ sudo add-apt-repository 'deb [arch=amd64] http://mariadb.biz.net.id/repo/10.2/ubuntu bionic main'
$ sudo apt update
$ sudo apt install mariadb-server
```

Kenapa ribet begini? Kenapa ga langsung sudo apt install mariadb-server , karena jika langsung begini dia akan install mariadb dengan versi 10.1. Oh iya, ketika instalasi nanti akan diminta untuk masukin password ya.

## Open Koneksi Remote Database

Ketik ini di terminal / command vps nya

```
$ sudo ufw allow from any to any port 3306
atau
$ sudo ufw allow mysql
atau
$ sudo ufw allow 3306/tcp
```

Jika kalian ketik begini

```
$ sudo ufw status
```

Harus nya muncul port 3306 disana, artinya port ini sudah bisa di akses oleh mysql-client di local system kita. Misalkan ketika kita akses mysql nya dan mendapatkan bahwa IP kita ditolak, maka kita lanjut setting di dalam konfigurasi mysql nya.

## Konfigurasi MySQL

```
$ sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Kemudian kita cari bind-address, jika kalian mendapatkan seperti ini

```
...
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address = 127.0.0.1
...
```

Artinya database ini hanya bisa diakses lokal. Maka jika pengen akses remote, kita komentarin baris itu dengan menambahkan #

```
...
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
# bind-address = 127.0.0.1
...
```

setelah itu restart mysql nya

```
$ sudo service mysql restart
```

Harusnya sampai sini, temen temen bisa akses database secara remote.

<hr/>

Sekian postingan receh kali ini, jika temen temen ada yang gagal dalam konfigurasi nya, jangan ragu untuk tanya tanya di kolom komentar. Yang pengen nambahin juga silakan. Thanks udah mampir, semoga bermanfaat
