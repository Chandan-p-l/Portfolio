---
title: Local-First Software and CRDTs — Apps That Work Offline and Sync Like Magic
description: Local-first apps keep data on your device and sync in the background. How CRDTs make conflict-free collaboration possible, plus tools like Automerge, Yjs and sync engines.
date: 2026-10-28
tags: Databases, Architecture
keywords: local-first software, CRDT, offline-first, Automerge, Yjs, sync engine, real-time collaboration, conflict-free replicated data types
---

> **TL;DR** — Local-first software stores your data on your device first and syncs it to other devices and the cloud in the background. The app is instant, works offline and still supports real-time collaboration. **CRDTs** (conflict-free replicated data types) are the data structures that let many people edit the same data at once without conflicts.

## The problem with cloud-only apps

Most web apps treat the server as the only source of truth. Every click waits for a network round trip, a spinner appears on a slow connection, and with no connection, the app stops working. If the company shuts down, your data can disappear with it.

In 2019, the research lab Ink & Switch published an influential essay, *"Local-first software: You own your data, in spite of the cloud"*, describing a better model.

## The seven ideals of local-first

The essay proposed that good software should offer:

1. **No spinners** — it's fast because data is local.
2. **Your work isn't trapped on one device** — it syncs everywhere.
3. **The network is optional** — it works fully offline.
4. **Seamless collaboration** with others.
5. **Longevity** — your data outlives the service.
6. **Privacy and security** by default.
7. **You retain ownership and control** of your data.

## The hard part: merging concurrent edits

Imagine two people editing a shared to-do list while offline. One renames an item; the other ticks it as done. When they reconnect, whose version wins?

Simple strategies like "last write wins" silently lose data. Locking makes offline work impossible. **CRDTs** solve this mathematically.

## What is a CRDT?

A **conflict-free replicated data type** is a data structure designed so that:

- Every device can update its own copy **independently**, without coordination.
- Devices exchange changes in **any order**, any number of times.
- All copies are **guaranteed to converge** to the same state once they've seen the same changes.

### A simple example: a counter

A naive shared counter breaks if two devices each read "5" and write "6". A **G-Counter** CRDT instead keeps one slot per device:

```
Device A: { A: 3, B: 2 }   → total 5
Device B: { A: 3, B: 2 }

A increments → { A: 4, B: 2 }
B increments → { A: 3, B: 3 }

Merge = take the max of each slot → { A: 4, B: 3 } → total 7 ✓
```

### Text editing

Collaborative text is harder: insertions at the same position must be ordered identically everywhere. Text CRDTs give each character a unique, ordered identifier, so concurrent inserts and deletes always merge the same way — which is what powers real-time collaborative editors.

## CRDTs vs operational transformation

Google Docs popularised **operational transformation (OT)**, which relies on a central server to transform and order operations. CRDTs don't need a central authority, which makes them better suited to offline and peer-to-peer use. Modern CRDT implementations have become efficient enough for large documents.

## Tools you can use today

- **Yjs** — a fast, widely used CRDT library for JavaScript, with integrations for editors such as ProseMirror, TipTap, CodeMirror, Monaco and Quill.
- **Automerge** — a CRDT library from Ink & Switch with a JSON-like data model, written in Rust with JavaScript bindings.
- **Loro** — a newer, high-performance CRDT library written in Rust.
- **Sync engines** such as ElectricSQL, PowerSync, Zero, Replicache and Triplit, which sync a local database (often SQLite or IndexedDB) with a server database like Postgres.

## The browser is ready

Local-first web apps have become far more practical thanks to:

- **SQLite compiled to WebAssembly**, running in the browser.
- **The Origin Private File System (OPFS)**, which gives web apps fast, persistent storage.
- **Service workers** for offline loading.

## Trade-offs

- **Authorisation is harder.** When every client holds data, you must decide carefully what each user receives and can change.
- **Schema migrations** must handle old clients that come online months later.
- **Storage growth** — CRDTs keep history, which needs compaction.
- **Not every conflict is technical.** CRDTs guarantee convergence, not that the merged result makes sense to humans. Some apps still need UI to resolve meaningful conflicts.

## When to go local-first

Great fits: note-taking, documents, design tools, task managers, field-work apps and anything used on unreliable networks. Poor fits: systems that need a single authoritative order of events — like payments, ticket booking or inventory — where a central server must decide.

## Frequently asked questions

### What is local-first software?

Local-first software stores data primarily on the user's device and syncs it in the background with other devices and servers, so the app is fast, works offline and supports collaboration.

### What is a CRDT?

A CRDT (conflict-free replicated data type) is a data structure that can be edited independently on multiple devices and is guaranteed to merge into the same state on all of them, without conflicts.

### What is the difference between offline-first and local-first?

Offline-first apps work without a connection but often treat the server as the true source of data. Local-first goes further: the local copy is primary, and the user keeps ownership and control of their data.

### Is Yjs or Automerge better?

Both are mature. Yjs is extremely fast and has many editor integrations; Automerge offers a JSON-like document model and a strong focus on history. Choose based on your data model and integrations.
