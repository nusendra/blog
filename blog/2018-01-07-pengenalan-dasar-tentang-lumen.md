---
title: Pengenalan Dasar tentang Lumen
date: 2018-01-07 12:14:49
description: "Untuk mulai membuat RESTful API, Pengenalan Dasar tentang Lumen sangat perlu dan penting untuk dipelajari agar nantinya kita lebih mudah dalam membuat sebuah API service."
slug: pengenalan-dasar-tentang-lumen
---

Sebagai selingan kita dalam belajar Laravel, mari kita mengenal Lumen lebih jauh. Pengenalan dasar tentang Lumen perlu dan penting untuk diperhatikan bagi yang pengen belajar lebih jauh tentang lumen. Sebagai informasi, artikel ini juga sudah saya pakai untuk kuliah telegram di group Laravel Indonesia. Mari kita mulai ..

Bahasan pertama saya akan bahas sekilas tentang lumen. Apa sih lumen? lumen adalah microframework yang khusus menangani API service sama seperti Slim dan Silex. Lumen ini juga bisa dikatakan sebagai adik kecil nya laravel, jadi kalian inshallah pasti langsung paham dengan struktur dan cara mengimplementasikan lumen.

## WHY LUMEN ?

Sebelum menentukan framework PHP yang akan kita pakai, kita sebaiknya tentukan dulu teknologi dan sistem seperti apa yang akan kita bangun.

Jika web sederhana tanpa banyak melibatkan frontend framework JS misalnya, kita gunakan saja Laravel. Pakai Laravel dengan dipadukan frontend JS juga bisa, misalnya saja Vuejs yang udah include di fresh instalasi nya laravel. Jika web yang membedakan repository project, misalkan untuk backend pakai php, sedangkan frontend pakai full JS maka kita perlu yang namanya API. Bisa juga sih API kita pakai Laravel, tapi sangat disarankan untuk tidak memakai Laravel kalau hanya untuk kebutuhan API saja karena Laravel mempunyai banyak fitur, yang nantinya fitur fitur ini tidak terpakai karena kita hanya memanfaatkan API nya saja. So, kita perlu framework yang khusus untuk API.

Nah why lumen? Kenapa bukan yang lain misalnya Silex / Slim?? Sah sah saja kalau mau pakai selain lumen, tapi berdasarkan benchmark, Lumen lebih mantap daripada Slim. (Benchmark ya, bukan vote)
[https://www.gajotres.net/best-available-php-restful-micro-frameworks/](https://www.gajotres.net/best-available-php-restful-micro-frameworks/)

Karena disini yang di rekomendasikan adalah Slim, Lumen, Silex, Phalcon. Maka benchmark nya dibawah ini
[https://symfony.fi/entry/symfony-benchmarks-microkernel-silex-lumen-and-slim](https://symfony.fi/entry/symfony-benchmarks-microkernel-silex-lumen-and-slim)

## INSTALASI

untuk instalasi, gak perlu saya jelaskan panjang lebar. Hampir sama dengan instalasi laravel yang udah saya bahas di post awal tentang Laravel, disini

[https://nusendra.com/post/cara-install-laravel-melalui-composer](https://nusendra.com/post/cara-install-laravel-melalui-composer)

Cara instalasi nya sangat mudah

```
$ composer create-project --prefer-dist laravel/lumen blog
```

untuk running server nya kita ga bisa pakai php artisan serve, tapi pake built-in php dev server nya

```
$ php -S localhost:8000 -t public
```

## CONFIG DASAR

pada lumen fresh install, dia bener bener ringan. tapi jika kita pengen pake kekuatan yang ada di laravel (seperti eloquent, facades, middleware, dll) untuk dipakai di lumen, kita harus mengaktifkan nya di file `bootstrap/app.php`.
Uncomment baris kode dibawah ini

```php
$app->withFacades();  //untuk mengaktifkan fitur facade (sangat disarankan)
$app->withEloquent();  //untuk mengaktifkan fitur eloquent (optional)
$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);  //untuk mengaktifkan middleware di route (untuk auth)
$app->register(App\Providers\AppServiceProvider::class);  //untuk memakai service provider
$app->register(App\Providers\AuthServiceProvider::class);  //untuk auth
```

## COMPOSER : LARAVEL VS LUMEN

Ketika kalian mengetik php artisan di terminal, pada laravel akan muncul banyak opsi, sebaliknya di lumen kalian hanya akan menemukan sedikit. karena lumen ini lebih banyak menggunakan teknik manual daripada otomatisasi seperti di laravel. Jika di laravel kita bisa bikin model dan controller lewat artisan, di lumen kita ga bisa melakukan hal tersebut. So, di lumen kita harus create file nya manual.

## ROUTE DI LUMEN

Di Laravel, kita bisa mengetikkan route seperti ini

```php
Route::get('post','PostController@index');
```

atau dengan resource

```php
Route::resource('post','PostController');
```

tapi di Lumen 5.5 berbeda, seperti dibawah ini

```php
$router->get('post','PostController@index');
```

dan satu lagi, di lumen kita ga bisa pakai fitur resource..

## API VERSIONING DI LUMEN

Saya dulu gak paham dengan api versioning ini. Kebingungan ini merasuk ke dalam jiwa #lol ketika mencari perbedaan antara URI localhost/api/v1/post dengan localhost/post. Karena keduanya sama aja di response nya, gak ada perbedaan sama sekali. Lantas apa gunanya api version? akhirnya googling sendiri dan nemu artikel ini
[https://dzone.com/articles/rest-api-versioning-is-there-a-right-answer](https://dzone.com/articles/rest-api-versioning-is-there-a-right-answer)
Jadi ada 2 kondisi :

Jika api yang dibangun hanya untuk kebutuhan internal, maka kita tidak perlu api versioning Jika api kita merupakan public API yang mana kita gak bisa mengontroll di sisi client, maka kita perlu melakukan api versioning.

Silakan kunjungi artikel tersebut, baca di awal awal postingan saja. insyallah paham.

<hr/>

Nah segini dulu pembukaan untuk pembahasan dasar lumen. Semoga berguna bagi temen - temen yang mungkin mau coba nerapin RESTful API pakai Lumen..
