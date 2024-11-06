---
draft: false
title: Installing Redis with PHP on Nix
date: 2024-11-06 08:00:00
tags: ["nix", "os"]
description: "This guides walks you through every step to get redis-php up and running"
slug: redis-installation-nix-guide
---

<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/440px-Redis_Logo.svg.png" alt="redis image">
</div>

I've been struggling for couple of hours working on how to install redis-php on nix. Even though I installed this
using php83Extensions.redis, but its still didn't work at all. How do I know that redis failed to install in PHP
module? This is the command

```
$ php -m | grep redis
```

If it's return nothing, then redis isn't installed to PHP. So, after tweaking for hours, here is what i found.

First, make sure you have working devShells in your nix. Here's mine

```
  php = pkgs.mkShell {
    description = "PHP 8.3";
    buildInputs = with pkgs; [
      mariadb_110
      redis
      php83
      php83Packages.composer
      (with (php83Extensions); [pdo xml redis])
    ];
    shellHook = ''
      ${shellAliases.aliases}
      MYSQL_BASEDIR=${pkgs.mariadb_110}
      ${mariadb.command}

      echo "Starting Redis..."
      redis-server --daemonize yes

      echo "PHP configuration:"
      php --ini
      php -m | grep redis
    '';
  };
```

in that setup, I am adding redis to php83Extensions. But unfortunately it won't install to php module by default.
So we need to setup manually.

Enter your devshells and you will find out where is the `php.ini` file. Mine is in here

`/nix/store/yxlsvn4biz4b2r2hajpys297r3yqsj3r-php-with-extensions-8.3.4/lib/php.ini`

if you open that php config file, you will find something like this

```
extension=/nix/store/08g94sll22520lsvl7y5kc80fqx23b9q-php-bcmath-8.3.4/lib/php/extensions/bcmath.so
extension=/nix/store/isw9sclkjpcbn1fj0s1qcvlskypzsiar-php-calendar-8.3.4/lib/php/extensions/calendar.so
extension=/nix/store/57dd9akyxjp5vf2qymj2pyjksw8y1q1l-php-curl-8.3.4/lib/php/extensions/curl.so
extension=/nix/store/xyyabaln51dz4ri6cwn885fqzw1qwgyk-php-ctype-8.3.4/lib/php/extensions/ctype.so
extension=/nix/store/bgmk68qb41w32mpsj1ipp5srqiy2h889-php-dom-8.3.4/lib/php/extensions/dom.so
extension=/nix/store/jv2378af80z3m3lvswhl5qnky9n503zv-php-exif-8.3.4/lib/php/extensions/exif.so
extension=/nix/store/yw303bjily9fk7h7k7ig4rfz14nwcq6b-php-fileinfo-8.3.4/lib/php/extensions/fileinfo.so
extension=/nix/store/fpg1ig51ydd42pmh9l2i22ymqxd87hpp-php-filter-8.3.4/lib/php/extensions/filter.so
extension=/nix/store/6sbg9vqb205knkdcvhawplaklwsf7h96-php-ftp-8.3.4/lib/php/extensions/ftp.so
extension=/nix/store/3z6p3sbj6g6hmx0m8gacjjldwibsgswk-php-gd-8.3.4/lib/php/extensions/gd.so
extension=/nix/store/0h7v3jqhnc0zvvjsf1gi30gpkgqnnmnv-php-gettext-8.3.4/lib/php/extensions/gettext.so
extension=/nix/store/cjjisg9xdndiqmhykad1qfdbyfrpr85v-php-gmp-8.3.4/lib/php/extensions/gmp.so
extension=/nix/store/pwalfq1m2ym6laxbjyhzlkk6jb8casqg-php-iconv-8.3.4/lib/php/extensions/iconv.so
extension=/nix/store/y6442j7d5dkfq46hd1cyxgfl227pnpmp-php-imap-8.3.4/lib/php/extensions/imap.so
extension=/nix/store/1andxcmw2cckq7395wylqzlwgdgda00m-php-intl-8.3.4/lib/php/extensions/intl.so
extension=/nix/store/rkawvxxlwk9zgj8jxq0i52fj0avmgmaj-php-ldap-8.3.4/lib/php/extensions/ldap.so
extension=/nix/store/silsy3nr3j4bzpg7g349wz3pyym60ycw-php-mbstring-8.3.4/lib/php/extensions/mbstring.so
extension=/nix/store/lnpyri4x6a5d8kvyzkq4jn2yqsxr2mzj-php-mysqlnd-8.3.4/lib/php/extensions/mysqlnd.so
extension=/nix/store/m0v7lph4297cdq6vd1bkmxcds1vpav45-php-mysqli-8.3.4/lib/php/extensions/mysqli.so
```

there was bunch of configs there, but not with redis. So now, you need to know where the heck is your redis-php
config file. You can get it by running this command

```
$ find /nix/store -name redis.so
```

And you will find something like this

`/nix/store/746kmwa0xx483wafs55zp6z24ah6bb4x-php-redis-6.0.2/lib/php/extensions/redis.so`

Alright, we got em. So now let's add that to php config file. Just add a new line in your php.ini file and paste it
into the very bottom. And of course, save it !!! Now the php config file would look like this

```
extension=/nix/store/08g94sll22520lsvl7y5kc80fqx23b9q-php-bcmath-8.3.4/lib/php/extensions/bcmath.so
extension=/nix/store/isw9sclkjpcbn1fj0s1qcvlskypzsiar-php-calendar-8.3.4/lib/php/extensions/calendar.so
extension=/nix/store/57dd9akyxjp5vf2qymj2pyjksw8y1q1l-php-curl-8.3.4/lib/php/extensions/curl.so
extension=/nix/store/xyyabaln51dz4ri6cwn885fqzw1qwgyk-php-ctype-8.3.4/lib/php/extensions/ctype.so
extension=/nix/store/bgmk68qb41w32mpsj1ipp5srqiy2h889-php-dom-8.3.4/lib/php/extensions/dom.so
extension=/nix/store/jv2378af80z3m3lvswhl5qnky9n503zv-php-exif-8.3.4/lib/php/extensions/exif.so
extension=/nix/store/yw303bjily9fk7h7k7ig4rfz14nwcq6b-php-fileinfo-8.3.4/lib/php/extensions/fileinfo.so
extension=/nix/store/fpg1ig51ydd42pmh9l2i22ymqxd87hpp-php-filter-8.3.4/lib/php/extensions/filter.so
extension=/nix/store/6sbg9vqb205knkdcvhawplaklwsf7h96-php-ftp-8.3.4/lib/php/extensions/ftp.so
extension=/nix/store/3z6p3sbj6g6hmx0m8gacjjldwibsgswk-php-gd-8.3.4/lib/php/extensions/gd.so
extension=/nix/store/0h7v3jqhnc0zvvjsf1gi30gpkgqnnmnv-php-gettext-8.3.4/lib/php/extensions/gettext.so
extension=/nix/store/cjjisg9xdndiqmhykad1qfdbyfrpr85v-php-gmp-8.3.4/lib/php/extensions/gmp.so
extension=/nix/store/pwalfq1m2ym6laxbjyhzlkk6jb8casqg-php-iconv-8.3.4/lib/php/extensions/iconv.so
extension=/nix/store/y6442j7d5dkfq46hd1cyxgfl227pnpmp-php-imap-8.3.4/lib/php/extensions/imap.so
extension=/nix/store/1andxcmw2cckq7395wylqzlwgdgda00m-php-intl-8.3.4/lib/php/extensions/intl.so
extension=/nix/store/rkawvxxlwk9zgj8jxq0i52fj0avmgmaj-php-ldap-8.3.4/lib/php/extensions/ldap.so
extension=/nix/store/silsy3nr3j4bzpg7g349wz3pyym60ycw-php-mbstring-8.3.4/lib/php/extensions/mbstring.so
extension=/nix/store/lnpyri4x6a5d8kvyzkq4jn2yqsxr2mzj-php-mysqlnd-8.3.4/lib/php/extensions/mysqlnd.so
extension=/nix/store/m0v7lph4297cdq6vd1bkmxcds1vpav45-php-mysqli-8.3.4/lib/php/extensions/mysqli.so
zend_extension=/nix/store/5ify5v5i1084hms93614c6h550hm3m4z-php-opcache-8.3.4/lib/php/extensions/opcache.so
extension=/nix/store/5rl44lg0k4fwz8ngygprivmaiyd3nnqm-php-openssl-8.3.4/lib/php/extensions/openssl.so
extension=/nix/store/fimxdid8lqqwhkw2jaxvxfi8s3s1id1m-php-pcntl-8.3.4/lib/php/extensions/pcntl.so
extension=/nix/store/c047ipk1b18z1dz9avi1la4xanqjv013-php-pdo-8.3.4/lib/php/extensions/pdo.so
extension=/nix/store/gm3mn4mzjl6sscnicqhnh8l3sypzzlak-php-pdo_mysql-8.3.4/lib/php/extensions/pdo_mysql.so
extension=/nix/store/famgg3hg6alsvzxrmvjqy9cazafsh9yi-php-pdo_odbc-8.3.4/lib/php/extensions/pdo_odbc.so
extension=/nix/store/0zbql2ld0fmpwcivpsrrdn460gn62grk-php-pdo_pgsql-8.3.4/lib/php/extensions/pdo_pgsql.so
extension=/nix/store/zv69xsxig97h8iyz7gsnmygsm8lnpw8x-php-pdo_sqlite-8.3.4/lib/php/extensions/pdo_sqlite.so
extension=/nix/store/p3nn8l25rvkghbn5m2c8y1dh6nilhsfl-php-pgsql-8.3.4/lib/php/extensions/pgsql.so
extension=/nix/store/r1c6vmx2z5i9h606sfrnp7y5l0sws1j1-php-posix-8.3.4/lib/php/extensions/posix.so
extension=/nix/store/88n232qrrda7pxb8q1nzwf1cvjqdzm73-php-readline-8.3.4/lib/php/extensions/readline.so
extension=/nix/store/ddxi4n57ckd0hg4iffnk7lnn5445r1k3-php-session-8.3.4/lib/php/extensions/session.so
extension=/nix/store/bdvpxp72cyyw88m05391izd49d779117-php-simplexml-8.3.4/lib/php/extensions/simplexml.so
extension=/nix/store/ccs7pyyr8ifgpgnkb8v70gjcpm0hnnky-php-sockets-8.3.4/lib/php/extensions/sockets.so
extension=/nix/store/mvkc1cln6arrq9nb0zg9imdx3b8smdcs-php-soap-8.3.4/lib/php/extensions/soap.so
extension=/nix/store/akzspx9xb0n2gq02mb1rxbmcm25kwffn-php-sodium-8.3.4/lib/php/extensions/sodium.so
extension=/nix/store/bjljf7pw59cbnw1xdd68vns84745vzn7-php-sysvsem-8.3.4/lib/php/extensions/sysvsem.so
extension=/nix/store/dz1pzkbw3jznv5zjfn8wfm61ivvlkimi-php-sqlite3-8.3.4/lib/php/extensions/sqlite3.so
extension=/nix/store/bldfqpc0sm5ax0zc311nmb08wbv9s7j5-php-tokenizer-8.3.4/lib/php/extensions/tokenizer.so
extension=/nix/store/7sna5gg0cs14f2n3136qnr88ck8npw0v-php-xmlreader-8.3.4/lib/php/extensions/xmlreader.so
extension=/nix/store/kjb2nipwhs44qianhjphm518zhv25ybf-php-xmlwriter-8.3.4/lib/php/extensions/xmlwriter.so
extension=/nix/store/71yyqqnzjjdhic7nzza6pp5l0jj3vlxn-php-zip-8.3.4/lib/php/extensions/zip.so
extension=/nix/store/418kxsn2narxspv93a0qxnhxjg58ng4r-php-zlib-8.3.4/lib/php/extensions/zlib.so
extension=/nix/store/746kmwa0xx483wafs55zp6z24ah6bb4x-php-redis-6.0.2/lib/php/extensions/redis.so

```

Make sure that redis is installed on PHP by running this command

```
$ php -m | grep redis
```

Thanks for stopping by. Leave me a comment below if you anything to ask.
