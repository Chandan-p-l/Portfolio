import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/sound';

interface LoadingScreenProps {
  onComplete: () => void;
}

const SYSTEM_STATES = [
  { text: 'IDENTITY ........ READY', step: 24 },
  { text: 'PROJECTS ........ READY', step: 57 },
  { text: 'EXPERIMENTS ..... READY', step: 83 },
  { text: 'CURIOSITY ....... ALWAYS ON', step: 100 },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if previously loaded in session
    const hasLoaded = sessionStorage.getItem('cp_loaded');
    if (hasLoaded) {
      onComplete();
      return;
    }

    const steps = [
      { p: 0, delay: 100 },
      { p: 24, delay: 350 },
      { p: 57, delay: 650 },
      { p: 83, delay: 950 },
      { p: 100, delay: 1250 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach((s, idx) => {
      const t = setTimeout(() => {
        setProgress(s.p);
        if (idx > 0 && idx <= SYSTEM_STATES.length) {
          setStepIdx(idx - 1);
          sound.playHover();
        }
      }, s.delay);
      timeouts.push(t);
    });

    const finishTimeout = setTimeout(() => {
      sound.playClick();
      setIsFinished(true);
      sessionStorage.setItem('cp_loaded', 'true');
      setTimeout(onComplete, 400);
    }, 1550);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sound.playClick();
    setIsFinished(true);
    sessionStorage.setItem('cp_loaded', 'true');
    setTimeout(onComplete, 150);
  };

  const progressStr = progress.toString().padStart(3, '0');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-[#050505] text-[#F4F2EC] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden cursor-pointer"
          onClick={handleSkip}
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between font-tech text-xs tracking-widest text-[#8A8A84] border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-ping" />
              <span className="text-white font-bold">SYSTEM / CP-26</span>
            </div>
            <div className="hidden sm:block text-[11px]">
              INITIALIZING CHANDAN PAL // KINEMATIC SEQUENCE
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="text-[#FF2B2B] hover:text-white border border-[#FF2B2B]/40 hover:border-white px-2.5 py-1 text-[10px] tracking-wider transition-colors"
            >
              SKIP [ESC]
            </button>
          </div>

          {/* Center Stage Bootloader */}
          <div className="my-auto max-w-4xl space-y-8">
            <div className="space-y-2">
              <div className="font-tech text-xs text-[#FF2B2B] tracking-[0.3em] uppercase">
                INITIALIZING
              </div>
              <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase">
                CHANDAN PAL
              </h1>
            </div>

            {/* Rapid System States List */}
            <div className="font-tech text-xs sm:text-sm space-y-2 pt-2 border-t border-white/10">
              {SYSTEM_STATES.map((item, idx) => {
                const isPassed = progress >= item.step;
                const isCurrent = stepIdx === idx;
                return (
                  <div
                    key={item.text}
                    className={`flex items-center gap-3 transition-opacity duration-200 ${
                      isPassed ? 'text-white' : 'text-[#8A8A84]/40'
                    }`}
                  >
                    <span className={isPassed ? 'text-[#FF2B2B] font-bold' : 'text-neutral-700'}>
                      {isPassed ? '●' : '○'}
                    </span>
                    <span className={isCurrent ? 'text-[#FF2B2B] font-bold' : ''}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Numbers & Enter */}
          <div className="border-t border-white/10 pt-4 flex items-end justify-between font-tech">
            <div>
              <span className="text-[10px] text-[#8A8A84] block">PROGRESS</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-white">
                {progressStr}
              </span>
            </div>

            <div className="text-right">
              {progress >= 100 ? (
                <span className="text-xs sm:text-sm font-bold text-[#FF2B2B] tracking-widest animate-pulse">
                  [ ENTER → ]
                </span>
              ) : (
                <span className="text-xs text-[#8A8A84] tracking-widest">
                  CALIBRATING...
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
