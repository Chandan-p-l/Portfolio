import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 py-12 px-4 sm:px-8 md:px-12 select-none font-tech text-xs text-[#8A8A84]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <Link
            to="/"
            onClick={() => sound.playClick()}
            className="font-display font-black text-lg tracking-widest text-white hover:text-[#FF2B2B] transition-colors"
          >
            CHANDAN PAL<span className="text-[#FF2B2B]">®</span>
          </Link>
          <div className="text-[11px] text-[#8A8A84]">
            COMPUTER SCIENCE STUDENT · DEVELOPER · CTO · BUILDER
          </div>
          <div className="text-[10px] text-neutral-500">
            26.9124° N, 75.7873° E · JAIPUR, INDIA
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-widest">
          {[
            { label: 'HOME', path: '/' },
            { label: 'WORK', path: '/work' },
            { label: 'ABOUT', path: '/about' },
            { label: 'LAB', path: '/lab' },
            { label: 'CONTENT', path: '/content' },
            { label: 'CONTACT', path: '/contact' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="text-[#8A8A84] hover:text-[#FF2B2B] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thechandanpal"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-white hover:text-[#FF2B2B] transition-colors"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span>//</span>
          <a
            href="https://x.com/thechandanpal"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-white hover:text-[#FF2B2B] transition-colors"
          >
            <span>X (TWITTER)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span>//</span>
          <a
            href="https://linkedin.com/in/thechandanpal"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-white hover:text-[#FF2B2B] transition-colors"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-neutral-600">
        <span>© 2026 CHANDAN PAL. ALL RIGHTS RESERVED.</span>
        <span>ENGINEERED WITH REACT, TYPESCRIPT & TAILWIND CSS</span>
      </div>
    </footer>
  );
}
