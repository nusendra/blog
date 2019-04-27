---
title: "Membuat RBAC Sendiri : Backend Response - Part 2"
date: 2019-02-03 14:55:37
tags: ['opini','tips']
description: "Memberikan response yang dibutuhkan oleh Frontend untuk rendering menu RBAC."
slug: membuat-rbac-sendiri-backend-response-part-2
---

Melanjutkan dari postingan [part 1](https://nusendra.com/post/membuat-rbac-sendiri-konsep-part-1), kali ini kita akan belajar bagaimana mengimplementasi kan konsep kita di aplikasi yang sesungguh nya. Di part 1 saya bilang untuk backend saya skip saja, ah oke saya akan mengingkari nya :D. Di part 2 ini saya akan mulai dari backend yang akan saya paparkan secara sederhana dan simple saja. Jadi pada backend ini kita akan membuat fungsi login, yang mana jika user berhasil login, maka user akan mendapatkan detail si user tersebut (nama, username, jabatan, token, write_menu, dan readonly_menu). Jadi ketika frontend mendapatkan response dari backend yang berupa data data tersebut, nanti nya tinggal urusan frontend me render menu menu nya (sesuai dengan user role).

Oh iya, untuk kasus RBAC ini kita bedakan ya antara backend dan frontend nya (multi repo).

## Backend

Bagi teman teman yang pakai Laravel / Lumen, kurang lebih proses login nya seperti ini

```php
// UserController.php

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    public function login($request)
    {
        $user = User::with('jabatan')->where('username', $request->username)->first();
        if($user){
            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                    'api_token'     => $user->createToken($user->username . $user->password)->accessToken,
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'username'      => $user->username,
                    'jabatan'       => $user->jabatan->name,
                    'write_menu'    => $user->write_menu,
                    'readonly_menu' => $user->readonly_menu
                ]);
            }
        }
    }
}
```

Jika kalian pakai Nodejs (Typescript), mungkin kurang lebih seperti ini

```javascript
// UserService.ts

import * as knex from '../database/knex';

class UserService {
  public findOne(object: {}): {} {
    return knex.table('users').where(object).first();
  }
}

export default new UserService();
```

Untuk Controller nya seperti ini

```javascript
// UserController.ts

import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../../services/UserService';

class UserController {
  public login = async (req: Request, res: Response) => {
      const _user: any = await User.findOne({
        username: req.body.username
      });

      if (_user) {
        bcrypt.compare(req.body.password, _user.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Auth failed' });
          }
          if (result) {
            const token: any = jwt.sign({
              pin: _user.password,
              id: _user.username
            }, "secret");

            return res.status(200).json({
              api_token: token,
              id: _user.id,
              name: _user.name,
              username: _user.username,
              write_menu: _user.write_menu,
              readonly_menu: _user.readonly_menu,
            });
          } else {
            return res.status(401).json({ message: 'Password yang anda masukkan salah' });
          }
        });
      } else {
        return res.status(401).json({ message: 'User tidak ditemukan' });
      }
    }
  }
}

export default new UserController();
```

Nah dari dua contoh diatas, ketika login berhasil, maka frontend akan mendapatkan sebuah response yang berisi credential user nya, dimana isi nya adalah seperti token, name, jabatan, dan menu apa saja yang boleh diakses dan menu saja yang hanya bisa dibaca.

## Kesimpulan

Artikel ini hanya menjelaskan secara garis besar nya saja, untuk implementasi secara real nya mungkin ada beberapa perbedaan. Seperti ketika kita pakai Nuxtjs dengan Auth Module nya (Di part selanjutnya saya akan menjelaskan ini), ini akan berbeda dengan metode diatas. Proses login hanya akan me return token saja, sedangkan untuk mendapatkan menu akses si user, perlu tambahan endpoint lagi.

<hr/>

Segini dulu untuk hari ini, insya allah next saya akan paparkan rendering menu nya di frontend dengan Nuxtjs. Thanks udah mampir ...
