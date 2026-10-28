import { SITE, absoluteUrl } from '../site';
import { PROJECTS, getProject } from '../data/work';
import { POSTS, getPost, type Post } from './blog';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  type: 'website' | 'article' | 'profile' | 'book';
  image: string;
  noindex?: boolean;
  article?: { published: string; modified: string; tags: string[] };
  jsonLd: object[];
}

const PERSON_ID = `${SITE.url}/#person`;
const ORG_ID = `${SITE.url}/#vagmed`;
const WEBSITE_ID = `${SITE.url}/#website`;
const BOOK_ID = `${SITE.url}/work/the-last-conversation#book`;

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  givenName: 'Chandan',
  familyName: 'Pal',
  url: SITE.url,
  image: absoluteUrl(SITE.portrait),
  email: `mailto:${SITE.email}`,
  birthDate: SITE.birthDate,
  nationality: { '@type': 'Country', name: 'India' },
  jobTitle: SITE.jobTitle,
  description: SITE.description,
  worksFor: { '@id': ORG_ID },
  homeLocation: {
    '@type': 'Place',
    name: `${SITE.location.city}, ${SITE.location.region}, ${SITE.location.country}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.location.lat, longitude: SITE.location.lng },
  },
  knowsAbout: SITE.knowsAbout,
  knowsLanguage: ['en'],
  sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.instagram, SITE.book.url],
});

const orgSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.company.name,
  alternateName: SITE.company.shortName,
  url: SITE.company.url,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.location.city,
    addressRegion: SITE.location.region,
    addressCountry: SITE.location.countryCode,
  },
  brand: { '@type': 'Brand', name: SITE.company.brand, url: SITE.company.brandUrl },
  employee: { '@id': PERSON_ID },
});

const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: 'en-IN',
  publisher: { '@id': PERSON_ID },
});

const bookSchema = () => ({
  '@type': 'Book',
  '@id': BOOK_ID,
  name: SITE.book.title,
  alternativeHeadline: SITE.book.subtitle,
  author: { '@id': PERSON_ID },
  bookFormat: 'https://schema.org/Paperback',
  numberOfPages: SITE.book.pages,
  genre: ['Psychological drama', 'Fiction'],
  inLanguage: 'en',
  description: SITE.book.blurb,
  url: SITE.book.url,
  publisher: { '@type': 'Organization', name: SITE.book.publisher, url: 'https://pothi.com' },
  offers: { '@type': 'Offer', url: SITE.book.url, price: '189', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
});

const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'] as [string, string], ...items].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});

const graph = (...nodes: object[]) => [{ '@context': 'https://schema.org', '@graph': nodes }];

export const ABOUT_FAQS = [
  {
    q: 'Who is Chandan Pal?',
    a: `Chandan Pal is a full-stack developer from ${SITE.location.city}, India, and the CTO & Co-founder of ${SITE.company.name}, the company behind the period-care brand WythHer. Chandan built wythher.com, vagmed.com, vedavarti.com and the free music app LOQmusic, and wrote the novel ${SITE.book.title}.`,
  },
  { q: 'When was Chandan Pal born?', a: `Chandan Pal was born on ${SITE.birthDateDisplay}.` },
  {
    q: 'Who is the CTO of VagMed India?',
    a: `Chandan Pal is the CTO and Co-founder of ${SITE.company.name}, a Jaipur-based company that makes biodegradable, life-stage menstrual hygiene products under the WythHer brand.`,
  },
  {
    q: 'What book has Chandan Pal written?',
    a: `Chandan Pal wrote ${SITE.book.title}, a ${SITE.book.pages}-page psychological drama novel about love, loss and memory, published on Pothi.com.`,
  },
  {
    q: 'What is LOQmusic?',
    a: 'LOQmusic is a free, ad-free music streaming web app built by Chandan Pal. It needs no sign-up and includes synced lyrics, beat-matched transitions, a 10-band equalizer and "Listen Together" sessions.',
  },
  {
    q: 'Is Chandan Pal open to work?',
    a: `Yes. Chandan Pal is open to full-stack and frontend engineering roles, freelance product builds and technical collaborations. Contact Chandan at ${SITE.email} or on LinkedIn.`,
  },
];

const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export function postSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/og/${post.slug}.png`),
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    keywords: [...post.tags, ...post.keywords].join(', '),
    articleSection: post.tags[0],
    wordCount: post.wordCount,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE.url}/blog#blog` },
    ...(post.about ? { about: { '@id': PERSON_ID } } : {}),
  };
}

const STATIC: Record<string, Omit<PageMeta, 'path' | 'image' | 'jsonLd'> & { jsonLd: () => object[] }> = {
  '/': {
    title: SITE.title,
    description: SITE.metaDescription,
    type: 'profile',
    jsonLd: () =>
      graph(
        websiteSchema(),
        personSchema(),
        orgSchema(),
        bookSchema(),
        {
          '@type': 'ProfilePage',
          '@id': `${SITE.url}/#profile`,
          url: SITE.url,
          name: SITE.title,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': PERSON_ID },
          dateModified: POSTS[0]?.updated,
        },
      ),
  },
  '/about': {
    title: `About Chandan Pal — Developer, CTO of VagMed India, Author`,
    description: `Chandan Pal (born ${SITE.birthDateDisplay}) is a full-stack developer from Jaipur, India, CTO & Co-founder of VagMed India Private Limited and author of ${SITE.book.title}.`,
    type: 'profile',
    jsonLd: () =>
      graph(
        personSchema(),
        orgSchema(),
        bookSchema(),
        {
          '@type': 'AboutPage',
          url: absoluteUrl('/about'),
          name: 'About Chandan Pal',
          mainEntity: { '@id': PERSON_ID },
          isPartOf: { '@id': WEBSITE_ID },
        },
        faqSchema(ABOUT_FAQS),
        breadcrumbs([['About', '/about']]),
      ),
  },
  '/work': {
    title: 'Work & Projects — Chandan Pal',
    description:
      'Products built by Chandan Pal: WythHer and VagMed India (as CTO), the VedaVarti perfume storefront, the LOQmusic streaming app, open-source tools and the novel The Last Conversation.',
    type: 'website',
    jsonLd: () =>
      graph(
        {
          '@type': 'CollectionPage',
          url: absoluteUrl('/work'),
          name: 'Work by Chandan Pal',
          author: { '@id': PERSON_ID },
          hasPart: PROJECTS.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: absoluteUrl(`/work/${p.slug}`) })),
        },
        breadcrumbs([['Work', '/work']]),
      ),
  },
  '/blog': {
    title: 'Tech Blog — AI, Web Development, Security & Infrastructure | Chandan Pal',
    description:
      'Clear, practical explainers on new technology: AI agents, MCP, RAG, WebGPU, React Compiler, passkeys, post-quantum cryptography, HTTP/3, edge computing and more.',
    type: 'website',
    jsonLd: () =>
      graph(
        {
          '@type': 'Blog',
          '@id': `${SITE.url}/blog#blog`,
          url: absoluteUrl('/blog'),
          name: 'Chandan Pal — Tech Blog',
          author: { '@id': PERSON_ID },
          inLanguage: 'en-IN',
          blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.date })),
        },
        breadcrumbs([['Blog', '/blog']]),
      ),
  },
  '/lab': {
    title: 'Tech Lab — Interactive Web Experiments by Chandan Pal',
    description:
      'Interactive experiments by Chandan Pal: a runtime profiler, canvas physics, Web Audio synthesis and a packet-lifecycle simulator showing what happens behind the screen.',
    type: 'website',
    jsonLd: () =>
      graph(
        { '@type': 'CollectionPage', url: absoluteUrl('/lab'), name: 'Tech Lab', author: { '@id': PERSON_ID } },
        breadcrumbs([['Lab', '/lab']]),
      ),
  },
  '/contact': {
    title: 'Contact Chandan Pal — Hire a Full-Stack Developer in India',
    description: `Hire or collaborate with Chandan Pal, full-stack developer and CTO based in Jaipur, India. Email ${SITE.email} or connect on LinkedIn and GitHub.`,
    type: 'website',
    jsonLd: () =>
      graph(
        { '@type': 'ContactPage', url: absoluteUrl('/contact'), name: 'Contact Chandan Pal', mainEntity: { '@id': PERSON_ID } },
        personSchema(),
        breadcrumbs([['Contact', '/contact']]),
      ),
  },
};

const NOT_FOUND: PageMeta = {
  title: 'Page not found — Chandan Pal',
  description: 'This page does not exist.',
  path: '/404',
  type: 'website',
  image: SITE.ogImage,
  noindex: true,
  jsonLd: [],
};

export function seoForPath(rawPath: string): PageMeta {
  const path = rawPath.replace(/\/+$/, '') || '/';
  const s = STATIC[path];
  if (s) return { ...s, path, image: SITE.ogImage, jsonLd: s.jsonLd() };

  const work = /^\/work\/([^/]+)$/.exec(path);
  const project = work && getProject(work[1]);
  if (project) {
    const isBook = project.kind === 'Book';
    return {
      title: isBook
        ? `${SITE.book.title} — a novel by Chandan Pal`
        : `${project.name} Case Study — Chandan Pal, ${project.role}`,
      description: project.summary,
      path,
      type: isBook ? 'book' : 'article',
      image: SITE.ogImage,
      jsonLd: graph(
        isBook
          ? bookSchema()
          : {
              '@type': 'CreativeWork',
              name: project.name,
              url: absoluteUrl(path),
              description: project.summary,
              creator: { '@id': PERSON_ID },
              sameAs: project.url,
              keywords: project.stack.join(', '),
            },
        personSchema(),
        breadcrumbs([['Work', '/work'], [project.name, path]]),
      ),
    };
  }

  const blog = /^\/blog\/([^/]+)$/.exec(path);
  const post = blog && getPost(blog[1]);
  if (post) {
    return {
      title: post.title.includes(SITE.name) || post.title.length > 52 ? post.title : `${post.title} | Chandan Pal`,
      description: post.description,
      path,
      type: 'article',
      image: `/og/${post.slug}.png`,
      article: { published: post.date, modified: post.updated, tags: post.tags },
      jsonLd: graph(
        postSchema(post),
        personSchema(),
        ...(post.faqs.length ? [faqSchema(post.faqs)] : []),
        breadcrumbs([['Blog', '/blog'], [post.title, path]]),
      ),
    };
  }

  return NOT_FOUND;
}

// Search engines truncate around 160 characters; cut on a word boundary.
const clip = (s: string, n = 160) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n - 1))}…`);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Rendered into <head>. Every tag carries data-seo so the client can swap them on navigation.
export function headTags(m: PageMeta): string {
  const url = absoluteUrl(m.path);
  const image = absoluteUrl(m.image);
  const ogType = m.type === 'article' ? 'article' : m.type === 'book' ? 'book' : m.type === 'profile' ? 'profile' : 'website';
  const tags = [
    `<title data-seo>${esc(m.title)}</title>`,
    `<meta data-seo name="description" content="${esc(clip(m.description))}">`,
    `<meta data-seo name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">`,
    ...(m.noindex ? [] : [`<link data-seo rel="canonical" href="${url}">`]),
    `<meta data-seo property="og:type" content="${ogType}">`,
    `<meta data-seo property="og:title" content="${esc(m.title)}">`,
    `<meta data-seo property="og:description" content="${esc(m.description)}">`,
    `<meta data-seo property="og:url" content="${url}">`,
    `<meta data-seo property="og:image" content="${image}">`,
    `<meta data-seo property="og:image:width" content="1200">`,
    `<meta data-seo property="og:image:height" content="630">`,
    `<meta data-seo property="og:image:alt" content="${esc(m.title)}">`,
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
    `<meta data-seo name="twitter:title" content="${esc(m.title)}">`,
    `<meta data-seo name="twitter:description" content="${esc(m.description)}">`,
    `<meta data-seo name="twitter:image" content="${image}">`,
  ];
  if (m.type === 'profile') {
    tags.push(
      `<meta data-seo property="profile:first_name" content="Chandan">`,
      `<meta data-seo property="profile:last_name" content="Pal">`,
    );
  }
  if (m.article) {
    tags.push(
      `<meta data-seo property="article:published_time" content="${m.article.published}">`,
      `<meta data-seo property="article:modified_time" content="${m.article.modified}">`,
      `<meta data-seo property="article:author" content="${SITE.url}/about">`,
      ...m.article.tags.map((t) => `<meta data-seo property="article:tag" content="${esc(t)}">`),
    );
  }
  for (const ld of m.jsonLd) {
    tags.push(`<script data-seo type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

export const ALL_ROUTES = [
  ...Object.keys(STATIC),
  ...PROJECTS.map((p) => `/work/${p.slug}`),
  ...POSTS.map((p) => `/blog/${p.slug}`),
];
