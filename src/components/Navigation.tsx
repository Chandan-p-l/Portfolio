import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Grid, Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavigationProps {
  onToggleGrid?: () => void;
  showGrid?: boolean;
}

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'WORK', path: '/work' },
  { label: 'ABOUT', path: '/about' },
  { label: 'LAB', path: '/lab' },
  { label: 'CONTENT', path: '/content' },
  { label: 'CONTACT', path: '/contact' },
];

export function Navigation(_props: NavigationProps = {}) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [statusClicks, setStatusClicks] = useState(0);

  const [volumeLevel, setVolumeLevel] = useState(sound.getVolume());

  const handleVolumeChange = (newVol: number) => {
    sound.setVolume(newVol);
    setVolumeLevel(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted && volumeLevel === 0) {
      handleVolumeChange(0.8);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleStatusClick = () => {
    sound.playSwitch();
    setStatusClicks((prev) => prev + 1);
    setEasterEggOpen(true);
    setTimeout(() => setEasterEggOpen(false), 3000);
  };

  const isCurrentPath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        id="main-navigation"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 sm:p-6"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 rounded-full ${
            isScrolled
              ? 'bg-[#050505]/95 backdrop-blur-md border border-white/15 px-6 py-2.5 shadow-2xl'
              : 'bg-[#050505]/85 backdrop-blur-md border border-white/10 px-6 py-2.5 shadow-xl'
          }`}
        >
          {/* Top Left: CP® Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={() => sound.playClick()}
              data-cursor-text="CHANDAN"
              className="group flex items-center gap-2"
            >
              <span className="font-display font-black text-sm sm:text-base tracking-widest text-white group-hover:text-[#FF2B2B] transition-colors">
                CHANDAN PAL<span className="text-[#FF2B2B]">®</span>
              </span>
            </Link>
          </div>

          {/* Center Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-tech text-[11px] tracking-widest uppercase">
            {NAV_LINKS.map((link) => {
              const active = isCurrentPath(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text={link.label}
                  className={`transition-colors relative py-1 ${
                    active ? 'text-[#FF2B2B] font-bold' : 'text-[#8A8A84] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#FF2B2B]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Status Indicator & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Status Pill with Easter Egg */}
            <div className="relative">
              <button
                onClick={handleStatusClick}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="STATUS"
                className="flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/10 hover:border-[#FF2B2B] text-[10px] font-tech text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] animate-ping" />
                <span className="hidden sm:inline tracking-wider text-neutral-300">
                  ● AVAILABLE / BUILDING
                </span>
                <span className="sm:hidden text-[#FF2B2B]">● LIVE</span>
              </button>

              {/* Status Easter Egg Toast */}
              <AnimatePresence>
                {easterEggOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute right-0 top-full mt-2 w-56 p-3 bg-[#0E0E0E] border border-[#FF2B2B] shadow-2xl font-tech text-[10px] space-y-1.5 z-50 text-[#F4F2EC]"
                  >
                    <div className="text-[#FF2B2B] font-bold">SYSTEM TELEMETRY:</div>
                    <div className="text-neutral-300">STATUS: STILL BUILDING... ({statusClicks} PINGS)</div>
                    <div className="text-[#8A8A84]">COORD: 26.91° N, 75.78° E</div>
                    <div className="text-emerald-400">ENGINE: NOMINAL</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Volume Level Controller Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 bg-black/70 border border-white/15 hover:border-[#FF2B2B] transition-colors rounded-full font-tech text-[10px]">
              <button
                onClick={toggleAudio}
                title={isMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
                data-cursor-text={isMuted ? 'UNMUTE' : 'MUTE'}
                className="text-[#FF2B2B] hover:text-white transition-colors flex items-center shrink-0"
              >
                {!isMuted && volumeLevel > 0 ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volumeLevel}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                data-cursor-text="VOL"
                className="w-14 sm:w-20 h-1.5 accent-[#FF2B2B] bg-neutral-800 rounded-lg cursor-pointer transition-all"
              />

              <span className="hidden sm:inline font-extrabold text-[9px] text-[#FF2B2B] w-7 text-right select-none">
                {isMuted || volumeLevel === 0 ? '0%' : `${Math.round(volumeLevel * 100)}%`}
              </span>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 bg-black/60 text-white border border-white/10"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl p-6 pt-24 flex flex-col justify-between md:hidden border-b border-white/10"
          >
            <div className="space-y-4">
              <div className="font-tech text-xs text-[#FF2B2B] tracking-widest pb-3 border-b border-white/10">
                CHANDAN PAL // NAVIGATION INDEX
              </div>
              <div className="grid grid-cols-1 gap-2">
                {NAV_LINKS.map((link, idx) => {
                  const active = isCurrentPath(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        sound.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between text-left py-3.5 px-4 border transition-all font-display text-xl tracking-wide ${
                        active
                          ? 'bg-[#FF2B2B] text-black border-[#FF2B2B] font-bold'
                          : 'border-white/5 hover:border-[#FF2B2B] hover:bg-white/5 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-tech text-xs ${active ? 'text-black font-bold' : 'text-[#FF2B2B]'}`}>
                          0{idx + 1}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <ArrowUpRight className={`w-4 h-4 ${active ? 'text-black' : 'text-[#8A8A84]'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 font-tech text-xs text-[#8A8A84] flex justify-between items-center">
              <span>CHANDAN PAL // 2026</span>
              <span className="text-[#FF2B2B]">26.9124° N, 75.7873° E</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
