import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { Contact } from '../components/Contact';

export function ContactPage() {
  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Page Hero Header */}
        <section className="pt-32 pb-8 sm:pt-40 sm:pb-12 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">06 // DIRECT DISPATCH</span>
                <span className="text-white">CONTACT CHANDAN PAL</span>
              </div>
              <span className="text-emerald-400">RESPONSE LATENCY &lt; 24H</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white mb-6">
              LET'S BUILD<br />
              <span className="text-[#FF2B2B]">SOMETHING REAL.</span>
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Open for technical leadership, high-scale engineering, co-founding ventures, and creative-tech collaborations.
            </p>
          </div>
        </section>

        {/* Minimal & Cinematic Contact Component */}
        <Contact />

        <Footer />
      </div>
    </PageTransition>
  );
}
