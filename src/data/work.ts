export interface Project {
  slug: string;
  name: string;
  kind: 'Startup' | 'Website' | 'Web app' | 'Book';
  category: string;
  period: string;
  role: string;
  url: string;
  urlLabel: string;
  oneLiner: string;
  summary: string;
  story: string[];
  highlights: string[];
  stack: string[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'wythher',
    name: 'WythHer',
    kind: 'Startup',
    category: 'D2C Startup · E-commerce Platform',
    period: '2025 — Present',
    role: 'CTO & Co-founder',
    url: 'https://wythher.com',
    urlLabel: 'wythher.com',
    accent: '#E562A4',
    oneLiner: 'Lifecycle period-care brand — D2C storefront and admin platform.',
    summary:
      'WythHer is the consumer brand of VagMed India Private Limited: modern, stage-based period care for Indian girls and women. As CTO and co-founder I own the full technology stack — the storefront at wythher.com, the D2C admin panel, payments and the data layer.',
    story: [
      'WythHer sells period care designed around life stages — first periods, teens, adults — starting with kits like the Moody Box. A brand like that lives or dies on trust and on how easy it is to buy, so the website had to feel premium and load fast on mid-range Android phones over mobile data.',
      'I built the storefront with React and Next.js on Vercel, and a separate admin platform for orders, inventory, customers and content. Checkout supports Razorpay and cash on delivery, because COD still matters for first-time buyers in India.',
      'The site also runs the WythHer Journal, an educational content hub. Technical SEO, structured data and page speed were part of the build from day one, not an afterthought.',
    ],
    highlights: [
      'Next.js storefront deployed on Vercel',
      'Full D2C admin panel for orders, stock and content',
      'Razorpay online payments plus cash on delivery',
      'SEO-first content hub (the WythHer Journal)',
    ],
    stack: ['Next.js', 'React', 'Vercel', 'Supabase', 'Firebase', 'PHP', 'MySQL', 'Razorpay'],
  },
  {
    slug: 'vagmed',
    name: 'VagMed India',
    kind: 'Startup',
    category: 'Femtech Startup · Company Website',
    period: '2025 — Present',
    role: 'CTO & Co-founder',
    url: 'https://vagmed.com',
    urlLabel: 'vagmed.com',
    accent: '#356AB4',
    oneLiner: 'Corporate site for a Jaipur femtech company building biodegradable sanitary pads.',
    summary:
      'VagMed India Private Limited is a Jaipur-based company building anatomy-aware, biodegradable menstrual hygiene products for teens, adults and mature women. I co-founded it and lead technology, and I designed and built vagmed.com.',
    story: [
      'VagMed is the parent company; WythHer is its consumer brand. The corporate site has a different job from the storefront: it explains the science and the mission to partners, distributors, investors and the press.',
      'I designed the information architecture around the three life stages the company builds for, and wrote the site to rank for local searches in Jaipur and Rajasthan as well as national category terms.',
      'As CTO, my work goes beyond the websites: technical strategy, vendor and tooling choices, data and market analysis, and making sure the brand, the storefront and operations share one reliable backbone.',
    ],
    highlights: [
      'Company website and brand architecture',
      'Local SEO for Jaipur and Rajasthan',
      'Technology strategy and market analysis as CTO',
      'Shared platform for the VagMed and WythHer brands',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Technical SEO'],
  },
  {
    slug: 'loqmusic',
    name: 'LOQmusic',
    kind: 'Web app',
    category: 'Web App · Music Streaming',
    period: 'Live',
    role: 'Solo developer',
    url: 'https://loqmusic.vercel.app',
    urlLabel: 'loqmusic.vercel.app',
    accent: '#1ED760',
    oneLiner: 'Free, ad-free music streaming in the browser. No sign-up.',
    summary:
      'LOQmusic is a free, ad-free web app for streaming music in the browser on any device, with no account required. I designed and built it end to end as a non-commercial project.',
    story: [
      'I wanted a music player that respects the listener: no ads, no sign-up wall, no tracking-heavy account. LOQmusic lets you search and play songs, albums, artists and playlists from a phone, tablet or desktop browser.',
      'The interesting engineering is in the player. It has synced lyrics with translation drawn from several providers, automatic beat-matched DJ-style transitions and crossfade, a 10-band equalizer with presets, playback speed and a sleep timer.',
      '"Listen Together" lets friends hear the same song at the same moment, which needs real-time sync between clients. Your likes, playlists, saved albums, followed artists and history live in your own browser, so there is no account and no server-side profile.',
    ],
    highlights: [
      'Synced lyrics with translation',
      'Beat-matched transitions, crossfade and 10-band EQ',
      'Real-time "Listen Together" sessions',
      'Private by design — library stored in the browser',
    ],
    stack: ['JavaScript', 'Web Audio API', 'Real-time sync', 'Browser storage', 'Vercel'],
  },
  {
    slug: 'vedavarti',
    name: 'VedaVarti',
    kind: 'Website',
    category: 'Luxury Perfume · E-commerce Website',
    period: '2025',
    role: 'Designer & developer',
    url: 'https://vedavarti.com',
    urlLabel: 'vedavarti.com',
    accent: '#D4AF37',
    oneLiner: 'E-commerce site for a luxury, long-lasting perfume brand from Jaipur.',
    summary:
      'VedaVarti is a luxury perfume brand from Jaipur. I designed and developed vedavarti.com — an editorial storefront that has to sell something you cannot smell through a screen.',
    story: [
      'Fragrance is hard to sell online. The site has to carry mood, materials and the structure of a scent — top, heart and base notes — through typography, imagery and layout.',
      'I built an editorial, high-contrast storefront with a short path from product story to checkout, and optimised it for searches like "luxury perfume brand India" and "long-lasting perfume Jaipur".',
    ],
    highlights: [
      'Editorial luxury storefront design',
      'Fragrance-note storytelling on product pages',
      'Short, low-friction checkout',
      'Category and local SEO',
    ],
    stack: ['React', 'Tailwind CSS', 'Figma', 'Payments', 'Technical SEO'],
  },
  {
    slug: 'the-last-conversation',
    name: 'The Last Conversation',
    kind: 'Book',
    category: 'Book · Psychological Drama Novel',
    period: 'Published',
    role: 'Author',
    url: 'https://store.pothi.com/book/chandan-pal-the-last-conversation/',
    urlLabel: 'Buy on Pothi.com',
    accent: '#FF2B2B',
    oneLiner: 'A psychological drama novel about love, loss and memory.',
    summary:
      'The Last Conversation is my novel, published on Pothi.com. It is a 113-page psychological drama about love, loss and memory — about the conversations that end too soon and the people we never forget.',
    story: [
      'Not everything I make is software. The Last Conversation is a story about the conversations we wish we had finished, and the lasting weight that even a brief one can carry.',
      'Writing a book taught me things that carry straight back into product work: cut ruthlessly, respect the reader\'s time, and make every page earn its place.',
    ],
    highlights: [
      'Psychological drama, in English',
      '113 pages, paperback (5.5" × 8.5")',
      'Independently published on Pothi.com',
      'Printed on demand and shipped across India',
    ],
    stack: ['Writing', 'Storytelling', 'Self-publishing'],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

// Smaller public work; descriptions come from the repositories themselves.
export const OPEN_SOURCE = [
  {
    name: 'Trade Expense Tracker',
    desc: 'A free, private trading journal and expense tracker that uses Google Sheets as its database.',
    lang: 'HTML / JS',
    url: 'https://github.com/Chandan-p-l/Trade-Expense-Tracker',
  },
  {
    name: 'Linux Developer Handbook',
    desc: 'Shell scripts and notes for getting productive as a developer on Linux.',
    lang: 'Shell',
    url: 'https://github.com/Chandan-p-l/linux-developer-handbook',
  },
  {
    name: 'To-Do List',
    desc: 'An offline-first to-do app built with HTML, CSS and vanilla JavaScript.',
    lang: 'HTML / JS',
    url: 'https://github.com/Chandan-p-l/To-Do_List',
  },
  {
    name: 'SafeCall',
    desc: 'An emergency helpline app for quick access to help.',
    lang: 'Python',
    url: 'https://github.com/Chandan-p-l/Safecall',
  },
  {
    name: 'Truth, Dare, Fire & Situation',
    desc: 'A single-file browser party game with four play modes.',
    lang: 'HTML / JS',
    url: 'https://github.com/Chandan-p-l/Truth_Dare_Fire_Situation_GAME',
  },
  {
    name: 'Nova',
    desc: 'An experimental project written in Rust.',
    lang: 'Rust',
    url: 'https://github.com/Chandan-p-l/Nova',
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS'] },
  { group: 'Backend & data', items: ['Node.js', 'Express', 'PHP', 'Supabase', 'Firebase', 'MySQL', 'MongoDB'] },
  { group: 'Infrastructure', items: ['Linux', 'Nginx', 'PM2', 'Vercel', 'Git & GitHub', 'CI/CD'] },
  { group: 'Product', items: ['UI/UX', 'Figma', 'Technical SEO & GEO', 'Payments (Razorpay)', 'Analytics'] },
];

export const EXPERIENCE = [
  {
    role: 'CTO & Co-founder',
    org: 'VagMed India Private Limited',
    orgUrl: 'https://vagmed.com',
    period: '2025 — Present',
    place: 'Jaipur, India',
    points: [
      'Lead technology for VagMed and its consumer brand WythHer.',
      'Built wythher.com (Next.js on Vercel) and its full D2C admin platform.',
      'Integrated Razorpay and cash-on-delivery checkout.',
      'Own technical SEO, analytics and market analysis.',
    ],
  },
  {
    role: 'Independent developer',
    org: 'Freelance & personal products',
    period: 'Ongoing',
    place: 'Remote',
    points: [
      'Designed and developed vedavarti.com for a Jaipur luxury perfume brand.',
      'Built LOQmusic, a free, ad-free music streaming web app.',
      'Ship and maintain open-source tools on GitHub.',
    ],
  },
];
