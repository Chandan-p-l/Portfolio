import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Youtube, Instagram, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { TECH_ARTICLES } from '../data/portfolioData';
import { TechArticle } from '../types';
import { sound } from '../utils/sound';
import { ArticleModal } from './ArticleModal';

export function TechContent() {
  const [selectedArticle, setSelectedArticle] = useState<TechArticle | null>(null);

  const handleOpenArticle = (art: TechArticle) => {
    sound.playClick();
    setSelectedArticle(art);
  };

  return (
    <section
      id="tech-content"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2A2A] font-bold">09 // KNOWLEDGE & CONTENT</span>
            <span>UNDER THE HOOD</span>
          </div>
          <span>TECHNICAL EXPLAINERS</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] text-white">
            I LIKE KNOWING<br />
            <span className="text-[#FF2A2A]">WHAT'S HAPPENING</span><br />
            <span className="text-stroke-white hover:text-white transition-colors duration-300">
              UNDER THE HOOD.
            </span>
          </h2>
          <p className="font-sans text-neutral-400 text-base sm:text-lg mt-6 max-w-2xl">
            Demystifying complex computing systems: DNS resolution, asymmetric crypto authentication, payment atomicity, and web architecture.
          </p>
        </div>

        {/* 6 Interactive Article Covers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TECH_ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="READ"
              className="border border-white/15 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#FF2A2A] transition-all duration-300 cursor-pointer min-h-[320px] relative overflow-hidden"
            >
              {/* Background index watermark */}
              <div className="absolute right-4 bottom-2 font-display text-7xl font-black text-white/[0.03] group-hover:text-[#FF2A2A]/[0.08] transition-colors pointer-events-none select-none">
                {article.number}
              </div>

              <div>
                <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-3 mb-6">
                  <span className="text-[#FF2A2A] font-bold">0{article.number}</span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5">{article.tag}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-[#FF2A2A] transition-colors">
                  {article.title}
                </h3>

                <p className="font-sans text-sm text-neutral-400 leading-relaxed mt-4 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-tech text-xs">
                <span className="text-neutral-400">{article.readTime}</span>
                <div className="flex items-center gap-1 text-white group-hover:text-[#FF2A2A] transition-colors">
                  <span>EXPLORE SYSTEM</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creator Channels Link Box */}
        <div className="border border-white/15 bg-neutral-950 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-tech text-xs text-[#FF2A2A] tracking-widest uppercase block mb-1">
              CREATOR ECOSYSTEM
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-black text-white">
              FOLLOW THE TECHNICAL EXPERIMENTS & CONTENT
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-tech text-xs">
            <a
              href="https://instagram.com/thechandanpal"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="OPEN"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-white/15 hover:border-[#FF2A2A] text-white transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#FF2A2A]" />
              <span>INSTAGRAM</span>
            </a>

            <a
              href="https://youtube.com/@thechandanpal"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="OPEN"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-white/15 hover:border-[#FF2A2A] text-white transition-colors"
            >
              <Youtube className="w-4 h-4 text-[#FF2A2A]" />
              <span>YOUTUBE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Deep Dive Article Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
