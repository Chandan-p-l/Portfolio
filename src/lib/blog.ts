import { Marked } from 'marked';

export interface Faq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  keywords: string[];
  featured: boolean;
  about: boolean;
  readingMinutes: number;
  wordCount: number;
  markdown: string;
  faqs: Faq[];
  headings: { id: string; text: string }[];
}

const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Strip inline markdown so text is safe for JSON-LD and meta tags.
export const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function parseFrontmatter(raw: string) {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error('Blog post is missing frontmatter');
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: match[2].trim() };
}

const list = (s = '') => s.split(',').map((t) => t.trim()).filter(Boolean);

// "## Frequently asked questions" followed by "### Question" blocks → FAQPage schema.
function extractFaqs(body: string): Faq[] {
  const section = /^## Frequently asked questions\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(body);
  if (!section) return [];
  return section[1]
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split('\n');
      return { q: plain(q), a: plain(rest.join(' ')) };
    })
    .filter((f) => f.q && f.a);
}

function parse(path: string, raw: string): Post {
  const { data, body } = parseFrontmatter(raw);
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => ({ id: slugify(m[1]), text: plain(m[1]) }));
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || data.date,
    tags: list(data.tags),
    keywords: list(data.keywords),
    featured: data.featured === 'true',
    about: data.about === 'true',
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
    wordCount,
    markdown: body,
    faqs: extractFaqs(body),
    headings,
  };
}

export const POSTS: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date) || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const ALL_TAGS = [...new Set(POSTS.flatMap((p) => p.tags))].sort();

export function relatedPosts(post: Post, n = 3) {
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
}

const md = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(text);
      return `<h${depth} id="${id}"><a href="#${id}" class="anchor" aria-hidden="true" tabindex="-1">#</a>${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const t = title ? ` title="${title}"` : '';
      return external
        ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
        : `<a href="${href}"${t}>${text}</a>`;
    },
  },
});

const htmlCache = new Map<string, string>();
export function renderPost(post: Post) {
  let html = htmlCache.get(post.slug);
  if (!html) {
    html = (md.parse(post.markdown, { async: false }) as string)
      .replace(/<table>/g, '<div class="table-wrap"><table>')
      .replace(/<\/table>/g, '</table></div>');
    htmlCache.set(post.slug, html);
  }
  return html;
}

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
