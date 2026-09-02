import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { TechLab } from '../components/TechLab';
import { InteractiveSandbox } from '../components/InteractiveSandbox';
import { BehindTheScreen } from '../components/BehindTheScreen';
import { sound } from '../utils/sound';

export function LabPage() {
  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Page Hero Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">04 // SYSTEMS & LAB</span>
                <span className="text-white">THE EXPERIMENTAL BENCH</span>
              </div>
              <span className="text-emerald-400">ENGINE: ACTIVE PROBE</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white mb-6">
              THE TECH LAB &<br />
              <span className="text-[#FF2B2B]">SANDBOX.</span>
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Interactive runtime profilers, physics-based canvas experiments, Web Audio synthesis, and real-time backend packet lifecycle simulations.
            </p>
          </div>
        </section>

        {/* 1. TECH LAB & RUNTIME PROFILER */}
        <TechLab />

        {/* 2. INTERACTIVE SANDBOX (Particles and Web Audio Synth) */}
        <InteractiveSandbox />

        {/* 3. BEHIND THE SCREEN: PACKET HOP LIFECYCLE SIMULATOR */}
        <BehindTheScreen />

        <Footer />
      </div>
    </PageTransition>
  );
}
