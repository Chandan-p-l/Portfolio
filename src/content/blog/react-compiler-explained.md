---
title: React Compiler Explained — Automatic Memoization Without useMemo
description: The React Compiler automatically memoizes components and hooks at build time. How it works, what it means for useMemo and useCallback, and how to adopt it safely.
date: 2026-10-28
tags: React, JavaScript
keywords: React Compiler, React Forget, automatic memoization, useMemo, useCallback, React performance, React 19
---

> **TL;DR** — The React Compiler is a build-time tool that analyses your components and automatically adds fine-grained memoization. You write plain React; it makes sure components and values only re-compute when their inputs actually change. In most new code, you no longer need `useMemo`, `useCallback` or `React.memo` for performance.

## The problem: re-renders and manual memoization

When state changes in React, the component re-renders — and by default, so do all its children. Most of the time that's cheap. But in large apps, unnecessary re-renders add up: expensive calculations re-run, lists re-render and new function references break child optimisations.

The traditional fix is manual memoization:

```jsx
const filtered = useMemo(() => items.filter(matches(query)), [items, query]);
const onSelect = useCallback((id) => setSelected(id), []);
export default React.memo(ProductList);
```

This works, but it's noisy, easy to get wrong (a missing dependency causes stale bugs; an extra one makes the memo useless), and most teams apply it inconsistently.

## What the React Compiler does

The React Compiler — first shown as "React Forget" and released as a stable **1.0 in October 2025** — runs as a Babel plugin (with integrations for Vite, Next.js, Expo and others). It understands React's rules and JavaScript's data flow, and rewrites your component so that:

- **JSX is cached** and only rebuilt when the values it uses change.
- **Derived values** are cached like `useMemo` — automatically, with exactly the right dependencies.
- **Callbacks** keep a stable identity like `useCallback` when their captured values haven't changed.
- It can memoize **conditionally** and **after early returns**, which manual hooks can't do.

You write this:

```jsx
function ProductList({ items, query }) {
  const filtered = items.filter((i) => i.name.includes(query));
  return (
    <ul>
      {filtered.map((i) => <Product key={i.id} item={i} />)}
    </ul>
  );
}
```

…and the compiled output behaves as if every expensive piece were perfectly memoized.

## How does it know what's safe?

The compiler relies on the **Rules of React** — the same rules React has always documented:

1. Components and hooks must be **pure** during render: same inputs, same output, no side effects.
2. **Props and state are immutable** — don't mutate them; create new values.
3. Hooks are called **unconditionally at the top level**.

If a component breaks these rules in a way the compiler can detect, it **skips optimising that component** rather than risk changing behaviour. Your app still works; that component just doesn't get the benefit.

## Adopting it in an existing app

1. **Turn on the ESLint rules.** The React Hooks ESLint plugin includes compiler-powered rules that flag code that breaks the Rules of React. Fix those first.
2. **Install the compiler** (`babel-plugin-react-compiler`) and enable it in your bundler or framework config.
3. **Roll out gradually** if the codebase is large — you can opt in by directory, or opt individual components in or out with `"use memo"` and `"use no memo"` directives.
4. **Test and profile.** Use React DevTools — compiled components show a "Memo ✨" badge.

## Do I still need useMemo and useCallback?

For **new code**, generally no — let the compiler handle it. They remain useful as escape hatches:

- When you need a value to be **referentially stable** for a specific reason, such as an effect dependency that must not change.
- In code the compiler can't optimise.

Don't rush to delete existing `useMemo` calls in working code. The compiler works alongside them, and removing them can subtly change when effects fire.

## What it doesn't fix

- **Slow algorithms** — memoizing an O(n²) computation still runs it whenever inputs change.
- **Huge lists** — you still need virtualisation for thousands of rows.
- **Network waterfalls** — data fetching strategy matters more than render cost for most apps.
- **Large bundles** — the compiler optimises runtime work, not download size.

## Why it matters

The compiler shifts performance from something each developer must remember to something the toolchain guarantees. Code gets simpler, reviews focus on logic instead of dependency arrays, and apps get faster by default.

## Frequently asked questions

### What is the React Compiler?

The React Compiler is a build-time tool from the React team that automatically memoizes React components and hooks, reducing unnecessary re-renders without manual useMemo, useCallback or React.memo.

### Does the React Compiler require React 19?

It works best with React 19, and also supports React 17 and 18 through a small runtime package.

### Is the React Compiler production ready?

Yes. It reached a stable 1.0 release in October 2025, after being used in production at Meta, and is supported by major React frameworks.

### Should I remove useMemo and useCallback from my code?

Not necessarily. New code generally doesn't need them, but existing calls are safe to keep, and removing them can change effect behaviour. Remove them carefully, with tests.
