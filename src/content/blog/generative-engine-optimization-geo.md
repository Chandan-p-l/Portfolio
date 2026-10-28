---
title: Generative Engine Optimization (GEO) — How to Rank in AI Search
description: GEO is SEO for ChatGPT, Perplexity, Gemini and Google AI Overviews. A practical guide to getting your content cited by AI answer engines, with structured data, llms.txt and clear facts.
date: 2026-10-28
tags: SEO, AI
keywords: generative engine optimization, GEO, AI SEO, AI Overviews, answer engine optimization, llms.txt, structured data, get cited by ChatGPT
---

> **TL;DR** — Generative Engine Optimization (GEO) is the practice of making your content easy for AI systems to find, understand, trust and **cite**. It builds on classic SEO — crawlable pages, fast sites, strong authority — and adds a focus on clear facts, structured data, direct answers and consistent identity across the web.

## Search has a new front page

People increasingly get answers from ChatGPT, Perplexity, Gemini, Claude, Microsoft Copilot and Google's **AI Overviews** and **AI Mode** instead of a list of blue links. These systems read many pages, then write one answer — sometimes with a handful of citations.

If your page isn't one of the sources, you're invisible in that answer. GEO is about becoming one of them.

The term comes from a 2023 research paper by researchers from Princeton and other institutions, which found that adding citations, statistics and quotations to content could noticeably increase how often it appeared in generative engine responses.

## SEO vs GEO

| | Classic SEO | GEO |
|---|---|---|
| Goal | Rank high in a list of links | Be quoted or cited in an AI answer |
| Unit of competition | The page | The passage or fact |
| Key signals | Links, relevance, experience | Clarity, factual density, authority, consistency |
| Success metric | Clicks and rankings | Citations, mentions and referral traffic |

The good news: GEO doesn't replace SEO. Most AI search systems retrieve from a web index first, so **if you aren't crawlable and indexable, you can't be cited**.

## 1. Make every page readable without JavaScript

Many AI crawlers fetch raw HTML and don't run JavaScript. A single-page app that renders content only in the browser may look empty to them.

- Use **server-side rendering or static prerendering** so the HTML contains the real text.
- Give each piece of content its **own URL** with its own title and meta description.
- Keep a clean **XML sitemap** and link pages internally.

## 2. Let the right bots in

Check your `robots.txt`. Crawlers such as Googlebot, Bingbot, OAI-SearchBot and GPTBot (OpenAI), ClaudeBot (Anthropic) and PerplexityBot each have their own user agent. Blocking them — sometimes by accident, through a CDN's bot protection — removes you from their answers.

## 3. Write answer-first content

AI systems extract passages. Help them:

- **Lead with the answer.** Put a one- or two-sentence summary at the top.
- Use **question-style headings** that match how people ask: "What is…", "How does…", "Is X better than Y?"
- Keep paragraphs short and self-contained, so a single passage makes sense when quoted on its own.
- Use **lists and tables** for steps, comparisons and specs.
- Add an **FAQ section** with concise, factual answers.

## 4. Be specific and verifiable

Vague marketing copy is rarely cited. Specific facts are:

- Numbers, dates, prices, measurements and named entities.
- Original data, benchmarks or examples from your own experience.
- Links to primary sources for claims you make.
- A visible author, publish date and "last updated" date.

## 5. Use structured data

**Schema.org JSON-LD** tells machines exactly what a page is about. Useful types include:

- `Person` and `Organization` — with `sameAs` links to your official profiles.
- `Article` or `BlogPosting` — with author, dates and headline.
- `FAQPage`, `HowTo`, `Product`, `Book`, `LocalBusiness`.
- `BreadcrumbList` for site structure.

Structured data won't guarantee a citation, but it removes ambiguity — especially about *who* you are.

## 6. Build a consistent entity

AI models form a picture of a person or brand from everything they read. Make that picture consistent:

- Use the **same name, title and description** on your website, LinkedIn, GitHub, Instagram and directories.
- Link them all together with `sameAs` in structured data and `rel="me"` links.
- Have a clear **About** page that states key facts plainly: who you are, what you do, where you're based.
- Earn mentions on reputable third-party sites. Being discussed elsewhere is a strong authority signal.

## 7. Consider llms.txt

**llms.txt** is a proposed standard: a Markdown file at `/llms.txt` that gives AI systems a concise summary of your site and links to its most important pages. Support among AI companies is still uneven, but it's cheap to add and useful for agents and tools that do read it.

## 8. Measure what you can

- Track referral traffic from AI assistants in your analytics.
- Regularly ask the major assistants questions your audience asks, and note who gets cited.
- Monitor Google Search Console — AI Overviews traffic is included in search performance data.

## A GEO checklist

- [ ] Content is in the HTML (SSR or prerendered)
- [ ] One URL per topic, with unique title and description
- [ ] AI crawlers allowed in robots.txt
- [ ] Answer-first summaries and question headings
- [ ] Specific facts, sources, author and dates
- [ ] JSON-LD for Person or Organization, Article and FAQ
- [ ] Consistent identity across profiles, linked with sameAs
- [ ] Sitemap and llms.txt published

## Frequently asked questions

### What is generative engine optimization?

Generative engine optimization (GEO) is the practice of optimising content so that AI-powered search and answer engines, such as ChatGPT, Perplexity and Google AI Overviews, understand it and cite it in their responses.

### Is GEO replacing SEO?

No. GEO builds on SEO. AI search systems usually retrieve pages from a search index first, so crawlability, indexing, speed and authority remain essential.

### How do I get my website cited by ChatGPT?

Make your content crawlable without JavaScript, allow AI crawlers in robots.txt, write clear answer-first content with specific facts, add structured data, and build consistent authority across the web.

### Does llms.txt help with SEO?

llms.txt does not affect Google rankings. It is a proposed convention to help AI tools understand a site, and support among AI providers is still limited, but it is low-cost to add.
