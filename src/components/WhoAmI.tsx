import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Palette, Code2, Server, Rocket, ArrowRight, CheckCircle2, Terminal, Sparkles, User, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';

const PROCESS_NODES = [
  {
    id: 'idea',
    step: '01',
    label: 'IDEA',
    icon: Lightbulb,
    headline: 'RAW PROBLEM IDENTIFICATION',
    desc: 'Uncovering latent customer friction, white-space market needs, and technical feasibility before writing a single line of code.',
    deliverable: 'Problem Statement & Opportunity Thesis',
    accent: '#FF2B2B',
  },
  {
    id: 'design',
    step: '02',
    label: 'DESIGN',
    icon: Palette,
    headline: 'EXPERIENCE & INTERFACE ARCHITECTURE',
    desc: 'Crafting mathematical layout systems, typographic hierarchies, tactile design tokens, and user flow wireframes in Figma.',
    deliverable: 'Design System & High-Fidelity Prototypes',
    accent: '#FFFFFF',
  },
  {
    id: 'code',
    step: '03',
    label: 'CODE',
    icon: Code2,
    headline: 'CLEAN, RESILIENT FRONTEND & BACKEND',
    desc: 'Writing modular TypeScript, reactive React components, idempotent REST/GraphQL APIs, and decoupled state management.',
    deliverable: 'Production-ready Codebase & Microservices',
    accent: '#FF2B2B',
  },
  {
    id: 'infrastructure',
    step: '04',
    label: 'INFRASTRUCTURE',
    icon: Server,
    headline: 'HIGH-AVAILABILITY CLOUD DEPLOYMENT',
    desc: 'Configuring Linux VPS instances, Nginx reverse proxies, SSL certificates, PM2 cluster workers, and database pooling.',
    deliverable: 'Zero-downtime CI/CD & Secure Cloud Pipeline',
    accent: '#FFFFFF',
  },
  {
    id: 'launch',
    step: '05',
    label: 'LAUNCH',
    icon: Rocket,
    headline: 'PRODUCTION DISTRIBUTION & SCALE',
    desc: 'Deploying to real users, monitoring error telemetry, optimizing conversion funnels, and iterating based on reality.',
    deliverable: 'Live Production Venture & Iteration Loop',
    accent: '#FF2B2B',
  }
];

export function WhoAmI() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHoveredPortrait, setIsHoveredPortrait] = useState(false);

  const handleStepSelect = (index: number) => {
    sound.playSwitch();
    setActiveStep(index);
  };

  return (
    <section
      id="who-am-i"
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Strip */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">01 // MANIFESTO</span>
            <span className="text-white">WHO AM I?</span>
          </div>
          <span className="hidden sm:inline">PERSPECTIVE × FIRST PRINCIPLES</span>
        </div>

        {/* Giant Manifesto Statement */}
        <div className="mb-24">
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] text-white">
            <span className="block hover:text-[#FF2B2B] transition-colors duration-300">
              I'M NOT
            </span>
            <span className="block text-stroke-white hover:text-white transition-colors duration-300">
              JUST LEARNING
            </span>
            <span className="block text-[#FF2B2B] drop-shadow-[0_0_30px_rgba(255,43,43,0.2)]">
              TECHNOLOGY.
            </span>
            <span className="block mt-4 sm:mt-6 text-neutral-200">
              I'M USING IT
            </span>
            <span className="block text-stroke-white hover:text-white transition-colors duration-300">
              TO BUILD
            </span>
            <span className="block text-white font-future tracking-tighter">
              THINGS.
            </span>
          </h2>
        </div>

        {/* Human Moment / About Section */}
        <div id="about-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/10 mb-24">
          {/* Left: Technical High-Contrast Portrait Blueprint Placeholder */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => {
                sound.playHover();
                setIsHoveredPortrait(true);
              }}
              onMouseLeave={() => setIsHoveredPortrait(false)}
              className="relative aspect-[4/5] w-full bg-[#0A0A0A] border border-white/15 p-4 flex flex-col justify-between overflow-hidden group cursor-crosshair"
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-70" />

              {/* Technical framing corner marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FF2B2B]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FF2B2B]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FF2B2B]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FF2B2B]" />

              {/* Top metadata */}
              <div className="relative z-20 flex items-center justify-between font-tech text-[10px] text-[#8A8A84] border-b border-white/10 pb-2">
                <span>PORTRAIT // SPEC</span>
                <span className="text-[#FF2B2B] font-bold">CP-2026</span>
              </div>

              {/* Center Portrait Aesthetic Composition */}
              <div className="relative z-20 my-auto text-center space-y-4 py-8">
                <div className="w-24 h-24 mx-auto border-2 border-dashed border-[#FF2B2B] flex items-center justify-center relative bg-black/60">
                  <span className="font-display font-black text-3xl text-white">CP</span>
                  <div className={`absolute inset-0 bg-[#FF2B2B]/20 transition-opacity duration-300 ${isHoveredPortrait ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                <div className="space-y-1 font-tech">
                  <div className="text-white font-bold text-sm tracking-widest">CHANDAN PAL</div>
                  <div className="text-xs text-[#FF2B2B]">26.9124° N, 75.7873° E</div>
                  <div className="text-[10px] text-[#8A8A84] pt-2">
                    [ COMPUTER SCIENCE STUDENT · DEVELOPER · CTO ]
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Info */}
              <div className="relative z-20 pt-2 border-t border-white/10 font-tech text-[10px] text-[#8A8A84] flex items-center justify-between">
                <span>STATUS: ACTIVE BUILDER</span>
                <span className="text-white">HOVER TO SCAN</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="font-tech text-xs text-[#FF2B2B] tracking-widest uppercase">
              [ THE BUILDER MINDSET ]
            </div>

            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              I like understanding how things work — and then trying to build them myself.
            </h3>

            <p className="font-sans text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              I'm a <strong className="text-white font-semibold">Computer Science student</strong>,{' '}
              <strong className="text-[#FF2B2B] font-semibold">developer</strong>,{' '}
              <strong className="text-white font-semibold">CTO</strong> and{' '}
              <strong className="text-white font-semibold">product builder</strong>. I operate at the direct crossroads of technical system engineering, aesthetic product design, and entrepreneurial velocity.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#8A8A84] leading-relaxed">
              I don't just write syntax in isolation. I obsess over the entire product stack: identifying human friction, sketching user journeys, modeling database schemas, scripting APIs, configuring reverse proxies, and shipping live to the real world.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-tech text-xs">
              <div>
                <span className="text-[#8A8A84] block text-[10px]">CURRENT ROLE</span>
                <span className="text-white font-bold">CTO @ WythHer</span>
              </div>
              <div>
                <span className="text-[#8A8A84] block text-[10px]">DISCIPLINE</span>
                <span className="text-white font-bold">Full-Stack & Systems</span>
              </div>
              <div>
                <span className="text-[#8A8A84] block text-[10px]">PHILOSOPHY</span>
                <span className="text-[#FF2B2B] font-bold">Build & Ship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Product Cycle: IDEA -> DESIGN -> CODE -> INFRASTRUCTURE -> LAUNCH */}
        <div className="border border-white/15 bg-[#090909] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
              <span className="text-white font-bold">THE 5-STAGE PRODUCT CYCLE</span>
            </div>
            <span className="text-[#8A8A84]">CLICK ANY STAGE TO INSPECT MY PROCESS</span>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {PROCESS_NODES.map((node, idx) => {
              const isCurrent = activeStep === idx;
              const Icon = node.icon;
              return (
                <button
                  key={node.id}
                  onClick={() => handleStepSelect(idx)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text={`STAGE ${node.step}`}
                  className={`text-left p-4 border transition-all duration-200 relative group ${
                    isCurrent
                      ? 'bg-white text-black border-white shadow-xl'
                      : 'bg-black/50 text-[#8A8A84] border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 font-tech text-[10px]">
                    <span className={isCurrent ? 'text-black font-bold' : 'text-[#FF2B2B]'}>
                      {node.step}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-black' : 'text-[#8A8A84] group-hover:text-white'}`} />
                  </div>
                  <div className={`font-display font-black text-base sm:text-lg tracking-wider ${isCurrent ? 'text-black' : 'text-white'}`}>
                    {node.label}
                  </div>
                  {isCurrent && (
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF2B2B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-black border border-white/10 p-6 sm:p-8 items-center"
          >
            <div className="md:col-span-7 space-y-3">
              <div className="font-tech text-xs text-[#FF2B2B] tracking-wider flex items-center gap-2">
                <span>PHASE {PROCESS_NODES[activeStep].step}</span>
                <span>//</span>
                <span>{PROCESS_NODES[activeStep].label}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                {PROCESS_NODES[activeStep].headline}
              </h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                {PROCESS_NODES[activeStep].desc}
              </p>
            </div>

            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 space-y-4">
              <div className="font-tech text-xs text-[#8A8A84]">STAGE DELIVERABLE:</div>
              <div className="flex items-start gap-2.5 text-sm text-white font-medium bg-[#111] border border-white/10 p-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF2B2B] shrink-0 mt-0.5" />
                <span>{PROCESS_NODES[activeStep].deliverable}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-tech text-[10px] text-[#8A8A84]">EXECUTION // CP</span>
                <button
                  onClick={() => {
                    const next = (activeStep + 1) % PROCESS_NODES.length;
                    handleStepSelect(next);
                  }}
                  className="font-tech text-xs text-[#FF2B2B] hover:text-white flex items-center gap-1 group"
                >
                  <span>NEXT PHASE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
