import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Database, Shield, Cpu, Layers, ArrowUpRight, CheckCircle2, ChevronRight, ShoppingBag, Terminal, Sparkles, Network } from 'lucide-react';
import { sound } from '../utils/sound';
import { PROJECTS } from '../data/portfolioData';

const wytherProject = PROJECTS.find((p) => p.id === 'wyther') || PROJECTS[0];

const CHAPTERS = [
  {
    id: 'problem',
    num: '01',
    title: 'THE PROBLEM',
    headline: 'OFF-THE-SHELF TEMPLATES ARE BROKEN FOR HIGH-CONVERSION D2C.',
    body: 'Traditional e-commerce templates are bloated with unnecessary JavaScript trackers, slow page render times, and rigid rigid checkout structures that destroy customer momentum.',
    insight: 'Friction in the first 3 seconds directly kills 40%+ of mobile conversions.',
    deliverable: 'Zero-bloat custom architecture with sub-second First Contentful Paint'
  },
  {
    id: 'product',
    num: '02',
    title: 'THE PRODUCT',
    headline: 'AN ULTRA-FAST, MINIMALIST D2C COMMERCE PLATFORM.',
    body: 'WythHer was engineered from raw whiteboards to a complete production storefront. We united minimalist brutalist typography, bespoke product bundle selectors, instant cart drawers, and frictionless mobile checkouts.',
    insight: '100% custom-crafted storefront with zero template dependencies.',
    deliverable: 'Custom React Storefront & Modular Product Bundle Engine'
  },
  {
    id: 'experience',
    num: '03',
    title: 'THE EXPERIENCE',
    headline: 'TACTILE MICRO-INTERACTIONS & SEAMLESS CHECKOUT FLOWS.',
    body: 'Designed every touchpoint in Figma before writing a single line of code. Smooth quantity drawers, responsive order summaries, real-time inventory verification, and localized payment gateways (UPI, Cards, NetBanking).',
    insight: 'Micro-animations convey tactile reassurance during high-value payment transactions.',
    deliverable: 'Complete Design System & High-Fidelity Mobile Interfaces'
  },
  {
    id: 'system',
    num: '04',
    title: 'THE ROLE & SYSTEM',
    headline: '"I DIDN\'T JUST BUILD THE WEBSITE. I HELPED BUILD THE SYSTEM."',
    body: 'As CTO and Co-Founder, my responsibility extended beyond code. I engineered the entire operational nervous system: payment webhook reconciliation, automated inventory sync, courier dispatch APIs, and real-time customer tracking.',
    insight: 'Software is merely a vehicle for operational excellence and customer delight.',
    deliverable: 'End-to-End Operational Pipeline & Automated Fulfillment Engine'
  },
  {
    id: 'architecture',
    num: '05',
    title: 'THE ARCHITECTURE',
    headline: 'DECOUPLED, CLUSTERED & FAULT-TOLERANT CLOUD STACK.',
    body: 'Engineered a resilient multi-tier topology: React client on edge CDN -> Nginx reverse proxy with SSL termination and rate limiting -> Express.js API cluster running on multi-core PM2 instances -> Hybrid SQL & Document database tier -> Idempotent asynchronous webhook event bus.',
    insight: 'Idempotent webhook handlers ensure zero duplicate charges or lost orders during network blips.',
    deliverable: 'High-Availability Linux Infrastructure & REST API Microservices'
  }
];

const SYSTEM_NODES = [
  { name: 'PRODUCT STRATEGY', desc: 'Market discovery, bundle mechanics, unit economics' },
  { name: 'UI / UX DESIGN', desc: 'Figma tokens, responsive mobile drawer, micro-interactions' },
  { name: 'FRONTEND STOREFRONT', desc: 'React SPA, sub-second FCP, zero layout shift' },
  { name: 'BACKEND REST API', desc: 'Express cluster, PM2 workers, request rate limiting' },
  { name: 'DATABASE & TRANSACTIONS', desc: 'Relational orders/billing & document session caching' },
  { name: 'AUTOMATION & WEBHOOKS', desc: 'Idempotent payment listeners, SMS dispatch, logistics' },
];

const ARCH_LAYERS = [
  { id: 'user', name: '01. USER & BROWSER', tech: 'Client Device', desc: 'Mobile/Desktop visitor initiating shopping session' },
  { id: 'frontend', name: '02. FRONTEND STOREFRONT', tech: 'React · Tailwind CSS', desc: 'Zero-bloat SPA with instant cart & bundle selectors' },
  { id: 'gateway', name: '03. EDGE NGINX INGRESS', tech: 'Nginx · Ubuntu · SSL', desc: 'Reverse proxy handling SSL, gzip, rate limiting' },
  { id: 'api', name: '04. EXPRESS API CLUSTER', tech: 'Node.js · PM2', desc: 'Multi-worker API handling auth, carts, order processing' },
  { id: 'db', name: '05. HYBRID DATA TIER', tech: 'MySQL · Supabase', desc: 'Relational transactions for orders + document caching' },
  { id: 'webhooks', name: '06. ASYNC WEBHOOK SERVICES', tech: 'Payment & Courier', desc: 'Idempotent event listener & automated notifications' },
];

export function WytherCaseStudy() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [selectedArchLayer, setSelectedArchLayer] = useState(0);
  const [showRedTransition, setShowRedTransition] = useState(false);

  useEffect(() => {
    if (!showRedTransition) return;
    (window as any).lenis?.stop();
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      (window as any).lenis?.start();
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [showRedTransition]);

  const handleChapterClick = (idx: number) => {
    sound.playSwitch();
    setActiveChapter(idx);
  };

  const triggerDramaticTransition = () => {
    sound.playClick();
    setShowRedTransition(true);
  };

  return (
    <section
      id="wyther-flagship"
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      {/* Chapter 06: The Dramatic Full-Screen Red Wipe Transition */}
      <AnimatePresence>
        {showRedTransition && (
          <motion.div
            initial={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#FF2B2B] text-black flex flex-col justify-between p-8 sm:p-16 select-none"
          >
            <div className="flex items-center justify-between font-tech text-xs tracking-widest font-bold border-b border-black/20 pb-4">
              <span>WYTHER // CHAPTER 06: TRANSITION</span>
              <span>CP-2026</span>
            </div>

            <div className="my-auto max-w-6xl">
              <div className="font-tech text-xs tracking-[0.4em] uppercase font-bold mb-4">
                THE BUILD LOOP
              </div>
              <h2 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.88] uppercase">
                BUILT.<br />
                BROKEN.<br />
                IMPROVED.<br />
                SHIPPED.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/20 pt-6">
              <span className="font-tech text-xs font-bold tracking-wider">
                FLAGSHIP STARTUP CASE STUDY COMPLETE
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowRedTransition(false);
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-black text-white hover:bg-white hover:text-black font-tech text-xs tracking-widest uppercase font-bold transition-all shadow-2xl"
              >
                EXPLORE ALL PROJECTS →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Top Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">03 // FLAGSHIP CASE STUDY</span>
            <span className="text-white">PROJECT 001</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-ping" />
            <span className="text-white font-bold">ROLE: CTO & CO-FOUNDER</span>
          </div>
        </div>

        {/* Viewport Monumental WythHer Title */}
        <div className="mb-16">
          <div className="font-tech text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-2">
            VENTURE ARCHIVE // 2025 - 2026
          </div>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black tracking-tighter leading-none text-white uppercase hover:text-[#FF2B2B] transition-colors duration-300">
            WYTHER
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-white/10 pb-8">
            <span className="font-future text-base sm:text-xl text-neutral-300 tracking-wider">
              FULL-STACK E-COMMERCE & BRAND PLATFORM
            </span>
            <div className="font-tech text-xs text-[#FF2B2B] border border-[#FF2B2B]/40 px-3 py-1 bg-[#FF2B2B]/10">
              STATUS: PRODUCTION DEPLOYMENT
            </div>
          </div>
        </div>

        {/* Architectural Thesis Block */}
        <div className="mb-16 p-8 sm:p-12 border border-white/15 bg-[#090909]">
          <div className="font-tech text-[10px] sm:text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-3">
            [ ARCHITECTURAL THESIS ]
          </div>
          <p className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase">
            A PRODUCT BUILT FROM SCRATCH.
          </p>
          <p className="font-sans text-base sm:text-lg text-neutral-300 mt-4 max-w-3xl leading-relaxed">
            Taking WythHer from raw whiteboards to an active production venture: architecting the frontend storefront, robust API cluster, database transactions, payment webhooks, and brand design.
          </p>
        </div>

        {/* 5-Chapter Interactive Story Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Chapter Selector */}
          <div className="lg:col-span-4 space-y-2">
            <div className="font-tech text-xs text-[#8A8A84] mb-3 tracking-widest uppercase">
              CINEMATIC CHAPTERS:
            </div>
            {CHAPTERS.map((ch, idx) => {
              const isCurrent = activeChapter === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleChapterClick(idx)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text={`CH ${ch.num}`}
                  className={`w-full text-left p-4 border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-white text-black border-white shadow-xl'
                      : 'bg-black/50 text-[#8A8A84] border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-tech text-[10px] opacity-75">
                      CHAPTER {ch.num}
                    </div>
                    <div className="font-display font-black text-sm sm:text-base tracking-wider">
                      {ch.title}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isCurrent ? 'text-black' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Chapter Content Panel */}
          <div className="lg:col-span-8 border border-white/15 bg-black p-6 sm:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-tech text-xs">
                  <span className="text-[#FF2B2B] font-bold">WYTHER // {CHAPTERS[activeChapter].title}</span>
                  <span className="text-[#8A8A84]">CHAPTER 0{activeChapter + 1} OF 05</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
                  {CHAPTERS[activeChapter].headline}
                </h3>

                <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                  {CHAPTERS[activeChapter].body}
                </p>

                <div className="bg-[#111] border border-white/10 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF2B2B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech text-[10px] text-[#8A8A84] uppercase">KEY DELIVERABLE</div>
                    <span className="font-tech text-xs sm:text-sm text-white font-medium">
                      {CHAPTERS[activeChapter].deliverable}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-center font-tech text-xs text-[#8A8A84]">
              <span>WYTHER CASE STUDY</span>
              <button
                onClick={() => handleChapterClick((activeChapter + 1) % CHAPTERS.length)}
                className="text-[#FF2B2B] hover:text-white flex items-center gap-1 font-bold"
              >
                <span>NEXT CHAPTER</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chapter 04: The System & Central Node Diagram */}
        <div className="border border-white/15 bg-[#090909] p-6 sm:p-10 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#FF2B2B]" />
              <span className="text-white font-bold">THE CONNECTED NERVOUS SYSTEM</span>
            </div>
            <span className="text-[#8A8A84]">CHANDAN PAL IN CENTER CONNECTING ALL TIERS</span>
          </div>

          {/* Central Radial / Grid System Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {SYSTEM_NODES.map((node, idx) => (
              <div
                key={node.name}
                className="p-4 bg-black border border-white/10 hover:border-[#FF2B2B] transition-colors"
              >
                <div className="font-tech text-[10px] text-[#FF2B2B] mb-1">NODE 0{idx + 1}</div>
                <div className="font-display font-black text-sm text-white mb-2">{node.name}</div>
                <p className="font-sans text-xs text-[#8A8A84]">{node.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/60 border border-white/10 font-tech text-xs text-neutral-300 flex items-center justify-between">
            <span className="text-[#FF2B2B] font-bold">» ARCHITECTURAL RESULT:</span>
            <span>Sub-second page latency · 100% order capture · Automated fulfillment</span>
          </div>
        </div>

        {/* Chapter 05: The Interactive Architecture Topology */}
        <div className="border border-white/15 bg-black p-6 sm:p-10 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF2B2B]" />
              <span className="text-white font-bold">INTERACTIVE ARCHITECTURE TOPOLOGY</span>
            </div>
            <span className="text-[#FF2B2B]">CLICK LAYERS TO INSPECT SYSTEM METRICS</span>
          </div>

          {/* Horizontal layer selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-6">
            {ARCH_LAYERS.map((layer, idx) => {
              const isSelected = selectedArchLayer === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedArchLayer(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text="INSPECT"
                  className={`p-3 text-left border transition-all ${
                    isSelected
                      ? 'bg-[#FF2B2B] text-white border-[#FF2B2B] shadow-xl'
                      : 'bg-neutral-950 text-[#8A8A84] border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="font-tech text-[9px] opacity-75 mb-1">{layer.tech}</div>
                  <div className="font-display font-black text-xs tracking-wider truncate">{layer.name}</div>
                </button>
              );
            })}
          </div>

          {/* Layer Detail Inspector */}
          <div className="bg-[#0D0D0D] border border-white/10 p-6">
            <div className="font-tech text-xs text-[#FF2B2B] mb-1">
              SYSTEM TIER // {ARCH_LAYERS[selectedArchLayer].tech}
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-black text-white mb-2">
              {ARCH_LAYERS[selectedArchLayer].name}
            </h4>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-4">
              {ARCH_LAYERS[selectedArchLayer].desc}
            </p>
            <div className="font-tech text-xs text-[#8A8A84]">
              LAYER STATUS: <span className="text-emerald-400 font-bold">OPTIMIZED & MONITORED</span>
            </div>
          </div>
        </div>

        {/* Full Tech Stack Pills for WythHer */}
        <div className="border border-white/15 bg-black/60 p-6 sm:p-8 mb-16">
          <div className="font-tech text-xs text-[#8A8A84] mb-4 tracking-widest uppercase">
            WYTHER COMPLETE TECHNOLOGY STACK:
          </div>
          <div className="flex flex-wrap gap-2">
            {wytherProject.techStack.map((tech) => (
              <span
                key={tech}
                className="font-tech text-xs text-white bg-[#121212] border border-white/15 px-3 py-1.5 hover:border-[#FF2B2B] hover:text-[#FF2B2B] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Transition Moment Trigger (Chapter 06) */}
        <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-tech text-xs text-[#8A8A84] block mb-1">CHAPTER 06 // CONCLUSION</span>
            <span className="font-display text-2xl font-black text-white">THE CYCLE CONTINUES.</span>
          </div>

          <button
            onClick={triggerDramaticTransition}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="TRIGGER"
            className="px-6 py-3.5 bg-[#FF2B2B] hover:bg-white text-black font-tech text-xs font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-red-500/20"
          >
            TRIGGER TRANSITION [BUILT. SHIPPED.]
          </button>
        </div>
      </div>
    </section>
  );
}
