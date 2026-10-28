---
title: HTTP/3 and QUIC Explained — Why the Web Moved to UDP
description: HTTP/3 runs on QUIC, a new transport protocol built on UDP. Learn how it removes head-of-line blocking, speeds up connections with 0-RTT and survives network changes on mobile.
date: 2026-10-28
tags: Networking, Performance
keywords: HTTP/3, QUIC, HTTP/3 vs HTTP/2, UDP, head-of-line blocking, 0-RTT, connection migration, web performance
---

> **TL;DR** — HTTP/3 is the latest version of HTTP. Instead of TCP, it runs on **QUIC**, a transport protocol built on UDP with encryption built in. It connects faster, stops one lost packet from stalling every request, and keeps connections alive when your phone switches from Wi-Fi to mobile data.

## A short history of HTTP

- **HTTP/1.1 (1997)** — one request at a time per connection. Browsers opened about six connections per site to compensate.
- **HTTP/2 (2015)** — many requests **multiplexed** over one TCP connection, with header compression. Much more efficient.
- **HTTP/3 (2022)** — the same ideas as HTTP/2, but over **QUIC** instead of TCP. QUIC was standardised as RFC 9000 in 2021 and HTTP/3 as RFC 9114 in 2022.

## The problem with TCP

HTTP/2 fixed head-of-line blocking at the HTTP layer but not at the transport layer. TCP guarantees that bytes arrive **in order**. If one packet is lost, every stream on that connection waits until it is retransmitted — even streams whose data has already arrived.

On a clean fibre connection that's rarely noticeable. On a congested mobile network with 1–2% packet loss, it can make HTTP/2 slower than opening several HTTP/1.1 connections.

TCP is also built into operating system kernels and network hardware, which makes it extremely hard to change. That's why the fix had to be a new protocol on top of UDP.

## What QUIC does differently

### 1. Independent streams

QUIC knows about streams. A lost packet only delays **the stream it belongs to**; other requests carry on. That ends transport-level head-of-line blocking.

### 2. Faster connection set-up

With TCP + TLS 1.3, a new connection needs a TCP handshake and then a TLS handshake. QUIC **combines transport and encryption handshakes**, so a new connection is ready in **one round trip**.

For servers you've visited before, QUIC supports **0-RTT resumption**: the client can send its first request immediately along with the handshake. (0-RTT data can be replayed by an attacker, so servers should only accept it for safe, idempotent requests like GETs.)

### 3. Encryption is mandatory

QUIC uses TLS 1.3 inside the protocol. Almost everything, including most transport metadata, is encrypted. This improves privacy and stops middleboxes from interfering with the protocol, which is what froze TCP in place.

### 4. Connection migration

A TCP connection is identified by IP addresses and ports. Switch from Wi-Fi to 4G and the connection breaks. QUIC identifies connections with **connection IDs**, so a download or video call can **survive a network change** without starting over.

### 5. Evolves in user space

QUIC is implemented in applications and libraries rather than the kernel, so improvements such as better congestion control can ship with a browser or server update.

## HTTP/2 vs HTTP/3

| | HTTP/2 | HTTP/3 |
|---|---|---|
| Transport | TCP | QUIC over UDP |
| Encryption | TLS (in practice always) | TLS 1.3 built in |
| Handshake | TCP + TLS | Combined, 1-RTT (0-RTT on resume) |
| Head-of-line blocking | At the TCP layer | Eliminated between streams |
| Survives network change | No | Yes |
| Header compression | HPACK | QPACK |

## Who uses HTTP/3?

All major browsers support HTTP/3. Large platforms — Google, Meta, Cloudflare, Akamai, Fastly and others — serve a large share of their traffic over it. Servers and proxies such as **Nginx**, **Caddy**, **HAProxy**, **LiteSpeed** and **Envoy** support it, and most CDNs let you switch it on with a single setting.

Browsers discover HTTP/3 through the `Alt-Svc` response header, or through **HTTPS DNS records**, and fall back to HTTP/2 if UDP is blocked.

## Should you enable HTTP/3?

For most sites, yes — especially if many visitors are on mobile networks. The easiest route is to enable it on your CDN. If you run your own servers:

- Open **UDP port 443** in your firewall.
- Enable HTTP/3 in your server or proxy config, and advertise it with `Alt-Svc`.
- Keep HTTP/2 enabled as a fallback.
- Watch CPU use — QUIC's user-space encryption costs more than kernel TCP, although implementations keep improving.

## Frequently asked questions

### What is HTTP/3?

HTTP/3 is the third major version of the HTTP protocol. It runs over QUIC, a UDP-based transport, instead of TCP, providing faster connections and better performance on unreliable networks.

### Is HTTP/3 faster than HTTP/2?

Usually yes, especially on mobile and lossy networks, thanks to faster handshakes, no transport-level head-of-line blocking and connection migration. On perfect networks the difference is small.

### Why does QUIC use UDP?

TCP is built into operating systems and network equipment and is very hard to change. Building on UDP let QUIC implement new transport features in user space and deploy them quickly.

### Is HTTP/3 secure?

Yes. QUIC requires TLS 1.3 encryption and encrypts most of its own transport metadata too.
