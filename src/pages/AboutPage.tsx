import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lightbulb, Palette, Code2, Server, Rocket, User, MapPin, Sparkles, Terminal, Activity, Cpu } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { IdentityEvolution } from '../components/IdentityEvolution';
import { Philosophy } from '../components/Philosophy';
import { sound } from '../utils/sound';

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
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.02] text-white">
                I LIKE UNDERSTANDING<br />
                <span className="text-[#FF2B2B]">HOW THINGS WORK —</span><br />
                <span className="font-editorial italic text-3xl sm:text-5xl md:text-6xl text-neutral-300 font-normal lowercase">
                  and then trying to build them myself.
                </span>
              </h1>
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
              <div className="absolute top-0 left-0 right-0 flex justify-between pointer-events-none z-0 opacity-15 select-none">
                <span className="font-display text-7xl sm:text-9xl md:text-[14rem] font-black text-white leading-none">
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
                    <div className="w-24 h-24 rounded-full border border-[#FF2B2B]/40 bg-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Cpu className="w-10 h-10 text-[#FF2B2B]" />
                    </div>

                    <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider">
                      CHANDAN PAL
                    </div>

                    <div className="font-tech text-xs text-[#8A8A84] tracking-widest uppercase">
                      COMPUTER SCIENCE · CTO · BUILDER
                    </div>
                  </div>

                  <div className="font-tech text-[10px] text-neutral-400 border-t border-white/10 pt-2 flex justify-between">
                    <span>JAIPUR, INDIA</span>
                    <span>26.9124° N, 75.7873° E</span>
                  </div>
                </div>
              </div>

              {/* Background Layer Typography: PAL */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-end pointer-events-none z-0 opacity-15 select-none">
                <span className="font-display text-7xl sm:text-9xl md:text-[14rem] font-black text-white leading-none">
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
                  I'm a Computer Science student who couldn't wait until graduation to start shipping. From reverse-engineering web application architectures to co-founding <strong className="text-white font-semibold">WythHer</strong> as CTO, I focus on the full spectrum of building products.
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
                    <div className="font-display font-black text-sm tracking-wider uppercase mt-1">
                      {s.title}
                    </div>
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
                  <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                    {activeProcess.headline}
                  </h3>
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

        <Footer />
      </div>
    </PageTransition>
  );
}
