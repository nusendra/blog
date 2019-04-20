---
title: "Membuat RBAC Sendiri : Menu Rendering di Nuxtjs - Part 3"
date: 2019-02-03 16:15:13
description: "Seri terakhir dari pembahasan RBAC ini akan fokus pada penyajian menu akses di frontend"
slug: membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3
---

Pembahasan lanjutan kali ini akan fokus pada frontend menggunakan Nuxtjs, bagi yang pakai Vuejs bisa menyesuaikan dan mengikuti flow nya. Bagi temen temen yang mau ngikutin seri ini, bisa baca baca dulu 2 part sebelumnya yang membahas tentang konsep RBAC dan implementasi di Backend nya. Baik, karena kita pakai Nuxtjs dengan Auth Module, maka kita perlu menambahkan sedikit di backend nya agar sesuai dengan apa yang diminta oleh auth module. Karena Lumen lebih mudah dan banyak dipakai, untuk contoh backend saya akan pakai Laravel (Lumen) saja. Bagi pengguna framework atau bahasa lain, tinggal menyesuaikan karena ini bebas banget.

## Nuxtjs + Auth Module Config

Pada file nuxt.config.js, saya setting seperti ini

```javascript
 auth: {
  redirect: {
    login: '/login',
    home: '/',
    logout: '/login'
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/login',
          method: 'post',
          propertyName: 'token'
        },
        user: {
          url: '/users/details',
          method: 'get',
          propertyName: 'user'
        },
        logout: {
          url: '/logout',
          method: 'post'
        }
      }
    }
  },
  token: {
    name: 'token'
  },
  cookie: {
    name: 'token'
  }
},
```

Penjelasan nya diatas ini, endpoint untuk login ke url /login, sedangkan untuk mendapatkan data user (seperti nama, username, jabatan, dan menu akses) pakai /users/details. Nah karena disini kita pakai 2 endpoint, yakni untuk proses login dan untuk ngedapetin detail user yang sedang login, maka di backend kita perlu bikin 2 route dan 2 controller.

Route pada Lumen. Untuk Laravel silakan sesuaikan sendiri.

```php
// web.php
$router->post('/api/login', 'Auth\AuthController@login');

$router->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($router) {
    $router->get('/users/details', 'Auth\UserController@userDetail');
});
```

Controller untuk login

```php
<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
  protected $jwt;

  public function __construct(JWTAuth $jwt)
  {
      $this->jwt = $jwt;
  }

  public function login(Request $request)
  {
      try {
          if (! $token = $this->jwt->attempt($request->only('username', 'password'))) {
              return response()->json(['user_not_found'], 404);
          }
      } catch (TokenExpiredException $e) {
          return response()->json(['token_expired'], $e->getStatusCode());
      } catch (TokenInvalidException $e) {
          return response()->json(['token_invalid'], $e->getStatusCode());
      } catch (JWTException $e) {
          return response()->json(['token_absent' => $e->getMessage()], $e->getStatusCode());
      }
      return response()->json(compact('token'));
  }
}
```

Controller untuk user detail

```php
......
public function getMenu($params, $type)
{
    $menu = Menus::all();

    return $menu->map(function($item) use($type) {
        $item['access'] = $type;
        return $item;
    });
}

public function userDetail()
{
    $user = Auth::user();

    $write_menu = array_map('intval', explode(',', $user->write_menu));
    $readonly_menu = array_map('intval', explode(',', $user->readonly_menu));

    $write = $this->getMenu($write_menu, 'write');
    $readonly = $this->getMenu($readonly_menu, 'readonly');

    $menus = collect([$write,$readonly])->collapse();

    $data = [
        'id'            => $user->id,
        'name'          => $user->name,
        'username'      => $user->username,
        'menu'          => $menus,
    ];

    return response()->json(['user' => $data]);
}
.........
```

Nah dengan dua controller diatas, maka ketika user berhasil login, maka Nuxt auth module akan meminta detail user nya dan akan mendapatkan data hak akses si user tersebut. Baik, di backend sudah kita buat dan sudah di sesuaikan dengan permintaan auth module, selanjutnya kita bikin rendering menu di frontend nya.

## Rendering Menu di Nuxtjs

Setelah kita dapat data menu yang bisa di akses, data tersebut di store di Vuex. Jadi sekarang tugas kita tinggal me render menu nya berdasarkan data menu tadi.

```javascript
<template lang='pug'>
  div
    nav
      ul
        li(v-for='(menu, index) in menus' :key='menu.id')
          nuxt-link(:to='item.url') {{ item.title }}
</template>

<script>
export default {
  computed: {
    menus() {
      return this.$auth.user.menu;
    }
  }
}
</script>
```

Tentu nya component menu diatas sangat standart sekali ya (cuma sebagai contoh), di real world ga mungkin cuma gitu aja. Nah dari menu render diatas, kita bisa masuk ke pages di nuxt berdasarkan nama dari url tersebut. Untuk file pages nya wajib disamakan dengan url diatas.

## Vuex Store untuk mencatat status menu

```javascript
import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store ({
    state: {
      menuAktif: {}
    },
    mutations: {
      setMenuAktif(state, payload) {
        state.menuAktif = payload
      }
    }
  });

export default createStore;
```

Fungsi nya adalah, untuk mencatat apakah menu yang dibuka sekarang ini memiliki status write atau readonly. Jadi jika menu yang dibuka write, maka di vuex akan tercatat write, sehingga pada component kita bisa menampilkan button untuk aktivitas CRUD. Sedangkan jika readonly, maka sembunyikan button untuk CRUD di component.

## Auth Middleware

Buat sebuah middleware dengan nama authorization.js di folder middleware.

```javascript
export default function({ store, route, redirect }) {
  const url = route.path;
  const menu = store.state.auth.user.menu;
  const parsedURL = `/${url.split('/')[1]}`;
  const menus = menu.find(item =>
    item.url = parsedURL
  );

  if (menus) {
    const result = menus.find(item => item.url === parsedURL);
    store.commit('setMenuAktif', result)
  } else {
    store.commit('setMenuAktif', {
      access: 'readonly'
    })
    return url !== '/' ? redirect('/') : null
  }
}
```

Middleware diatas akan selalu dijalankan setiap kita masuk ke suatu halaman. Jadi sebelum Nuxt merender component page nya, dia akan menjalankan middleware ini untuk menentukan page yang akan dibuka apakah memiliki akses write atau readonly.

## Mixins untuk memudahkan Authorization Checking

```javascript
import Vue from 'vue'

Vue.mixin({
  computed: {
    isAuthorized() {
      if (this.$store.state.menuAktif.access === 'write') {
        return true;
      }
      return false;
    }
  }
});
```

File diatas bisa disimpan di folder `plugins/authorization.js`

## Reconfigure Nuxt Config

```javascript
plugins: [
  '~/plugins/authorization'
],
router: {
  middleware: ['auth', 'authorization']
}
```

Pada file Nuxt.config.js tambahkan plugins dan middleware nya. Fungsi nya adalah untuk mendaftarkan mixins authorization dan middleware nya.

## Implementasi di Vue Component

Semua nya sudah siap, tinggal kita mainin saja authorization nya di vue component. Contoh dibawah ini adalah halaman index yang berisi table dan ada tombol untuk create new data.

```javascript
<template lang='pug'>
  div
    button(v-if='isAuthorized') Create New Data
    table.table
      thead
        tr
          th No.
          th Name
          th Blablabla
      tbody
        tr
          td 1
          td Andi
          td lololol
</template>
```

Perhatikan, diatas ada `v-if='isAuthorized'`, berasal dari mixins yang telah kita buat di folder plugins tadi. Jadi semua component memiliki attribute ini untuk pengecekan apakah dia memiliki akses write atau readonly di halaman itu. Jadi pada component / page ini, jika user memiliki akses write, maka tombol create new data akan muncul, sedangkan jika hanya readonly, maka tombol itu ga akan muncul. Lebih jauh lagi, menu yang ditampilkan disini adalah hanya menu yang sudah di tentukan write atau readonly nya, jadi menu yang lain ga akan tampil.

<hr/>

Fiuh panjang juga ya kalau kita bikin RBAC dengan logic kita sendiri, Tetapi nilai plus nya adalah logika kita akan makin terasah dan membuat kita makin jago. Semoga artikel terakhir dari seri RBAC ini bisa dipahami dengan baik, karena saya sendiri belum tentu yakin para pembaca bisa memahami dengan baik atau tidak pada konsep kali ini. Yaa setidaknya saya telah mengutarakan konsep RBAC yang bisa kita buat secara manual dengan tujuan melatih logika kita.

Mohon maaf jika ada salah kata, dan jika ada pertanyaan langsung saja tanya di kolom komentar. Thanks ...
