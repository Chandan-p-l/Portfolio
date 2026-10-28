---
title: Modern CSS Features You Should Be Using — Container Queries, :has(), View Transitions and More
description: CSS has changed more in the last few years than in the decade before. A practical tour of container queries, :has(), nesting, cascade layers, view transitions, anchor positioning and scroll-driven animations.
date: 2026-10-28
tags: Web Platform, CSS
keywords: modern CSS, container queries, CSS has selector, view transitions API, CSS anchor positioning, scroll driven animations, CSS nesting, cascade layers
---

> **TL;DR** — Much of what used to need JavaScript or a preprocessor is now plain CSS: components that respond to their container, a "parent selector", native nesting, animated page transitions, tooltips anchored to elements and scroll-linked animations. Here's what each feature does and how to use it today.

## 1. Container queries

Media queries respond to the **viewport**. But a card might sit in a wide main column on one page and a narrow sidebar on another. **Container queries** let a component respond to the size of **its container**:

```css
.card-wrapper { container-type: inline-size; }

.card { display: grid; gap: 1rem; }

@container (min-width: 32rem) {
  .card { grid-template-columns: 10rem 1fr; }
}
```

There are also **container query units** — `cqi`, `cqw` and friends — for sizing text and spacing relative to the container. Container size queries work in all modern browsers.

## 2. The :has() selector — finally, a parent selector

`:has()` selects an element based on what it contains:

```css
/* Highlight a form field's wrapper when its input is invalid */
.field:has(input:user-invalid) { border-color: crimson; }

/* Cards with an image get a different layout */
.card:has(> img) { grid-template-rows: 12rem auto; }

/* Stop the page scrolling while a modal is open */
body:has(dialog[open]) { overflow: hidden; }
```

It replaces a lot of "add a class with JavaScript" code, and it's supported in all major browsers.

## 3. Native CSS nesting

The feature people used Sass for, now built in:

```css
.nav {
  display: flex;
  & a { color: inherit; }
  & a:hover { text-decoration: underline; }
  @media (width < 40rem) { flex-direction: column; }
}
```

## 4. Cascade layers

`@layer` lets you decide which groups of styles win, regardless of specificity:

```css
@layer reset, base, components, utilities;

@layer components { .btn { padding: .75rem 1rem; } }
@layer utilities  { .p-0 { padding: 0; } } /* always wins over components */
```

This makes working with third-party CSS and design systems far more predictable.

## 5. View transitions

The **View Transitions API** animates between two states of a page — or between two pages — with a few lines of code:

```js
document.startViewTransition(() => updateTheDOM());
```

```css
::view-transition-old(root),
::view-transition-new(root) { animation-duration: 250ms; }

.product-image { view-transition-name: hero-image; }
```

Give an element the same `view-transition-name` on both states, and the browser animates it smoothly from its old position to the new one. For multi-page sites, cross-document transitions only need:

```css
@view-transition { navigation: auto; }
```

Same-document transitions now work across all major engines. Cross-document support is newer, so treat it as progressive enhancement.

## 6. Anchor positioning

Tooltips, popovers and dropdowns traditionally needed JavaScript positioning libraries. **CSS anchor positioning** ties one element's position to another's:

```css
.trigger { anchor-name: --menu-btn; }

.menu {
  position: absolute;
  position-anchor: --menu-btn;
  position-area: bottom span-right;
  position-try-fallbacks: flip-block;   /* flip above if no room below */
}
```

Combined with the HTML **Popover API** (`popover` and `popovertarget` attributes), you can build accessible menus and tooltips with no JavaScript at all. Anchor positioning is supported in Chromium-based browsers and Safari, with other engines catching up — check current support before relying on it without a fallback.

## 7. Scroll-driven animations

Link an animation to scroll progress instead of time:

```css
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.reading-progress {
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll(root);
}

.reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

These run off the main thread, so they're smoother than scroll listeners in JavaScript. Always wrap motion in `@media (prefers-reduced-motion: no-preference)`.

## 8. Smaller wins worth knowing

- **`text-wrap: balance`** for evenly balanced headlines, and **`text-wrap: pretty`** to avoid orphans in paragraphs.
- **Subgrid** — child grids that align to the parent grid's tracks.
- **`color-mix()`** and **relative colour syntax** for deriving shades from one brand colour.
- **`oklch()`** colours, which give perceptually even palettes and wide-gamut colour.
- **`light-dark()`** to define both theme colours in one declaration.
- **`@starting-style`** to animate elements as they first appear, including from `display: none`.
- **`field-sizing: content`** for text areas that grow with their content.

## How to adopt new CSS safely

- Check support on caniuse.com or **Baseline** status on MDN.
- Use **`@supports`** for feature detection and provide sensible fallbacks.
- Treat motion and visual extras as **progressive enhancement** — the page should still work without them.

## Frequently asked questions

### What are CSS container queries?

Container queries let you apply styles based on the size of an element's container instead of the viewport, so components adapt to wherever they are placed.

### Is :has() supported in all browsers?

Yes. The :has() selector is supported in all current major browsers, including Chrome, Edge, Safari and Firefox.

### What is the View Transitions API?

The View Transitions API lets browsers animate smoothly between two DOM states or between pages, using CSS to control the animation.

### Do I still need Sass in 2026?

Many projects no longer do. Native CSS now supports nesting, custom properties, cascade layers and colour functions, which cover most reasons teams used Sass.
