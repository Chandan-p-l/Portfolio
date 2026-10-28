---
title: React Server Components Explained — The Mental Model You Actually Need
description: React Server Components run on the server and send zero JavaScript to the browser. Learn how they differ from SSR, when to use "use client", and how Server Functions work.
date: 2026-10-28
tags: React, JavaScript
keywords: React Server Components, RSC, use client, use server, server functions, Next.js App Router, SSR vs RSC
---

> **TL;DR** — React Server Components (RSC) are components that run **only on the server**. They can read databases and files directly, and their code is never sent to the browser. You mark interactive parts with `"use client"`. The result: less JavaScript, simpler data fetching and faster pages.

## The problem RSC solves

In a classic React single-page app, the browser downloads all the component code, then fetches data from an API, then renders. That means big bundles, loading spinners and request waterfalls.

Server-side rendering (SSR) helped by sending HTML first — but the browser still had to download and run *all* the JavaScript to hydrate the page, including code for parts that never change.

Server Components go further: components that don't need interactivity **never ship to the client at all**.

## SSR vs Server Components

These are often confused, but they are different things that work together:

| | SSR | Server Components |
|---|---|---|
| What it produces | HTML for the first load | A serialised component tree (RSC payload) |
| Component code in the bundle? | Yes — everything hydrates | No — only Client Components ship |
| Runs on | Server, then again in the browser | Server only |
| Can access database directly? | Only via data-loading APIs | Yes, inside the component |

A framework like **Next.js (App Router)** uses both: Server Components produce the tree, SSR turns it into HTML for a fast first paint, and only Client Components hydrate.

## Server and Client Components

In an RSC app, components are **Server Components by default**:

```tsx
// app/products/page.tsx — a Server Component
import { db } from '@/lib/db';
import { AddToCart } from './add-to-cart';

export default async function ProductsPage() {
  const products = await db.product.findMany(); // direct DB access
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} — ₹{p.price}
          <AddToCart id={p.id} />
        </li>
      ))}
    </ul>
  );
}
```

Anything that needs state, effects, event handlers or browser APIs becomes a **Client Component** with the `"use client"` directive:

```tsx
'use client';
import { useState } from 'react';

export function AddToCart({ id }: { id: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? 'Added' : 'Add to cart'}</button>;
}
```

`"use client"` marks a **boundary**: that file and everything it imports goes into the client bundle. Server Components can render Client Components and pass them serialisable props.

## Server Functions: mutations without an API layer

The `"use server"` directive marks async functions that run on the server but can be called from the client — for example, from a form:

```tsx
async function subscribe(formData: FormData) {
  'use server';
  await db.subscriber.create({ data: { email: String(formData.get('email')) } });
}

export function Newsletter() {
  return (
    <form action={subscribe}>
      <input name="email" type="email" required />
      <button>Subscribe</button>
    </form>
  );
}
```

The framework creates the endpoint for you. **Treat every Server Function like a public API route**: validate inputs, check authentication and authorisation, and never trust the client.

## Streaming and Suspense

Because Server Components can be async, React can **stream** the page. Wrap slow parts in `<Suspense>` and the rest of the page is sent immediately, with the slow section filled in when its data arrives. Users see content sooner, and one slow query doesn't block the whole page.

## Best practices

- **Keep Client Components small and at the leaves.** Make the button interactive, not the whole page.
- **Fetch data where it's used**, in Server Components. Start independent requests in parallel with `Promise.all`.
- **Never pass secrets as props** to Client Components — they end up in the browser.
- **Use the `server-only` package** for modules that must never be imported on the client.
- **Pass Server Components as `children`** to Client Components when you need interactive wrappers around server-rendered content.

## When RSC is not the right fit

- Highly interactive apps where nearly everything is client state — design tools, games, complex editors.
- Static sites with almost no data fetching, where a simpler static generator is enough.
- Teams without a framework that supports RSC — the bundler integration is complex to build yourself.

## Frequently asked questions

### What are React Server Components?

React Server Components are React components that render only on the server. Their code is not sent to the browser, and they can access server resources like databases directly.

### What is the difference between SSR and React Server Components?

SSR renders the full app to HTML for the first load and then hydrates all components in the browser. Server Components render on the server and never ship their code to the client; only Client Components are hydrated.

### When should I use "use client"?

Use "use client" for components that need state, effects, event handlers or browser-only APIs. Keep these components as small as possible.

### Which frameworks support React Server Components?

Next.js App Router has the most mature support. Other frameworks, including React Router and Waku, have added or are adding RSC support.
