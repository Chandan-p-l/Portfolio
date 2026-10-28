---
title: eBPF Explained — Safely Programming the Linux Kernel
description: eBPF lets you run sandboxed programs inside the Linux kernel without changing kernel code. How it works, the verifier, maps and why it powers modern observability, networking and security tools.
date: 2026-10-28
tags: Linux, Cloud
keywords: eBPF, Linux kernel, eBPF verifier, Cilium, bpftrace, XDP, kernel observability, cloud native networking
---

> **TL;DR** — eBPF lets you load small, verified programs into the Linux kernel and attach them to events: system calls, network packets, function calls. Because a verifier proves each program is safe before it runs, you get kernel-level visibility and speed without writing kernel modules or rebooting. It's the engine behind tools like Cilium, Falco and bpftrace.

## Why the kernel is hard to change

The Linux kernel sees everything: every process, file access, network packet and system call. That makes it the perfect place for observability, networking and security tools.

But changing the kernel is hard. Getting a feature merged takes years to reach production systems. **Kernel modules** can be loaded quickly, but a bug in one can crash the whole machine or open a security hole.

## What eBPF is

**eBPF** (extended Berkeley Packet Filter) grew out of the classic BPF packet filter used by `tcpdump`. It became a general-purpose, in-kernel virtual machine:

1. You write a small program, usually in restricted C or Rust.
2. It's compiled to **eBPF bytecode**.
3. The kernel's **verifier** checks it is safe.
4. A **JIT compiler** turns it into native machine code.
5. It's attached to a **hook** and runs every time that event fires.

## The verifier: why eBPF is safe

Before any program runs, the verifier statically analyses every possible path through it and rejects programs that could:

- Access memory out of bounds or dereference invalid pointers.
- Loop forever — programs must be proven to terminate.
- Use uninitialised data or call functions they're not allowed to.

If the verifier accepts a program, it can't crash the kernel. That's the key difference from kernel modules.

## Hooks: where programs attach

- **kprobes / uprobes** — any kernel or user-space function.
- **Tracepoints** — stable, predefined kernel events.
- **System calls** — every `open`, `connect`, `execve`.
- **XDP (eXpress Data Path)** — network packets at the driver, before the kernel networking stack. Ideal for DDoS mitigation and load balancing at very high packet rates.
- **Traffic control (tc)** — packets entering and leaving network interfaces.
- **LSM hooks** — security decisions such as "can this process open this file?"
- **cgroups and sockets** — per-container networking and policy.

## Maps: sharing data

eBPF programs store and share data in **maps** — hash tables, arrays, ring buffers and more. Maps let programs keep state between events and pass data to user-space tools that display or act on it.

## What people build with eBPF

### Observability

See what's happening in production with negligible overhead: latency per system call, which process opened which file, slow disk I/O and TCP retransmits. A taste with **bpftrace**:

```bash
# Count system calls by process name, live
sudo bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); }'
```

Tools like **Pixie**, Grafana's **Beyla** and OpenTelemetry's eBPF instrumentation collect metrics and traces **without changing application code**.

### Networking

**Cilium** uses eBPF for Kubernetes networking, load balancing and network policy, replacing large `iptables` rule sets with efficient in-kernel programs. Large companies use XDP-based load balancers to handle huge traffic volumes on commodity servers.

### Security

**Falco** and **Tetragon** watch system calls and kernel events in real time to detect suspicious behaviour, such as a container spawning a shell or reading `/etc/shadow`, and can block it.

### Performance profiling

Continuous profilers use eBPF to sample stack traces across all processes, showing where CPU time goes in production with minimal overhead.

## Beyond Linux

eBPF is spreading. Microsoft develops **eBPF for Windows**, and the eBPF Foundation, part of the Linux Foundation, coordinates the ecosystem.

## Limitations

- **Programs are restricted** — limited complexity, bounded loops and a constrained set of helper functions.
- **Kernel version differences** — features depend on kernel version. **CO-RE** ("compile once, run everywhere") with BTF type information greatly reduces this pain.
- **Privileges** — loading most eBPF programs requires elevated privileges, and eBPF tooling must be treated as highly sensitive.
- **Learning curve** — writing raw eBPF is hard; start with higher-level tools.

## Getting started

1. Try **bpftrace** one-liners and the **BCC** tools (`execsnoop`, `opensnoop`, `tcplife`).
2. Read Brendan Gregg's work on BPF performance tools.
3. Build programs with **libbpf** (C), **Aya** (Rust) or **cilium/ebpf** (Go).

## Frequently asked questions

### What is eBPF used for?

eBPF is used for observability, high-performance networking, load balancing, security monitoring and profiling, by running safe, sandboxed programs inside the Linux kernel.

### Is eBPF safe?

eBPF programs are checked by the kernel's verifier, which ensures they can't crash the kernel or access invalid memory. However, loading them requires privileges, so access must be tightly controlled.

### What is XDP in eBPF?

XDP (eXpress Data Path) is an eBPF hook that processes network packets at the earliest point in the driver, enabling very fast packet filtering, forwarding and DDoS protection.

### Do I need to write C to use eBPF?

No. You can use high-level tools such as bpftrace, or write eBPF programs in Rust with Aya and load them from Go, Python or Rust libraries.
