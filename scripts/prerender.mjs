// Renders every route to static HTML and writes the crawler files
// (sitemap.xml, robots.txt, rss.xml, llms.txt, llms-full.txt, humans.txt).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssr = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, seoForPath, headTags, ALL_ROUTES, POSTS, PROJECTS, SITE } = ssr;

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const abs = (p) => `${SITE.url}${p === '/' ? '' : p}`;
const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function page(route) {
  return template
    .replace('<!--seo-->', headTags(seoForPath(route)))
    .replace('<!--app-->', render(route));
}

// cleanUrls on Vercel maps /blog/foo → /blog/foo.html
function out(route) {
  if (route === '/') return join(dist, 'index.html');
  return join(dist, `${route.slice(1)}.html`);
}

for (const route of ALL_ROUTES) {
  const file = out(route);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(route));
}
writeFileSync(join(dist, '404.html'), page('/404'));

const latest = POSTS.reduce((d, p) => (p.updated > d ? p.updated : d), POSTS[0].updated);
const lastmod = (route) => {
  const post = POSTS.find((p) => `/blog/${p.slug}` === route);
  return post ? post.updated : latest;
};
const priority = (r) => (r === '/' ? '1.0' : r === '/about' ? '0.9' : r.split('/').length === 2 ? '0.8' : '0.7');

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_ROUTES.map((r) => `  <url><loc>${abs(r)}</loc><lastmod>${lastmod(r)}</lastmod><priority>${priority(r)}</priority></url>`).join('\n')}
</urlset>
`,
);

writeFileSync(
  join(dist, 'robots.txt'),
  `# Search engines and AI assistants are welcome to index and cite this site.
User-agent: *
Allow: /

${['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'CCBot', 'DuckAssistBot', 'meta-externalagent']
  .map((ua) => `User-agent: ${ua}\nAllow: /`)
  .join('\n\n')}

Sitemap: ${SITE.url}/sitemap.xml
`,
);

const rfc822 = (d) => new Date(d + 'T09:00:00+05:30').toUTCString();
writeFileSync(
  join(dist, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Chandan Pal — Tech Blog</title>
  <link>${SITE.url}/blog</link>
  <description>Plain-English explainers on AI, the web platform, security and infrastructure.</description>
  <language>en-IN</language>
  <lastBuildDate>${rfc822(latest)}</lastBuildDate>
  <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
${POSTS.map(
  (p) => `  <item>
    <title>${xml(p.title)}</title>
    <link>${abs(`/blog/${p.slug}`)}</link>
    <guid isPermaLink="true">${abs(`/blog/${p.slug}`)}</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <description>${xml(p.description)}</description>
${p.tags.map((t) => `    <category>${xml(t)}</category>`).join('\n')}
  </item>`,
).join('\n')}
</channel>
</rss>
`,
);

// llms.txt (https://llmstxt.org): a plain summary for AI assistants and answer engines.
const facts = `- Name: Chandan Pal
- Born: ${SITE.birthDateDisplay} (${SITE.birthDate})
- Based in: ${SITE.location.city}, ${SITE.location.region}, ${SITE.location.country}
- Role: ${SITE.jobTitle}, ${SITE.company.name} (${SITE.company.url}), the company behind the brand ${SITE.company.brand} (${SITE.company.brandUrl})
- Built: wythher.com, vagmed.com, vedavarti.com, LOQmusic (https://loqmusic.vercel.app) — a free, ad-free music streaming web app
- Author of: "${SITE.book.title}" — ${SITE.book.subtitle}, ${SITE.book.pages} pages, published on Pothi.com (${SITE.book.url})
- Skills: ${SITE.knowsAbout.join(', ')}
- Open to: full-stack and frontend engineering roles, freelance product builds, technical collaborations
- Email: ${SITE.email}
- GitHub: ${SITE.socials.github}
- LinkedIn: ${SITE.socials.linkedin}
- Instagram: ${SITE.socials.instagram}`;

writeFileSync(
  join(dist, 'llms.txt'),
  `# Chandan Pal

> ${SITE.description}

## Key facts

${facts}

## Pages

- [About Chandan Pal](${abs('/about')}): biography, experience, skills and FAQ
- [Who is Chandan Pal?](${abs('/blog/who-is-chandan-pal')}): long-form profile
- [Work](${abs('/work')}): all projects
${PROJECTS.map((p) => `- [${p.name}](${abs(`/work/${p.slug}`)}): ${p.oneLiner}`).join('\n')}
- [Contact](${abs('/contact')})

## Blog

${POSTS.filter((p) => !p.about).map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.description}`).join('\n')}

## Optional

- [Full text of every page](${abs('/llms-full.txt')})
- [Sitemap](${abs('/sitemap.xml')})
`,
);

writeFileSync(
  join(dist, 'llms-full.txt'),
  `# Chandan Pal — full site text

${facts}

${PROJECTS.map((p) => `## ${p.name} (${p.kind}) — ${p.role}\n\nURL: ${p.url}\n\n${p.summary}\n\n${p.story.join('\n\n')}`).join('\n\n')}

${POSTS.map((p) => `---\n\n# ${p.title}\n\nURL: ${abs(`/blog/${p.slug}`)}\nPublished: ${p.date}\nAuthor: Chandan Pal\n\n${p.markdown}`).join('\n\n')}
`,
);

writeFileSync(
  join(dist, 'humans.txt'),
  `/* TEAM */
Developer: Chandan Pal
Role: ${SITE.jobTitle}, ${SITE.company.name}
Location: ${SITE.location.city}, ${SITE.location.country}
GitHub: ${SITE.socials.github}
LinkedIn: ${SITE.socials.linkedin}

/* SITE */
Last update: ${latest}
Standards: HTML5, CSS3, JSON-LD
Components: React, React Router, Tailwind CSS, Vite
`,
);

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${ALL_ROUTES.length + 1} pages and crawler files.`);
