---
draft: false
title: Setup Automation dengan N8N, Ollama dan Coolify di VM Cloudraya
date: 2025-10-05 13:30:00
tags: ['n8n','ollama','coolify', 'ai agent']
description: "Langkah - langkah membuat automation dengan AI Agent di VM Cloudraya menggunakan N8N
dan Ollama"
slug: setup-automation-dengan-n8n-ollama-dan-coolify-dari-awal
---

<img src="/images/n8n-ollama-coolify.webp" />

Artikel ini merupakan versi tulisan dari workshop yang diadakan ditanggal 4 Oktober 2025, event JSID x Cloudraya

---

Tulisan kali ini adalah *step by step* bagaimana caranya melakukan automasi dari VM yang masih kosong (scratch). Teknologi yang akan digunakan
adalah VM dari Cloudraya, Coolify, Ollama dan N8N.

Untuk spesifikasi dari VM nya sendiri, sebenarnya tergantung dari apa yang akan digunakan. Karena kita perlu untuk menggunakan Ollama, maka
kita tidak bisa memakai layanan yang basic. Jadi kali ini spesifikasi VM nya adalah CPU 4 *cores* dan memory 8GB. Kita tidak perlu GPU untuk
Ollama kali ini, karena model yang akan kita gunakan adalah model kecil, kisaran 800MB - 2GB an.

## Setup VM

Jika kalian menggunakan VM selain Cloudraya, bisa disesuaikan dan skip bagian ini. Tetapi yang perlu diperhatikan adalah port 8000 harus
dibuka secara manual, karena *by default* port 8000 biasanya tidak tersedia untuk diakses.

<img src="/images/vm-detail.webp" />

Setelah VM berhasil dibuat dengan spec minimum 8GB memory, yang perlu diperhatikan dihalaman **VM Detail** ini adalah **username**, **password**,
dan **Public IP**. Untuk saat ini, akses SSH ke server akan kita lakukan dengan password, bukan dengan SSH Key. Namun kedepannya sangat
disarankan untuk login via SSH Key agar lebih aman dan mudah.

Sebelum kita login ke server, baiknya perlu untuk mengkonfigurasi port melalui VPC yang sudah dibuat (Untuk pembuatan VPC bisa dilakukan
ketika proses pembuatan VM, atau bisa secara manual di menu **Networking -> VPC**). Kali ini kita perlu untuk memperbolehkan akses port 8000 di
VM kita, karena Coolify akan berjalan diatas port ini. Jika kita tidak membuka port ini, maka nantinya Coolify tidak akan bisa diakses dari
luar.

<img src="/images/vpc.webp" width="70%" style="margin: auto;" />

Kemudian di halaman VPC, scroll ke paling bawah dibagian Access List, klik nama VM nya

<img src="/images/vm-name.webp" width="70%" style="margin: auto;" />

Create rule VPC dengan membuka port 8000

<img src="/images/create-rule-vpc.webp" width="70%" style="margin: auto;" />

Setelah rule baru dengan membuka port 8000 sudah selesai, maka VM kita sudah siap untuk dipakai. *You did a great job bruh*

## Setup Coolify

Kenapa harus menggunakan Coolify? *In short* coolify ini membantu kita untuk management VM. Jika sebelumnya kita biasa me*manage* server
secara manual, seperti *config* port, *install apps*, *routing management*, dan lainnya, hal ini bisa dilakukan dengan mudah menggunakan
Coolify.

Yang perlu dilakukan pertama kali adalah, login ke server melalui SSH. Informasi login ke server bisa dilihat di bagian Setup VM diatas. Di
terminal bisa diketik seperti ini

```
ssh root@<public_ip>
```

Kemudian untuk password bisa dicopy dibagian **VM Detail**

Setelah berhasil login ke server, saatnya kita install Coolify dengan mengetikkan perintah berikut ini di terminal

```
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Tunggu hingga proses selesai, dan nanti kita akan dapat informasi bagaimana cara mengakses coolify kita. Biasanya akan ada informasi seperti
ini `<public_ip>:8000`. Jadi sekarang mari kita menuju ke coolify yang sudah terinstall di url `<public_ip>:8000`

Akan ada halaman Register, kita bisa register terlebih dahulu dan masuk ke halaman Coolify.

Yang perlu kita lakukan pertama kali adalah membuat Project di menu **Projects**. Setelah itu nanti didalam *environment* projects nya akan ada
environment *production* secara otomatis. Klik environment tersebut dan kita akan berada dihalaman *Resources*. Disini langsung saja kita
klik **+ New**

<img src="/images/add-new-resource.webp" width="70%" style="margin: auto;" />

## Setup Ollama

Ketika proses *create new service*, kita bisa melakukan pencarian di coolify. Karena saat ini kita akan menginstall Ollama, maka ketik Ollama
dan coolify akan menampilkan beberapa service yang siap untuk digunakan. Pilih **Ollama with Open Webui**

Setelah itu centang opsi ini **Connect To Predefined Network**, kemudian klik Deploy dan tunggu hingga prosesnya selesai. Jika selesai, nanti
halaman service Ollama akan terlihat seperti ini

<img src="/images/ollama-coolify.webp" style="margin: auto;" />

Ollama kita sudah siap !! Sekarang kita perlu untuk menginstall model Ollama kita. Sebenarnya hal ini bisa dengan mudah kita lakukan di menu
Terminal (lihat gambar Ollama service di coolify diatas). Namun jika kita belum setup https di server kita, ini tidak bisa dilakukan, *for
some reason* tidak bisa masuk ke terminal Ollama. Ini bukan masalah besar, kita masih bisa melakukan ini secara manual melalui akses ke server
kita via SSH

Sekarang mari login ke server kita kembali via SSH, dan ketik dibawah ini

```
docker ps
```

Nanti akan ada beberapa docker container yang sudah jalan, salah satunya adalah Ollama. Cari **ollama/ollama:latest** kemudian catat **CONTAINER ID** dan **CONTAINER
NAME** nya. Contohnya seperti ini

```
9a8b1f1eb4ce   ollama/ollama:latest                         "/bin/ollama serve"      42 hours ago     Up 10 hours (healthy)     11434/tcp   ollama-api-z4s0wgw8osocso80cw0kcc8w
```

Jika dilihat diatas, maka CONTAINER ID kita adalah **9a8b1f1eb4ce** dan CONTAINER NAME **ollama-api-z4s0wgw8osocso80cw0kcc8w**

Kemudian kita wajib untuk masuk ke container tersebut dengan perintah seperti ini

```
docker exec -it 9a8b1f1eb4ce /bin/bash
```

Dan nanti kita akan berada didalam container tersebut jika diterminal kita berubah menjadi seperti ini **root@9a8b1f1eb4ce:/#**
dan kita sudah siap untuk menginstall model kedalam Ollama

> Yang perlu dilakukan sebelum install model adalah, pilih model yang pas untuk tujuan kita. Jika apps kita relatif kecil dan
simple, maka pilihlah model yang kecil sehingga resource dari VM kita dipergunakan dengan maksimal

Kali ini kita coba untuk install model yang kecil saja. Jika tugasnya hanya untuk ekstrak kata, bisa pilih model apapun yang
ukurannya sekitar 300MB. Untuk use case kita kali ini, kita bisa pakai **llama3.2:1b**. Model ini relatif kecil dan sudah
support untuk external tools.

Untuk menginstall model ini kedalam Ollama, bisa dengan mengetikkan perintah dibawah ini didalam container.

```
ollama pull llama3.2:1b
```

Tunggu prosesnya hingga selesai. Jika sudah selesai kita bisa masuk ke halaman Ollama service di Coolify kita dan klik
linknya (Ada di menu **Links**), lakukan register dan nantinya akan terlihat halaman Ollama seperti dibawah ini.

<img src="/images/ollama.webp" style="margin: auto;" />

Disini kita sudah berhasil setup dan punya AI sendiri, dan itu **GRATIS !** Di halaman ini juga terkonfirmasi bahwa model yang
sudah kita install secara manual tadi sudah siap untuk dipakai

## Setup N8N

N8N adalah tools automation yang sangat powerful dan hype saat ini. Bisa diinstall secara *self hosted* dan gratis :)

Untuk installasi n8n, bisa kembali ke menu **Resources** di Coolify, kemudian klik **+ New** dan pilih Dockerfile

> Kenapa tidak install n8n di menu pencarian? Dan kenapa harus pakai Dockerfile? Alasannya bisa dibaca di artikel saya disini https://nusendra.com/post/n8n-telegram-cloudflare-coolify

Kemudian dihalaman Dockerfile, ketik seperti ini

```
FROM n8nio/n8n:latest
EXPOSE 5678
```

Save, dan klik Deploy. Hasilnya nanti akan seperti dibawah ini

<img src="/images/n8n-coolify.webp" style="margin: auto;" />

Sekarang klik **Links** yang ada di halaman itu, dan klik linknya. Nanti kita akan dibawa ke halaman register n8n. Silakan
lakukan registrasi dan nanti setelah berhasil hasilnya akan seperti ini

<img src="/images/n8n.webp" style="margin: auto;" />

Kita sudah siap untuk membuat workflow pertama kita !!!! Klik **Create Workflow** disebelah kanan atas.

### Simple Workflow

Kali ini kita akan coba untuk super simple workflow, yaitu membuat fitur chat di n8n yang terkoneksi dengan Ollama kita.
Pertama klik icon **+** dan cari fitur **Chat** seperti dibawah ini

<img src="/images/n8n-chat-trigger.webp" width="70%" style="margin: auto;" />

Tidak ada yang perlu kita setup di popup **Chat Trigger**. Klik keluar popup atau klik **Back to canvas**. Kemudian di sebelah
kanan **Chat Trigger**, klik tombol **+** dan pilih **AI** -> **AI Agent**

Di popup AI Agent juga tidak ada yang bisa kita lakukan untuk saat ini. klik keluar popup atau Back to canvas. kemudian
dibawah node **AI Agent**, klik tombol **+** untuk **Chat Model**

<img src="/images/ai-model-node.webp" style="margin: auto;" />

Kemudian pilih **Ollama Chat Model**. Setelah itu akan tampil popup dari Ollama Chat model. Pertama kita harus setup
credential dari Ollama. Klik **Create new credential**

<img src="/images/ollama-popup-credential.webp" width="70%" style="margin: auto;" />

Untuk mengkonfigurasi credentials dari Ollama, yang kita perlukan adalah **CONTAINER NAME** dan **API KEY** dari Ollama yang ada didalam Coolify
kita. Karena sebelumnya kita sudah catat **CONTAINER NAME** milik Ollama (dalam kasus ini, container name nya adalah **ollama-api-z4s0wgw8osocso80cw0kcc8w**), maka sekarang kita harus mendapatkan API Key milik Ollama. Pertama pergi ke url web ui untuk Ollama dengan cara pergi ke Ollama service di Coolify, klik Links dan pergi ke URL tersebut.

Klik avatar yang ada di kanan atas di halaman Ollama web ui dan klik Settings.

<img src="/images/ollama-setting.webp" width="50%" style="margin: auto;" />

Kemudian klik **Account**, dan klik **Show** dibagian **API Key**

<img src="/images/ollama-account.webp" style="margin: auto;" />

Catat API Key nya. dan kita kembali ke halaman Credential di n8n.

<img src="/images/n8n-ollama-credential.webp" style="margin: auto;" />

Jika url dan API Key nya sesuai dengan konfigurasi Ollama kita, ketika credential di-*save* akan muncul alert **Connection
tested successfully** yang artinya kita bisa menggunakan Ollama kita sebagai jembatan untuk untuk mengoperasikan AI Agent.
Kemudian nanti juga model yang ada di Ollama akan terdeteksi secara otomatis oleh N8N.

Ini adalah hasil akhir dari AI Agent + Simple chat yang telah kita buat.

<img src="/images/simple-chat-agent.webp" style="margin: auto;" />

Sekarang kita bisa coba melakukan Chat di **Chat Trigger** didalam canvas tersebut. Dan hal ini bisa lakukan sebanyak apapun
yang kita mau tanpa takut kehabisan token seperti ketika kita menggunakan platform AI seperti Anthropic atau Openai.

<img src="/images/final-simple-chat.webp" style="margin: auto;" />

Ini hanya simple chat app. Selanjutnya kisa bita membuat automasi apapun yang kita mau. Berikut ini adalah beberapa workflows
yang saya pakai untuk kebutuhan personal menggunakan n8n.

https://github.com/nusendra/n8n-workflows

---

Semoga artikel ini bermanfaat untuk para pembaca semua. Thanks for stopping by
