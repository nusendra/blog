---
draft: false
title: Setup HTTPS / SSL di Nuxtjs dan Laravel dengan Nginx
date: 2018-12-24 14:30:09
tags: ['devops','laravel','nuxtjs']
description: "Memasang SSL / HTTPS di project Nuxtjs, Laravel, dan web socket Socket.io menggunakan Nginx dan Let's Encrypt."
slug: setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx
---

Sebenernya agak bingung milih judul, karena bakal banyak teknologi yang akan saya usung disini. Detailnya, Bagaimana cara menerapkan HTTPS di project Nuxtjs dan Laravel menggunakan Let's Encrypt. Jadi disini ada 3 kondisi, frontend menggunakan Nuxtjs dengan mode SPA, backend menggunakan Laravel, untuk web socket memakai socket.io dan Laravel echo server, untuk SSL nya sendiri kita pakai gratisan dari Let'ts Encrypt.

Kondisi yang ada seperti ini, Hanya menggunakan 1 domain, dan engga boleh bikin sub domain. Karena Let's encrypt hanya bisa dipakai di web public dengan port 80 / 443, maka kita ga boleh deploy backend dan web socket nya menggunakan port selain 80. Untuk frontend sendiri bakal pakai port 80, karena nanti dia yang akan diakses oleh public. Sedangkan jika port 80 nya sudah terenkripsi dengan SSL, maka untuk akses API nya juga harus melalui HTTPS.

Cara yang paling dekat dan efisien adalah, kita buat sebuah domain dengan 2 buah sub directory untuk backend dan web socket nya. Oh iya, artikel ini ada kaitannya dengan postingan sebelumnya ya [https://nusendra.com/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1](https://nusendra.com/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1) dan [https://nusendra.com/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2](https://nusendra.com/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2). Jadi jika temen temen pengen lebih paham mengenai realtime notifikasi menggunakan socket io, maka perlu dibaca dulu.

Baik kita buat skema nya dulu, rencana kita akan deploy ke 3 instance ini (Nuxtjs, Laravel, Websocket) kedalam VPS menggunakan 1 domain saja. (misalkan [example.com](https://example.com/))

Tech |	IP	| Dir / Folder
--- | --- | ---
Frontend Nuxtjs	| localhost:80	| /var/www/html/frontend
Backend Laravel	| localhost:81	| /var/www/html/backend
Web Socket	| localhost:6001	| /var/www/html/backend

Nah karena Let's Encrypt hanya bisa diterpkan di port 80, artinya hanya Nuxtjs saja yang bisa pakai HTTPS, untuk 2 yang lainnya tetap HTTP. Dari sini browser akan memberikan keterangan error jika Nuxt (HTTPS) mengakses API / web socket yang masih menggunakan protokol HTTP. Cara gampang nya, kita tinggal bikin 2 sub domain baru dengan port 80 untuk backend dan web socket nya. Dengan begitu semua nya bisa mendapat akses HTTPS.

Tapi ga seru ah, kita bikin kondisi yang lebih susah lagi, bagaimana jika tidak diperbolehkan menggunakan sub domain? Yak kita pakai sub directory. Jadi nanti untuk backend URL nya adalah [example.com/backend](https://example.com/backend) dan websocket nya menggunakan [example.com](https://example.com/backend).

> Sebelum lanjut, saya sarankan untuk paham terlebih dahulu bagaimana implementasi laravel echo server dan redis. Bisa baca 2 artikel yang sudah saya share diatas.

## Install Let's Encript khusus Nginx

Pertama login ke vps mu pakai ssh

```
$ ssh <username>@<ip_vps>
```

Karena kita pakai Ubuntu, ketik ini di terminal. (Untuk OS lain, sesuaikan sendiri ya).

```
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install python-certbot-nginx
```

Setelah selesai, pastikan domain kamu udah berhasil di tembak ke IP nya ya. Kemudian kita setting nginx nya

```
$ sudo nano /etc/nginx/sites-available/default
```

Kemudian modifikasi file nya, seperti berikut (sesuaikan)..

```
# Ini untuk frontend Nuxtjs (Static SPA)
server {
        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        root /var/www/html/frontend/dist;
        index index.html index.htm;
        server_name example.com;

        location ~ /\.ht {
                deny all;
        }

        # Untuk Backend Laravel
        location /backend/ {
                proxy_pass http://127.0.0.1:81/;
        }

        # Untuk Web Socket Laravel-echo-server
        location /socket.io {
                proxy_pass http://127.0.0.1:6001;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
}

# Ini untuk backend Laravel
server {
        listen 81 default_server;
        listen [::]:81 default_server;
        root /var/www/html/backend/public;
        index index.php index.html index.htm;

        server_name example.com:81;

        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php7.2-fpm.sock;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
        }

        location ~ /\.ht {
                deny all;
        }
}

# redirect to https
server {
    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80 default_server;
        listen [::]:80 default_server;

        server_name example.com;
    return 404; # managed by Certbot
}
```

Temen temen lihat, disana ada kata kata managed by Certbot, script itu dia generate otomatis dari Letsencrypt nya. Jadi temen temen ga perlu pusing ngurusin script redirect nya.

Pada block server yang pertama kita tentukan dulu port dan root folder dari project frontend nuxt nya. Kemudian d (dalam block itu kita buat block lagi untuk location (subdirectory backend dan socket.io) yang akan mempassing proxy ke port di masing masing block. Kemudian block server yang kedua adalah standart nginx setup untuk laravel. Oh iya, pastikan juga project Nuxt nya udah di build ya, karena folder dist itu akan terbentuk setelah build berhasil. Setelah itu simpan dan coba check konfig nginx kita

```
$ nginx -t
```

Jika muncul tulisan yang ada kata syntax ok nya, berarti settingan kita udah bener. Next...

Jika port 80 kalian belum di enable, silakan aktifkan melalui ufw.

```
$ ufw allow ‘Nginx Full’
$ ufw delete allow ‘Nginx HTTP’
$ ufw status
$ sudo service nginx restart
```

Kemudian mari kita hajar instalasi Lets Encrypt nya.

```
$ sudo certbot --nginx -d example.com
```

Jika sudah selesai. Silakan coba cek masuk ke browser dengan url [example.com](https://example.com/) (contoh), maka disana kalian akan mendapatkan Tulisan `secure` di sebelah kiri URL nya. Kemudian coba juga akses [example.com/backend](https://example.com/), harusnya sudah muncul API dari route laravel nya.

## Konfigurasi Nuxtjs

Nah sekarang kita tinggal setting endpoint nya aja di Nuxt dan Laravel echo nya. Masuk kedalam folder plugins dan buka laravel-echo.js kemudian edit seperti berikut

```javascript
import Echo from 'laravel-echo'

window.io = require('socket.io-client')
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: https://example.com
})
```

Kemudian di file nuxt.config.js nya, untuk axios kita tentukan juga baseURL nya.

```javascript
axios: {
  baseURL: https://example.com/backend/api
}
```

Setelah itu coba build kembali. Dan buka halaman [example.com](https://example.com/), harusnya ketika buka chrome Devtools kalian ga akan lagi mendapatkan error karena ga boleh akses HTTP API maupun gagal nya polling ke web socket.

<hr/>

Sekian bahasan yang lumayan berat ini. Semoga bermanfaat bagi temen temen yang punya kasus paling engga hampir sama seperti ini. thanks udah mampir...
