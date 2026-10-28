import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { Breadcrumbs } from '../components/PageHeader';
import { PostCard } from '../components/PostCard';
import { getPost, relatedPosts, renderPost, formatDate } from '../lib/blog';
import { SITE } from '../site';
import { sound } from '../utils/sound';
import { NotFoundPage } from './NotFoundPage';
import { FitText } from '../components/FitText';

export function PostPage() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  if (!post) return <NotFoundPage />;
  const related = relatedPosts(post);

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Reading progress */}
        <motion.div style={{ scaleX: progress, originX: 0 }} className="fixed top-0 left-0 right-0 h-1 bg-[#FF2B2B] z-[60]" />

        <article>
          <header className="pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-8 md:px-12 border-b border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-10">
                <Breadcrumbs crumbs={[['BLOG', '/blog'], [post.title, `/blog/${post.slug}`]]} />
              </div>

              <ul className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((t) => (
                  <li key={t} className="font-tech text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#FF2B2B]/10 text-[#FF2B2B] border border-[#FF2B2B]/40">
                    {t}
                  </li>
                ))}
              </ul>

              <FitText as="h1" text={post.title} max={3.75} className="font-display text-[1.75rem] sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] text-white [overflow-wrap:anywhere]">
                {post.title}
              </FitText>
              <p className="mt-8 font-sans text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed">{post.description}</p>

              <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                <img src={SITE.portrait} alt="" width={48} height={48} className="h-12 w-12 rounded-full border border-[#FF2B2B]/40 bg-black object-cover object-top" />
                <div className="font-tech text-xs uppercase tracking-widest">
                  <Link to="/about" rel="author" onClick={() => sound.playClick()} className="text-white font-bold hover:text-[#FF2B2B] transition-colors">
                    CHANDAN PAL
                  </Link>
                  <p className="mt-1 text-[#8A8A84]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} MIN READ
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 sm:px-8 md:px-12 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto">
              {post.headings.length > 3 && (
                <nav aria-label="Table of contents" className="mb-12 border border-white/15 bg-[#0A0A0A] p-6">
                  <p className="font-tech text-[10px] font-bold uppercase tracking-[.3em] text-[#FF2B2B] mb-4">[ ON THIS PAGE ]</p>
                  <ol className="grid gap-2 font-tech text-xs">
                    {post.headings.map((h, i) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="flex gap-3 text-neutral-300 hover:text-[#FF2B2B] transition-colors">
                          <span className="text-[#FF2B2B]">{String(i + 1).padStart(2, '0')}</span>
                          <span>{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="prose" dangerouslySetInnerHTML={{ __html: renderPost(post) }} />

              <footer className="mt-16 flex flex-col sm:flex-row gap-6 items-start border border-white/15 bg-[#0A0A0A] p-6 sm:p-8">
                <img src={SITE.portrait} alt="Chandan Pal" width={80} height={80} loading="lazy" className="h-20 w-20 shrink-0 rounded-full border border-[#FF2B2B]/40 bg-black object-cover object-top" />
                <div>
                  <p className="font-tech text-[10px] uppercase tracking-[.3em] text-[#FF2B2B] font-bold">WRITTEN BY</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase text-white">
                    <Link to="/about" onClick={() => sound.playClick()} className="hover:text-[#FF2B2B] transition-colors">Chandan Pal</Link>
                  </p>
                  <p className="mt-2 font-sans text-sm text-neutral-400 leading-relaxed">
                    Full-stack developer and {SITE.jobTitle} of {SITE.company.name}, based in {SITE.location.city}, India. I build products
                    end to end and write about new technology.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 font-tech text-[10px] font-bold uppercase tracking-widest">
                    <a href={SITE.socials.linkedin} target="_blank" rel="me noopener" className="flex items-center gap-1 text-white hover:text-[#FF2B2B]">LINKEDIN <ArrowUpRight className="w-3 h-3" /></a>
                    <a href={SITE.socials.github} target="_blank" rel="me noopener" className="flex items-center gap-1 text-white hover:text-[#FF2B2B]">GITHUB <ArrowUpRight className="w-3 h-3" /></a>
                    <a href={SITE.socials.instagram} target="_blank" rel="me noopener" className="flex items-center gap-1 text-white hover:text-[#FF2B2B]">INSTAGRAM <ArrowUpRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </article>

        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-6">
              <FitText as="h2" text="KEEP READING." max={3.75} className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                KEEP READING<span className="text-[#FF2B2B]">.</span>
              </FitText>
              <Link
                to="/blog"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-3 bg-white/5 hover:bg-[#FF2B2B] hover:text-black border border-white/15 px-6 py-3 font-tech text-xs font-bold uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> ALL ARTICLES
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
