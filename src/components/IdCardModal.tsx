import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Calendar, MapPin, Terminal, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface IdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IdCardModal({ isOpen, onClose }: IdCardModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Pause Lenis smooth scroll engine
    (window as any).lenis?.stop();

    // Lock both body and html document overflow
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Resume Lenis smooth scroll engine
      (window as any).lenis?.start();
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="fixed inset-0 z-[100000] flex items-start justify-center p-4 pt-24 sm:pt-28 pb-8 sm:p-6 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-2xl"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0B0B0C] border-2 border-white/20 text-[#F4F2EC] shadow-[0_0_90px_rgba(255,43,43,0.3)] overflow-hidden my-auto max-h-[82vh] flex flex-col rounded-xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/80 sticky top-0 z-30 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2B2B] animate-ping" />
              <span className="font-tech text-xs font-bold text-[#FF2B2B] uppercase tracking-[.25em]">
                OFFICIAL ACCESS PASS // LEVEL 5 SYSTEM CLEARANCE
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              data-cursor-text="CLOSE"
              className="p-2 text-neutral-400 hover:text-white border border-white/10 hover:border-[#FF2B2B] transition-colors rounded"
              aria-label="Close Inspection Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 select-none">
            {/* Top Identity Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/60 border border-white/10 p-6 rounded-lg">
              {/* Enlarged Passport Photo Frame */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative aspect-[3.5/4.5] w-56 sm:w-64 overflow-hidden rounded-lg bg-black border-2 border-[#FF2B2B] shadow-2xl shadow-red-500/30 group">
                  <img
                    src="/chandan-pal.webp"
                    alt="Chandan Pal Official ID"
                    className="w-full h-full object-cover object-top scale-105 grayscale contrast-125"
                  />
                  {/* Holographic scanline animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2B2B]/20 to-transparent bg-[length:100%_8px] animate-pulse pointer-events-none" />
                  <div className="absolute top-2 left-2 bg-black/90 border border-white/20 px-2 py-0.5 font-tech text-[8px] text-white">
                    BIOMETRIC: OK
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#FF2B2B] text-black px-2 py-0.5 font-tech text-[9px] font-extrabold tracking-widest rounded-sm">
                    PASSPORT PHOTO
                  </div>
                </div>
              </div>

              {/* Identity Telemetry Data */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <div className="font-tech text-xs text-[#FF2B2B] font-extrabold tracking-widest uppercase mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF2B2B]" />
                    FULL-STACK DEVELOPER · CTO & CO-FOUNDER
                  </div>
                  <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
                    CHANDAN PAL
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 font-tech text-xs pt-2 border-t border-white/10">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">DATE OF BIRTH</span>
                    <span className="text-white font-extrabold text-sm sm:text-base text-[#FF2B2B] flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-4 h-4 text-[#FF2B2B]" />
                      23 JAN 2007
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">LOCATION</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      JAIPUR, INDIA
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">SERIAL ID</span>
                    <span className="text-white font-mono font-bold text-xs sm:text-sm text-neutral-200 mt-0.5 block">
                      CP-20070123-PASS
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">CURRENT ROLE</span>
                    <span className="text-white font-bold text-xs sm:text-sm text-amber-300 mt-0.5 block">
                      CTO & CO-FOUNDER, VAGMED INDIA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Capabilities & Bio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 border border-white/10 p-6 rounded-lg space-y-3">
                <div className="font-tech text-xs text-[#FF2B2B] font-bold tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  DEVELOPMENT DISCIPLINE
                </div>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  Full-stack product building: React and Next.js frontends, Node.js and PHP backends, Supabase, Firebase and MySQL data, payments, deployment and technical SEO.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 font-tech text-[10px]">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'Firebase', 'MySQL', 'Tailwind CSS'].map((t) => (
                    <span key={t} className="bg-neutral-900 border border-white/15 px-2.5 py-1 text-white font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-lg space-y-3">
                <div className="font-tech text-xs text-white font-bold tracking-widest flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FF2B2B]" />
                  ACTIVE VENTURES & PROJECTS
                </div>
                <ul className="space-y-2 font-tech text-xs text-neutral-300">
                  {[
                    ['VagMed India / WythHer', 'CTO & CO-FOUNDER', 'text-[#FF2B2B]'],
                    ['LOQmusic', 'SOLO DEVELOPER', 'text-neutral-400'],
                    ['VedaVarti', 'DESIGN & DEVELOPMENT', 'text-neutral-400'],
                    ['The Last Conversation', 'AUTHOR', 'text-emerald-400'],
                  ].map(([name, role, color], i, all) => (
                    <li key={name} className={`flex items-center justify-between gap-3 ${i < all.length - 1 ? 'border-b border-white/10 pb-1.5' : ''}`}>
                      <span className="font-bold text-white">{name}</span>
                      <span className={`${color} text-right`}>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Security Barcode & System Stamp */}
            <div className="bg-white text-black p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs select-none">
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-bold tracking-widest uppercase">AUTHENTICATION TELEMETRY</div>
                <div className="text-[10px] text-neutral-700">HASH: 0x7FFF92A8C0100001 · ENCRYPTED TLS 1.3</div>
              </div>
              <div className="font-mono text-xl tracking-[.4em] font-black border-y-2 border-black py-1">
                |||||| | |||| || ||||| ||||
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/80 flex items-center justify-between font-tech text-xs">
            <span className="text-neutral-400">CHANDAN PAL // ID VERIFICATION PASSED</span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2 bg-[#FF2B2B] text-black font-extrabold uppercase hover:bg-white transition-colors rounded"
            >
              CLOSE ACCESS PASS [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
