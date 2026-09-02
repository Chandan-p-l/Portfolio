import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  // Determine current page label
  const getPageLabel = (pathname: string) => {
    if (pathname === '/' || pathname === '') return 'HOME';
    if (pathname.includes('/work/wyther')) return 'WYTHER / CASE STUDY';
    if (pathname.includes('/work')) return 'WORK';
    if (pathname.includes('/about')) return 'ABOUT';
    if (pathname.includes('/lab')) return 'LAB';
    if (pathname.includes('/content')) return 'CONTENT';
    if (pathname.includes('/contact')) return 'CONTACT';
    return pathname.replace('/', '').toUpperCase();
  };

  const label = getPageLabel(location.pathname);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Global Red Wipe Transition Curtain */}
      <motion.div
        key={`curtain-${location.pathname}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-[9990] bg-[#FF2B2B] flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="font-tech text-xs sm:text-sm font-bold tracking-[0.35em] text-black uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
          <span>OPENING // {label}</span>
        </div>
        <div className="font-tech text-[10px] text-black/70 tracking-widest mt-1">
          CHANDAN PAL® · CREATIVE TECHNOLOGIST
        </div>
      </motion.div>

      {/* Content Fade & Micro Shift */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
