import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Layers, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
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
          className="relative w-full max-w-5xl bg-[#0E0E0E] border border-white/20 text-[#F5F3EF] shadow-2xl overflow-hidden my-auto max-h-[82vh] flex flex-col rounded-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/60 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-tech text-xs text-[#FF2A2A] font-bold border border-[#FF2A2A]/40 px-2 py-0.5">
                PROJECT {project.number}
              </span>
              <span className="font-tech text-xs text-neutral-400">
                {project.year} // {project.category}
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              data-cursor-text="CLOSE"
              className="p-2 text-neutral-400 hover:text-white border border-white/10 hover:border-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Title & Tagline */}
            <div>
              <span className="font-tech text-xs text-[#FF2A2A] tracking-widest uppercase">
                {project.role}
              </span>
              <h2 id="project-modal-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight mt-1">
                {project.title}
              </h2>
              <p className="font-editorial italic text-2xl sm:text-3xl text-neutral-300 mt-2">
                "{project.tagline}"
              </p>
            </div>

            {/* Summary Banner */}
            <div className="p-6 bg-neutral-950 border border-white/10 space-y-4">
              <div className="font-tech text-xs text-neutral-400">OVERVIEW // THESIS</div>
              <p className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="border border-amber-400/30 bg-amber-400/5 p-4 font-tech text-xs text-amber-100 leading-relaxed">
              <span className="text-amber-300 font-bold">EVIDENCE STATUS // </span>{project.proofStatus}
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black border border-white/10 space-y-3">
                <div className="font-tech text-xs text-[#FF2A2A] font-bold flex items-center gap-2">
                  <span>01</span>
                  <span>//</span>
                  <span>THE PROBLEM & FRICTION</span>
                </div>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 bg-black border border-white/10 space-y-3">
                <div className="font-tech text-xs text-white font-bold flex items-center gap-2">
                  <span>02</span>
                  <span>//</span>
                  <span>THE SOLUTION & ARCHITECTURE</span>
                </div>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="font-tech text-xs text-neutral-400 mb-4 tracking-widest uppercase">
                  KEY FEATURES & CAPABILITIES
                </h4>
                <ul className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#FF2A2A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-tech text-xs text-neutral-400 mb-4 tracking-widest uppercase">
                  DELIVERABLES & ARTIFACTS
                </h4>
                <ul className="space-y-2.5">
                  {project.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300 font-sans">
                      <Layers className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="border-t border-white/10 pt-8">
              <h4 className="font-tech text-xs text-neutral-400 mb-4 tracking-widest uppercase">
                TECHNOLOGIES & TOOLING USED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-tech text-xs text-white bg-neutral-900 border border-white/15 px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.repositoryUrl) && (
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8 font-tech text-xs font-bold">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-3 bg-white text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"><ExternalLink className="w-4 h-4" />VIEW LIVE PRODUCT</a>}
                {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-3 border border-white/30 hover:border-[#FF2A2A] transition-colors"><Github className="w-4 h-4" />VIEW SOURCE</a>}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/60 flex items-center justify-between font-tech text-xs">
            <span className="text-neutral-400">CHANDAN PAL // PORTFOLIO ARCHIVE</span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2 bg-white text-black font-bold uppercase hover:bg-[#FF2A2A] hover:text-white transition-colors"
            >
              CLOSE PROJECT [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
