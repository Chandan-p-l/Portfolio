import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Palette, Sparkles, Layers, Eye, Compass, Move, RotateCcw, Box } from 'lucide-react';
import { sound } from '../utils/sound';

const DRAGGABLE_CARDS = [
  {
    id: 'card-1',
    title: 'WYTHER BRAND SYSTEM',
    category: 'BRANDING & PACKAGING',
    tag: 'SWISS EDITORIAL',
    bg: '#0A0A0A',
    textColor: '#F4F2EC',
    accentColor: '#FF2B2B',
    desc: 'Monochrome packaging with high-contrast Syne typography and tactile UV gloss stamp specifications.',
    initial: { x: 0, y: 0, rotate: -2 }
  },
  {
    id: 'card-2',
    title: 'VEDAVARTI OLFATIVE PYRAMID',
    category: 'EDITORIAL ART DIRECTION',
    tag: 'SENSORY LUXURY',
    bg: '#1A1817',
    textColor: '#F4F2EC',
    accentColor: '#D4AF37',
    desc: 'Top notes of Bergamot & Cardamom transitioning into Heart notes of Leather & Iris over a Smoked Sandalwood base.',
    initial: { x: 30, y: -20, rotate: 3 }
  },
  {
    id: 'card-3',
    title: 'INDICALL EMERGENCY OS',
    category: 'TACTICAL UI & INTERFACES',
    tag: 'HIGH-CONTRAST UX',
    bg: '#FF2B2B',
    textColor: '#0A0A0A',
    accentColor: '#FFFFFF',
    desc: 'Rapid emergency distress interface designed for absolute cognitive clarity under acute physiological stress.',
    initial: { x: -20, y: 20, rotate: -4 }
  },
  {
    id: 'card-4',
    title: 'MATHEMATICAL DESIGN TOKENS',
    category: 'DESIGN SYSTEMS',
    tag: 'FIGMA TO CODE',
    bg: '#FFFFFF',
    textColor: '#0A0A0A',
    accentColor: '#FF2B2B',
    desc: 'Strict 8px baseline rhythm, Perfect Fourth (1.333) font scale, and zero-radius brutalist border tokens.',
    initial: { x: 10, y: 30, rotate: 2 }
  }
];

export function CreativeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleResetDraggables = () => {
    sound.playSwitch();
    setResetKey((prev) => prev + 1);
  };

  return (
    <section
      id="creative-side"
      className="relative min-h-screen w-full bg-[#F4F2EC] text-[#0A0A0A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t-2 border-[#0A0A0A] select-none overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section Header - Swiss High-Contrast Light */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-600 border-b border-black/20 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">05 // VISUAL SYSTEM BREAK</span>
            <span className="text-black font-bold">THE CREATIVE WORLD</span>
          </div>
          <span className="hidden sm:inline">SWISS EDITORIAL ART DIRECTION</span>
        </div>

        {/* Big Contrast Headline */}
        <div className="mb-16 space-y-4">
          <div className="font-tech text-xs text-[#FF2B2B] tracking-widest uppercase font-bold">
            [ SENSORY ARCHITECTURE ]
          </div>
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.92] text-black">
            <span>CODE IS NOT</span><br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0A0A0A' }}>
              THE WHOLE STORY.
            </span>
          </h2>
          <div className="pt-4">
            <p className="font-editorial italic text-3xl sm:text-5xl md:text-6xl text-[#FF2B2B] font-normal">
              "I also care deeply about how it feels."
            </p>
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 border-y border-black/20 py-4 mb-16 font-tech text-xs text-center font-bold">
          {['UI / UX', 'FIGMA', 'BRANDING', 'PACKAGING', 'STORYTELLING', 'CREATIVE DIRECTION', 'VIDEO & 3D'].map((d) => (
            <div key={d} className="p-3 bg-white/70 border border-black/15 text-black hover:bg-[#FF2B2B] hover:text-white hover:border-[#FF2B2B] transition-colors">
              {d}
            </div>
          ))}
        </div>

        {/* Interactive Draggable Canvas Surface */}
        <div className="relative border-2 border-black bg-[#EDEAE1] p-6 sm:p-10 mb-16 overflow-hidden min-h-[550px] flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-black border-b border-black/20 pb-4 z-20 relative">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-[#FF2B2B]" />
              <span className="font-bold">INTERACTIVE TACTILE CANVAS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-600 hidden sm:inline">DRAG & FLING ARTIFACTS</span>
              <button
                onClick={handleResetDraggables}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1 bg-black text-white hover:bg-[#FF2B2B] font-tech text-[10px] uppercase font-bold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET CANVAS</span>
              </button>
            </div>
          </div>

          {/* Draggable Cards Workspace */}
          <div ref={containerRef} key={resetKey} className="relative my-auto w-full h-[400px] z-10">
            {DRAGGABLE_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={card.initial}
                onDragStart={() => sound.playHover()}
                onDragEnd={() => sound.playClick()}
                data-cursor="drag"
                style={{
                  backgroundColor: card.bg,
                  color: card.textColor,
                }}
                className="absolute left-[5%] sm:left-[15%] top-[10%] w-[90%] sm:w-[360px] p-6 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing select-none"
              >
                <div className="flex items-center justify-between font-tech text-[10px] tracking-widest pb-3 border-b border-white/20 mb-4 opacity-80">
                  <span style={{ color: card.accentColor }} className="font-bold">{card.tag}</span>
                  <span>0{idx + 1} / SPEC</span>
                </div>

                <div className="font-tech text-[10px] opacity-75 uppercase mb-1">
                  {card.category}
                </div>

                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight uppercase mb-3">
                  {card.title}
                </h3>

                <p className="font-sans text-xs opacity-90 leading-relaxed font-light mb-4">
                  {card.desc}
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between font-tech text-[9px] opacity-75">
                  <span>CHANDAN PAL // STUDIO</span>
                  <span>HOLD & DRAG ↔</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="font-tech text-[11px] text-neutral-600 border-t border-black/20 pt-4 flex justify-between items-center z-20 relative">
            <span>PHYSICAL ARTIFACTS & BLUEPRINTS</span>
            <span>26.9124° N, 75.7873° E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
