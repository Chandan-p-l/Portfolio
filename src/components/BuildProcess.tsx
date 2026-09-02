import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Flame, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { BUILD_STEPS } from '../data/portfolioData';
import { sound } from '../utils/sound';

export function BuildProcess() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = BUILD_STEPS[currentStepIndex];

  const handleNext = () => {
    sound.playClick();
    setCurrentStepIndex((prev) => (prev + 1) % BUILD_STEPS.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setCurrentStepIndex((prev) => (prev - 1 + BUILD_STEPS.length) % BUILD_STEPS.length);
  };

  return (
    <section
      id="build-process"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2A2A] font-bold">06 // METHODOLOGY</span>
            <span>HOW I BUILD</span>
          </div>
          <span>STEP 0{currentStepIndex + 1} OF 08</span>
        </div>

        {/* Big Headline */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-white">
            THE 8-STAGE<br />
            <span className="text-stroke-white hover:text-white transition-colors duration-300">
              EXECUTION LOOP.
            </span>
          </h2>
        </div>

        {/* 8-Step Navigation Tracker Pill Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2 mb-12">
          {BUILD_STEPS.map((s, idx) => {
            const isActive = currentStepIndex === idx;
            return (
              <button
                key={s.number}
                onClick={() => {
                  sound.playSwitch();
                  setCurrentStepIndex(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text={`STAGE ${s.number}`}
                className={`text-left p-2.5 sm:p-3 border transition-all ${
                  isActive
                    ? 'bg-[#FF2A2A] text-white border-[#FF2A2A]'
                    : 'bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="font-tech text-[10px] opacity-75">{s.number}</div>
                <div className="font-display font-bold text-xs truncate">{s.title.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Main Immersive Stage Presentation Stage */}
        <div className="border border-white/15 bg-neutral-950 p-6 sm:p-12 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          {/* Giant background step number */}
          <div className="absolute right-6 -bottom-6 font-display text-8xl sm:text-9xl md:text-[14rem] font-black text-white/[0.03] select-none pointer-events-none">
            {step.number}
          </div>

          <div className="relative z-10">
            <div className="font-tech text-xs text-[#FF2A2A] tracking-widest uppercase mb-4 flex items-center gap-2">
              <span>PHASE // {step.number}</span>
              <span>—</span>
              <span>{step.subtitle}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight">
                  {step.title}
                </h3>

                <p className="font-sans text-lg sm:text-2xl text-neutral-200 font-light max-w-3xl leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 max-w-3xl">
                  <div className="bg-black/70 border border-white/10 p-4">
                    <div className="font-tech text-[10px] text-neutral-400 mb-1">MINDSET PRINCIPLE:</div>
                    <div className="font-tech text-xs sm:text-sm text-white font-medium">
                      {step.mindset}
                    </div>
                  </div>

                  <div className="bg-black/70 border border-white/10 p-4">
                    <div className="font-tech text-[10px] text-[#FF2A2A] mb-1">THE ESSENTIAL QUESTION:</div>
                    <div className="font-tech text-xs sm:text-sm text-[#FF2A2A] font-medium">
                      "{step.keyQuestion}"
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex items-center justify-between font-tech text-xs">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            <span className="text-[#FF2A2A] font-future">
              BUILD. BREAK. LEARN. REPEAT.
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-white hover:text-[#FF2A2A] transition-colors"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
