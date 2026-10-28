---
title: RAG vs Fine-Tuning — How to Give an LLM Your Own Knowledge
description: Retrieval-augmented generation and fine-tuning solve different problems. Learn how RAG works step by step, when fine-tuning is worth it, and how to choose for your product.
date: 2026-10-28
tags: AI
keywords: RAG, retrieval augmented generation, fine-tuning LLM, embeddings, vector search, hybrid search, LLM knowledge
---

> **TL;DR** — Use **RAG** when the model needs to *know* things — your documents, products or policies, especially if they change. Use **fine-tuning** when the model needs to *behave* differently — a consistent format, tone or specialised skill. Many production systems use both.

## Why base models aren't enough

A general-purpose LLM knows a lot about the world up to its training cutoff, but nothing about your company's refund policy, last week's product launch or your private codebase. Simply asking it will produce confident-sounding guesses.

There are two main ways to fix that: put the right information into the prompt at question time (**retrieval-augmented generation**), or change the model's weights (**fine-tuning**).

## How RAG works

RAG has two phases.

### Indexing (done ahead of time)

1. **Collect** your sources — docs, PDFs, help-centre articles, tickets.
2. **Chunk** them into passages of a few hundred tokens, ideally along natural boundaries like headings.
3. **Embed** each chunk with an embedding model, which turns text into a vector that captures meaning.
4. **Store** the vectors, the text and metadata (source, date, permissions) in a vector database or a search index.

### Answering (done per question)

1. Embed the user's question.
2. **Retrieve** the most similar chunks.
3. **Augment** the prompt: "Answer using only the sources below, and cite them."
4. **Generate** the answer.

## What separates good RAG from bad RAG

Most RAG failures are retrieval failures — the model never saw the right passage. The fixes:

- **Hybrid search.** Combine vector search (good at meaning) with keyword search like BM25 (good at exact names, codes and IDs). Pure vector search often misses "error E-4021".
- **Reranking.** Retrieve 50 candidates cheaply, then use a reranker model to pick the best 5.
- **Good chunking.** Keep headings with their content, and add a sentence of context to each chunk explaining where it came from.
- **Metadata filters.** Filter by product, language, date or user permissions *before* ranking. This is also your access-control layer — never retrieve what the user isn't allowed to see.
- **Citations.** Ask the model to cite chunk IDs, and show them. It builds user trust and makes errors easy to spot.
- **Evaluation.** Keep a set of real questions with known answers, and measure retrieval recall and answer accuracy every time you change something.

## How fine-tuning works

Fine-tuning continues training a model on your own examples — typically hundreds to thousands of input/output pairs. Parameter-efficient methods such as **LoRA** train only a small set of extra weights, which makes fine-tuning far cheaper than full retraining.

Fine-tuning is great at teaching:

- A consistent **output format**, such as a specific JSON structure.
- A **tone or style**, such as a brand voice.
- A narrow **skill**, such as classifying support tickets into your categories.
- **Efficiency** — a small fine-tuned model can sometimes match a large general model on one task at a fraction of the cost.

It is a poor way to teach **facts**. Models fine-tuned on documents tend to blur details and still hallucinate, and every time the facts change, you must retrain.

## Side-by-side comparison

| | RAG | Fine-tuning |
|---|---|---|
| Best for | Knowledge and facts | Behaviour, format and style |
| Handles changing data | Yes — just re-index | No — retrain needed |
| Citations | Easy | Not possible |
| Access control | Per-document filters | Hard |
| Upfront cost | Low | Medium to high |
| Per-query cost | Higher (longer prompts) | Lower |

## What about long context windows?

Modern models accept very long contexts, so for a small knowledge base you can sometimes skip retrieval and put everything in the prompt. Combined with **prompt caching**, this is often the simplest solution for a few hundred pages.

But long context doesn't scale to millions of documents, costs more per query and makes per-user permissions difficult. For large or sensitive corpora, retrieval is still the right tool.

## A practical decision guide

1. **Start with prompting.** Good instructions and a few examples solve more than you'd expect.
2. **Add RAG** when the model needs your knowledge.
3. **Add fine-tuning** when you need a behaviour that prompting can't reliably produce, or need to cut cost at high volume.
4. **Measure every step** with a fixed evaluation set.

## Frequently asked questions

### What is RAG in AI?

Retrieval-augmented generation (RAG) is a technique where relevant documents are retrieved from a search index and added to the model's prompt, so it can answer using information it wasn't trained on.

### Is RAG better than fine-tuning?

Neither is better overall. RAG is better for giving a model up-to-date knowledge with citations; fine-tuning is better for changing a model's behaviour, format or style.

### Do I need a vector database for RAG?

Not always. Small projects can use an in-memory index or a Postgres extension such as pgvector. Dedicated vector databases help at larger scale or with advanced filtering.

### Can RAG eliminate hallucinations?

It reduces them significantly but doesn't eliminate them. Good retrieval, instructions to answer only from sources, citations and evaluation all help.
