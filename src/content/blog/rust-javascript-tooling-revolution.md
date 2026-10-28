---
title: Why Developer Tools Are Being Rewritten in Rust — Rolldown, Oxc, Biome, Turbopack and uv
description: From bundlers to linters to Python package managers, developer tools are moving to Rust. Here's what changed, which tools matter and how much faster they really are.
date: 2026-10-28
tags: Developer Tools, JavaScript
keywords: Rust tooling, Rolldown, Vite, Oxc, Biome, Turbopack, uv, Ruff, SWC, fast JavaScript tooling
---

> **TL;DR** — A new generation of developer tools written in Rust (and some in Go) is replacing JavaScript- and Python-based tools. They are often **10–100x faster**. The most important names: **Rolldown** and **Oxc** (behind Vite), **Biome** (formatter and linter), **Turbopack** (Next.js), **SWC**, and **uv** and **Ruff** for Python.

## Why now?

For years, JavaScript tools were written in JavaScript. It made sense: the community could contribute in the language it knew. But as projects grew to thousands of modules, the costs became painful — slow cold starts, single-threaded work and heavy memory use.

Then **esbuild** (written in Go) arrived in 2020 and showed bundling could be *two orders of magnitude* faster. That proved the idea: tooling is CPU-bound work, and native, parallel code wins big.

Rust became the most popular choice because it offers C-like speed, memory safety without a garbage collector, excellent parallelism and good bindings to Node.js through napi-rs.

## The tools that matter

### Rolldown and Oxc — the future of Vite

Vite historically used **esbuild** for development and **Rollup** for production builds — two bundlers with subtly different behaviour. **Rolldown** is a Rust bundler with a Rollup-compatible API, built by the VoidZero team, designed to replace both with one fast, consistent engine.

Rolldown builds on **Oxc**, a Rust toolkit with an extremely fast parser, transformer, resolver and minifier, plus the **oxlint** linter. Vite has been adopting Rolldown progressively, and large projects report production builds several times faster.

### Biome — formatter and linter in one

**Biome** is a single Rust binary that formats and lints JavaScript, TypeScript, JSX, JSON and CSS. It is largely compatible with Prettier's formatting and covers many popular ESLint rules, while running far faster and with zero plugin setup.

### Turbopack — Next.js's bundler

**Turbopack**, from Vercel, is an incremental bundler written in Rust. It caches work at the function level, so only what changed is rebuilt. It became the default bundler in recent versions of Next.js for both development and production builds.

### SWC — the compiler behind many tools

**SWC** is a Rust-based JavaScript/TypeScript compiler used as a fast Babel replacement — inside Next.js, Deno, Parcel, Jest transforms and Vite's React plugin options.

### uv and Ruff — the same story in Python

Astral's **Ruff** (a linter and formatter) and **uv** (a package and project manager) brought the same leap to Python. uv can resolve and install dependencies 10–100x faster than pip, and it manages Python versions, virtual environments and lock files in one tool.

## How big is the speed-up?

Benchmarks vary by project, but typical results reported by these projects and their users look like:

| Task | Traditional tool | Native tool | Typical speed-up |
|---|---|---|---|
| Lint | ESLint | oxlint / Biome | 10–100x |
| Format | Prettier | Biome | 10–30x |
| Transpile | Babel | SWC / Oxc | 10–70x |
| Install Python deps | pip | uv | 10–100x |

Always measure on your own codebase — but even the low end is a big quality-of-life improvement.

## Trade-offs to consider

- **Plugin ecosystems.** JavaScript tools have years of plugins. Native tools support fewer, though most offer JavaScript plugin APIs or compatibility layers.
- **Contributor barrier.** Fewer web developers write Rust, which can slow community contributions.
- **Edge-case compatibility.** Drop-in replacements are 95–99% compatible; the last few per cent can bite in large codebases. Run old and new tools side by side before switching.
- **Binary distribution.** Native tools ship platform-specific binaries, which can complicate unusual CI environments.

## Should you switch?

- **New projects:** yes — start with Vite, Biome or oxlint, and uv for Python.
- **Existing projects:** migrate where the pain is biggest. If CI linting takes three minutes, try oxlint or Biome first. If builds are slow, try the Rolldown-powered Vite.
- **Keep what works.** If a tool is fast enough and well configured, there's no prize for switching.

## The bigger picture

Even TypeScript is porting its compiler to Go, promising around 10x faster type-checking. Within a few years, the whole web toolchain — install, bundle, transform, lint, format, type-check — will likely be native. The result is a much tighter feedback loop, which is what makes developers productive.

## Frequently asked questions

### Why are JavaScript tools being rewritten in Rust?

Tooling tasks like parsing, bundling and linting are CPU-intensive. Rust provides near-C performance, memory safety and easy parallelism, making tools 10 to 100 times faster than JavaScript versions.

### What is Rolldown?

Rolldown is a fast JavaScript bundler written in Rust with a Rollup-compatible API. It is being adopted by Vite to replace both esbuild and Rollup with one consistent engine.

### Is Biome a replacement for ESLint and Prettier?

For many projects, yes. Biome formats and lints JavaScript, TypeScript, JSON and CSS in one fast tool, though some specialised ESLint plugins have no Biome equivalent yet.

### What is uv in Python?

uv is a fast Python package and project manager written in Rust by Astral. It replaces pip, virtualenv, pip-tools and parts of pyenv and Poetry in a single tool.
