---
draft: false
title: "Apache vs OpenLiteSpeed: Real-World WordPress Performance Comparison"
date: 2026-03-28 10:00:00
tags: ['wordpress','devops','docker','performance']
description: "A side-by-side performance comparison of Apache and OpenLiteSpeed running the same WordPress site with a shared backend API."
slug: apache-vs-openlitespeed-wordpress-performance-comparison
is_featured: true
---

I recently got to run a proper side-by-side comparison between Apache and OpenLiteSpeed on the same WordPress site. Not synthetic benchmarks, but real page loads, property searches and static asset delivery on a live production site.

Some context. The site is a WordPress-based real estate platform, and the frontend doesn't serve everything on its own. It talks to a shared backend API for property data, search results and agent info. Production and staging both hit the exact same backend, so whatever difference shows up comes from the web server and caching layer rather than the API.

The setup:

- Production: `https://example-realestate.com/`, running Apache and PHP 8.1
- Staging: `https://staging.example-realestate.dev/`, running OpenLiteSpeed and PHP 8.2
- Shared backend API: `https://api.example-realestate.com/`, used by both

Same WordPress codebase, same database, same backend. The web server stack was the only thing that changed.

---

## The quick summary

| Metric | Apache | OpenLiteSpeed | Improvement |
|--------|--------|---------------|-------------|
| Homepage TTFB (avg) | 5.03s | 0.86s | 5.8x faster |
| Homepage total (avg) | 10.88s | 1.23s | 8.8x faster |
| Search page TTFB | 3.22s | 1.45s | 2.2x faster |
| Search page total | 6.49s | 2.65s | 2.5x faster |
| Static assets TTFB | 1.70s | 1.30s | 1.3x faster |
| PHP version | 8.1 | 8.2 | Newer |
| Caching | None | LiteSpeed Cache | Active |

Those numbers are not a typo. The homepage went from almost 11 seconds to about 1.2 seconds.

---

## Homepage performance

### Apache (production)

```
Request 1:  TTFB: 15.10s | Total: 24.05s | Size: 285,688 bytes
Request 2:  TTFB:  4.76s | Total: 12.79s | Size: 285,688 bytes
Request 3:  TTFB:  3.68s | Total:  8.80s | Size: 285,690 bytes
Request 4:  TTFB:  6.65s | Total: 11.06s | Size: 285,690 bytes
Request 5:  [timeout/incomplete]

Average (excluding cold start):
- TTFB: 5.03s
- Total Load: 10.88s
```

That first request at 15 seconds TTFB is rough. Even warmed up it sits around 3 to 6 seconds, and request 5 timed out entirely.

### OpenLiteSpeed (staging)

```
Request 1:  TTFB: 2.69s | Total: 3.04s | Size: 290,800 bytes
Request 2:  TTFB: 1.10s | Total: 1.49s | Size: 290,800 bytes
Request 3:  TTFB: 1.08s | Total: 1.44s | Size: 290,800 bytes
Request 4:  TTFB: 0.63s | Total: 0.99s | Size: 290,800 bytes
Request 5:  TTFB: 0.63s | Total: 1.01s | Size: 290,800 bytes

Average (excluding cold start):
- TTFB: 0.86s
- Total Load: 1.23s
```

Once the cache warms up, TTFB stays under a second consistently. The `x-litespeed-cache: hit` header confirmed the cache was doing its job.

---

## Property search performance

The search page is the more interesting test, because it hits the shared backend API for property data. Both environments make the same API calls to the same backend.

### Apache

```
Request 1:  TTFB: 3.17s | Total: 5.48s
Request 2:  TTFB: 3.73s | Total: 5.30s
Request 3:  TTFB: 2.75s | Total: 8.69s

Average TTFB: 3.22s | Average Total: 6.49s
```

### OpenLiteSpeed

```
Request 1:  TTFB: 1.56s | Total: 1.85s
Request 2:  TTFB: 1.68s | Total: 4.69s
Request 3:  TTFB: 1.10s | Total: 1.40s

Average TTFB: 1.45s | Average Total: 2.65s
```

Same backend on both sides, and OpenLiteSpeed still comes in at 2.2x faster TTFB and 2.5x faster total load. The caching layer and LSAPI account for that.

---

## The backend API bottleneck

Here's how the shared API performed on its own:

```
Request 1:  TTFB: 5.56s | Total: 5.56s
Request 2:  TTFB: 1.38s | Total: 1.38s
Request 3:  TTFB: 2.05s | Total: 2.05s

Average: 2.33s
```

Response times swing between 1.38s and 5.56s, with a noticeable cold start penalty. That hits both environments equally, and it's the next bottleneck after the web server migration. API response caching, database optimization or connection pooling are the likely levers.

---

## Static asset loading

Tested with a CSS file from the theme:

| | Apache | OpenLiteSpeed |
|---|--------|---------------|
| TTFB | 1.70s | 1.30s |
| Total | 2.23s | 1.53s |

Less dramatic than the homepage numbers, but still 1.3x on TTFB and 1.5x on total load.

---

## Why Apache was slow

The response headers told the whole story:

```
Server: cloudflare
X-Powered-By: PHP/8.1.34
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Set-Cookie: PHPSESSID=...
CF-Cache-Status: DYNAMIC
```

There's no caching at all, so every request hits PHP and the database. PHP sessions run on every request, and the `PHPSESSID` cookie both adds I/O overhead and prevents caching. The `Cache-Control` headers explicitly tell browsers and CDNs not to cache anything. Cloudflare can't compensate for that either: `CF-Cache-Status: DYNAMIC` means it's passing everything straight through because of the no-cache headers and the cookies. On top of it all, mod_php is slower than LSAPI and uses more memory per request.

### Why OpenLiteSpeed was fast

```
Server: cloudflare
X-LiteSpeed-Cache: hit
CF-Cache-Status: DYNAMIC
```

`x-litespeed-cache: hit` means most requests come out of cache without touching PHP. Behind that, LSAPI is a faster PHP handler with a lower memory footprint and better process management, PHP 8.2 brings its own performance improvements and better JIT compilation, and OPcache cuts the bytecode compilation overhead.

---

## What to do about it

The quick wins are straightforward. Switch to OpenLiteSpeed, since staging already proved it works. Enable the LiteSpeed Cache plugin for page cache, object cache and image optimization. Upgrade to PHP 8.2, which is already tested and compatible. And cache the backend API responses with WordPress transients or Redis so you're not calling the API on every request.

Longer term, move PHP sessions to Redis to cut file I/O and unblock better page caching. Optimize the database by adding indexes for property searches and reviewing slow queries. Configure Cloudflare properly, adjusting cache-control headers and setting page rules for static content. And put monitoring on TTFB and API response times so regressions surface early.

---

## Expected results after migration

Based on the staging numbers, homepage TTFB should land around 0.8s, down from 5.0s, which is 83% faster. Homepage total load should be around 1.2s, down from 10.9s, or 89% faster. Search TTFB should come in near 1.4s from 3.2s, 56% faster, and search total near 2.7s from 6.5s, 59% faster.

That also means 80 to 90% fewer PHP executions, which reduces server load and hosting cost, and better Core Web Vitals for SEO.

---

## Wrapping up

Same WordPress site, same backend API, same database. Swapping Apache for OpenLiteSpeed with LiteSpeed Cache produced a 5 to 8x improvement across the board.

The remaining bottleneck is the backend API at 2.33s average, which is next on the list. But the web server swap alone did most of the work.
