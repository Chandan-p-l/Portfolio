import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Bookmark, Share2 } from 'lucide-react';
import { TechArticle } from '../types';
import { sound } from '../utils/sound';

interface ArticleModalProps {
  article: TechArticle | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;

    // Pause Lenis smooth scroll engine
    (window as any).lenis?.stop();

    // Lock both body and html document overflow
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Resume Lenis smooth scroll engine
      (window as any).lenis?.start();
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="fixed inset-0 z-[100000] flex items-start justify-center p-4 pt-24 sm:pt-28 pb-8 sm:p-6 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-xl"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0E0E0E] border border-white/20 text-[#F5F3EF] shadow-2xl overflow-hidden my-auto max-h-[82vh] flex flex-col rounded-xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/60 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-3 font-tech text-xs">
              <span className="text-[#FF2A2A] font-bold">ARTICLE {article.number}</span>
              <span className="text-neutral-400">// {article.tag}</span>
              <span className="hidden sm:inline text-neutral-400">// {article.readTime}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              data-cursor-text="CLOSE"
              className="p-2 text-neutral-400 hover:text-white border border-white/10 hover:border-white transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
            <div>
              <span className="font-tech text-xs text-[#FF2A2A] tracking-widest uppercase">
                UNDER THE HOOD // BREAKDOWN
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
                {article.title}
              </h2>
            </div>

            {/* Key takeaway insight box */}
            <div className="p-6 bg-neutral-950 border border-white/10">
              <div className="font-tech text-[10px] text-[#FF2A2A] tracking-widest uppercase mb-2">
                CORE ARCHITECTURAL INSIGHT
              </div>
              <p className="font-editorial italic text-xl sm:text-2xl text-neutral-200 leading-snug">
                "{article.keyInsight}"
              </p>
            </div>

            {/* Step-by-step breakdown */}
            <div className="space-y-4">
              <div className="font-tech text-xs text-neutral-400 tracking-widest uppercase">
                SYSTEM EXECUTION STEPS:
              </div>

              <div className="space-y-3">
                {article.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-black border border-white/10 space-y-2 hover:border-[#FF2A2A] transition-colors"
                  >
                    <div className="font-tech text-xs text-[#FF2A2A] font-bold">
                      {st.label}
                    </div>
                    <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/60 flex items-center justify-between font-tech text-xs">
            <span className="text-neutral-400">CHANDAN PAL // TECH CONTENT INITIATIVE</span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2 bg-white text-black font-bold uppercase hover:bg-[#FF2A2A] hover:text-white transition-colors"
            >
              CLOSE ARTICLE [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
