---
title: Core Web Vitals Guide — How to Fix LCP, INP and CLS
description: Core Web Vitals affect user experience and Google Search. What LCP, INP and CLS measure, the "good" thresholds, and the practical fixes that move each metric.
date: 2026-10-28
tags: Performance, SEO
keywords: Core Web Vitals, INP, Interaction to Next Paint, LCP, CLS, page speed, web performance, Google ranking factors
---

> **TL;DR** — Core Web Vitals are Google's three key user-experience metrics: **LCP** (loading — aim for 2.5 s or less), **INP** (responsiveness — 200 ms or less) and **CLS** (visual stability — 0.1 or less). They're measured on real users at the 75th percentile. INP replaced FID in March 2024 and is now the metric most sites fail.

## Why Core Web Vitals matter

Speed affects everything: bounce rate, conversions and how users feel about a brand. Google uses Core Web Vitals as part of its **page experience** signals in Search. They won't outrank great content on their own, but between similar pages, a faster, more stable experience helps.

## The three metrics

| Metric | Measures | Good | Needs improvement | Poor |
|---|---|---|---|---|
| **LCP** — Largest Contentful Paint | When the main content appears | ≤ 2.5 s | 2.5–4 s | > 4 s |
| **INP** — Interaction to Next Paint | How quickly the page responds to input | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** — Cumulative Layout Shift | How much the layout jumps around | ≤ 0.1 | 0.1–0.25 | > 0.25 |

A page "passes" when at least **75% of visits** meet the "good" threshold for each metric.

## Lab data vs field data

- **Field data** comes from real Chrome users through the **Chrome UX Report (CrUX)**. This is what Google uses. You'll find it in PageSpeed Insights and Search Console.
- **Lab data** comes from tools like Lighthouse, running on a simulated device. It's great for debugging, but it can't measure real INP, because there are no real users clicking.

Use the `web-vitals` JavaScript library to collect field data from your own users, with attribution that tells you *which* element or interaction caused a problem.

## Fixing LCP (loading)

The LCP element is usually a hero image, a large heading or a video poster. Break LCP into four parts and fix the slowest:

1. **Time to first byte** — use a CDN, cache HTML, avoid slow server rendering and redirects.
2. **Resource load delay** — make sure the browser discovers the LCP image early. Put it in the HTML as an `<img>`, not a CSS background or a JavaScript-injected element. Add `fetchpriority="high"`.
3. **Resource load time** — compress images, use AVIF or WebP, serve responsive sizes with `srcset`.
4. **Render delay** — reduce render-blocking CSS and JavaScript; inline critical CSS; avoid hiding content until JavaScript runs.

Common mistakes: `loading="lazy"` on the hero image, rendering everything client-side, and blocking web fonts. Use `font-display: swap` and preload only the fonts you truly need.

## Fixing INP (responsiveness)

INP measures the delay from a tap, click or key press until the next frame is painted — across all interactions in the visit, reporting roughly the worst one.

Each interaction has three phases:

1. **Input delay** — the main thread is busy with something else when the user interacts.
2. **Processing time** — your event handlers run.
3. **Presentation delay** — the browser recalculates styles, lays out and paints.

Fixes:

- **Break up long tasks.** Any task over 50 ms blocks interaction. Yield to the main thread with `scheduler.yield()` where supported, falling back to `setTimeout`.
- **Do less in event handlers.** Update the UI first, then do the expensive work afterwards.
- **Cut third-party JavaScript.** Analytics, chat widgets and tag managers are frequent INP offenders. Load them late, or remove them.
- **Reduce DOM size.** Huge DOMs make every style and layout calculation slower. Virtualise long lists.
- **Avoid layout thrashing.** Don't read layout (`offsetHeight`) and write styles in alternating loops.
- **In React**, use `startTransition` for non-urgent updates and avoid re-rendering large trees on every keystroke.

```js
button.addEventListener('click', async () => {
  showSpinner();              // give instant visual feedback
  await scheduler.yield();    // let the browser paint
  await doExpensiveWork();
});
```

## Fixing CLS (visual stability)

Layout shifts happen when content moves after it has been displayed.

- **Always set `width` and `height`** (or `aspect-ratio`) on images, videos and iframes.
- **Reserve space for ads, embeds and banners** before they load.
- **Don't insert content above existing content**, unless it's in response to a user action.
- **Match fallback fonts to web fonts** with `size-adjust` and related descriptors, so swapping fonts doesn't reflow text.
- **Animate with `transform` and `opacity`**, not `top`, `left`, `width` or `height`.
- **Make pages eligible for the back/forward cache** so back navigations restore instantly without shifts.

## A practical workflow

1. Check **Search Console's Core Web Vitals report** to find which page groups fail.
2. Open **PageSpeed Insights** for field data on a representative URL.
3. Reproduce in **Chrome DevTools' Performance panel**, which shows live LCP, INP and CLS with attribution.
4. Fix the biggest problem, deploy, and wait for field data to update — CrUX uses a rolling 28-day window.

## Frequently asked questions

### What are Core Web Vitals?

Core Web Vitals are three metrics Google uses to measure real-world user experience: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability).

### What replaced First Input Delay?

Interaction to Next Paint (INP) replaced First Input Delay (FID) as a Core Web Vital in March 2024. INP measures the responsiveness of all interactions, not just the first.

### What is a good INP score?

An INP of 200 milliseconds or less, at the 75th percentile of page visits, is considered good.

### Do Core Web Vitals affect SEO?

Yes, as part of Google's page experience signals. They are not the most important ranking factor — relevance and content quality matter more — but they can help between otherwise similar pages and strongly affect conversions.
