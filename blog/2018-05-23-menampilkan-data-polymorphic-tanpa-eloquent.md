---
title: Menampilkan data polymorphic tanpa eloquent
date: 2018-05-23 04:21:02
tags: ['laravel','php']
description: "Menampilkan data polymorphic tanpa eloquent gampang - gampang susah. Kalo mau nampilin data polymorphic kita pake eloquent sih gampang gampang aja, tapi kalau tanpa eloquent gimana?"
slug: menampilkan-data-polymorphic-tanpa-eloquent
---

Menampilkan data polymorphic tanpa eloquent gampang - gampang susah. Kalo mau nampilin data polymorphic kita pake eloquent sih gampang gampang aja, tapi kalau tanpa eloquent gimana? Sebuah tantangan tersendiri bagi kemampuan logika kita hehe. Polymorphic ini sendiri merupakan fitur dari Laravel yang dipakai di model dan eloquent ORM.

Memanggil data polymorphic pada dasarnya ga bisa di terapkan pakai Query Builder / raw query, karena fungsi ini miliknya eloquent. Maka disini kita akan pakai logika kita untuk handle problem ini

Oh iya, yang belum paham apa itu polymorphic, silakan baca baca dulu di docs nya [https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations](https://laravel.com/docs/5.6/eloquent-relationships#polymorphic-relations). Di docs nya ini udah lengkap banget, jadi ga perlu saya jelaskan lagi tentang bagaimana cara konfigurasi nya, bikin table nya, insert data polymorphic nya, dll.

Table yang akan kita buat seperti ini struktur nya

```
invitations
------------
id | partner_id | partner_type | ....
------------
```

```
customers
------------
id | nama | alamat | ....
------------
```

```
suppliers
------------
id | nama | alamat | ....
------------
```

Oh iya, disini saya juga akan sertakan cara pagination secara manualnya. Jadi tidak hanya menampilkan data mentah, melainkan sudah ada paginasi nya. Pertama, di frontend saya mengirimkan url dibawah ini untuk request data nya

`http://localhost:90/api/invitation?page=1&filter=&per_page=50`

Kemudian di controller nya seperti ini

```php
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
```

diatas ini kita panggil untuk pakai fungsi Query Builder dan paginator.

```php
public function index(Request $request)
{
  $customer = DB::table('invitations as i')
    ->join('customers as c', 'c.id','i.partner_id')
    ->where('i.partner_type','customer')
    ->whereNull('i.deleted_at')
    ->select('i.*','c.nama');

  $supplier = DB::table('invitations as i')
    ->join('suppliers as s', 's.id','i.partner_id')
    ->where('i.partner_type','supplier')
    ->whereNull('i.deleted_at')
    ->select('i.*','s.nama')
    ->union($customer);

  $data = collect($supplier->get());

  if($request->has('filter') && $request->filter) {
    $filter = $request->filter;
    $data = $data->filter(function ($query) use ($filter){
    return  $query->id == $filter ||
      $query->nama == $filter;
    });
  }

  if($request->has('per_page') && $request->per_page) {
    $currentPage = LengthAwarePaginator::resolveCurrentPage();
    $currentResults = $data->slice(($request->page - 1) * $request->per_page, $request->per_page)->all();
    $results = new LengthAwarePaginator($currentResults, $supplier->get()->count(), $request->per_page);
    $results->withPath('/api/invitation')->links();
    return response()->json($results);
  }
}
```

Pertama kita fetch dulu data customer nya, kemudian kita union dengan data supplier. Kemudian kita masukkan ke dalam collections agar bisa memakai fungsi filter nya. Kemudian kita setting pagination nya.

Demikian postingan kali ini, semoga bermanfaat bagi temen - temen yang bingung gimana cara nampilin polymorphic data tanpa eloquent.
