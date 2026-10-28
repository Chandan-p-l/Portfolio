---
title: Vector Databases Explained — Embeddings, Similarity Search and HNSW
description: How vector databases power semantic search and AI apps. Embeddings, cosine similarity, approximate nearest-neighbour indexes like HNSW, and when Postgres with pgvector is enough.
date: 2026-10-28
tags: AI, Databases
keywords: vector database, embeddings, semantic search, HNSW, pgvector, cosine similarity, approximate nearest neighbor
---

> **TL;DR** — A vector database stores *embeddings* — lists of numbers that represent meaning — and finds the ones closest to a query very quickly. It is what makes "search by meaning" possible, and it is the retrieval engine behind most RAG systems.

## Searching by meaning, not by words

A traditional search for "cheap flights to Goa" matches those exact words. A semantic search also finds "budget airfare to Goa" and "low-cost tickets to Panaji", because it compares **meaning**.

That requires turning meaning into something a computer can compare: vectors.

## What is an embedding?

An **embedding model** converts a piece of content — a sentence, a paragraph, an image — into a fixed-length list of numbers, often 384 to 3,072 of them. The model is trained so that similar content lands close together in this high-dimensional space.

- "How do I reset my password?" and "I forgot my login" → vectors that are close.
- "How do I reset my password?" and "best biryani in Jaipur" → vectors that are far apart.

Images, audio and code can be embedded too, and multimodal models place text and images in the same space, so you can search photos with words.

## Measuring "closeness"

Three distance measures are common:

| Metric | Idea | Typical use |
|---|---|---|
| **Cosine similarity** | Angle between vectors | Text embeddings (most common) |
| **Dot product** | Angle plus magnitude | Normalised embeddings, recommendation |
| **Euclidean (L2)** | Straight-line distance | Images, some specialised models |

Use whichever metric your embedding model was trained for — its documentation will say.

## Why you need a special index

Finding the exact nearest neighbours means comparing the query with every stored vector. That's fine for 10,000 items and hopeless for 100 million.

Vector databases use **approximate nearest neighbour (ANN)** indexes, which trade a tiny bit of accuracy for huge speed-ups.

### HNSW — the most popular index

**Hierarchical Navigable Small World** graphs connect each vector to its neighbours in several layers. The top layers are sparse "highways"; the bottom layer is dense. A search starts at the top, hops quickly towards the right region, then descends and refines. Searches typically touch only a small fraction of the data, yet usually find the true nearest neighbours.

Key tuning knobs:

- **M** — connections per node. Higher means better recall but more memory.
- **ef_construction** — effort spent building the graph.
- **ef_search** — effort spent per query. This is the main speed-versus-recall dial at runtime.

### Other index types

- **IVF (inverted file)** clusters vectors and searches only the nearest clusters — less memory, slightly lower recall.
- **Quantisation** (product or binary quantisation) compresses vectors so far more fit in RAM, at some cost in precision.
- **Disk-based indexes** such as DiskANN keep most of the index on SSD for billion-scale datasets.

## Features that matter in practice

- **Metadata filtering** — "nearest vectors *where* language = 'hi' and in_stock = true". Efficient filtering is harder than it sounds and varies a lot between products.
- **Hybrid search** — combining vector similarity with keyword (BM25) scores for exact matches like product codes.
- **Updates and deletes** — some indexes degrade with heavy churn.
- **Multi-tenancy** — keeping each customer's vectors isolated.

## Do you need a dedicated vector database?

Often, no. **PostgreSQL with the pgvector extension** supports HNSW and IVF indexes, stores vectors next to your normal tables, and lets you filter with plain SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE docs (
  id bigserial PRIMARY KEY,
  body text,
  lang text,
  embedding vector(1536)
);

CREATE INDEX ON docs USING hnsw (embedding vector_cosine_ops);

SELECT id, body
FROM docs
WHERE lang = 'en'
ORDER BY embedding <=> $1   -- cosine distance to the query vector
LIMIT 5;
```

Hosted Postgres services, including Supabase, support pgvector out of the box. For many startups, that is all they need.

Consider a dedicated vector database when you have hundreds of millions of vectors, need very low latency at high query volume, or need advanced features like built-in hybrid ranking and tiered storage.

## Common mistakes

- **Mixing embedding models.** Vectors from different models aren't comparable. If you switch models, re-embed everything.
- **Poor chunking.** Embedding whole documents blurs meaning; tiny fragments lose context.
- **Skipping evaluation.** Measure recall on real queries before and after tuning.
- **Ignoring permissions.** Filter by user access in the query itself, not after.

## Frequently asked questions

### What is a vector database used for?

Vector databases power semantic search, retrieval-augmented generation (RAG), recommendations, duplicate detection and image or audio similarity search.

### What is the difference between a vector database and a regular database?

A regular database finds exact matches on values. A vector database finds items whose embeddings are most similar to a query embedding, which enables search by meaning.

### Is pgvector good enough for production?

For many applications, yes. pgvector supports HNSW indexes and SQL filtering, and works well into the millions of vectors. Dedicated vector databases help at very large scale or with specialised needs.

### What is HNSW?

HNSW (Hierarchical Navigable Small World) is a graph-based approximate nearest-neighbour index that finds similar vectors quickly by navigating layered graphs of connected points.
