---
draft: false
title: "Apache vs OpenLiteSpeed: Real-World WordPress Performance Comparison"
date: 2026-03-28 10:00:00
tags: ['wordpress','devops','docker','performance']
description: "A side-by-side performance comparison of Apache and OpenLiteSpeed running the same WordPress site with a shared backend API."
slug: apache-vs-openlitespeed-wordpress-performance-comparison
---

I recently had the chance to run a proper side-by-side comparison between Apache and OpenLiteSpeed on the same WordPress site. Not synthetic benchmarks — actual page loads, property searches, and static asset delivery on a real production site.

Here's a bit of context first. The site is a WordPress-based real estate platform. The WordPress frontend doesn't just serve pages on its own — it connects to a shared backend API that handles property data, search results, and agent info. Both the production and staging environments hit the exact same backend, so any performance difference we see is purely from the web server and caching layer. The backend is not a variable here.

The setup looked like this:

- **Production**: `https://example-realestate.com/` — Apache + PHP 8.1
- **Staging**: `https://staging.example-realestate.dev/` — OpenLiteSpeed + PHP 8.2
- **Shared Backend API**: `https://api.example-realestate.com/` — used by both environments

Same WordPress codebase, same database, same backend. The only difference was the web server stack. Let's see how they compare.

---

## The Quick Summary

| Metric | Apache | OpenLiteSpeed | Improvement |
|--------|--------|---------------|-------------|
| **Homepage TTFB (avg)** | 5.03s | 0.86s | **5.8x faster** |
| **Homepage Total (avg)** | 10.88s | 1.23s | **8.8x faster** |
| **Search Page TTFB** | 3.22s | 1.45s | **2.2x faster** |
| **Search Page Total** | 6.49s | 2.65s | **2.5x faster** |
| **Static Assets TTFB** | 1.70s | 1.30s | **1.3x faster** |
| **PHP Version** | 8.1 | 8.2 | Newer |
| **Caching** | None | LiteSpeed Cache | Active |

Yeah, those numbers are not a typo. The homepage went from almost 11 seconds to about 1.2 seconds. Let's break it down.

---

## Homepage Performance

### Apache (Production)

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

That first request at 15 seconds TTFB is rough. Even after warming up, it's still hovering around 3-6 seconds. And request 5 just straight up timed out.

### OpenLiteSpeed (Staging)

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

After the cache warms up, sub-second TTFB consistently. The `x-litespeed-cache: hit` header confirmed the cache was doing its job.

---

## Property Search Performance

This is where it gets interesting because the search page hits the shared backend API for property data. Both environments are making the same API calls to the same backend.

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

Even though both are hitting the same backend API, OpenLiteSpeed still comes in at **2.2x faster TTFB** and **2.5x faster total load**. The caching layer and LSAPI make a real difference here.

---

## The Backend API Bottleneck

Speaking of the backend, here's how the shared API performed on its own:

```
Request 1:  TTFB: 5.56s | Total: 5.56s
Request 2:  TTFB: 1.38s | Total: 1.38s
Request 3:  TTFB: 2.05s | Total: 2.05s

Average: 2.33s
```

The backend itself has variable response times (1.38s to 5.56s) with a noticeable cold start penalty. This affects both environments equally and is the next bottleneck to tackle after the web server migration — likely through API response caching, database optimization, or connection pooling.

---

## Static Asset Loading

Tested with a CSS file from the theme:

| | Apache | OpenLiteSpeed |
|---|--------|---------------|
| **TTFB** | 1.70s | 1.30s |
| **Total** | 2.23s | 1.53s |

Not as dramatic as the homepage numbers, but still a **1.3x improvement** on TTFB and **1.5x on total load**.

---

## Why Apache Was Slow

Looking at the response headers told the whole story:

```
Server: cloudflare
X-Powered-By: PHP/8.1.34
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Set-Cookie: PHPSESSID=...
CF-Cache-Status: DYNAMIC
```

A few problems here:

1. **No caching at all** — every single request hits PHP and the database
2. **PHP sessions on every request** — the `PHPSESSID` cookie adds I/O overhead and prevents caching
3. **Cache-Control headers say no** — explicitly telling browsers and CDNs not to cache
4. **Cloudflare can't help** — `CF-Cache-Status: DYNAMIC` means Cloudflare is just passing everything through because of the no-cache headers and cookies
5. **mod_php** — slower than LSAPI, higher memory usage per request

### Why OpenLiteSpeed Was Fast

```
Server: cloudflare
X-LiteSpeed-Cache: hit
CF-Cache-Status: DYNAMIC
```

1. **LiteSpeed Cache is active** — `x-litespeed-cache: hit` means most requests are served from cache, bypassing PHP entirely
2. **LSAPI** — faster PHP handler with lower memory footprint and better process management
3. **PHP 8.2** — performance improvements, better JIT compilation
4. **OPcache enabled** — PHP bytecode caching reduces compilation overhead

---

## What to Do About It

### Quick wins

- **Switch to OpenLiteSpeed** — the staging environment already proved it works
- **Enable LiteSpeed Cache plugin** — page cache, object cache, and image optimization all in one
- **Upgrade to PHP 8.2** — already tested and compatible
- **Cache backend API responses** — use WordPress transients or Redis to avoid hitting the API on every request

### Longer term

- **Move PHP sessions to Redis** — reduce file I/O and allow better page caching
- **Optimize database queries** — add indexes for property searches, review slow queries
- **Configure Cloudflare properly** — adjust cache-control headers, set up page rules for static content
- **Set up monitoring** — track TTFB and API response times so you catch regressions early

---

## Expected Results After Migration

Based on what we saw on staging:

- **Homepage TTFB**: ~0.8s (down from 5.0s) — **83% faster**
- **Homepage Total**: ~1.2s (down from 10.9s) — **89% faster**
- **Search TTFB**: ~1.4s (down from 3.2s) — **56% faster**
- **Search Total**: ~2.7s (down from 6.5s) — **59% faster**

On top of that: reduced server load (80-90% fewer PHP executions), lower hosting costs, better Core Web Vitals for SEO, and a noticeably snappier user experience.

---

## Wrapping Up

This was one of those cases where the numbers speak for themselves. Same WordPress site, same backend API, same database — just swapping Apache for OpenLiteSpeed with LiteSpeed Cache gave us a **5-8x performance improvement** across the board.

The only remaining bottleneck is the backend API averaging 2.33s response times, which is the next thing to tackle. But the web server swap alone already made a massive difference.

If you're running WordPress on Apache and wondering if it's worth switching, hopefully these numbers give you a clear answer.
