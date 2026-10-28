---
title: Edge Computing and Serverless Explained — Running Code Close to Your Users
description: What edge functions are, how they differ from traditional serverless and servers, the V8 isolate model, and when running code at the edge actually makes your app faster.
date: 2026-10-28
tags: Cloud, Performance
keywords: edge computing, edge functions, serverless, V8 isolates, Cloudflare Workers, Vercel edge, cold starts, CDN compute
---

> **TL;DR** — Serverless lets you run code without managing servers; you pay per request. **Edge functions** take this further by running your code in data centres around the world, close to each user, often with near-zero cold starts. They're great for personalisation, auth checks, redirects and APIs that read from globally replicated data — but they don't help if your database is far away in one region.

## From servers to serverless to the edge

1. **Traditional servers** — you rent a machine (or a VPS), install a runtime, keep it patched and pay whether it's busy or idle.
2. **Containers and platforms** — you ship a container image; a platform runs and scales it.
3. **Serverless functions** — you upload a function; the platform runs it on demand and scales to zero. You pay per invocation and compute time.
4. **Edge functions** — serverless functions deployed to many locations in a CDN's network, so each request runs near the user.

## Why latency matters

Light in fibre covers roughly 200 km per millisecond. A user in Jaipur talking to a server in the eastern US faces well over 200 ms of round-trip time before any work happens — and a page load might need several round trips.

Moving the code to a data centre in Mumbai or Delhi can turn that into a few milliseconds. For personalised content that can't be cached, that's the difference between snappy and sluggish.

## How edge runtimes work: isolates

Many edge platforms, including **Cloudflare Workers** and Vercel's edge runtime, don't start a container per request. They run code in **V8 isolates** — the same lightweight sandboxes Chrome uses to separate browser tabs. Thousands of isolates share one process, and a new one starts in about a millisecond.

The trade-off: edge runtimes usually support **Web-standard APIs** (`fetch`, `Request`, `Response`, Web Crypto, streams) rather than the full Node.js API. Many Node built-ins are available through compatibility layers, but native modules and long-running background processes typically aren't.

Other approaches exist too: some platforms run lightweight micro-VMs or WebAssembly at the edge.

## What edge functions are good at

- **Redirects and rewrites** — geo-routing, A/B tests, locale detection.
- **Authentication checks** — verify a session token before a request reaches your origin.
- **Personalisation** — inject the user's currency, language or recommendations into cached pages.
- **API gateways** — rate limiting, header manipulation, request validation.
- **Image and HTML transformation** on the fly.
- **Reading globally replicated data** — key-value stores, caches and read replicas near the user.

## The database problem

Edge compute is only fast if the **data** is close too. If your edge function in Singapore queries a Postgres database in Virginia, every query crosses the planet — and several queries per request can make the edge *slower* than a server next to the database.

Solutions:

- **Keep data-heavy routes regional** — run them in the region where your database lives.
- **Use edge-friendly data stores** — globally replicated key-value stores, distributed SQLite-based databases, or read replicas in several regions.
- **Cache aggressively**, and use connection pooling or HTTP-based database drivers designed for serverless environments.

## Cold starts, explained

A **cold start** happens when a platform must create a new execution environment before handling a request — loading the runtime and your code. Container-based serverless functions can take hundreds of milliseconds to seconds to cold start. Isolate-based edge functions mostly avoid this.

To minimise cold starts on any platform: keep bundles small, avoid heavy initialisation at module load, and lazy-load rarely used dependencies.

## Edge vs regional serverless vs servers

| | Edge functions | Regional serverless | Long-running server |
|---|---|---|---|
| Location | Many cities worldwide | One or a few regions | Where you deploy it |
| Cold starts | Minimal (isolates) | Can be noticeable | None |
| Runtime APIs | Web-standard, partial Node | Full Node/Python/etc. | Anything |
| Best for | Fast, light logic near users | General APIs near the database | Heavy, stateful, long-running work |
| Pricing | Per request | Per request and duration | Per hour or month |

## A practical architecture

For a typical product such as an e-commerce store:

- **Static assets and pages** — cached on the CDN.
- **Middleware at the edge** — auth check, locale, A/B bucket, bot filtering.
- **Data-heavy API routes** — regional serverless next to the database.
- **Background jobs** — queues and workers for emails, webhooks and order processing.

## Frequently asked questions

### What is edge computing?

Edge computing means running code in data centres close to users, often within a CDN's global network, rather than in one central region, to reduce latency.

### What is the difference between serverless and edge functions?

Both run on demand without managing servers. Serverless functions typically run in one region with full language runtimes, while edge functions run in many locations worldwide, usually with lightweight runtimes and minimal cold starts.

### Are edge functions always faster?

No. They are faster for logic that doesn't need a distant database. If each request makes several queries to a database in another region, a function in that region is often faster.

### What is a V8 isolate?

A V8 isolate is a lightweight, sandboxed instance of the V8 JavaScript engine. Edge platforms run many isolates in one process, allowing very fast start-up and efficient multi-tenancy.
