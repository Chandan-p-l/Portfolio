import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Palette, Sparkles, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { TechContent } from '../components/TechContent';
import { CreativeSection } from '../components/CreativeSection';
import { sound } from '../utils/sound';

export function ContentPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TECHNICAL' | 'CREATIVE'>('ALL');

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Page Hero Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">04 // KNOWLEDGE & EXPRESSION</span>
                <span className="text-white">TWO WORLDS: CODE & SENSORY</span>
              </div>
              <span className="text-white">SYSTEMS · ESSAYS · ART DIRECTION</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white mb-6">
              EXPLAINING HOW<br />
              <span className="text-[#FF2B2B]">THINGS WORK.</span>
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Technical breakdowns, visual storytelling, and editorial art direction demystifying modern software, infrastructure, and tactile physical products.
            </p>
          </div>
        </section>

        {/* Dynamic Mindset Switcher Bar */}
        <section className="py-6 px-4 sm:px-8 md:px-12 border-b border-white/10 bg-[#080808] sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-tech text-xs text-[#8A8A84]">
              <span className="text-[#FF2B2B] font-bold">MINDSET:</span>
              <span className="hidden sm:inline">SWITCH PERSPECTIVES</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playSwitch();
                  setActiveTab('ALL');
                }}
                className={`px-4 py-2 font-tech text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-[#FF2B2B] text-black font-bold border border-[#FF2B2B]'
                    : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                COMPLETE SPECTRUM
              </button>

              <button
                onClick={() => {
                  sound.playSwitch();
                  setActiveTab('TECHNICAL');
                }}
                className={`px-4 py-2 font-tech text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'TECHNICAL'
                    ? 'bg-white text-black font-bold border border-white'
                    : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>TECHNICAL JOURNAL</span>
              </button>

              <button
                onClick={() => {
                  sound.playSwitch();
                  setActiveTab('CREATIVE');
                }}
                className={`px-4 py-2 font-tech text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'CREATIVE'
                    ? 'bg-[#FF2B2B] text-black font-bold border border-[#FF2B2B]'
                    : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>CREATIVE WORLD</span>
              </button>
            </div>
          </div>
        </section>

        {/* 1. TECHNICAL JOURNAL (BLACK / MONOSPACE / SYSTEMS THINKING) */}
        {(activeTab === 'ALL' || activeTab === 'TECHNICAL') && (
          <TechContent />
        )}

        {/* 2. CREATIVE WORLD (OFF-WHITE / EDITORIAL SERIF / TACTILE CARDS) */}
        {(activeTab === 'ALL' || activeTab === 'CREATIVE') && (
          <CreativeSection />
        )}

        <Footer />
      </div>
    </PageTransition>
  );
}
