---
title: WebGPU Explained — Modern GPU Graphics and Compute in the Browser
description: WebGPU is the successor to WebGL, now shipping in all major browsers. Learn what it is, how it differs from WebGL, how compute shaders work and why it matters for AI on the web.
date: 2026-10-28
tags: Web Platform, Performance
keywords: WebGPU, WebGPU vs WebGL, WGSL, compute shaders, GPU in browser, WebGPU tutorial, browser AI
---

> **TL;DR** — WebGPU is a modern web API that gives JavaScript direct, efficient access to the GPU for both **graphics** and general-purpose **compute**. It replaces WebGL's 2000s-era design with one modelled on Vulkan, Metal and Direct3D 12, and it's what makes running AI models and serious 3D in the browser practical.

## Why the web needed a new GPU API

WebGL, released in 2011, is based on OpenGL ES — a design from a time before modern GPU architectures. It has no real support for general computation, has high per-draw-call overhead, and relies on a global state machine that's easy to get wrong.

Native platforms moved on to **Vulkan**, **Metal** and **Direct3D 12** long ago. WebGPU brings that modern model to the web in a safe, portable form.

## Browser support

- **Chrome and Edge** shipped WebGPU in version 113 (2023) on Windows, macOS and ChromeOS, later expanding to Android.
- **Safari** enabled it by default with Safari 26 in 2025.
- **Firefox** shipped it on Windows in version 141 (2025), with other platforms following.

Always feature-detect with `navigator.gpu`, and keep a fallback for older devices.

## WebGPU vs WebGL

| | WebGL 2 | WebGPU |
|---|---|---|
| Design basis | OpenGL ES 3.0 | Vulkan / Metal / D3D12 |
| Compute shaders | No | **Yes** |
| Shader language | GLSL | **WGSL** |
| State model | Global state machine | Explicit pipelines and bind groups |
| CPU overhead | High | Low — work is recorded into command buffers |
| Error handling | Silent, polled | Validation with clear messages |

## The core concepts

1. **Adapter and device** — you request an adapter (a physical GPU) and then a logical device to issue commands.
2. **Buffers and textures** — GPU memory for your data and images.
3. **Shaders** — programs written in **WGSL** (WebGPU Shading Language) that run on the GPU.
4. **Pipelines** — pre-compiled combinations of shaders and state. Compiling them up front is a big reason WebGPU is faster.
5. **Bind groups** — bundles of resources (buffers, textures) passed to shaders.
6. **Command encoders and queues** — you record work into a command buffer and submit it to the GPU in one go.

## A first compute shader

This doubles every number in an array on the GPU:

```js
const adapter = await navigator.gpu?.requestAdapter();
if (!adapter) throw new Error('WebGPU not supported');
const device = await adapter.requestDevice();

const module = device.createShaderModule({
  code: /* wgsl */ `
    @group(0) @binding(0) var<storage, read_write> data: array<f32>;

    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) id: vec3<u32>) {
      if (id.x < arrayLength(&data)) {
        data[id.x] = data[id.x] * 2.0;
      }
    }`,
});

const pipeline = device.createComputePipeline({
  layout: 'auto',
  compute: { module, entryPoint: 'main' },
});
```

From here you create a storage buffer, bind it, dispatch `Math.ceil(n / 64)` workgroups and copy the result back to read it. That's verbose for doubling numbers — but the same pattern runs matrix multiplications across thousands of GPU threads at once.

## What WebGPU unlocks

### AI in the browser

Neural networks are mostly matrix multiplication — exactly what compute shaders excel at. Libraries such as **Transformers.js**, **ONNX Runtime Web**, **TensorFlow.js** and **WebLLM** use WebGPU to run speech recognition, image models and small language models fully client-side: private, offline and free to serve.

### High-end 3D

Engines including **Three.js** (with its WebGPU renderer), **Babylon.js** and **PlayCanvas** support WebGPU for more objects, better lighting and lower CPU cost.

### Data visualisation and simulation

Millions of points in a scatter plot, particle systems, physics and fluid simulations, and image and video processing all benefit from GPU compute.

## Things to know before you adopt it

- **Use a library** unless you need low-level control. Three.js or Babylon.js handle most of the boilerplate.
- **Feature-detect and fall back** to WebGL or CPU paths.
- **Respect battery and thermals**, especially on phones.
- **Limits vary by device** — check `adapter.limits` for buffer sizes and workgroup limits.

## Frequently asked questions

### What is WebGPU?

WebGPU is a web standard API that gives web applications efficient access to the GPU for graphics rendering and general-purpose computation, designed as the successor to WebGL.

### Is WebGPU supported in all browsers?

WebGPU ships in Chrome, Edge and Safari, and in Firefox on Windows, with support expanding to more platforms. Always feature-detect and provide a fallback.

### Is WebGPU faster than WebGL?

Usually, yes. WebGPU has lower CPU overhead, pre-compiled pipelines and compute shaders, which allow workloads WebGL can't handle efficiently.

### What is WGSL?

WGSL (WebGPU Shading Language) is the shader programming language used by WebGPU, with a Rust-like syntax.
