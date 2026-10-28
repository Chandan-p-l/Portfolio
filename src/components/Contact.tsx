import { useState, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, Instagram, Send, Sparkles } from 'lucide-react';
import { CHANDAN_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isRedBackground, setIsRedBackground] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(CHANDAN_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!message || !senderEmail) return;
    sound.playClick();
    const subject = encodeURIComponent(`Portfolio enquiry from ${senderName}`);
    const body = encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`);
    window.location.href = `mailto:${CHANDAN_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full py-20 sm:py-32 px-4 sm:px-8 md:px-12 select-none flex flex-col justify-between transition-colors duration-500 ${
        isRedBackground ? 'bg-[#FF2B2B] text-black' : 'bg-[#060606] text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto space-y-16">
        {/* Top Minimal Indicator */}
        <div className="flex items-center justify-between font-tech text-xs border-b border-current opacity-60 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">[ THE FINALE ]</span>
            <span>CONTACT & INITIATIVE</span>
          </div>
          <span>CHANDAN PAL® // 2026</span>
        </div>

        {/* Emotional Centered Headline with Subtle Pointer Parallax */}
        <motion.div
          style={{ x: mouseOffset.x, y: mouseOffset.y }}
          className="space-y-4 max-w-5xl"
        >
          <span className="font-editorial italic text-3xl sm:text-5xl block font-normal opacity-90">
            so...
          </span>
          <FitText as="h2" text="BUILDING?" max={11.5} className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11.5rem] font-black uppercase tracking-tighter leading-[0.88]">
            WHAT<br />
            ARE<br />
            WE<br />
            <span>BUILDING?</span>
          </FitText>
        </motion.div>

        {/* Minimal Dispatch Form & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8 border-t border-current opacity-90">
          {/* Direct Email Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="font-tech text-xs tracking-widest uppercase font-bold">
                DIRECT INBOX LINK
              </div>
              <a href={`mailto:${CHANDAN_INFO.email}`} className="block font-tech font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight break-all hover:text-[#FF2B2B] transition-colors">
                {CHANDAN_INFO.email}
              </a>
              <p className="font-sans text-sm sm:text-base font-light leading-relaxed max-w-md opacity-80">
                Open to full-stack and frontend engineering roles, freelance product builds and technical collaborations.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3 border border-current font-tech text-xs font-bold tracking-widest uppercase hover:bg-current hover:text-black transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'EMAIL COPIED' : 'COPY EMAIL'}</span>
              </button>

              <a
                href={`mailto:${CHANDAN_INFO.email}`}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3 border border-current font-tech text-xs font-bold tracking-widest uppercase hover:bg-current hover:text-black transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>OPEN MAIL CLIENT</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex flex-wrap gap-3 font-tech text-xs">
              <a
                href={CHANDAN_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-current/40 hover:border-current transition-all flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={CHANDAN_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-current/40 hover:border-current transition-all flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
              <a
                href={CHANDAN_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-current/40 hover:border-current transition-all flex items-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="lg:col-span-6 border border-current/20 p-6 sm:p-8 space-y-4">
            <div className="font-tech text-xs tracking-widest uppercase font-bold">
              DISPATCH FORM
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-tech text-xs">
              <div>
                <label className="block uppercase text-[10px] opacity-75 mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full p-3 bg-black/20 border border-current/30 text-current placeholder:text-current/30 focus:border-current outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] opacity-75 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="elena@venture.com"
                  className="w-full p-3 bg-black/20 border border-current/30 text-current placeholder:text-current/30 focus:border-current outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] opacity-75 mb-1">THE INITIATIVE / MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the problem, vision, or product..."
                  className="w-full p-3 bg-black/20 border border-current/30 text-current placeholder:text-current/30 focus:border-current outline-none resize-none"
                />
              </div>

              {/* PRIMARY CTA: Hovering shifts background to RED */}
              <button
                type="submit"
                onMouseEnter={() => {
                  setIsRedBackground(true);
                  sound.playHover();
                }}
                onMouseLeave={() => setIsRedBackground(false)}
                data-cursor-text="DISPATCH"
                className="w-full py-4 bg-[#FF2B2B] text-black font-tech text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-2xl"
              >
                <Send className="w-4 h-4" />
                <span>OPEN EMAIL DRAFT</span>
              </button>
              <p aria-live="polite" className="text-[10px] leading-relaxed opacity-60">
                Sending opens your default email client with this message prefilled. Nothing is silently discarded.
              </p>
            </form>
          </div>
        </div>

        {/* Minimal Finale Stamp */}
        <div className="pt-12 border-t border-current opacity-70 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs">
          <div className="font-bold tracking-widest">
            CHANDAN PAL® // 2026
          </div>
          <div>END OF TRANSMISSION.</div>
        </div>
      </div>
    </section>
  );
}
