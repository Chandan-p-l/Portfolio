---
title: What Is the Model Context Protocol (MCP)? A Developer's Guide
description: MCP is the open standard that lets AI assistants connect to tools, files and APIs. Here is how hosts, clients and servers fit together, and how to build your first MCP server.
date: 2026-10-28
tags: AI, Developer Tools
keywords: model context protocol, MCP server, MCP explained, AI tools integration, JSON-RPC, AI agents
featured: true
---

> **TL;DR** — The Model Context Protocol (MCP) is an open standard for connecting AI applications to external tools and data. Instead of writing a custom integration for every model and every app, you write one MCP server and any MCP-compatible assistant can use it. Think of it as "USB-C for AI".

## The problem MCP solves

Large language models are good at reasoning over text, but on their own they can't read your database, open a GitHub issue or check today's orders. Before MCP, every AI product solved this with its own plugin format. If you had 5 AI apps and 10 tools, you were looking at up to 50 bespoke integrations — the classic **M × N problem**.

MCP turns that into **M + N**. Each AI app implements the protocol once as a client, each tool implements it once as a server, and they all interoperate.

Anthropic introduced MCP as an open specification in November 2024. Through 2025 it was adopted across the industry — by OpenAI, Google, Microsoft and most major IDEs and agent frameworks — and the project moved to neutral, foundation-backed governance at the Linux Foundation, so no single vendor owns it.

## The architecture: hosts, clients and servers

MCP has three roles:

- **Host** — the AI application the user interacts with, such as a chat app, an IDE or a coding agent.
- **Client** — a connector inside the host. Each client keeps a one-to-one connection with a single server.
- **Server** — a small program that exposes capabilities: a GitHub server, a Postgres server, a filesystem server, your company's internal API.

All messages are **JSON-RPC 2.0**. Two standard transports carry them:

1. **stdio** — the host launches the server as a local subprocess and talks over standard input/output. This is ideal for local tools like a filesystem or a git repository.
2. **Streamable HTTP** — the server runs remotely and the client talks to it over HTTP, with optional server-sent events for streaming. This is how hosted, multi-user MCP servers work, usually with OAuth for authorization.

## The three core primitives

An MCP server can offer three kinds of things:

| Primitive | Controlled by | Example |
|---|---|---|
| **Tools** | The model | `create_issue`, `run_sql_query`, `send_email` |
| **Resources** | The application | A file's contents, a database schema, a log |
| **Prompts** | The user | A reusable "review this pull request" template |

**Tools** are the headline feature. Each tool has a name, a description and a JSON Schema for its inputs. The model reads the descriptions, decides when a tool is useful, and the host executes the call, usually after asking the user to approve it.

Clients can offer capabilities back to servers too. **Sampling**, for example, lets a server ask the host's model to generate text, and **elicitation** lets a server ask the user for missing information mid-task.

## What a tool call looks like

When the model decides to use a tool, the client sends a request like this:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "get_order_status",
    "arguments": { "orderId": "WH-10293" }
  }
}
```

The server does the real work — queries a database, calls an API — and returns content the model can read:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "result": {
    "content": [{ "type": "text", "text": "Order WH-10293: shipped, arriving Thursday." }]
  }
}
```

## Building a minimal MCP server

Official SDKs exist for TypeScript, Python, Java, Kotlin, C#, Go, Rust and more. A minimal TypeScript server looks like this:

```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({ name: 'orders', version: '1.0.0' });

server.tool(
  'get_order_status',
  'Look up the shipping status of an order by its ID',
  { orderId: z.string() },
  async ({ orderId }) => ({
    content: [{ type: 'text', text: await lookupStatus(orderId) }],
  }),
);

await server.connect(new StdioServerTransport());
```

Register it in your AI app's MCP configuration and the assistant can now answer "where is order WH-10293?" by itself.

## Best practices for production MCP servers

- **Write tool descriptions for the model, not for humans.** Say when to use the tool, what each argument means and what it returns. Vague descriptions are the number-one cause of tools being misused or ignored.
- **Keep tools few and focused.** Ten sharp tools beat fifty overlapping ones. Every tool you add costs context and makes selection harder.
- **Return concise, structured results.** Don't dump a 5 MB API response into the context window. Summarise, paginate and include IDs the model can use in follow-up calls.
- **Treat every input as untrusted.** Validate arguments, use least-privilege credentials, and require human confirmation for destructive actions such as deleting data or sending money.
- **Beware of prompt injection.** Content a tool returns — a web page, an email, an issue comment — may contain instructions aimed at the model. Never let tool output silently trigger other high-impact tools.

## Why MCP matters for developers

MCP is quickly becoming the default way to make software "AI-ready". If you build a SaaS product, shipping an MCP server lets every major assistant work with your product without you building separate integrations for each one. If you build internal tools, MCP lets your team's AI assistants safely reach your systems.

And because the protocol is open, the work you put into a server isn't tied to a single vendor's roadmap.

## Frequently asked questions

### Is MCP only for Claude?

No. Anthropic created MCP, but it is an open standard implemented by many AI apps, IDEs and agent frameworks from different companies.

### What is the difference between MCP and function calling?

Function calling is a model capability: the model emits a structured request to call a function. MCP is a protocol that standardises how those functions are discovered, described and executed across applications, so one server works with many hosts.

### Is MCP secure?

The protocol supports OAuth-based authorization for remote servers, but security depends on implementation. Use least-privilege credentials, validate inputs, require user approval for sensitive actions and defend against prompt injection in tool results.

### Which languages can I build MCP servers in?

Official SDKs exist for TypeScript, Python, Java, Kotlin, C#, Go, Rust, Swift, Ruby and PHP, and the protocol itself is language-agnostic JSON-RPC.
