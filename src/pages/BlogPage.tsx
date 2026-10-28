import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Filter } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/PageHeader';
import { PostCard } from '../components/PostCard';
import { ALL_TAGS, POSTS, formatDate } from '../lib/blog';
import { sound } from '../utils/sound';
import { FitText } from '../components/FitText';

export function BlogPage() {
  const [tag, setTag] = useState<string | null>(null);
  const tech = POSTS.filter((p) => !p.about);
  const shown = tag ? tech.filter((p) => p.tags.includes(tag)) : tech;
  const featured = tech.find((p) => p.featured);
  const tags = ALL_TAGS.filter((t) => tech.some((p) => p.tags.includes(t)));

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        <PageHeader
          index="05"
          label="TECH JOURNAL"
          status={`${tech.length} ARTICLES`}
          title="THE TECH"
          accent="JOURNAL."
          intro="Plain-English explainers on the technology shaping software right now — AI, the web platform, security and infrastructure."
        />

        {/* Featured article */}
        {featured && !tag && (
          <section className="py-12 sm:py-16 px-4 sm:px-8 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
              <Link
                to={`/blog/${featured.slug}`}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="READ"
                className="group relative block overflow-hidden bg-[#FF2B2B] text-black p-8 sm:p-12 shadow-2xl"
              >
                <div className="absolute right-4 top-2 font-display text-[9rem] font-black text-black/10 select-none pointer-events-none leading-none">01</div>
                <div className="relative flex items-center justify-between font-tech text-xs font-extrabold uppercase tracking-widest">
                  <span>FEATURED // {featured.tags[0]}</span>
                  <span className="text-black/70">{featured.readingMinutes} MIN READ</span>
                </div>
                <FitText as="h2" text={featured.title} max={3.75} className="relative mt-10 max-w-4xl font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-[.95] tracking-tight">
                  {featured.title}
                </FitText>
                <p className="relative mt-6 max-w-2xl font-sans text-base sm:text-lg text-black/85 font-medium leading-relaxed">{featured.description}</p>
                <div className="relative mt-10 flex items-center justify-between border-t border-black/20 pt-5 font-tech text-xs font-bold uppercase tracking-widest">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="flex items-center gap-2">
                    READ ARTICLE <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Topic filter */}
        <section className="py-6 px-4 sm:px-8 md:px-12 border-b border-white/10 bg-[#080808] sticky top-16 z-30">
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar" role="group" aria-label="Filter by topic">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="font-tech text-xs text-[#8A8A84] tracking-wider hidden sm:inline">TOPIC:</span>
            </div>
            {[null, ...tags].map((t) => (
              <button
                key={t ?? 'all'}
                type="button"
                aria-pressed={tag === t}
                onClick={() => {
                  sound.playSwitch();
                  setTag(t);
                }}
                className={`px-3 py-1.5 font-tech text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  tag === t
                    ? 'bg-[#FF2B2B] text-black font-bold border border-[#FF2B2B]'
                    : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {t ?? `ALL (${tech.length})`}
              </button>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-white/10">
          <motion.div layout className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </motion.div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
