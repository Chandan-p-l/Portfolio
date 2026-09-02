import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Zap,
  Globe2,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { HeroCodeGrid } from '../components/HeroCodeGrid';
import { IdCardModal } from '../components/IdCardModal';
import { PROJECTS, CHANDAN_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

const featured = PROJECTS.slice(0, 4);

// Tech Arsenal Categories for Section 3
const SKILL_CATEGORIES = [
  {
    id: '01',
    title: 'FRONT-END & CREATIVE TECH',
    tagline: 'High-frame-rate web experiences, custom shaders & micro-interactions.',
    items: ['React 19', 'TypeScript', 'Vite / Next.js', 'TailwindCSS v4', 'Framer Motion', 'GSAP', 'HTML5 Canvas', 'Lenis Smooth Scroll']
  },
  {
    id: '02',
    title: 'BACKEND & INFRASTRUCTURE',
    tagline: 'High-throughput APIs, cluster management & idempotent payment pipelines.',
    items: ['Node.js & Express', 'Python', 'PostgreSQL / Supabase', 'MongoDB & Redis', 'Nginx Reverse Proxy', 'PM2 Cluster', 'Docker & Linux', 'REST & WebSockets']
  },
  {
    id: '03',
    title: 'VENTURES & CTO ARCHITECTURE',
    tagline: 'Taking zero-to-one startups from raw whiteboards to production revenues.',
    items: ['Wyther Co-Founder', 'Vedavarti fragrance', 'System Architecture', 'Webhook Queues', 'Payment Integration', 'Logistics API', 'Admin Analytics', 'Security & TLS']
  },
  {
    id: '04',
    title: 'BRAND & EDITORIAL DESIGN',
    tagline: 'Aesthetic direction, visual tokens & brutalist editorial layouts.',
    items: ['Figma Mastery', 'Brand Guidelines', 'Typography Systems', 'Design Tokens', 'Motion Storytelling', 'Film Aesthetics', 'Product Packaging', 'UX Audits']
  }
];

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  
  // Smooth spring physics for fluid hover scroll transition
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Interactive 3D Card Tilt & Glare State via MotionValues (Zero React re-renders)
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltXValue = useMotionValue(0);
  const tiltYValue = useMotionValue(0);
  const cardRotateX = useSpring(tiltXValue, { stiffness: 350, damping: 25 });
  const cardRotateY = useSpring(tiltYValue, { stiffness: 350, damping: 25 });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.85) 0%, rgba(255,43,43,0.25) 45%, transparent 75%)`
  );

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    tiltXValue.set(-normY * 18);
    tiltYValue.set(normX * 18);

    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    glareOpacity.set(0.7);
  };

  const handleCardMouseLeave = () => {
    tiltXValue.set(0);
    tiltYValue.set(0);
    glareOpacity.set(0);
  };

  // Arch background opacity: Fades out quickly so the black background box disappears as scroll begins
  const archOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);

  // Fast transform: By 0.35 of Hero scroll, image is 100% in position at Section 1 left edge
  const portraitX = useTransform(
    smoothProgress,
    [0, 0.35],
    isDesktop ? ['0%', '-146%'] : ['0%', '0%']
  );

  const portraitY = useTransform(
    smoothProgress,
    [0, 0.35],
    isDesktop ? ['0px', '700px'] : ['0px', '250px']
  );

  const portraitRotate = useTransform(smoothProgress, [0, 0.18, 0.35], [0, -3, 0]);
  const portraitScale = useTransform(smoothProgress, [0, 0.35], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(CHANDAN_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <PageTransition>
      <main className="bg-[#080809] text-[#F4F2EC] overflow-hidden font-sans selection:bg-[#FF2B2B] selection:text-white">
        
        {/* ======================================================== */}
        {/* HERO SECTION WITH INTEGRATED CODE CANVAS GRID BACKGROUND */}
        {/* ======================================================== */}
        <section
          ref={heroRef}
          className="relative min-h-[100svh] bg-white text-black px-4 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-12 select-none z-20"
        >
          {/* Integrated Interactive Code Block Matrix Grid Background */}
          <HeroCodeGrid />

          {/* Sub Grid Line Overlay for White Background */}
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,0,0,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.14)_1px,transparent_1px)] [background-size:58px_58px] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,transparent_0%,rgba(0,0,0,.03)_58%,rgba(0,0,0,.12)_100%)] pointer-events-none z-0" />

          {/* Hero Foreground Content */}
          <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-7xl flex-col justify-between z-20 pointer-events-none">
            <div className="flex items-start justify-between border-y border-black/20 py-3 font-tech text-[10px] uppercase tracking-[.2em] pointer-events-auto text-black font-bold">
              <span>Chandan Pal / Independent Portfolio</span>
              <span className="hidden sm:block">Jaipur, India · 2026</span>
              <span>Scroll to enter ↓</span>
            </div>

            <div className="relative grid flex-1 grid-cols-1 items-center lg:grid-cols-12 pointer-events-none gap-6 lg:gap-0">
              <motion.div style={{ y: titleY }} className="relative z-10 lg:col-span-7 pointer-events-none">
                <motion.p
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55 }}
                  className="mb-4 font-tech text-xs font-extrabold uppercase tracking-[.35em] text-[#FF2B2B] pointer-events-auto"
                >
                  Developer · Founder · Product Builder
                </motion.p>
                <h1 className="font-display font-black uppercase leading-[.78] tracking-tight max-w-full overflow-visible pointer-events-none">
                  <motion.span
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-black text-[8vw] sm:text-[6.2vw] lg:text-[4rem] xl:text-[4.8rem] 2xl:text-[5.4rem] font-black tracking-tight"
                  >
                    CHANDAN
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -90 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[#FF2B2B] text-[18vw] sm:text-[14.5vw] lg:text-[9.2rem] xl:text-[10.8rem] 2xl:text-[12.2rem] font-black leading-[.72] tracking-tighter drop-shadow-sm"
                  >
                    PAL
                  </motion.span>
                </h1>
                <div className="mt-8 flex max-w-md items-end gap-6 border-t border-black/20 pt-4 pointer-events-auto">
                  <p className="font-editorial text-2xl leading-[1.05] sm:text-3xl text-neutral-900 font-semibold">
                    I turn rough ideas into products people can actually use.
                  </p>
                  <span className="mb-1 font-tech text-[10px] uppercase tracking-wider text-black font-extrabold">01 / 06</span>
                </div>
              </motion.div>

              <motion.div
                style={{ x: portraitX, y: portraitY, scale: portraitScale, rotate: portraitRotate }}
                initial={{ opacity: 0, y: 80, rotate: 4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 lg:col-span-5 flex flex-col items-center justify-center pointer-events-none"
              >
                {/* Lanyard Top Strap & Metallic Swivel Hook Clip */}
                <div className="relative flex flex-col items-center z-30 pointer-events-none -mb-3">
                  {/* Red Lanyard Fabric Strap */}
                  <div className="w-5 h-16 bg-[#FF2B2B] shadow-md border-x border-black/30 relative flex items-center justify-center">
                    <span className="font-tech text-[7px] text-black font-extrabold rotate-90 tracking-widest uppercase">
                      CP-2026
                    </span>
                  </div>

                  {/* Metallic Silver Clasp Ring Clip */}
                  <div className="w-7 h-6 border-2 border-neutral-400 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-sm shadow-lg flex items-center justify-center -mt-1">
                    <div className="w-2.5 h-2.5 rounded-full border border-gray-600 bg-gray-200" />
                  </div>
                </div>

                {/* Floating micro-animation wrapper for GPU-Accelerated 3D Lanyard ID Card Badge */}
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => {
                    sound.playClick();
                    setIsIdModalOpen(true);
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                  }}
                  data-cursor-text="INSPECT ID"
                  className="relative w-[270px] sm:w-[310px] bg-[#FAFAFA] text-black border-2 border-black/80 p-4.5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] pointer-events-auto group overflow-hidden select-none cursor-pointer will-change-transform"
                >
                  {/* Top Lanyard Oval Punch Hole Slot */}
                  <div className="w-8 h-2 bg-neutral-900 rounded-full mx-auto border border-black/30 mb-2 shadow-inner" />

                  {/* Dynamic Holographic Interactive Glare Sheen Overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl z-30"
                    style={{
                      opacity: glareOpacity,
                      background: glareBg,
                    }}
                  />

                  {/* Badge Header Strip */}
                  <div className="text-center pt-1 pb-2 border-b-2 border-dashed border-black/20">
                    <div className="font-tech text-[9px] uppercase tracking-[.25em] text-[#FF2B2B] font-extrabold mb-0.5">
                      OFFICIAL ACCESS PASS // 2026
                    </div>
                    <div className="font-display font-black text-2xl tracking-tighter text-black uppercase leading-none">
                      THE BUILDER
                    </div>
                  </div>

                  {/* Enlarged Passport Photo Box Frame */}
                  <div className="relative my-3 aspect-[3.5/4.5] w-full overflow-hidden rounded-lg bg-black border-2 border-black shadow-lg">
                    <img
                      src="/hero-portrait.png"
                      alt="Chandan Pal Passport ID Photo"
                      className="w-full h-full object-cover object-top scale-105 grayscale contrast-125 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)]"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#FF2B2B] text-black px-2 py-0.5 font-tech text-[8px] font-extrabold tracking-widest rounded-sm shadow">
                      PASSPORT PHOTO
                    </div>
                  </div>

                  {/* Dotted Field Lines (Name, Role, Status) */}
                  <div className="space-y-1.5 font-tech text-[10px] pt-1">
                    <div className="flex items-baseline justify-between border-b border-dashed border-black/25 pb-1">
                      <span className="text-neutral-500 font-bold uppercase">NAME</span>
                      <span className="font-display font-black text-xs text-black tracking-wider">CHANDAN PAL</span>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-dashed border-black/25 pb-1">
                      <span className="text-neutral-500 font-bold uppercase">ROLE</span>
                      <span className="font-tech font-extrabold text-[10px] text-[#FF2B2B]">DEVELOPER / CTO</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-neutral-500 font-bold uppercase">STATUS</span>
                      <span className="font-tech font-bold text-[10px] text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE BUILDER
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 border-t border-black/20 font-tech text-[10px] uppercase tracking-wider sm:grid-cols-4 pointer-events-auto text-black font-bold">
              {['Products', 'Systems', 'Ventures', 'Experiments'].map((item, index) => (
                <div key={item} className="border-r border-black/20 p-3 last:border-r-0 hover:bg-black/5 transition-colors">
                  <span className="mr-2 text-[#FF2B2B] font-extrabold">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 1: EDITORIAL MANIFESTO (FILM STRIP STYLE CARD GRID) */}
        {/* ======================================================== */}
        <section className="relative bg-[#080809] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 border-b border-white/10">
          {/* Film perforations top strip */}
          <div className="absolute top-0 inset-x-0 h-4 bg-black/60 border-b border-white/10 flex items-center justify-between px-4 font-mono text-[8px] text-neutral-600 select-none overflow-hidden">
            <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ FILM REEL // CP-2026 ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
            <span className="hidden sm:inline">FRAME 001/006</span>
            <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ EDITORIAL MANIFESTO ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
          </div>

          <div className="max-w-7xl mx-auto pt-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end mb-16">
              {/* Heading occupies right columns cleanly while left area stays 100% open for the interactive ID card */}
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase leading-[.85] tracking-tight lg:col-span-8 lg:col-start-5 text-white">
                I BUILD PRODUCTS<br />
                <span className="text-[#FF2B2B]">WITH A BACKBONE.</span>
              </h2>
            </div>

            {/* 3 Interactive Brutalist Cards with Hover Flip to Vibrant Red */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'MAKE IT USEFUL',
                  tag: 'SYSTEMS & RELIABILITY',
                  desc: 'The interface is only the beginning. I care deeply about the backend operation, payment webhooks, database indexing, and infrastructure behind it.',
                  metric: '<0.12ms LATENCY',
                  icon: Cpu
                },
                {
                  number: '02',
                  title: 'MAKE IT FELT',
                  tag: 'CREATIVE TECH & BRAND',
                  desc: 'Products earn attention when they have a distinct point of view, high frame rates, film-grade aesthetics, and micro-interactions.',
                  metric: '60 FPS ANIMATIONS',
                  icon: Sparkles
                },
                {
                  number: '03',
                  title: 'MAKE IT MOVE',
                  tag: 'VELOCITY & PROTOTYPES',
                  desc: 'Ideas become real through rapid prototypes and deliberate launches. From raw Figma whiteboards to production revenues in weeks.',
                  metric: '99.9% UPTIME',
                  icon: Zap
                }
              ].map((card, idx) => (
                <motion.article
                  key={card.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -12 }}
                  onMouseEnter={() => sound.playHover()}
                  className="group relative min-h-[22rem] bg-[#0E0E10] border border-white/10 p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-black overflow-hidden shadow-2xl"
                >
                  {/* Background Film Grain and Index Watermark */}
                  <div className="absolute top-2 right-4 font-display text-8xl font-black text-white/5 group-hover:text-black/10 select-none pointer-events-none">
                    {card.number}
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-tech text-xs text-[#FF2B2B] group-hover:text-black font-bold uppercase tracking-wider mb-6">
                      <span>{card.number} // {card.tag}</span>
                      <card.icon className="w-4 h-4" />
                    </div>

                    <h3 className="font-display text-3xl font-black uppercase text-white group-hover:text-black leading-tight mb-4">
                      {card.title}
                    </h3>

                    <p className="font-sans text-sm text-neutral-400 group-hover:text-black/90 leading-relaxed max-w-xs">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 group-hover:border-black/30 flex items-center justify-between font-tech text-[10px] font-bold uppercase tracking-widest text-[#FF2B2B] group-hover:text-black">
                    <span>STATUS: ACTIVE</span>
                    <span className="px-2 py-0.5 bg-black/40 group-hover:bg-black group-hover:text-white rounded">
                      {card.metric}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: AWWWARDS FILM ROLL // FEATURED PROJECTS */}
        {/* ======================================================== */}
        <section className="relative bg-[#080809] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            {/* Header Strip */}
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-6">
              <div>
                <div className="flex items-center gap-2 font-tech text-xs text-[#FF2B2B] font-bold uppercase tracking-[.3em] mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>02 // SELECTED WORK & PROOF</span>
                </div>
                <h2 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
                  THE PROOF<span className="text-[#FF2B2B]">.</span>
                </h2>
              </div>

              <Link
                to="/work"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-3 bg-white/5 hover:bg-[#FF2B2B] hover:text-black border border-white/15 px-6 py-3 font-tech text-xs font-bold uppercase tracking-widest transition-all"
              >
                <span>ALL PROJECTS ARCHIVE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            {/* Featured Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((project, idx) => (
                <Link
                  key={project.id}
                  to={project.id === 'wyther' ? '/work/wyther' : '/work'}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`group relative min-h-[26rem] p-8 sm:p-10 border transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl ${
                    idx === 0
                      ? 'bg-[#FF2B2B] text-black border-[#FF2B2B] md:col-span-2'
                      : 'bg-[#0E0E10] text-[#F4F2EC] border-white/10 hover:border-[#FF2B2B]'
                  }`}
                >
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between font-tech text-xs uppercase tracking-widest relative z-10">
                    <span className={idx === 0 ? 'text-black font-extrabold' : 'text-[#FF2B2B] font-bold'}>
                      PROJECT / {project.number}
                    </span>
                    <span className={idx === 0 ? 'text-black/80 font-bold' : 'text-neutral-400'}>
                      {project.year}
                    </span>
                  </div>

                  {/* Watermark Index Number */}
                  <div
                    className={`absolute right-4 top-8 font-display text-9xl font-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 ${
                      idx === 0 ? 'text-black/10' : 'text-white/5'
                    }`}
                  >
                    {project.number}
                  </div>

                  {/* Center Content */}
                  <div className="relative z-10 my-auto py-6">
                    <p className={`font-tech text-xs font-bold uppercase tracking-wider mb-2 ${idx === 0 ? 'text-black/80' : 'text-[#FF2B2B]'}`}>
                      {project.role} · {project.category}
                    </p>
                    <h3 className={`font-display text-4xl sm:text-6xl font-black uppercase leading-none tracking-tight mb-4 ${idx === 0 ? 'text-black' : 'text-white group-hover:text-[#FF2B2B] transition-colors'}`}>
                      {project.title}
                    </h3>
                    <p className={`max-w-2xl font-sans text-sm sm:text-base leading-relaxed ${idx === 0 ? 'text-black/90 font-medium' : 'text-neutral-300'}`}>
                      {project.tagline}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px]">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded uppercase font-bold tracking-wider ${
                            idx === 0
                              ? 'bg-black text-white'
                              : 'bg-white/10 text-white border border-white/10 group-hover:border-[#FF2B2B]/40'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="relative z-10 flex items-center justify-between pt-6 border-t border-current/20 font-tech text-xs font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-black animate-pulse' : 'bg-[#FF2B2B] animate-pulse'}`} />
                      EXPLORE CASE STUDY
                    </span>
                    <ArrowDownRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: TECH ARSENAL & SKILLS MATRIX */}
        {/* ======================================================== */}
        <section className="relative bg-[#050506] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 font-tech text-xs text-[#FF2B2B] font-bold uppercase tracking-[.3em] mb-3">
              <Layers className="w-4 h-4" />
              <span>03 // TECH LAB & ARSENAL</span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8 mb-12">
              <h2 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
                THE CAPABILITIES<span className="text-[#FF2B2B]">.</span>
              </h2>
              <p className="font-tech text-xs text-neutral-400 max-w-sm uppercase">
                Production-proven stack across client rendering, edge gateways, database engines & visual systems.
              </p>
            </div>

            {/* Interactive Category Tabs */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SKILL_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onMouseEnter={() => sound.playHover()}
                  className="bg-[#0E0E10] border border-white/10 hover:border-[#FF2B2B] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between font-tech text-xs text-[#FF2B2B] font-bold uppercase mb-4">
                      <span>{cat.id} // MATRIX</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-[#FF2B2B] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6">
                      {cat.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between font-tech text-xs text-neutral-300 group-hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#FF2B2B] font-bold">›</span>
                          {item}
                        </span>
                        <span className="text-[10px] text-neutral-600">PRODUCTION</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: HIGH-DENSITY METRICS STRIP */}
        {/* ======================================================== */}
        <section className="bg-black py-12 border-b border-white/10 font-tech">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '04+', label: 'YEARS BUILDING' },
              { val: '12+', label: 'SHIPPED VENTURES' },
              { val: '99.9%', label: 'SYSTEM UPTIME' },
              { val: '<50ms', label: 'API LATENCY' }
            ].map((stat, idx) => (
              <div key={idx} className="border-r border-white/10 last:border-r-0 p-4">
                <div className="font-display text-4xl sm:text-6xl font-black text-[#FF2B2B]">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: BRUTALIST CALL TO ACTION ("LET'S MAKE A MARK") */}
        {/* ======================================================== */}
        <section className="relative bg-[#FF2B2B] text-black px-4 py-24 sm:px-8 sm:py-32 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_42px,rgba(0,0,0,.12)_43px)] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-3 font-tech text-xs font-bold uppercase tracking-[.3em] mb-6">
              <span className="w-3 h-3 rounded-full bg-black animate-ping" />
              <span>04 // CONTACT & COLLABORATION</span>
            </div>

            <h2 className="font-display text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase leading-[.78] tracking-tighter mb-12">
              LET’S MAKE<br />
              <span className="text-white text-stroke-black">A MARK.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-4 bg-black text-white hover:bg-white hover:text-black px-8 py-5 font-tech text-xs font-bold uppercase tracking-widest transition-all shadow-2xl"
              >
                <span>START A CONVERSATION</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-3 bg-black/10 border-2 border-black px-6 py-5 font-tech text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'EMAIL COPIED TO CLIPBOARD!' : CHANDAN_INFO.email}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Fullscreen Interactive ID Inspection Modal */}
        <IdCardModal isOpen={isIdModalOpen} onClose={() => setIsIdModalOpen(false)} />
      </main>
    </PageTransition>
  );
}
