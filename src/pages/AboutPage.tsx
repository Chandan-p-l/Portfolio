import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lightbulb, Palette, Code2, Server, Rocket, User, MapPin, Sparkles, Terminal, Activity, Cpu } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { IdentityEvolution } from '../components/IdentityEvolution';
import { Philosophy } from '../components/Philosophy';
import { sound } from '../utils/sound';
import { Link } from 'react-router-dom';
import { SITE } from '../site';
import { ABOUT_FAQS } from '../lib/seo';
import { FitText } from '../components/FitText';
import { fitVars } from '../utils/fit';

const PROCESS_STEPS = [
  {
    step: '01',
    id: 'idea',
    title: 'IDEA',
    headline: 'PROBLEM DISCOVERY & FIRST PRINCIPLES',
    desc: 'Uncovering friction points, unserved market needs, and technical viability before touching code.',
    metric: 'Opportunity Thesis & Feasibility',
    color: '#FF2B2B',
  },
  {
    step: '02',
    id: 'design',
    title: 'DESIGN',
    headline: 'TACTILE INTERFACES & DESIGN SYSTEMS',
    desc: 'Designing mathematical 8px baseline rhythms, typographic hierarchy, and interactive prototypes in Figma.',
    metric: 'Design Tokens & Interactive Wireframes',
    color: '#FFFFFF',
  },
  {
    step: '03',
    id: 'code',
    title: 'CODE',
    headline: 'RESILIENT FULL-STACK ARCHITECTURE',
    desc: 'Writing modular TypeScript, reactive React SPAs, clustered Express APIs, and decoupled state stores.',
    metric: 'Production Codebase & Clean APIs',
    color: '#FF2B2B',
  },
  {
    step: '04',
    id: 'infra',
    title: 'INFRASTRUCTURE',
    headline: 'DECOUPLED HIGH-AVAILABILITY CLOUD',
    desc: 'Deploying Linux VPS instances, Nginx reverse proxies, SSL automation, and PM2 multi-core clusters.',
    metric: 'Zero-Downtime CI/CD Pipeline',
    color: '#00E5FF',
  },
  {
    step: '05',
    id: 'launch',
    title: 'LAUNCH',
    headline: 'PRODUCTION ITERATION & REALITY',
    desc: 'Releasing to real customers, tracking sub-second telemetry, and iterating relentlessly.',
    metric: 'Active Commercial System',
    color: '#10B981',
  },
];

export function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHoveredPortrait, setIsHoveredPortrait] = useState(false);

  const activeProcess = PROCESS_STEPS[activeStep];

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Page Hero: Human & Personal Editorial Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">01 // HUMAN & MINDSET</span>
                <span className="text-white">ABOUT CHANDAN PAL</span>
              </div>
              <span className="text-emerald-400 font-bold">STATUS: ACTIVE CTO & BUILDER</span>
            </div>

            {/* Prominent Personal Idea Headline */}
            <div className="space-y-4 max-w-5xl mb-12">
              <div className="font-tech text-xs text-[#FF2B2B] tracking-[0.3em] uppercase">
                [ CORE MOTIVATION ]
              </div>
              <FitText as="h1" text="I LIKE UNDERSTANDING HOW THINGS WORK —" max={6} className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.02] text-white">
                I LIKE UNDERSTANDING<br />
                <span className="text-[#FF2B2B]">HOW THINGS WORK —</span><br />
                <span className="font-editorial italic text-3xl sm:text-5xl md:text-6xl text-neutral-300 font-normal lowercase">
                  and then trying to build them myself.
                </span>
              </FitText>
            </div>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Deconstructing software systems down to the metal, crafting tactile interfaces, and shipping real commercial ventures from raw curiosity.
            </p>
          </div>
        </section>

        {/* 1. LARGE EDITORIAL PORTRAIT COMPOSITION: CHANDAN [PORTRAIT] PAL */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex flex-col items-center justify-center py-12">
              {/* Background Layer Typography: CHANDAN */}
              <div aria-hidden="true" className="fit-box absolute top-0 left-0 right-0 flex justify-between pointer-events-none z-0 opacity-15 select-none">
                <span style={fitVars('CHANDAN', 14)} className="fit font-display font-black text-white leading-none">
                  CHANDAN
                </span>
              </div>

              {/* Foreground Portrait Composition */}
              <div
                onMouseEnter={() => {
                  sound.playHover();
                  setIsHoveredPortrait(true);
                }}
                onMouseLeave={() => setIsHoveredPortrait(false)}
                className="relative z-10 w-full max-w-md aspect-[3/4] bg-neutral-950 border border-white/20 p-4 shadow-2xl group transition-all"
              >
                {/* Edge Lighting & Red Tint Glow */}
                <div className="absolute inset-0 bg-[#FF2B2B]/10 blur-2xl rounded-full pointer-events-none" />

                {/* Inner Graphic Portrait Box */}
                <div className="relative w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden flex flex-col justify-between p-6 border border-white/10">
                  <div className="flex items-center justify-between font-tech text-[10px] text-[#8A8A84] border-b border-white/10 pb-2">
                    <span className="text-white font-bold">PORTRAIT // 2026</span>
                    <span className="text-[#FF2B2B]">● VERIFIED</span>
                  </div>

                  {/* Silhouette Vector Presentation */}
                  <div className="my-auto py-6 flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 rounded-full border border-[#FF2B2B]/40 bg-black overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                      <img src={SITE.portrait} alt="Chandan Pal" width={128} height={128} loading="lazy" className="w-full h-full object-cover object-top" />
                    </div>

                    <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider">
                      CHANDAN PAL
                    </div>

                    <div className="font-tech text-xs text-[#8A8A84] tracking-widest uppercase">
                      DEVELOPER · CTO · AUTHOR
                    </div>
                  </div>

                  <div className="font-tech text-[10px] text-neutral-400 border-t border-white/10 pt-2 flex justify-between">
                    <span>JAIPUR, INDIA</span>
                    <span>26.9124° N, 75.7873° E</span>
                  </div>
                </div>
              </div>

              {/* Background Layer Typography: PAL */}
              <div aria-hidden="true" className="fit-box absolute bottom-0 left-0 right-0 flex justify-end pointer-events-none z-0 opacity-15 select-none">
                <span style={fitVars('CHANDAN', 14)} className="fit font-display font-black text-white leading-none">
                  PAL®
                </span>
              </div>
            </div>

            {/* Editorial Bio Text */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-white/10 items-start">
              <div className="md:col-span-4 font-tech text-xs text-[#FF2B2B] tracking-widest uppercase font-bold">
                [ THE BUILDER PERSPECTIVE ]
              </div>
              <div className="md:col-span-8 space-y-6 font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                <p>
                  I'm <strong className="text-white font-semibold">Chandan Pal</strong> — a full-stack developer born on {SITE.birthDateDisplay}, based in {SITE.location.city}, {SITE.location.region}. I'm the <strong className="text-white font-semibold">{SITE.jobTitle}</strong> of{' '}
                  <a href={SITE.company.url} target="_blank" rel="noopener" className="text-white underline decoration-[#FF2B2B] underline-offset-4">{SITE.company.name}</a>, the company behind{' '}
                  <a href={SITE.company.brandUrl} target="_blank" rel="noopener" className="text-white underline decoration-[#FF2B2B] underline-offset-4">WythHer</a>.
                </p>
                <p>
                  I built <Link to="/work/wythher" className="text-white underline decoration-[#FF2B2B] underline-offset-4">wythher.com</Link>,{' '}
                  <Link to="/work/vagmed" className="text-white underline decoration-[#FF2B2B] underline-offset-4">vagmed.com</Link>,{' '}
                  <Link to="/work/vedavarti" className="text-white underline decoration-[#FF2B2B] underline-offset-4">vedavarti.com</Link> and{' '}
                  <Link to="/work/loqmusic" className="text-white underline decoration-[#FF2B2B] underline-offset-4">LOQmusic</Link>, a free, ad-free music app — and I wrote a novel,{' '}
                  <Link to="/work/the-last-conversation" className="text-white underline decoration-[#FF2B2B] underline-offset-4"><em>{SITE.book.title}</em></Link>.
                </p>
                <p>
                  Most developers stay in their comfort zone: either pure code or pure design. I believe the most interesting things happen when you understand the database indexes, the Nginx reverse proxy, the Figma layout math, the customer onboarding funnel, and the packaging box in someone's hands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE IDENTITY EVOLUTION (STUDENT → DEVELOPER → BUILDER → CO-FOUNDER → CTO) */}
        <IdentityEvolution />

        {/* 3. STREAMLINED 5-STAGE PRODUCT CYCLE */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">03 // EXECUTION ENGINE</span>
                <span className="text-white">5-STAGE PRODUCT CYCLE</span>
              </div>
              <span>REPEATABLE PLAYBOOK</span>
            </div>

            {/* Interactive Step Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
              {PROCESS_STEPS.map((s, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playSwitch();
                      setActiveStep(idx);
                    }}
                    className={`p-4 text-left border transition-all ${
                      isSelected
                        ? 'bg-[#FF2B2B] text-black border-[#FF2B2B] font-bold shadow-xl'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <div className="font-tech text-[10px] opacity-75">STAGE {s.step}</div>
                    <FitText as="div" text={s.title} max={0.875} tracking={0.05} className="font-display font-black text-sm tracking-wider uppercase mt-1">
                      {s.title}
                    </FitText>
                  </button>
                );
              })}
            </div>

            {/* Active Process Stage Showcase */}
            <div className="p-8 sm:p-12 bg-[#0A0A0A] border border-white/15">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="font-tech text-xs text-[#FF2B2B] uppercase tracking-widest font-bold">
                    STAGE {activeProcess.step} // {activeProcess.title}
                  </div>
                  <FitText as="h3" text={activeProcess.headline} max={3} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                    {activeProcess.headline}
                  </FitText>
                  <p className="font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                    {activeProcess.desc}
                  </p>
                </div>

                <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-2 font-tech text-xs">
                  <span className="text-[#8A8A84] uppercase tracking-wider text-[10px]">PRIMARY DELIVERABLE:</span>
                  <div className="p-3 bg-neutral-900 border border-white/10 text-white font-bold">
                    {activeProcess.metric}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MONUMENTAL CREED & EMOTIONAL ENDING */}
        <Philosophy />

        {/* 5. FACT FILE & FAQ — plain answers for people and search engines */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">05 // FACT FILE</span>
                <span className="text-white">THE SHORT VERSION</span>
              </div>
              <span>VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <dl className="lg:col-span-5 divide-y divide-white/10 border-y border-white/10 font-tech text-xs">
                {([
                  ['FULL NAME', 'Chandan Pal'],
                  ['BORN', <time dateTime={SITE.birthDate}>{SITE.birthDateDisplay}</time>],
                  ['BASED IN', `${SITE.location.city}, ${SITE.location.region}, ${SITE.location.country}`],
                  ['ROLE', `${SITE.jobTitle}, ${SITE.company.name}`],
                  ['BRAND', 'WythHer'],
                  ['BOOK', SITE.book.title],
                  ['EMAIL', <a href={`mailto:${SITE.email}`} className="hover:text-[#FF2B2B]">{SITE.email}</a>],
                ] as [string, React.ReactNode][]).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-[#8A8A84] tracking-widest">{k}</dt>
                    <dd className="text-white text-right">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="lg:col-span-7">
                <FitText as="h2" text="FREQUENTLY ASKED." max={3} className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-8">
                  FREQUENTLY ASKED<span className="text-[#FF2B2B]">.</span>
                </FitText>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {ABOUT_FAQS.map((f, i) => (
                    <details key={f.q} className="group py-5" open={i === 0}>
                      <summary
                        onClick={() => sound.playSwitch()}
                        className="flex cursor-pointer list-none items-center justify-between gap-4 pr-2 font-display text-lg font-black uppercase text-white hover:text-[#FF2B2B] [&::-webkit-details-marker]:hidden"
                      >
                        {f.q}
                        <span className="font-tech text-[#FF2B2B] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 font-sans text-base text-neutral-300 font-light leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
                <Link
                  to="/blog/who-is-chandan-pal"
                  onClick={() => sound.playClick()}
                  className="mt-8 inline-flex items-center gap-3 bg-[#FF2B2B] text-black hover:bg-white px-6 py-4 font-tech text-xs font-bold uppercase tracking-widest transition-all"
                >
                  READ THE FULL STORY <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
