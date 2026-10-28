import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Terminal, Layers, Compass, ShieldCheck, ArrowDown } from 'lucide-react';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

const ROLES = [
  {
    id: 'student',
    title: 'STUDENT',
    tagline: 'OBSESSIVE FOUNDATIONAL CURIOSITY',
    icon: Compass,
    timeline: 'FOUNDATION',
    quote: 'Deconstructing core Computer Science: algorithms, memory management, networks, operating systems, and first principles.',
    focus: 'Data Structures, Discrete Math, System Architecture, Networking Protocols',
    previewCode: 'class TreeNode { constructor(val) { this.val = val; this.left = this.right = null; } }'
  },
  {
    id: 'developer',
    title: 'DEVELOPER',
    tagline: 'SHIPPING RESILIENT SOFTWARE',
    icon: Terminal,
    timeline: 'ENGINEERING',
    quote: 'Bridging algorithmic logic with modern web technologies: full-stack codebases, clean components, resilient APIs, and database models.',
    focus: 'React, Node.js, Express, MySQL, MongoDB, Supabase, Tailwind CSS',
    previewCode: 'export const useStore = create((set) => ({ state: "SYNCHRONIZED", update: (s) => set(s) }));'
  },
  {
    id: 'builder',
    title: 'BUILDER',
    tagline: 'PRODUCT INTUITION × TACTILE CRAFT',
    icon: Layers,
    timeline: 'CREATION',
    quote: 'Moving beyond raw code to craft complete, cohesive digital products: UI/UX ergonomics, brand design, copy, and human experience.',
    focus: 'UI/UX Design, Figma, Ergonomics, Brand Systems, Micro-Interactions',
    previewCode: 'const DesignToken = { radius: "0px", baseline: "8px", accent: "#FF2B2B" };'
  },
  {
    id: 'cofounder',
    title: 'CO-FOUNDER',
    tagline: 'VENTURE INCEPTION & STRATEGIC VISION',
    icon: Sparkles,
    timeline: 'VENTURES',
    quote: 'Co-founding ventures like WythHer and VedaVarti: validating market fit, rapid MVP prototyping, operations, and go-to-market execution.',
    focus: 'Venture Strategy, Unit Economics, GTM Funnels, Customer Feedback',
    previewCode: 'VentureEngine.validateMarketHypothesis({ target: "D2C", conversionGoal: 4.2 });'
  },
  {
    id: 'cto',
    title: 'CTO',
    tagline: 'SYSTEM LEADERSHIP & END-TO-END TECH',
    icon: ShieldCheck,
    timeline: 'LEADERSHIP (CURRENT)',
    quote: 'Directing the full technical vision at WythHer: cloud infrastructure, payment security, database scaling, automation, and team standards.',
    focus: 'Infrastructure, Linux, Nginx, PM2, DevOps, Payment Gateways, Security',
    previewCode: 'server.use(rateLimiter).use(idempotencyKeyChecker).use(apiGatewayRouter);'
  }
];

export function IdentityEvolution() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(4); // Default to CTO
  const activeRole = ROLES[activeRoleIndex];
  const Icon = activeRole.icon;

  const handleSelectRole = (idx: number) => {
    sound.playSwitch();
    setActiveRoleIndex(idx);
  };

  const scrollToWyther = () => {
    sound.playClick();
    const el = document.getElementById('wyther-flagship');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="identity"
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">02 // THE EVOLUTION</span>
            <span className="text-white">IDENTITY ARC</span>
          </div>
          <span className="hidden sm:inline">CLICK STAGES TO EXPLORE PROGRESSION</span>
        </div>

        {/* Big Interactive Role Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/10 pb-8 mb-12">
          {ROLES.map((role, idx) => {
            const isSelected = activeRoleIndex === idx;
            return (
              <button
                key={role.id}
                onClick={() => handleSelectRole(idx)}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text={role.title}
                className={`text-left p-3.5 sm:p-4 border transition-all ${
                  isSelected
                    ? 'bg-[#FF2B2B] text-white border-[#FF2B2B] shadow-xl'
                    : 'bg-black/40 text-[#8A8A84] border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                <div className="font-tech text-[10px] opacity-75 mb-1">
                  0{idx + 1} // {role.timeline}
                </div>
                <FitText as="div" text={role.title} max={1.125} tracking={0.05} className="font-display font-black text-sm sm:text-base md:text-lg tracking-wider">
                  {role.title}
                </FitText>
              </button>
            );
          })}
        </div>

        {/* Enormous Monumental Identity Morph */}
        <div className="relative my-6 py-10 border border-white/10 bg-[#090909] p-6 sm:p-12 overflow-hidden">
          {/* Watermark in background */}
          <div className="absolute right-4 bottom-2 font-display text-8xl sm:text-9xl md:text-[14rem] font-black text-white/[0.03] pointer-events-none tracking-tighter leading-none select-none">
            0{activeRoleIndex + 1}
          </div>

          <div className="relative z-10">
            <div className="font-tech text-xs text-[#FF2B2B] tracking-widest uppercase mb-4 flex items-center gap-2">
              <Icon className="w-4 h-4 text-[#FF2B2B]" />
              <span>[ PHASE // {activeRole.timeline} ]</span>
            </div>

            {/* Dynamic Role Display Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <FitText as="h3" text={activeRole.title} max={10.5} className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter leading-none text-white uppercase mb-6">
                  {activeRole.title}
                </FitText>

                <div className="font-future text-sm sm:text-lg md:text-xl text-[#FF2B2B] tracking-wider mb-8">
                  — {activeRole.tagline}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
                  <div className="md:col-span-7 space-y-4">
                    <div className="font-tech text-xs text-[#8A8A84]">PHILOSOPHICAL MINDSET:</div>
                    <p className="font-editorial text-2xl sm:text-3xl text-neutral-200 leading-snug">
                      "{activeRole.quote}"
                    </p>
                    <div className="pt-2">
                      <div className="font-tech text-[11px] text-[#8A8A84] mb-1">SNIPPET:</div>
                      <code className="block font-tech text-xs text-emerald-400 bg-black/80 border border-white/10 p-3 overflow-x-auto">
                        {activeRole.previewCode}
                      </code>
                    </div>
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 space-y-4">
                    <div className="font-tech text-xs text-[#8A8A84]">CORE PROFICIENCIES:</div>
                    <div className="font-tech text-xs text-white bg-black/70 border border-white/10 p-3 leading-relaxed">
                      {activeRole.focus}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          const next = (activeRoleIndex + 1) % ROLES.length;
                          handleSelectRole(next);
                        }}
                        className="font-tech text-xs text-[#FF2B2B] hover:text-white flex items-center gap-1.5"
                      >
                        <span>NEXT EVOLUTION</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Concluding Statement Flowing to WythHer */}
        <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/10 font-tech">
          <div>
            <span className="text-xs text-[#FF2B2B] tracking-widest block font-bold mb-1">
              THE CONCLUSION
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-black text-white">
              TITLE ≠ DESTINATION. I'M STILL BUILDING.
            </h4>
          </div>

          <button
            onClick={scrollToWyther}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="CASE STUDY"
            className="flex items-center gap-3 px-5 py-3 bg-[#FF2B2B] text-white hover:bg-white hover:text-black font-tech text-xs tracking-widest uppercase font-bold transition-all shadow-xl"
          >
            <span>ENTER WYTHHER FLAGSHIP</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
