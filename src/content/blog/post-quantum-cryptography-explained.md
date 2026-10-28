---
title: Post-Quantum Cryptography Explained — ML-KEM, ML-DSA and What Developers Should Do Now
description: Quantum computers threaten RSA and elliptic-curve cryptography. Learn what NIST's post-quantum standards are, why "harvest now, decrypt later" matters, and how to prepare.
date: 2026-10-28
tags: Security
keywords: post-quantum cryptography, PQC, ML-KEM, Kyber, ML-DSA, Dilithium, NIST FIPS 203, quantum safe, harvest now decrypt later
---

> **TL;DR** — A large enough quantum computer could break RSA and elliptic-curve cryptography, which protect almost all internet traffic today. In August 2024, NIST published the first post-quantum standards: **ML-KEM** for key exchange and **ML-DSA** and **SLH-DSA** for signatures. Browsers already use hybrid post-quantum key exchange. Developers should inventory their crypto and plan to migrate.

## Why quantum computers threaten today's encryption

Modern public-key cryptography rests on maths problems that are extremely hard for classical computers:

- **RSA** relies on the difficulty of factoring large numbers.
- **Elliptic-curve cryptography (ECC)** — used in ECDH and ECDSA — relies on the discrete logarithm problem.

In 1994, Peter Shor described a quantum algorithm that solves both efficiently. A sufficiently large, error-corrected quantum computer running **Shor's algorithm** would break RSA and ECC completely.

No such machine exists yet, and estimates of when one might arrive vary widely. But that doesn't mean there's time to wait.

## "Harvest now, decrypt later"

An attacker can record encrypted traffic **today** and store it until a quantum computer is available. Anything that must stay secret for 10–20 years — health records, government data, trade secrets, financial data — is already at risk.

That's why the migration has started now, years before a quantum computer exists.

## What about symmetric encryption?

Symmetric algorithms like **AES** and hash functions like **SHA-256** are much less affected. Grover's algorithm gives a quantum computer at most a square-root speed-up against them, which is countered by using larger keys. **AES-256** is considered safe. The urgent problem is public-key cryptography.

## NIST's post-quantum standards

After an eight-year public competition, NIST published three standards in August 2024:

| Standard | Algorithm | Based on | Use |
|---|---|---|---|
| **FIPS 203** | **ML-KEM** (formerly CRYSTALS-Kyber) | Module lattices | Key encapsulation (key exchange) |
| **FIPS 204** | **ML-DSA** (formerly CRYSTALS-Dilithium) | Module lattices | Digital signatures |
| **FIPS 205** | **SLH-DSA** (formerly SPHINCS+) | Hash functions | Digital signatures (conservative backup) |

A further signature standard based on **FN-DSA** (formerly FALCON) is in development, and in March 2025 NIST selected **HQC** as a backup key-encapsulation algorithm based on different maths, in case lattice schemes are ever weakened.

## Hybrid key exchange: already in your browser

Because post-quantum algorithms are new, the industry is deploying them in **hybrid** mode: combining a classical algorithm (X25519) with ML-KEM. An attacker would need to break *both*.

Chrome, Edge and Firefox support the hybrid `X25519MLKEM768` key exchange in TLS 1.3, and major CDNs including Cloudflare support it on the server side. A large and growing share of HTTPS traffic is already protected against harvest-now-decrypt-later attacks. Apple's iMessage (PQ3) and Signal (PQXDH) have adopted post-quantum protections too.

## The trade-offs

Post-quantum algorithms are fast, but their keys and signatures are bigger:

- An ML-KEM-768 public key is about **1.2 KB**, compared with **32 bytes** for X25519.
- An ML-DSA signature is around **2.4–4.6 KB**, compared with **64 bytes** for Ed25519.

This mostly matters for constrained devices, protocols with tight packet sizes and certificate chains with many signatures.

## Migration timeline

Governments have set expectations. NIST's draft transition guidance proposes **deprecating** quantum-vulnerable algorithms like RSA and ECC around **2030** and **disallowing** them by **2035**. Similar timelines have been set by security agencies in other countries.

## What developers should do now

1. **Inventory your cryptography.** Where do you use RSA, ECDSA, ECDH? TLS, JWT signing, SSH keys, code signing, database encryption, third-party SDKs.
2. **Prioritise long-lived secrets** — data that must stay confidential for many years.
3. **Build crypto-agility.** Avoid hard-coding algorithms; make them configurable so you can switch without rewriting systems.
4. **Keep libraries and runtimes updated.** OpenSSL 3.5, BoringSSL, Go, Java and other platforms have been adding ML-KEM and ML-DSA support.
5. **Enable hybrid TLS** on servers and load balancers as your stack supports it.
6. **Don't roll your own.** Use standardised algorithms from well-reviewed libraries.

## Frequently asked questions

### What is post-quantum cryptography?

Post-quantum cryptography refers to cryptographic algorithms designed to stay secure against attacks by both classical and quantum computers, unlike RSA and elliptic-curve cryptography.

### What is ML-KEM?

ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism), standardised by NIST as FIPS 203, is a post-quantum algorithm for securely establishing shared keys. It was formerly called CRYSTALS-Kyber.

### Is AES safe against quantum computers?

AES-256 is considered safe. Quantum algorithms give only a limited speed-up against symmetric encryption, which larger key sizes offset.

### When will quantum computers break RSA?

No one knows exactly. No current quantum computer can, and expert estimates range from about a decade to much longer. Because of "harvest now, decrypt later" attacks, migration is starting now.
