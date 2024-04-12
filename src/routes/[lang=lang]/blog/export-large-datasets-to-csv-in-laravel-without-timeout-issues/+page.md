---
draft: false
title: Export Large Datasets to CSV in Laravel Without Timeout Issues
date: 2024-01-11 13:59:00
tags: ["laravel", "excel", "csv"]
description: "How to efficiently exporting large datasets in Laravel without timeout issues"
slug: export-large-datasets-to-csv-in-laravel-without-timeout-issues
---

![gateway timeout](https://kinsta.com/wp-content/uploads/2020/10/Chrome-Browser-HTTP-504-Gateway-Timeout-Error.png)

<div style="margin-top: -30px;">
<small>Source : https://kinsta.com/blog/504-gateway-timeout/
</div>

If you're grappling with server timeouts while exporting massive datasets to Excel in
Laravel, you're not alone. Trying to export, say, 100k records might trigger an error
like this

`Allowed memory size of 134217728 bytes exhausted (tried to allocate 20971520 bytes)`

I recently encountered this issue using the [Laravel-Excel](https://laravel-excel.com/) library. Despite various attempts, including switching from `FromView` to `FromQuery`, adjusting chunk sizes, and even converting Eloquent to raw queries, I found myself stuck.

That's when I stumbled upon a game-changer - the [Simple-Excel](https://github.com/spatie/simple-excel) library. Unlike Laravel-Excel, Simple-Excel lets me export extensive data to Excel with significantly simpler code. No need to create an Exporter file, just streamlined efficiency."

Here is the code

```php
use Spatie\\SimpleExcel\\SimpleExcelWriter;

...


public function export() {
    $query = DB::select(DB::raw("select * from books"));
    $query = collect($query);

    $writer = SimpleExcelWriter::streamDownload('books.csv');
    foreach (range(0, $query->count()) as $i) {
        $writer->addRow([
            'Book No' => $query[$i]->book_no,
            'Title' => $query[$i]->title
        ]);

        if ($i % $query->count() === 0) {
            flush(); // Flush the buffer
        }
    }

    $writer->toBrowser();
}

```

If you look into the foreach, somehow the didn't work. So
I just changed that to `range` instead. And Make sure to call `flush()` if you're sending large streams to the browser

That's it folks, hope this article help you out.

While delving into the code, I encountered an issue with the `foreach($books as $book)`. To address this, I opted for the `range` function instead. Additionally, it's crucial to invoke `flush()` when handling sizable data streams for proper browser handling.

And there you have it, folks! I trust this article proves helpful in resolving your concerns.
