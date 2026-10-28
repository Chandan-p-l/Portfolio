---
title: TypeScript 7 and the Native Go Compiler — Why TypeScript Is Getting 10x Faster
description: Microsoft is porting the TypeScript compiler from JavaScript to Go. What Project Corsa changes, why Go was chosen, how fast it is, and how to try tsgo today.
date: 2026-10-28
tags: JavaScript, Developer Tools
keywords: TypeScript 7, TypeScript Go, tsgo, Project Corsa, TypeScript native compiler, TypeScript performance, typescript-go
---

> **TL;DR** — The TypeScript team is porting the compiler and language service from TypeScript/JavaScript to **Go**. The native version — **TypeScript 7**, codenamed **Project Corsa** — delivers roughly **10x faster** type-checking on large codebases, much lower memory use and a far more responsive editor. The language itself doesn't change.

## Why TypeScript needed a faster compiler

TypeScript's compiler has always been written in TypeScript and run on Node.js. That made it easy to contribute to, but it hit limits as codebases grew to millions of lines:

- Full type-checks taking minutes in CI.
- Editors taking many seconds to load a large project.
- High memory use, especially in monorepos.
- Single-threaded execution that couldn't use modern multi-core CPUs.

In March 2025, Anders Hejlsberg and the TypeScript team announced a native port. Their early benchmarks showed the VS Code codebase — about 1.5 million lines — type-checking in about 7.5 seconds instead of about 78 seconds.

## Why Go, not Rust?

Many people expected Rust. The team explained their reasoning:

- **It's a port, not a rewrite.** They wanted to keep the existing compiler's structure and behaviour, so results match TypeScript 5.x exactly. Go's programming model is close to the existing code's style, which makes a file-by-file port practical.
- **Garbage collection.** The compiler relies on complex, cyclic data structures. Go's GC handles them naturally; Rust would have required a fundamental redesign around ownership.
- **Shared-memory concurrency.** Go makes it straightforward to parse and check files in parallel.

## Where the speed comes from

1. **Native code** — no JIT warm-up, and more efficient memory layouts. That's roughly half of the gain.
2. **Parallelism** — parsing, binding and type-checking run across multiple CPU cores. That's the other half.

## Versioning: TypeScript 6 and 7

- **TypeScript 6.x** is the last line based on the JavaScript codebase. It acts as a bridge, deprecating old options and behaviours so projects are ready for the switch.
- **TypeScript 7** is the native Go implementation.

The goal is that the same code type-checks the same way in both. The differences are mostly in removed legacy options and in the API that tools use to talk to the compiler.

## A new editor experience

The native port also moves the language service to the **Language Server Protocol (LSP)**, the standard most editors already support. Expect:

- Projects loading several times faster.
- Faster go-to-definition, find-all-references and rename.
- Lower memory use in large monorepos.

## How to try it today

The native compiler has been available as a preview package:

```bash
npm install -D @typescript/native-preview
npx tsgo --noEmit -p tsconfig.json
```

There is also a VS Code extension that switches the editor to the native language service. Run `tsgo` alongside `tsc` in CI for a while, compare the output, and report differences.

## Preparing your project

- **Upgrade to the latest TypeScript 5.x / 6.x first**, and fix deprecation warnings.
- **Remove legacy options** you no longer need, such as old module resolution modes and outdated targets.
- **Check your tools.** Linters, bundler plugins and codegen tools that use the compiler API directly may need updates.
- **Keep type-checking separate from bundling.** Most bundlers (Vite, esbuild, SWC) already strip types without type-checking, so `tsgo --noEmit` slots straight into CI.

## What it means for the ecosystem

TypeScript joins a broader trend: JavaScript tooling moving to native languages — esbuild and the Go-based tools, Rust-based SWC, Biome, Oxc and Rolldown. The result is a toolchain where builds, lints and type-checks that once took minutes take seconds.

For developers, the practical win is a faster feedback loop: errors in the editor almost instantly, and CI that finishes before you've switched tabs.

## Frequently asked questions

### What is TypeScript 7?

TypeScript 7 is the native implementation of the TypeScript compiler and language service, ported from JavaScript to Go for much faster performance. It is codenamed Project Corsa.

### Is TypeScript being rewritten in Go?

Yes. The TypeScript team is porting the compiler to Go, aiming to keep the same type-checking behaviour while being around 10 times faster on large projects.

### Why did Microsoft choose Go instead of Rust for TypeScript?

Go's structure is close to the existing compiler code, which made a faithful port practical, and its garbage collection and concurrency suit the compiler's data structures and parallel type-checking.

### Will TypeScript 7 change the TypeScript language?

No. The language and type-checking rules stay the same. The changes are in performance, editor tooling, the compiler API and removal of deprecated options.
