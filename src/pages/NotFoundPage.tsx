import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { sound } from '../utils/sound';
import { FitText } from '../components/FitText';

export function NotFoundPage() {
  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        <section className="min-h-[80svh] pt-32 pb-16 px-4 sm:px-8 md:px-12 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="font-tech text-xs text-[#FF2B2B] font-bold tracking-[.3em] mb-6">ERROR 404 // SIGNAL LOST</div>
            <FitText as="h1" text="PAGE NOT FOUND." max={8} className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight leading-none text-white mb-8">
              PAGE NOT<br />
              <span className="text-[#FF2B2B]">FOUND.</span>
            </FitText>
            <p className="font-sans text-xl text-neutral-300 font-light max-w-xl mb-10">This page doesn't exist or has moved. Try one of these instead.</p>
            <div className="flex flex-wrap gap-3">
              {[
                ['HOME', '/'],
                ['WORK', '/work'],
                ['BLOG', '/blog'],
                ['CONTACT', '/contact'],
              ].map(([label, to], i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-6 py-4 font-tech text-xs font-bold uppercase tracking-widest transition-all ${
                    i === 0 ? 'bg-[#FF2B2B] text-black hover:bg-white' : 'bg-white/5 border border-white/15 hover:border-[#FF2B2B]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
}
