import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { fitVars } from '../utils/fit';

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative min-h-screen w-full bg-[#070707] flex flex-col justify-between py-24 sm:py-36 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      {/* Top Section Tag */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#FF2B2B] font-bold">04 // THE CREED</span>
          <span className="text-white">CORE OPERATING MODEL</span>
        </div>
        <span>NON-NEGOTIABLE</span>
      </div>

      {/* Fullscreen Sequential Typography Presence */}
      <div className="fit-box max-w-7xl w-full mx-auto my-auto py-16 text-center space-y-8 sm:space-y-12">
        <div style={fitVars('REPEAT.', 11)} className="fit space-y-4 sm:space-y-8 font-display font-black tracking-tighter leading-[0.88] uppercase text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hover:text-[#FF2B2B] transition-colors"
          >
            BUILD.
          </motion.div>

          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 sm:w-8 sm:h-8 text-[#FF2B2B] animate-bounce" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-stroke-white hover:text-white transition-colors"
          >
            BREAK.
          </motion.div>

          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 sm:w-8 sm:h-8 text-[#FF2B2B] animate-bounce" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hover:text-[#FF2B2B] transition-colors"
          >
            LEARN.
          </motion.div>

          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 sm:w-8 sm:h-8 text-[#FF2B2B] animate-bounce" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-[#FF2B2B]"
          >
            REPEAT.
          </motion.div>
        </div>

        {/* Minimal & Emotional Ending */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-16 max-w-2xl mx-auto space-y-3 border-t border-white/10"
        >
          <div className="font-tech text-xs text-[#FF2B2B] tracking-widest uppercase font-bold">
            TITLE ≠ DESTINATION.
          </div>
          <p className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            I'M STILL BUILDING.
          </p>
          <p className="font-sans text-sm text-neutral-400 font-light">
            Every venture, failure, line of code, and deployment is another iteration loop.
          </p>
        </motion.div>
      </div>

      {/* Bottom Metadata */}
      <div className="max-w-7xl w-full mx-auto border-t border-white/10 pt-4 flex justify-between items-center font-tech text-xs text-[#8A8A84]">
        <span>CONTINUOUS VELOCITY</span>
        <span className="text-[#FF2B2B]">CP // 2026</span>
      </div>
    </section>
  );
}
