import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Database, Server, GitBranch, Layout, Sparkles, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { TECH_STACK } from '../data/portfolioData';
import { TechItem } from '../types';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

const CATEGORIES = ['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'INFRASTRUCTURE', 'PRODUCT', 'EXPLORING'] as const;

export function TechLab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTech, setActiveTech] = useState<TechItem>(TECH_STACK[0]);
  const [simOutput, setSimOutput] = useState<string>('System initialized. Hover or click any technology node.');

  const filteredTech = selectedCategory === 'ALL'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === selectedCategory);

  const handleSelectTech = (tech: TechItem) => {
    sound.playClick();
    setActiveTech(tech);
    setSimOutput(`[${new Date().toLocaleTimeString()}] Target module loaded: ${tech.name} (${tech.category})`);
  };

  const handleRunSimulator = () => {
    sound.playSwitch();
    setSimOutput(`[${new Date().toLocaleTimeString()}] Executing diagnostic probe on ${activeTech.name}... PASS (Latency: 1.2ms, Memory: 14MB).`);
  };

  return (
    <section
      id="tech-lab"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2A2A] font-bold">05 // TECHNICAL PLAYGROUND</span>
            <span>STACK LAB</span>
          </div>
          <span>INTERACTIVE DIAGNOSTICS</span>
        </div>

        {/* Giant Headline */}
        <div className="mb-16">
          <FitText as="h2" text="THE STUFF I BREAK UNTIL IT WORKS." max={8} className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] text-white">
            <span>THE STUFF</span><br />
            <span className="text-[#FF2A2A]">I BREAK</span><br />
            <span className="text-stroke-white hover:text-white transition-colors duration-300">UNTIL IT</span><br />
            <span>WORKS.</span>
          </FitText>
          <p className="font-sans text-neutral-400 text-base sm:text-lg mt-6 max-w-2xl">
            Hands-on command of the entire surface area: from browser DOM manipulation to Linux kernel parameters, database indexing, and design systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playHover();
                  setSelectedCategory(cat);
                }}
                data-cursor-text={cat}
                className={`font-tech text-xs px-3.5 py-1.5 border transition-all ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Two-Column Playground Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Technology Node Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTech.map((tech) => {
              const isActive = activeTech.name === tech.name;
              return (
                <button
                  key={tech.name}
                  onClick={() => handleSelectTech(tech)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text="INSPECT"
                  className={`p-4 text-left border transition-all relative group flex flex-col justify-between h-32 ${
                    isActive
                      ? 'bg-[#FF2A2A] text-white border-[#FF2A2A] shadow-xl'
                      : 'bg-neutral-950/80 text-neutral-300 border-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-tech text-[10px]">
                    <span className={isActive ? 'text-black font-bold' : 'text-[#FF2A2A]'}>
                      {tech.category}
                    </span>
                    <span className={`px-1.5 py-0.5 border text-[9px] ${
                      isActive ? 'border-black/30 text-black' : 'border-white/10 text-neutral-400'
                    }`}>
                      {tech.level}
                    </span>
                  </div>

                  <div className="font-display font-black text-xl tracking-tight">
                    {tech.name}
                  </div>

                  <div className={`font-tech text-[10px] truncate ${
                    isActive ? 'text-white/90' : 'text-neutral-500 group-hover:text-neutral-400'
                  }`}>
                    {tech.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Live Interactive Telemetry Simulator */}
          <div className="lg:col-span-5 border border-white/20 bg-neutral-950 p-6 flex flex-col justify-between font-tech">
            <div>
              {/* Simulator Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FF2A2A]" />
                  <span className="text-white font-bold">STACK PROFILER // v2.6</span>
                </div>
                <span className="text-[#FF2A2A] animate-pulse">● READY</span>
              </div>

              {/* Selected Tech Overview */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-[#FF2A2A] uppercase tracking-wider block">
                    SELECTED RUNTIME
                  </span>
                  <h3 className="font-display text-3xl font-black text-white">
                    {activeTech.name}
                  </h3>
                  <span className="text-xs text-neutral-400">
                    CATEGORY: {activeTech.category} // PROFICIENCY: {activeTech.level}
                  </span>
                </div>

                <div className="p-4 bg-black border border-white/10 text-xs font-sans text-neutral-300 leading-relaxed">
                  {activeTech.desc}
                </div>

                {/* Code Snippet Box */}
                {activeTech.interactiveSnippet && (
                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400">SOURCE CODE SYNTAX:</div>
                    <div className="p-3 bg-black border border-[#FF2A2A]/30 text-xs text-[#FF2A2A] font-mono overflow-x-auto">
                      <code>{activeTech.interactiveSnippet}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Terminal Output Console */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>DIAGNOSTIC TELEMETRY:</span>
                <button
                  onClick={handleRunSimulator}
                  className="flex items-center gap-1.5 text-xs text-white hover:text-[#FF2A2A] transition-colors"
                >
                  <Play className="w-3 h-3 text-[#FF2A2A]" />
                  <span>RUN TEST PROBE</span>
                </button>
              </div>

              <div className="p-3 bg-black border border-white/10 text-[11px] text-emerald-400 font-mono min-h-[54px] flex items-center">
                <span>&gt; {simOutput}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
