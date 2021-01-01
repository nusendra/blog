---
title: 'Membersihkan Disk Usage pada Ubuntu Server'
date: 2020-09-04 06:00:00
description: 'Solusi untuk disk usage anda yang kepenuhan'
tags: ['opinion']
draft: false
slug: membersihkan-disk-usage-pada-ubuntu-server
---

Postingan kali ini sebenernya lebih ke catatan pribadi, tapi kalau memang bisa membantu temen - temen yang membutuhkan ya alhamdulillah :D

Kalian pasti sering / pernah mengalami disk usage di ubuntu server (warga cpanel minggir dulu) mengalami kepenuhan, biasanya diawali dengan lambat nya performa website kalian yang kadang tiba tiba not responding. Dan ketika kita cek masuk ke server dengan mengetikkan `df -h` ternyata disk usage nya  udah 100% aja. Nah gimana cara bersihinnya?

Hal yang paling cepet dipikirin adalah dengan `apt autoremove`, namun yang satu ini ga bisa menghapus dengan efektif, hanya beberapa cache dan file yang ga dibutuhkan aja. Dibawah ini contoh setelah ngejalanin `apt autoremove`.

![Setelah Autoremove](https://res.cloudinary.com/nusendra/image/upload/v1599176040/blog/Screenshot_from_2020-09-04_06-31-19_dvcw6l.png)

Kalau kita lihat di `/dev/sda1/` Ternyata ga sepenuhnya bersih, cuman bisa ngebersihin beberapa ratus MB saja. Nah biar lebih maksimal, coba pakai file dibawah ini agar membersihkan lebih hebat daripada sabun cuci piring biasa

```
#!/bin/sh

#Check the Drive Space Used by Cached Files
du -sh /var/cache/apt/archives

#Clean all the log file
#for logs in `find /var/log -type f`;  do > $logs; done

logs=`find /var/log -type f`
for i in $logs
do
> $i
done

#Getting rid of partial packages
apt-get clean && apt-get autoclean
apt-get remove --purge -y software-properties-common

#Getting rid of no longer required packages
apt-get autoremove -y


#Getting rid of orphaned packages
deborphan | xargs sudo apt-get -y remove --purge

#Free up space by clean out the cached packages
apt-get clean

# Remove the Trash
rm -rf /home/*/.local/share/Trash/*/**
rm -rf /root/.local/share/Trash/*/**

# Remove Man
rm -rf /usr/share/man/??
rm -rf /usr/share/man/??_*

#Delete all .gz and rotated file
find /var/log -type f -regex ".*\.gz$" | xargs rm -Rf
find /var/log -type f -regex ".*\.[0-9]$" | xargs rm -Rf

#Cleaning the old kernels
dpkg-query -l|grep linux-im*
#dpkg-query -l |grep linux-im*|awk '{print $2}'
apt-get purge $(dpkg -l 'linux-*' | sed '/^ii/!d;/'"$(uname -r | sed "s/\(.*\)-\([^0-9]\+\)/\1/")"'/d;s/^[^ ]* [^ ]* \([^ ]*\).*/\1/;/[0-9]/!d' | head -n -1) --assume-yes
apt-get install linux-headers-`uname -r|cut -d'-' -f3`-`uname -r|cut -d'-' -f4`

#Cleaning is completed
echo "Cleaning is completed"
```

Kemudian simpan di manapun, misalnya di /home. Jangan lupa juga jalanin
```
$ sudo chmod +x clean.sh
```

Setelah itu untuk pakai nya tinggal begini aja

```
$ cd ~/home
$ sudo ./clean.sh
``````

Hasilnya akan seperti dibawah ini, mantap kan? :D

![Setelah Cleaning](https://res.cloudinary.com/nusendra/image/upload/v1599176040/blog/Screenshot_from_2020-09-04_06-31-47_hbwbem.png)

Semoga bermanfaat, terima kasih :)
