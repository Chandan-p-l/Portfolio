# Chandan Pal — Portfolio

Personal site of Chandan Pal: work, about, contact and a tech blog. React 19 + React Router + Tailwind v4, built with Vite and **prerendered to static HTML** so every page is readable by search engines and AI crawlers without JavaScript.

## Commands

- `npm run dev` — dev server on http://localhost:3000 (client-rendered)
- `npm run build` — client build → SSR build → `scripts/prerender.mjs`
- `npm run preview` — build, then serve `dist/` with Vercel-style clean URLs on :4173
- `npm run og` — regenerate portrait WebP, favicons and Open Graph images (needs Python + Pillow)
- `npm run lint` — TypeScript check

## Where things live

- `src/site.ts` — identity facts (name, birth date, role, socials, book, domain). Used by the UI, meta tags, JSON-LD and llms.txt.
- `src/data/work.ts` — projects, experience, skills, open-source list.
- `src/content/blog/*.md` — blog posts. Each file becomes `/blog/<filename>`.
- `src/lib/seo.ts` — titles, descriptions, canonical URLs and JSON-LD for every route.
- `scripts/prerender.mjs` — writes the HTML pages plus `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`, `llms-full.txt` and `humans.txt`.

## Adding a blog post

1. Create `src/content/blog/my-post-slug.md`:

   ```md
   ---
   title: My Post Title
   description: One or two sentences, ideally under 160 characters.
   date: 2026-11-01
   tags: AI, Web Platform
   keywords: comma, separated, keywords
   ---

   > **TL;DR** — the answer first.

   ## A section heading
   ...

   ## Frequently asked questions

   ### A question?

   The answer. (Questions here become FAQPage structured data.)
   ```

2. Run `npm run og` to create its share image, then `npm run build`.

## After deploying

- Add the site to Google Search Console and Bing Webmaster Tools and submit `/sitemap.xml`.
- Link the site from GitHub, LinkedIn and Instagram profiles so the identity is consistent.
