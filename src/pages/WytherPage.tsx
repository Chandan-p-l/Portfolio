import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Database, Shield, Cpu, Layers, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ShoppingBag, Terminal, Sparkles, Network, Globe, Activity } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { sound } from '../utils/sound';
import { PROJECTS } from '../data/portfolioData';
import { FitText } from '../components/FitText';

const wytherProject = PROJECTS.find((p) => p.id === 'wythher') || PROJECTS[0];

const CHAPTERS = [
  {
    id: 'problem',
    num: '01',
    title: 'THE PROBLEM',
    headline: 'PERIOD CARE IN INDIA NEEDED TRUST, NOT TEMPLATES.',
    body: 'WythHer sells stage-based period care — first periods, teens, adults. A brand like that lives or dies on trust and on how easy it is to buy, so the storefront had to feel premium, explain the product clearly and load fast on everyday phones.',
    insight: 'For a first-time buyer, a confusing checkout is a reason to walk away.',
    deliverable: 'A storefront designed around clarity, trust and speed',
  },
  {
    id: 'product',
    num: '02',
    title: 'THE PRODUCT',
    headline: 'A MODERN D2C STOREFRONT FOR A LIFECYCLE BRAND.',
    body: 'I built wythher.com with React and Next.js on Vercel. Product pages for kits like the Moody Box explain what is inside, how the pad is made and why it is safe — in the brand\'s warm, older-sister voice.',
    insight: 'The product page is the sales conversation.',
    deliverable: 'Next.js storefront deployed on Vercel',
  },
  {
    id: 'experience',
    num: '03',
    title: 'THE EXPERIENCE & CHECKOUT',
    headline: 'ONLINE PAYMENTS AND CASH ON DELIVERY.',
    body: 'Checkout supports Razorpay for UPI, cards and net banking, plus cash on delivery — because COD still matters for first-time buyers in India. Orders are verified server-side, never trusted from the browser alone.',
    insight: 'Supporting COD can matter more than any animation.',
    deliverable: 'Razorpay + COD checkout flow',
  },
  {
    id: 'system',
    num: '04',
    title: 'THE ROLE & SYSTEM',
    headline: '"I DIDN\'T JUST BUILD THE WEBSITE. I HELPED BUILD THE SYSTEM."',
    body: 'As CTO and Co-founder of VagMed India, my work goes beyond the storefront: a full D2C admin platform for orders, inventory, customers and content, plus technology strategy, tooling choices and market analysis for the company.',
    insight: 'Software is a vehicle for operations and customer trust.',
    deliverable: 'Full D2C admin platform',
  },
  {
    id: 'architecture',
    num: '05',
    title: 'THE ARCHITECTURE',
    headline: 'A LEAN STACK A SMALL TEAM CAN RUN.',
    body: 'The storefront runs on Next.js and Vercel. Data and admin services use Supabase, Firebase and PHP with MySQL. Payments go through Razorpay with server-side verification. The goal: reliable, cheap to operate and easy to change quickly.',
    insight: 'For a startup, the best architecture is the one you can ship and maintain.',
    deliverable: 'Storefront, admin, data and payments — one backbone',
  },
  {
    id: 'content',
    num: '06',
    title: 'CONTENT & SEO',
    headline: 'THE WYTHHER JOURNAL.',
    body: 'The site runs the WythHer Journal — articles on pad changing, rashes, leaks, fatigue during periods and talking to young people about first periods. Technical SEO and structured data were part of the build from day one.',
    insight: 'Education builds trust before the first purchase.',
    deliverable: 'SEO-first educational content hub',
  },
  {
    id: 'launch',
    num: '07',
    title: 'LAUNCH & ITERATE',
    headline: 'SHIPPING IS WHERE THE REAL WORK BEGINS.',
    body: 'WythHer is launching in 2026. Every release is measured against real behaviour — what people read, where they hesitate, what they buy — and the product improves from there.',
    insight: 'Launch, measure, improve, repeat.',
    deliverable: 'Live production storefront at wythher.com',
  }
];

const SYSTEM_NODES = [
  { name: 'PRODUCT STRATEGY', desc: 'Market analysis, kits, pricing inputs' },
  { name: 'UI / UX', desc: 'Brand system on the web, mobile-first flows' },
  { name: 'STOREFRONT', desc: 'Next.js on Vercel, fast product pages' },
  { name: 'ADMIN PLATFORM', desc: 'Orders, inventory, customers, content' },
  { name: 'DATA LAYER', desc: 'Supabase, Firebase, PHP + MySQL' },
  { name: 'PAYMENTS & SEO', desc: 'Razorpay + COD, technical SEO, analytics' },
];

const ARCH_LAYERS = [
  { id: 'user', name: '01. SHOPPER', tech: 'Mobile & desktop', desc: 'Visitors discovering kits and reading the Journal' },
  { id: 'frontend', name: '02. STOREFRONT', tech: 'React · Next.js', desc: 'Product pages, cart and checkout' },
  { id: 'gateway', name: '03. HOSTING & EDGE', tech: 'Vercel', desc: 'Global deployment, HTTPS and caching' },
  { id: 'api', name: '04. ADMIN PLATFORM', tech: 'Full D2C admin', desc: 'Orders, inventory, customers and content' },
  { id: 'db', name: '05. DATA TIER', tech: 'Supabase · Firebase · MySQL', desc: 'Products, orders and customer records' },
  { id: 'webhooks', name: '06. PAYMENTS', tech: 'Razorpay · COD', desc: 'Online payments verified server-side, plus cash on delivery' },
];

export function WytherPage() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [selectedArchLayer, setSelectedArchLayer] = useState(0);
  const [showRedTransition, setShowRedTransition] = useState(false);

  const handleChapterClick = (idx: number) => {
    sound.playSwitch();
    setActiveChapter(idx);
  };

  const triggerDramaticTransition = () => {
    sound.playClick();
    setShowRedTransition(true);
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Full-Screen Red Wipe Transition Modal */}
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
                <span>WYTHHER // CASE STUDY TRANSITION</span>
                <span>CP-2026</span>
              </div>

              <div className="my-auto max-w-6xl">
                <div className="font-tech text-xs tracking-[0.4em] uppercase font-bold mb-4">
                  THE BUILD CYCLE
                </div>
                <FitText as="h2" text="IMPROVED." max={11} className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.88] uppercase">
                  BUILT.<br />
                  BROKEN.<br />
                  IMPROVED.<br />
                  SHIPPED.
                </FitText>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/20 pt-6">
                <span className="font-tech text-xs font-bold tracking-wider">
                  FLAGSHIP STARTUP CASE STUDY COMPLETE
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowRedTransition(false)}
                    className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black font-tech text-xs tracking-widest uppercase font-bold transition-all"
                  >
                    RETURN TO CASE STUDY
                  </button>
                  <Link
                    to="/work"
                    onClick={() => sound.playClick()}
                    className="px-6 py-3 bg-white text-black hover:bg-black hover:text-white font-tech text-xs tracking-widest uppercase font-bold transition-all"
                  >
                    EXPLORE MORE WORK →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Hero Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
              <Link
                to="/work"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 text-[#8A8A84] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO WORK ARCHIVE</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-ping" />
                <span className="text-[#FF2B2B] font-bold">ROLE: CTO & CO-FOUNDER</span>
              </div>
            </div>

            <div className="font-tech text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-2">
              VENTURE SPEC // VAGMED INDIA PRIVATE LIMITED
            </div>

            <FitText as="h1" text="WYTHHER" max={13} className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black tracking-tighter leading-none text-white uppercase mb-6 hover:text-[#FF2B2B] transition-colors">
              WYTHHER
            </FitText>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="font-future text-base sm:text-xl text-neutral-300 tracking-wider">
                CTO & CO-FOUNDER · D2C STOREFRONT & ADMIN PLATFORM
              </span>
              <a
                href="https://wythher.com"
                target="_blank"
                rel="noopener"
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="VISIT"
                className="flex items-center gap-2 font-tech text-xs text-[#FF2B2B] border border-[#FF2B2B]/40 px-3 py-1 bg-[#FF2B2B]/10 hover:bg-[#FF2B2B] hover:text-black transition-colors"
              >
                LIVE · WYTHHER.COM <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Architectural Thesis Block */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto p-8 sm:p-12 border border-white/15 bg-[#090909]">
            <div className="font-tech text-[10px] sm:text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-3">
              [ ARCHITECTURAL THESIS ]
            </div>
            <p className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase">
              A PRODUCT BUILT FROM SCRATCH.
            </p>
            <p className="font-sans text-base sm:text-lg text-neutral-300 mt-4 max-w-3xl leading-relaxed font-light">
              Taking WythHer from raw whiteboards to an active production venture: architecting the frontend storefront, robust API cluster, database transactions, payment webhooks, and brand design.
            </p>
          </div>
        </section>

        {/* 7-Chapter Interactive Story Navigator */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">01 // NARRATIVE PHASES</span>
                <span className="text-white">7-CHAPTER DEEP DIVE</span>
              </div>
              <span className="text-[#8A8A84]">CLICK CHAPTERS TO EXPLORE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Chapter Selector Tabs */}
              <div className="lg:col-span-4 space-y-2">
                {CHAPTERS.map((ch, idx) => {
                  const isCurrent = activeChapter === idx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleChapterClick(idx)}
                      onMouseEnter={() => sound.playHover()}
                      className={`w-full text-left p-3.5 sm:p-4 border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-white text-black border-white shadow-xl'
                          : 'bg-black/50 text-[#8A8A84] border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-tech text-[10px] opacity-75">
                          CHAPTER {ch.num}
                        </div>
                        <div className="font-display font-black text-xs sm:text-sm tracking-wider">
                          {ch.title}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isCurrent ? 'text-black' : 'text-neutral-500'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Chapter Content Display */}
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
                      <span className="text-[#FF2B2B] font-bold">WYTHHER // {CHAPTERS[activeChapter].title}</span>
                      <span className="text-[#8A8A84]">CHAPTER 0{activeChapter + 1} OF 07</span>
                    </div>

                    <FitText as="h3" text={CHAPTERS[activeChapter].headline} max={2.25} className="font-display text-2xl sm:text-4xl font-black text-white leading-tight">
                      {CHAPTERS[activeChapter].headline}
                    </FitText>

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
                  <span>EXECUTION: CHANDAN PAL (CTO)</span>
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
          </div>
        </section>

        {/* The Connected Nervous System Diagram */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="border border-white/15 bg-[#090909] p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-[#FF2B2B]" />
                  <span className="text-white font-bold">THE CONNECTED NERVOUS SYSTEM</span>
                </div>
                <span className="text-[#8A8A84]">CHANDAN PAL IN CENTER CONNECTING ALL TIERS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {SYSTEM_NODES.map((node, idx) => (
                  <div
                    key={node.name}
                    className="p-5 bg-black border border-white/10 hover:border-[#FF2B2B] transition-colors"
                  >
                    <div className="font-tech text-[10px] text-[#FF2B2B] mb-1">NODE 0{idx + 1}</div>
                    <div className="font-display font-black text-sm text-white mb-2">{node.name}</div>
                    <p className="font-sans text-xs text-[#8A8A84] leading-relaxed">{node.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-black/60 border border-white/10 font-tech text-xs text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-[#FF2B2B] font-bold">» ARCHITECTURAL RESULT:</span>
                <span>Storefront · Admin platform · Payments · Content</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Architecture Topology */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="border border-white/15 bg-black p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#FF2B2B]" />
                  <span className="text-white font-bold">INTERACTIVE ARCHITECTURE TOPOLOGY</span>
                </div>
                <span className="text-[#FF2B2B]">CLICK LAYERS TO INSPECT SYSTEM METRICS</span>
              </div>

              {/* Layer Tabs */}
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

              {/* Layer Inspector Detail Box */}
              <div className="bg-[#0D0D0D] border border-white/10 p-6 font-tech">
                <div className="text-xs text-[#FF2B2B] mb-1">
                  SYSTEM TIER // {ARCH_LAYERS[selectedArchLayer].tech}
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-black text-white mb-2">
                  {ARCH_LAYERS[selectedArchLayer].name}
                </h4>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-4">
                  {ARCH_LAYERS[selectedArchLayer].desc}
                </p>
                <div className="text-xs text-[#8A8A84]">
                  LAYER STATUS: <span className="text-emerald-400 font-bold">OPTIMIZED & MONITORED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack & Dramatic Transition Footer */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 select-none">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="border border-white/15 bg-black/60 p-6 sm:p-8">
              <div className="font-tech text-xs text-[#8A8A84] mb-4 tracking-widest uppercase">
                WYTHHER COMPLETE TECHNOLOGY STACK:
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

            <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="font-tech text-xs text-[#8A8A84] block mb-1">CASE STUDY // CONCLUSION</span>
                <span className="font-display text-2xl font-black text-white">THE CYCLE CONTINUES.</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={triggerDramaticTransition}
                  onMouseEnter={() => sound.playHover()}
                  className="px-6 py-3.5 bg-[#FF2B2B] hover:bg-white text-black font-tech text-xs font-bold tracking-widest uppercase transition-all shadow-xl"
                >
                  TRIGGER TRANSITION [BUILT. SHIPPED.]
                </button>
                <Link
                  to="/work"
                  onClick={() => sound.playClick()}
                  className="px-6 py-3.5 bg-transparent border border-white/20 text-white font-tech text-xs font-bold tracking-widest uppercase hover:border-white transition-all"
                >
                  RETURN TO WORK ARCHIVE
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
