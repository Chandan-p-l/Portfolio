import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Terminal, Globe2, Sparkles, Layers, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chaosCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetPosRef = useRef({ x: 600, y: 350 });

  // Mouse & Mask State
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);

  // Scroll Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const yBuild = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const scaleThings = useTransform(scrollYProgress, [0, 0.7], [1, 1.12]);
  const yThings = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const yShouldnt = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleShouldnt = useTransform(scrollYProgress, [0, 0.7], [1, 1.15]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.9], [1, 0.92]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // Mask expansion during scroll, then collapse into a thin red line
  const scrollMaskScale = useTransform(scrollYProgress, [0, 0.65, 0.85], [1, 3.5, 0]);
  const redFilamentWidth = useTransform(scrollYProgress, [0.7, 1], ['0%', '100%']);

  // Detect touch device
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      // Auto pulse on touch
      targetPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2.5 };
    }
  }, []);

  // Stop non-essential canvas work as soon as the hero leaves the viewport.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsHeroInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Spring Lerp for Mask Position
  useEffect(() => {
    if (!isHeroInView) return;
    let animationFrameId: number;
    let currentX = targetPosRef.current.x;
    let currentY = targetPosRef.current.y;
    let prevX = currentX;
    let prevY = currentY;
    let lastCommit = 0;

    const loop = (time: number) => {
      // Spring interpolation
      currentX += (targetPosRef.current.x - currentX) * 0.12;
      currentY += (targetPosRef.current.y - currentY) * 0.12;

      // Calculate instantaneous velocity
      const vx = currentX - prevX;
      const vy = currentY - prevY;
      prevX = currentX;
      prevY = currentY;

      // Keep React rendering to ~30fps; the visual still feels fluid while leaving
      // the main thread available for scrolling and pointer input.
      if (time - lastCommit > 33) {
        lastCommit = time;
        setVelocity({ vx, vy });
        setMousePos({ x: currentX, y: currentY });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mouse Move Handler
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const relX = clientX - left;
    const relY = clientY - top;

    targetPosRef.current = { x: relX, y: relY };
    setIsMaskActive(true);

    const tiltX = (clientX - left) / width - 0.5;
    const tiltY = (clientY - top) / height - 0.5;
    setMouseOffset({ x: tiltX * 24, y: tiltY * 24 });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const { clientX, clientY } = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetPosRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    setIsMaskActive(true);
  };

  const handleMouseLeave = () => {
    setIsMaskActive(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Base mask radius calculation
  const speed = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
  const baseRadius = isHoveringPortrait ? 360 : 210;
  const dynamicRadius = Math.min(baseRadius + speed * 3.5, 420);

  // Background Clean Technical Grid & Nodes Canvas
  useEffect(() => {
    if (!isHeroInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light background grid
      const grid = 90;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let gx = 0; gx < width; gx += grid) {
        for (let gy = 0; gy < height; gy += grid) {
          ctx.fillRect(gx - 1, gy - 1, 2, 2);
        }
      }

      // Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Chaos Collage Background Layer Canvas (Under the Hood)
  useEffect(() => {
    if (!isMaskActive || !isHeroInView) return;
    const canvas = chaosCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const snippets = [
      'POST /api/v1/orders/fulfill HTTP/2',
      'const cluster = pm2.connect({ workers: "max" })',
      'sysctl -w net.core.somaxconn=65535',
      'CREATE INDEX idx_orders_customer ON orders(uuid)',
      'nginx/1.24.0 (Ubuntu) TLSv1.3 AES_256_GCM',
      'git commit -m "feat(store): sub-second checkout engine"',
      'WebSocket connected: wss://wyther.co/stream',
      'buffer.allocUnsafe(4096) -> 0ms latency',
      'V8::GarbageCollection::Scavenge: 0.12ms',
      'SELECT id, sku, stock_qty FROM inventory WHERE lock=1',
      'Docker container cp-cluster-01 healthy [200 OK]',
    ];

    let t = 0;
    let lastFrame = 0;
    const renderChaos = (time: number) => {
      if (time - lastFrame < 33) {
        animationFrameId = requestAnimationFrame(renderChaos);
        return;
      }
      lastFrame = time;
      t += 0.015;
      ctx.fillStyle = '#070707';
      ctx.fillRect(0, 0, width, height);

      // Cyberpunk blueprint circuits & red traces
      ctx.strokeStyle = 'rgba(255, 43, 43, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const yLine = ((i * 140 + t * 40) % height);
        ctx.beginPath();
        ctx.moveTo(0, yLine);
        ctx.lineTo(width * 0.4, yLine);
        ctx.lineTo(width * 0.45, yLine + 30);
        ctx.lineTo(width, yLine + 30);
        ctx.stroke();
      }

      // Draw floating code and system traces
      ctx.font = '11px "Space Mono", monospace';
      snippets.forEach((text, idx) => {
        const xPos = (idx * 280 + t * 30) % (width + 300) - 150;
        const yPos = (idx * 75 + 60) % height;
        
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(255, 43, 43, 0.75)' : 'rgba(255, 255, 255, 0.65)';
        ctx.fillText(text, xPos, yPos);

        // Technical bounding box
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeRect(xPos - 8, yPos - 14, text.length * 7 + 16, 20);
      });

      // Central technical wireframe schematics
      const cx = width / 2;
      const cy = height / 2;
      ctx.strokeStyle = 'rgba(255, 43, 43, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(cx - 160, cy - 140, 320, 280);

      // Diagonal crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy - 140);
      ctx.lineTo(cx - 130, cy - 140);
      ctx.moveTo(cx + 130, cy - 140);
      ctx.lineTo(cx + 160, cy - 140);
      ctx.moveTo(cx - 160, cy + 140);
      ctx.lineTo(cx - 130, cy + 140);
      ctx.moveTo(cx + 130, cy + 140);
      ctx.lineTo(cx + 160, cy + 140);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(renderChaos);
    };

    animationFrameId = requestAnimationFrame(renderChaos);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMaskActive, isHeroInView]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden select-none"
    >
      {/* 1. LAYER: Base Clean Blueprint Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* 2. LAYER: "UNDER THE HOOD" CHAOS COLLAGE (Revealed by Circular Cursor Mask) */}
      <div
        style={{
          clipPath: `circle(${dynamicRadius}px at ${mousePos.x}px ${mousePos.y}px)`,
          WebkitClipPath: `circle(${dynamicRadius}px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-[clip-path] duration-75 ease-out"
      >
        <canvas ref={chaosCanvasRef} className="w-full h-full block opacity-90" />

        {/* Dynamic Mask Indicator Badge */}
        <div
          style={{
            transform: `translate(${mousePos.x + 20}px, ${mousePos.y - 30}px)`,
          }}
          className="fixed top-0 left-0 pointer-events-none z-30 font-tech text-[10px] text-black bg-[#FF2B2B] px-2 py-0.5 font-bold uppercase tracking-widest shadow-lg hidden md:block"
        >
          02 / UNDER THE HOOD
        </div>
      </div>

      {/* Top Header Metadata Tag Strip */}
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 z-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-pulse" />
            <span>CHANDAN PAL®</span>
          </div>
          <span className="text-neutral-600 hidden sm:inline">/</span>
          <div className="hidden sm:flex items-center gap-2 text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2B2B]" />
            <span>BUILDER · CREATIVE DIRECTOR · FOUNDER</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-[#8A8A84] hidden md:inline">SURFACE STATUS:</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white font-tech">
              {isMaskActive ? '02 // REVEAL ACTIVE' : '01 // SURFACE'}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#FF2B2B]/10 border border-[#FF2B2B]/40 text-[#FF2B2B] font-tech font-bold">
              INDIA · 26.91° N
            </span>
          </div>
        </div>
      </div>

      {/* SIGNATURE HERO CENTERPIECE: DEPTH COMPOSITION */}
      <motion.div
        style={{
          scale: scaleHero,
          opacity: opacityHero,
        }}
        className="max-w-7xl w-full mx-auto my-auto py-6 sm:py-10 z-20 relative hero-depth-layer"
      >
        <div className="relative flex flex-col items-center sm:items-start justify-center">
          {/* Subtle Manifesto Tag */}
          <div className="font-tech text-[10px] sm:text-xs text-[#FF2B2B] tracking-[0.3em] uppercase mb-2 sm:mb-4 flex items-center gap-3 self-start">
            <span>[ CP // MANIFESTO 2026 ]</span>
            <div className="h-px w-12 sm:w-16 bg-[#FF2B2B]/60" />
            <span className="text-neutral-500 font-normal hidden md:inline">IDEAS × EXECUTION × IMPACT</span>
          </div>

          {/* ======================================================== */}
          {/* LAYER 1: TYPOGRAPHY BEHIND BODY (I BUILD + METADATA) */}
          {/* ======================================================== */}
          <div className="relative z-0 w-full">
            <motion.div
              style={{ y: yBuild, x: mouseOffset.x * 0.3 }}
              className="flex flex-wrap items-baseline justify-between gap-4"
            >
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[13.5rem] font-black tracking-tighter leading-none text-[#E21B1B] select-none hero-poster-title">
                CHANDAN
              </h1>

              {/* Subordinate Metadata Behind Body */}
              <div className="hidden lg:flex flex-col text-right font-tech text-xs text-[#8A8A84] space-y-1">
                <span className="text-white font-bold tracking-widest uppercase">CHANDAN PAL®</span>
                <span className="text-[#FF2B2B]">CREATIVE TECHNOLOGIST</span>
                <span>CTO / CO-FOUNDER @ WYTHHER</span>
              </div>
            </motion.div>
          </div>

          {/* ======================================================== */}
          {/* LAYER 2: CHANDAN PORTRAIT COMPOSITION (MIDDLE LAYER) */}
          {/* ======================================================== */}
          <motion.div
            style={{ rotateX: mouseOffset.y * -0.18, rotateY: mouseOffset.x * 0.18, transformPerspective: 1000 }}
            onMouseEnter={() => {
              setIsHoveringPortrait(true);
              sound.playHover();
            }}
            onMouseLeave={() => setIsHoveringPortrait(false)}
            data-cursor-text="LOOK INSIDE"
            className="relative z-10 w-full flex justify-center -my-8 sm:-my-16 md:-my-24 pointer-events-auto cursor-pointer will-change-transform"
          >
            <div className="hidden md:block absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-tech text-[10px] tracking-[.6em] text-[#E21B1B] whitespace-nowrap">FOR THE CURIOUS // 2026 // JAIPUR</div>
            <div className="hero-portrait-zone relative w-72 sm:w-96 md:w-[29rem] lg:w-[34rem] aspect-[3/4] max-h-[620px] flex items-center justify-center">
              {/* Rim Lighting & Red Glow */}
              <div className="absolute inset-0 bg-[#FF2B2B]/15 blur-3xl rounded-full pointer-events-none transform scale-90" />
              <img src="/chandan-pal.webp" alt="" aria-hidden="true" className="hero-ghost hero-ghost-red absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none" />
              <img src="/chandan-pal.webp" alt="" aria-hidden="true" className="hero-ghost hero-ghost-blue absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none" />
              <div className="hero-orbit absolute -inset-12 sm:-inset-20 pointer-events-none" aria-hidden="true"><span>CHANDAN PAL — BUILDER — SYSTEMS — DESIGN — </span></div>

              {/* Portrait Silhouette Layer with Tactical Shading & Edge Light */}
              <div className="relative w-full h-full overflow-hidden border-0 bg-transparent shadow-none flex flex-col justify-end p-4 group hero-portrait-frame">
                {/* Visual Portrait Matrix Cutout */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-[#141414]">
                  <img
                    src="/chandan-pal.webp"
                    alt="Chandan Pal"
                    className="relative z-10 h-full w-full object-contain object-bottom px-1 pt-2 filter contrast-110 saturate-90 group-hover:scale-[1.06] transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  {/* High contrast vector portrait composition */}
                  <svg
                    viewBox="0 0 320 420"
                    className="hidden w-full h-full object-cover filter contrast-125 brightness-95 opacity-90 group-hover:scale-105 transition-transform duration-700"
                  >
                    <defs>
                      <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2A2A2A" />
                        <stop offset="60%" stopColor="#151515" />
                        <stop offset="100%" stopColor="#080808" />
                      </linearGradient>
                      <linearGradient id="redRim" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FF2B2B" stopOpacity="0.8" />
                        <stop offset="25%" stopColor="#FF2B2B" stopOpacity="0" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Dark Minimalist Shoulders & Torso */}
                    <path
                      d="M20 420 Q50 310 110 270 L210 270 Q270 310 300 420 Z"
                      fill="#0C0C0C"
                      stroke="#222"
                      strokeWidth="1.5"
                    />

                    {/* Jacket Lapel & Collar */}
                    <path
                      d="M120 270 L160 360 L200 270 Z"
                      fill="#050505"
                      stroke="rgba(255, 43, 43, 0.4)"
                      strokeWidth="1"
                    />

                    {/* Neck */}
                    <path
                      d="M135 210 L135 275 L185 275 L185 210 Z"
                      fill="#1E1E1E"
                    />

                    {/* Head Silhouette */}
                    <path
                      d="M115 140 Q110 60 160 55 Q210 60 205 140 Q205 215 160 220 Q115 215 115 140 Z"
                      fill="url(#skinGrad)"
                    />

                    {/* Sculpted Hair */}
                    <path
                      d="M110 130 Q105 40 160 35 Q215 40 210 130 Q190 60 160 60 Q130 60 110 130 Z"
                      fill="#040404"
                    />

                    {/* Sharp Red Rim Light Edge */}
                    <path
                      d="M110 140 Q105 60 160 40 Q170 35 160 50 Q120 60 118 140 Z"
                      fill="#FF2B2B"
                      opacity="0.9"
                    />

                    {/* Subtle Crosshairs & Coordinates */}
                    <line x1="160" y1="30" x2="160" y2="45" stroke="#FF2B2B" strokeWidth="1" />
                    <line x1="152" y1="37" x2="168" y2="37" stroke="#FF2B2B" strokeWidth="1" />
                    <circle cx="160" cy="140" r="85" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" fill="none" strokeDasharray="3,3" />
                  </svg>
                </div>

                {/* Tactical Scanline & Corner Badges */}
                <div className="relative z-10 font-tech text-[10px] text-white flex justify-between items-center border-t border-white/10 pt-2 bg-black/60 backdrop-blur-sm px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#FF2B2B] font-bold">CHANDAN PAL // SPEC</span>
                  <span className="text-neutral-400">26.91° N</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* LAYER 3: TYPOGRAPHY IN FRONT OF BODY (THINGS THAT SHOULDN'T EXIST YET) */}
          {/* ======================================================== */}
          <div className="relative z-20 w-full pointer-events-none">
            {/* THINGS */}
            <motion.div
              style={{ y: yThings, scale: scaleThings, x: mouseOffset.x * -0.4 }}
              className="w-full flex justify-center sm:justify-start -mt-4 sm:-mt-8"
            >
              <h2 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] hero-poster-title">
                PAL
              </h2>
            </motion.div>

            {/* that SHOULDN'T EXIST YET */}
            <motion.div
              style={{ y: yShouldnt, scale: scaleShouldnt, x: mouseOffset.x * 0.5 }}
              className="flex flex-wrap items-baseline justify-between gap-4 mt-2"
            >
              <div className="flex flex-wrap items-baseline">
                <span className="font-editorial italic text-3xl sm:text-5xl md:text-7xl text-[#FF2B2B] mr-4 font-normal drop-shadow-lg">
                  BUILDS
                </span>
                <span className="font-future font-black text-3xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                  THE UNEXPECTED.
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Bottom Interactive Bar & Continuous Scroll Filament */}
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/10 pt-6 z-20 font-tech text-xs relative">
        <div className="flex items-center gap-3 text-[#8A8A84]">
          <Terminal className="w-3.5 h-3.5 text-[#FF2B2B]" />
          <span className="tracking-wider text-[11px]">
            {isTouchDevice ? 'TAP / DRAG TO REVEAL ENGINE' : 'MOVE CURSOR TO LOOK UNDER THE HOOD'}
          </span>
        </div>

        {/* Scroll Action Button */}
        <button
          onClick={() => {
            sound.playClick();
            window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
          data-cursor-text="EXPLORE"
          className="flex items-center gap-3 text-neutral-200 hover:text-white group border border-white/15 hover:border-[#FF2B2B] bg-black/80 px-4 py-2.5 transition-all shadow-xl"
        >
          <span className="tracking-widest uppercase text-[11px] group-hover:text-[#FF2B2B] transition-colors font-bold">
            SCROLL TO ENTER
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#FF2B2B]" />
          </motion.div>
        </button>

        {/* CONTINUOUS SCROLL TRANSITION RED FILAMENT (Collapsing into Manifesto) */}
        <motion.div
          style={{ width: redFilamentWidth }}
          className="absolute -bottom-12 left-0 h-[2px] bg-[#FF2B2B] shadow-[0_0_12px_#FF2B2B] pointer-events-none transition-all"
        />
      </div>
    </section>
  );
}
