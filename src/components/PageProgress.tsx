import { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

const SECTIONS = [
  { id: 'top', label: '01', name: 'HERO' },
  { id: 'who-am-i', label: '02', name: 'WHO' },
  { id: 'identity', label: '03', name: 'ROLE' },
  { id: 'wyther-flagship', label: '04', name: 'WYTHER' },
  { id: 'projects', label: '05', name: 'WORK' },
  { id: 'tech-lab', label: '06', name: 'STACK' },
  { id: 'behind-screen', label: '07', name: 'SYSTEM' },
  { id: 'creative-side', label: '08', name: 'CRAFT' },
  { id: 'sandbox', label: '09', name: 'SANDBOX' },
  { id: 'tech-content', label: '10', name: 'POSTS' },
  { id: 'currently-building', label: '11', name: 'LIVE' },
  { id: 'philosophy', label: '12', name: 'CORE' },
  { id: 'contact', label: '13', name: 'END' },
];

export function PageProgress({ activeSection }: { activeSection: string }) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / (height || 1)) * 100;
      setScrollPercent(Math.round(scrolled));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1 font-tech select-none"
    >
      {/* Scroll percentage readout */}
      <div className="text-[9px] text-[#FF2B2B] font-bold mb-1 tracking-tighter">
        {String(scrollPercent).padStart(2, '0')}%
      </div>

      {/* Vertical line with ticks */}
      <div className="relative flex flex-col items-center gap-2 py-1">
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              onMouseEnter={() => sound.playHover()}
              title={`Jump to ${s.name}`}
              data-cursor-text={s.name}
              className={`group flex items-center justify-end gap-2 text-right transition-all ${
                isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {/* Tooltip on hover */}
              <span className="hidden group-hover:block text-[9px] text-white bg-black/90 border border-white/20 px-1.5 py-0.5 pointer-events-none uppercase tracking-widest whitespace-nowrap">
                {s.name}
              </span>

              {/* Number indicator */}
              <span
                className={`text-[9px] tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#FF2B2B] font-bold underline decoration-[#FF2B2B] underline-offset-2'
                    : 'text-neutral-400 group-hover:text-white'
                }`}
              >
                {s.label}
              </span>

              {/* Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#FF2B2B] ring-2 ring-[#FF2B2B]/40'
                    : 'bg-neutral-600 group-hover:bg-white'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
