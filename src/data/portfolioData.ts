import type { Project, TechItem, BuildStep, TechArticle } from '../types';

import { SITE } from '../site';
import { PROJECTS as WORK } from './work';

export const CHANDAN_INFO = {
  name: 'CHANDAN PAL',
  role: 'DEVELOPER × CTO × PRODUCT BUILDER',
  location: `${SITE.location.city.toUpperCase()}, INDIA / ${SITE.location.lat}° N, ${SITE.location.lng}° E`,
  status: 'OPEN TO ROLES & COLLABORATION',
  email: SITE.email,
  github: SITE.socials.github,
  linkedin: SITE.socials.linkedin,
  instagram: SITE.socials.instagram,
  philosophy: 'I build products people actually use.',
  year: '2026',
};

// The cinematic UI reads this shape; the content itself lives in ./work.ts.
export const PROJECTS: Project[] = WORK.map((w, i) => ({
  id: w.slug,
  number: String(i + 1).padStart(2, '0'),
  title: w.name.toUpperCase(),
  subtitle: w.category.toUpperCase(),
  role: w.role.toUpperCase(),
  year: w.period.toUpperCase(),
  category: w.category.toUpperCase(),
  kind: w.kind,
  tagline: w.oneLiner,
  summary: w.summary,
  problem: w.story[0],
  solution: w.story.slice(1).join(' '),
  techStack: w.stack,
  features: w.highlights,
  deliverables: w.highlights,
  accentColor: w.accent,
  metricsPlaceholder: w.kind === 'Book' ? 'PUBLISHED' : 'LIVE IN PRODUCTION',
  proofStatus: w.kind === 'Book' ? `Available on ${SITE.book.publisher}.` : `Live at ${w.urlLabel}.`,
  liveUrl: w.url,
}));

export const TECH_STACK: TechItem[] = [
  // FRONTEND
  {
    name: 'React',
    category: 'FRONTEND',
    level: 'CORE',
    desc: 'Component lifecycle mastery, custom hooks, state synchronization, concurrent rendering, and performance profiling.',
    interactiveSnippet: 'const [state, setState] = useState(() => computeOptimalVirtualTree());',
    visualType: 'react'
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'FRONTEND',
    level: 'CORE',
    desc: 'Deep knowledge of the Event Loop, Microtasks, Memory Leaks, Closures, Prototypes, and Async/Await orchestration.',
    interactiveSnippet: 'queueMicrotask(() => processEventLoopTick());',
    visualType: 'generic'
  },
  {
    name: 'HTML5 & Semantic DOM',
    category: 'FRONTEND',
    level: 'CORE',
    desc: 'Accessible tree structures, SEO optimization, OpenGraph protocols, and native Web APIs.',
    interactiveSnippet: '<main id="app" role="region" aria-live="polite">',
    visualType: 'generic'
  },
  {
    name: 'CSS3 & Tailwind CSS',
    category: 'FRONTEND',
    level: 'CORE',
    desc: 'Mathematical typography scales, responsive container math, subgrid, clip-paths, and zero-runtime design tokens.',
    interactiveSnippet: '@layer utilities { .clip-brutalist { clip-path: polygon(...) } }',
    visualType: 'generic'
  },
  {
    name: 'Bootstrap',
    category: 'FRONTEND',
    level: 'SOLID',
    desc: 'Rapid grid structuring, responsive breakpoints, and legacy system refactoring.',
    interactiveSnippet: '<div class="row g-0 flex-nowrap overflow-auto">',
    visualType: 'generic'
  },

  // BACKEND
  {
    name: 'Node.js',
    category: 'BACKEND',
    level: 'CORE',
    desc: 'Non-blocking I/O, Buffer manipulation, Stream pipelines, Child processes, and Cluster workers.',
    interactiveSnippet: 'pipeline(readableStream, transformCompress, writableStream);',
    visualType: 'linux'
  },
  {
    name: 'Express.js',
    category: 'BACKEND',
    level: 'CORE',
    desc: 'RESTful API contracts, middleware chaining, rate limiting, request validation, and error boundaries.',
    interactiveSnippet: 'app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));',
    visualType: 'generic'
  },
  {
    name: 'PHP',
    category: 'BACKEND',
    level: 'SOLID',
    desc: 'Server-rendered workflows, legacy database connectors, and monolithic application patterns.',
    interactiveSnippet: '<?php echo json_encode(["status" => "dispatched"]); ?>',
    visualType: 'generic'
  },

  // DATABASE
  {
    name: 'MySQL',
    category: 'DATABASE',
    level: 'CORE',
    desc: 'Relational data modeling, foreign key constraints, indexing strategies, B-tree query execution plans, and transactions.',
    interactiveSnippet: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE status = "shipped";',
    visualType: 'database'
  },
  {
    name: 'MongoDB',
    category: 'DATABASE',
    level: 'CORE',
    desc: 'Document schema design, aggregation pipelines, replica sets, and flexible unstructured catalogs.',
    interactiveSnippet: 'db.products.aggregate([{ $match: { stock: { $gt: 0 } } }]);',
    visualType: 'database'
  },
  {
    name: 'Firebase Firestore',
    category: 'DATABASE',
    level: 'CORE',
    desc: 'Real-time synchronization, security rules, snapshot listeners, and serverless edge functions.',
    interactiveSnippet: 'onSnapshot(doc(db, "telemetry", id), (snap) => syncUI(snap.data()));',
    visualType: 'database'
  },
  {
    name: 'Supabase',
    category: 'DATABASE',
    level: 'CORE',
    desc: 'PostgreSQL with Row Level Security (RLS), auto-generated REST/GraphQL APIs, and realtime subscriptions.',
    interactiveSnippet: 'supabase.from("orders").select("*").eq("user_id", auth.uid());',
    visualType: 'database'
  },

  // INFRASTRUCTURE
  {
    name: 'Linux / Ubuntu',
    category: 'INFRASTRUCTURE',
    level: 'CORE',
    desc: 'Shell scripting, user privileges, systemd service management, cron jobs, and resource monitoring (htop/iostat).',
    interactiveSnippet: 'sudo systemctl restart nginx && pm2 logs --lines 50',
    visualType: 'linux'
  },
  {
    name: 'Nginx',
    category: 'INFRASTRUCTURE',
    level: 'CORE',
    desc: 'Reverse proxying, load balancing, upstream socket routing, gzip/brotli compression, and SSL certbot automation.',
    interactiveSnippet: 'proxy_pass http://localhost:3000; proxy_set_header Host $host;',
    visualType: 'nginx'
  },
  {
    name: 'PM2 & VPS',
    category: 'INFRASTRUCTURE',
    level: 'CORE',
    desc: 'Process management, zero-downtime reloads, cluster mode across multi-core CPUs, and memory watchdog scripts.',
    interactiveSnippet: 'pm2 start ecosystem.config.js -i max --watch',
    visualType: 'linux'
  },
  {
    name: 'Git & GitHub',
    category: 'INFRASTRUCTURE',
    level: 'CORE',
    desc: 'Branching models, atomic commits, interactive rebasing, merge conflict resolution, and CI/CD GitHub Actions.',
    interactiveSnippet: 'git rebase -i HEAD~4 --autosquash',
    visualType: 'git'
  },

  // PRODUCT
  {
    name: 'UI/UX & Figma',
    category: 'PRODUCT',
    level: 'CORE',
    desc: 'Design systems, auto-layout mastery, interactive prototyping, micro-interactions, and visual tokens handoff.',
    interactiveSnippet: 'DesignToken: --spacing-baseline: 8px; --radius-outer: 0px;',
    visualType: 'design'
  },
  {
    name: 'Product Design & Branding',
    category: 'PRODUCT',
    level: 'CORE',
    desc: 'User journey mapping, wireframing, positioning strategy, typography curation, and packaging layout.',
    interactiveSnippet: 'UserJourney: Discover -> Hook -> Frictionless Value -> Retention',
    visualType: 'design'
  },

  // EXPLORING
  {
    name: 'Algorithms & Data Systems',
    category: 'EXPLORING',
    level: 'EXPLORING',
    desc: 'High-throughput algorithms, stream processing pipelines, memory optimization, and data structures.',
    interactiveSnippet: 'pipeline.process({ data: stream, strategy: "parallel" });',
    visualType: 'generic'
  },
  {
    name: 'System Design & Automation',
    category: 'EXPLORING',
    level: 'EXPLORING',
    desc: 'High-availability architectures, message queues, webhook resilience, caching strategies, and event sourcing.',
    interactiveSnippet: 'EventQueue -> WorkerPool -> IdempotentSink -> AuditLog',
    visualType: 'generic'
  }
];

export const BUILD_STEPS: BuildStep[] = [
  {
    number: '01',
    title: 'FIND THE PROBLEM',
    subtitle: 'OBSERVATION & FRICTION DISCOVERY',
    description: 'Look for what is broken, slow, frustrating, or neglected in real life. Great products never start with code; they start with genuine human friction.',
    mindset: 'Ruthless curiosity & empathy.',
    keyQuestion: 'What sucks right now that shouldn\'t?'
  },
  {
    number: '02',
    title: 'UNDERSTAND IT',
    subtitle: 'FIRST PRINCIPLES BREAKDOWN',
    description: 'Dissect the root cause down to its atomic mechanics. Ignore existing solutions and analyze why previous attempts failed or became bloated.',
    mindset: 'First principles analysis.',
    keyQuestion: 'What are the immutable constraints?'
  },
  {
    number: '03',
    title: 'DESIGN IT',
    subtitle: 'EXPERIENCE & ARCHITECTURE DRAFT',
    description: 'Draft the visual and technical skeleton simultaneously. How does the user touch it? How does data flow? If the UX is unintuitive, the code doesn\'t matter.',
    mindset: 'Form follows function & emotion.',
    keyQuestion: 'How does this feel in the first 5 seconds?'
  },
  {
    number: '04',
    title: 'BUILD IT',
    subtitle: 'RAPID HIGH-FIDELITY IMPLEMENTATION',
    description: 'Write the cleanest, most focused code to bring the concept to life. Build working vertical slices rather than endless unfinished horizontal layers.',
    mindset: 'Relentless forward momentum.',
    keyQuestion: 'Is the core loop functioning today?'
  },
  {
    number: '05',
    title: 'BREAK IT',
    subtitle: 'CHAOS & STRESS TESTING',
    description: 'Throw edge cases, bad inputs, network latency, and frantic clicks at the system. Identify where the architecture buckles before real users do.',
    mindset: 'Adversarial skepticism.',
    keyQuestion: 'How does it fail, and does it fail gracefully?'
  },
  {
    number: '06',
    title: 'FIX IT',
    subtitle: 'HARDENING & REFINEMENT',
    description: 'Eliminate race conditions, optimize database queries, squash layout shifts, and add defensive error boundaries until the system feels rock-solid.',
    mindset: 'Surgical precision.',
    keyQuestion: 'Is every error caught and communicated?'
  },
  {
    number: '07',
    title: 'SHIP IT',
    subtitle: 'PRODUCTION LAUNCH & DEPLOYMENT',
    description: 'Point the DNS, configure reverse proxies, set up monitoring, and push to production. Launching is not the end—it is the moment reality begins.',
    mindset: 'Courage to expose work to the world.',
    keyQuestion: 'Is it live and accessible worldwide?'
  },
  {
    number: '08',
    title: 'IMPROVE IT',
    subtitle: 'ITERATION & PRODUCT EVOLUTION',
    description: 'Analyze real behavior, listen to feedback, strip away unnecessary fluff, and double down on the features that actually create magic.',
    mindset: 'Infinite iterative refinement.',
    keyQuestion: 'How do we make it 10x better tomorrow?'
  }
];

export const TECH_ARTICLES: TechArticle[] = [
  {
    id: 'google-login',
    number: '01',
    title: 'HOW GOOGLE LOGIN ACTUALLY WORKS',
    tag: 'AUTH / SECURITY',
    readTime: '3 MIN READ',
    summary: 'A visual breakdown of OAuth 2.0 PKCE, asymmetric crypto keys, JWT signature verification, and how identity tokens travel without leaking secrets.',
    keyInsight: 'Your app never sees the user\'s Google password. It receives a cryptographically signed JSON Web Token with public-key verifiable proofs.',
    steps: [
      { label: '01. AUTH REQUEST', detail: 'App redirects browser to accounts.google.com with Client ID, requested scopes, and a cryptographically generated state nonce.' },
      { label: '02. CONSENT & PROOF', detail: 'User approves permissions. Google validates credentials and redirects back to your callback URI with an authorization code.' },
      { label: '03. BACK-CHANNEL EXCHANGE', detail: 'Your backend securely exchanges the auth code with Google\'s token endpoint over HTTPS using mutual client secrets.' },
      { label: '04. JWT VERIFICATION', detail: 'Google returns an ID Token. Your server parses the payload and verifies its signature using Google\'s rotating public certificates (JWKS).' }
    ]
  },
  {
    id: 'url-lifecycle',
    number: '02',
    title: 'WHAT HAPPENS WHEN YOU ENTER A URL?',
    tag: 'NETWORKING / BROWSER',
    readTime: '4 MIN READ',
    summary: 'The millisecond journey from hitting Enter to pixels rendering on screen: DNS resolution, TCP handshakes, TLS encryption, and DOM parsing.',
    keyInsight: 'Before a single byte of HTML is rendered, your packet travels across transoceanic fiber cables and undergoes multiple cryptographic handshakes.',
    steps: [
      { label: '01. DNS LOOKUP', detail: 'Browser checks local cache -> router cache -> recursive resolver -> Root -> TLD -> Authoritative nameserver to resolve IP.' },
      { label: '02. TCP 3-WAY HANDSHAKE', detail: 'SYN -> SYN-ACK -> ACK establishes a reliable bidirectional byte stream over port 443.' },
      { label: '03. TLS 1.3 NEGOTIATION', detail: 'Client Hello with supported ciphers, server certificate verification, Diffie-Hellman key exchange for symmetric session encryption.' },
      { label: '04. DOM & COMPOSITING', detail: 'Browser receives raw HTML bytes -> Tokenizer -> DOM Tree -> CSSOM -> Render Tree -> Layout geometry -> Paint layers -> GPU Compositing.' }
    ]
  },
  {
    id: 'how-apis-work',
    number: '03',
    title: 'HOW APIS ACTUALLY WORK',
    tag: 'ARCHITECTURE',
    readTime: '3 MIN READ',
    summary: 'Understanding contract interfaces, HTTP verbs, serialization budgets, reverse proxies, and rate-limiting token buckets.',
    keyInsight: 'An API is not magic; it is an agreed-upon serialized protocol over TCP sockets that enforces security, contracts, and business rules.',
    steps: [
      { label: '01. HTTP REQUEST', detail: 'Client formats headers, authorization tokens, query params, and JSON payload over HTTP/2 or HTTP/3 multiplexed streams.' },
      { label: '02. GATEWAY / INGRESS', detail: 'Nginx/Envoy terminates TLS, checks IP rate limit buckets, validates CORS headers, and routes to upstream microservices.' },
      { label: '03. MIDDLEWARE PIPELINE', detail: 'Authentication token extraction, payload schema validation (e.g. Zod), sanitization, and request tracing IDs injected.' },
      { label: '04. EXECUTION & RESPONSE', detail: 'Controller executes business logic, queries database pools, constructs status code + payload, and streams back compressed JSON.' }
    ]
  },
  {
    id: 'how-databases-work',
    number: '04',
    title: 'HOW DATABASES WORK UNDER THE HOOD',
    tag: 'SYSTEMS / STORAGE',
    readTime: '4 MIN READ',
    summary: 'Storage engines, B+ Trees vs LSM Trees, Write-Ahead Logging (WAL), and how ACID guarantees prevent data corruption.',
    keyInsight: 'Disk I/O is the slowest operation in computing. Databases are essentially sophisticated caching and sorting machines built around page memory.',
    steps: [
      { label: '01. PARSING & PLANNING', detail: 'SQL query parsed into Abstract Syntax Tree -> Query Optimizer calculates table statistics and chooses the lowest-cost execution plan.' },
      { label: '02. BUFFER POOL CHECK', detail: 'Engine looks up target page in RAM Buffer Pool. If missing, page is paged in from disk into memory.' },
      { label: '03. WRITE-AHEAD LOG (WAL)', detail: 'Before writing to the actual table file, mutations are sequentially appended to an immutable disk log ensuring crash recovery.' },
      { label: '04. B+ TREE INDEX TRAVERSAL', detail: 'Root node -> Internal pointer nodes -> Leaf nodes containing primary keys and tuple row offsets in O(log N) operations.' }
    ]
  },
  {
    id: 'payment-lifecycle',
    number: '05',
    title: 'WHAT HAPPENS AFTER YOU CLICK "PAY"?',
    tag: 'FINTECH / INFRA',
    readTime: '4 MIN READ',
    summary: 'Credit card tokenization, PCI-DSS boundaries, payment gateway routing, idempotent webhooks, and ledger reconciliation.',
    keyInsight: 'Raw credit card numbers never touch merchant servers. An ephemeral cryptographic token is exchanged to guarantee PCI compliance.',
    steps: [
      { label: '01. CLIENT TOKENIZATION', detail: 'Browser sends sensitive card data directly to payment processor iframe -> receives ephemeral one-time payment token.' },
      { label: '02. SERVER CHARGE CREATION', detail: 'Your server calls processor API with token, amount, and an Idempotency-Key header to prevent duplicate charges on retry.' },
      { label: '03. BANKING NETWORK', detail: 'Gateway routes request -> Acquirer -> Card Network (Visa/Mastercard) -> Issuing Bank for 3DS challenge and fraud checks.' },
      { label: '04. ASYNC WEBHOOK DISPATCH', detail: 'Processor fires cryptographically signed webhook to your endpoint -> your server verifies signature, marks order paid, triggers warehouse fulfillment.' }
    ]
  },
  {
    id: 'code-to-production',
    number: '06',
    title: 'HOW WEBSITES GO FROM CODE TO PRODUCTION',
    tag: 'DEVOPS / CLOUD',
    readTime: '3 MIN READ',
    summary: 'From local git commit to worldwide edge distribution: tree-shaking, dockerization, zero-downtime rolling deploys, and CDN cache invalidation.',
    keyInsight: 'Modern deployment pipelines turn human-readable source code into optimized binary chunks distributed across hundreds of edge POPs in seconds.',
    steps: [
      { label: '01. COMPILATION & BUNDLING', detail: 'Vite/Esbuild parses dependency graph, tree-shakes dead code, minifies variables, and generates content-hashed assets.' },
      { label: '02. CONTAINERIZATION', detail: 'Docker build packages node runtime, dependencies, and compiled static assets into immutable lightweight image layers.' },
      { label: '03. ZERO-DOWNTIME SWAP', detail: 'PM2 or Kubernetes launches new container instance, runs health check probe, and atomically switches traffic proxy without dropping packets.' },
      { label: '04. EDGE CDN PROPAGATION', detail: 'Static chunks pushed to global CDN edge nodes worldwide for sub-20ms local latency to end visitors.' }
    ]
  }
];

export const CREATIVE_GALLERY = [
  {
    id: '01',
    title: 'WYTHER BRAND SYSTEM',
    category: 'BRANDING & PACKAGING',
    aspect: 'aspect-[4/5]',
    accent: '#FF2A2A',
    description: 'Brutalist typography hierarchy, monochrome packaging with tactile UV gloss accents, and minimalist visual language.'
  },
  {
    id: '02',
    title: 'VEDAVARTI SCENT ARCHIVE',
    category: 'EDITORIAL ART DIRECTION',
    aspect: 'aspect-[16/10]',
    accent: '#D4AF37',
    description: 'High-contrast typography paired with fragrance pyramid diagrams and luxury glass refraction studies.'
  },
  {
    id: '03',
    title: 'INDICALL EMERGENCY OS',
    category: 'SYSTEM UI & INTERFACES',
    aspect: 'aspect-square',
    accent: '#FF2A2A',
    description: 'High-contrast tactical emergency UI designed for immediate cognitive clarity under intense stress.'
  },
  {
    id: '04',
    title: 'CANeZZ ERGONOMIC BLUEPRINTS',
    category: 'INDUSTRIAL DESIGN & VISUALIZATION',
    aspect: 'aspect-[3/4]',
    accent: '#888888',
    description: 'Technical wireframe schematics and modular snap-on hardware interface visualization.'
  },
  {
    id: '05',
    title: 'KINETIC POSTERS & TYPOGRAPHY',
    category: 'EXPERIMENTAL GRAPHICS',
    aspect: 'aspect-[16/9]',
    accent: '#FFFFFF',
    description: 'Vector distortion studies, algorithmic grid structures, and oversized typography compositions.'
  }
];

export const LIVE_TELEMETRY = {
  activeProjects: [
    { name: 'WYTHHER', role: 'CTO & CO-FOUNDER', status: 'ACTIVE', progress: 95, badge: 'PRODUCTION' },
    { name: 'LOQMUSIC', role: 'SOLO DEVELOPER', status: 'LIVE', progress: 85, badge: 'WEB APP' },
    { name: 'TECH BLOG', role: 'WRITER', status: 'PUBLISHING', progress: 60, badge: 'CONTENT' },
    { name: 'NEW CONCEPTS', role: 'PRODUCT ARCHITECT', status: 'CLASSIFIED', progress: 25, badge: 'STEALTH' }
  ],
  systemStats: {
    uptime: 'LIVE',
    activeNodes: '4 PRODUCTS',
    lastUpdated: '2026',
    coreEngine: 'REACT 19 + MOTION + LENIS',
    coordinates: '26.9124° N, 75.7873° E'
  }
};
