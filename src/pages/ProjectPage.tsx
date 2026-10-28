import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { Breadcrumbs } from '../components/PageHeader';
import { getProject, PROJECTS } from '../data/work';
import { sound } from '../utils/sound';
import { NotFoundPage } from './NotFoundPage';
import { FitText } from '../components/FitText';

export function ProjectPage() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  if (!p) return <NotFoundPage />;

  const index = PROJECTS.indexOf(p);
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const isBook = p.kind === 'Book';

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Hero */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
              <Breadcrumbs crumbs={[['WORK', '/work'], [p.name.toUpperCase(), `/work/${p.slug}`]]} />
              <span className="text-[#FF2B2B] font-bold shrink-0">PROJECT {String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="font-tech text-xs tracking-[0.3em] uppercase mb-4" style={{ color: p.accent }}>
              {p.category} // {p.period}
            </div>

            <FitText as="h1" text={p.name} max={8} className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none text-white uppercase mb-8 hover:text-[#FF2B2B] transition-colors">
              {p.name}
            </FitText>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">{p.summary}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="VISIT"
                className="inline-flex items-center gap-3 bg-[#FF2B2B] text-black hover:bg-white px-6 py-4 font-tech text-xs font-bold uppercase tracking-widest transition-all"
              >
                {isBook ? 'GET IT ON POTHI.COM' : `VISIT ${p.urlLabel.toUpperCase()}`} <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/work"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/15 hover:border-[#FF2B2B] px-6 py-4 font-tech text-xs font-bold uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> WORK ARCHIVE
              </Link>
            </div>
          </div>
        </section>

        {/* Spec + story */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-4 space-y-4 font-tech text-xs">
              {[
                ['ROLE', p.role],
                ['TYPE', p.kind],
                ['TIMELINE', p.period],
              ].map(([k, v]) => (
                <div key={k} className="p-4 bg-[#0A0A0A] border border-white/10">
                  <span className="block text-[10px] text-[#8A8A84] tracking-widest">{k}</span>
                  <span className="mt-1 block text-white font-bold uppercase">{v}</span>
                </div>
              ))}
              <div className="p-4 bg-[#0A0A0A] border border-white/10">
                <span className="block text-[10px] text-[#8A8A84] tracking-widest mb-3">{isBook ? 'CRAFT' : 'STACK'}</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="font-tech text-[10px] sm:text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-6">[ THE STORY ]</div>
              <div className="space-y-6">
                {p.story.map((para, i) => (
                  <motion.p
                    key={para.slice(0, 24)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="font-sans text-lg sm:text-xl text-neutral-300 font-light leading-relaxed"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div className="font-tech text-[10px] sm:text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mt-16 mb-6">[ HIGHLIGHTS ]</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <div
                    key={h}
                    onMouseEnter={() => sound.playHover()}
                    className="group flex items-start gap-3 p-5 bg-[#0E0E10] border border-white/10 hover:border-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-black transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#FF2B2B] group-hover:text-black" />
                    <span className="font-sans text-sm text-neutral-200 group-hover:text-black">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* More work */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FitText as="h2" text="MORE WORK." max={3.75} className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-10">
              MORE WORK<span className="text-[#FF2B2B]">.</span>
            </FitText>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/work/${o.slug}`}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="project"
                  className="group flex min-h-[16rem] flex-col justify-between bg-[#0E0E10] border border-white/10 hover:border-[#FF2B2B] p-6 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-between font-tech text-[10px] uppercase tracking-widest">
                    <span className="text-[#FF2B2B] font-bold">{o.kind}</span>
                    <span className="text-neutral-500">{o.period}</span>
                  </div>
                  <div>
                    <FitText as="h3" text={o.name} max={1.875} className="font-display text-3xl font-black uppercase text-white group-hover:text-[#FF2B2B] transition-colors">{o.name}</FitText>
                    <p className="mt-2 font-sans text-sm text-neutral-400 leading-relaxed">{o.oneLiner}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 self-end text-[#FF2B2B] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
