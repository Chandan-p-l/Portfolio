import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Terminal, Cpu, Sparkles, Maximize2, Minimize2, RefreshCw, Zap, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

// Preset code libraries for the interactive grid tiles
const CODE_LIBRARIES = {
  snippets: [
    'const', 'fn()', 'async', 'import', 'export', 'return',
    '=>', '{...}', '</>', 'state', 'yield', 'await',
    'struct', 'interface', 'impl', 'public', 'static', 'void'
  ],
  syntax: [
    '</>', '{...}', '=>', '<div/>', '[]', '()=>{}',
    '!==', '&&', '||', '??', '${...}', '/*', '*/',
    '::', '->', '==', '#[inline]', 'ref'
  ],
  tech: [
    'REACT', 'TYPESCRIPT', 'VITE', 'NODE.JS', 'DOCKER',
    'RUST', 'GO', 'TAILWIND', 'API', 'V8', 'npm',
    'WEBGL', 'GSAP', 'LENIS', 'PM2', 'TLS'
  ],
  binary: [
    '01000001', '0x7FFF', '01100011', '10010110', '0x4A00',
    '200 OK', 'HTTP/3', 'TLS 1.3', 'ACK', 'SYN', '0x00',
    '0x00FF', '11001100', '0x99', '0101', 'v1.24'
  ]
};

// Continuous Marquee Words (matching Awwwards screenshot style)
const MARQUEE_WORDS = [
  'OUR', 'INSPIRATION', 'BEGINS', 'WITH', 'CODE', 'IT\'S', 'ENGINEERING',
  'THE', 'PUREST', 'CONTEMPORARY', 'EXPRESSION', 'FUNCTION', 'TECHNOLOGICAL',
  'OF', 'THE', 'SOLUTIONS', 'EXTENSION', 'AN', 'AND', 'DESIGN', 'INNOVATION',
  'PERSONALITY', 'CHANDAN PAL', 'WYTHER', 'TYPESCRIPT', 'VITE', 'REACT'
];

interface TileData {
  id: string;
  col: number;
  row: number;
  code: string;
  opacity: number;
  createdAt: number;
  life: number; // in ms
  accent: boolean;
}

interface CodeCanvasGridProps {
  isFullScreen?: boolean;
  onCloseFullScreen?: () => void;
}

export function CodeCanvasGrid({ isFullScreen = false, onCloseFullScreen }: CodeCanvasGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof CODE_LIBRARIES>('snippets');
  const [activeTiles, setActiveTiles] = useState<Map<string, TileData>>(() => new Map<string, TileData>());
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [fullScreen, setFullScreen] = useState(isFullScreen);
  const [tileCount, setTileCount] = useState(0);
  const [autoBurst, setAutoBurst] = useState(false);

  const TILE_SIZE = 58; // Size in px for grid blocks

  // Handle Fullscreen prop sync
  useEffect(() => {
    setFullScreen(isFullScreen);
  }, [isFullScreen]);

  // Clean up old expired tiles on RAF loop
  useEffect(() => {
    let animFrame: number;
    const updateTiles = () => {
      const now = Date.now();
      setActiveTiles((prev: Map<string, TileData>) => {
        let changed = false;
        const next = new Map<string, TileData>(prev);
        for (const [key, tile] of next.entries()) {
          const elapsed = now - tile.createdAt;
          if (elapsed > tile.life) {
            next.delete(key);
            changed = true;
          } else {
            // Decay opacity
            const remaining = 1 - elapsed / tile.life;
            if (Math.abs(tile.opacity - remaining) > 0.05) {
              next.set(key, { ...tile, opacity: remaining });
              changed = true;
            }
          }
        }
        return changed ? next : prev;
      });
      animFrame = requestAnimationFrame(updateTiles);
    };

    animFrame = requestAnimationFrame(updateTiles);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Spawn tile cluster around a column & row position
  const spawnTileCluster = useCallback((targetCol: number, targetRow: number, library: string[], count = 7) => {
    // Offset pattern reminiscent of pixelated cluster in reference shot
    const offsets = [
      [0, 0], [1, 0], [0, 1], [-1, 0], [0, -1],
      [1, 1], [-1, -1], [1, -1], [-1, 1],
      [2, 0], [0, 2], [-2, 0], [0, -2]
    ];

    const shuffled = [...offsets].sort(() => Math.random() - 0.5).slice(0, count);
    const now = Date.now();

    setActiveTiles((prev: Map<string, TileData>) => {
      const next = new Map<string, TileData>(prev);
      shuffled.forEach(([dc, dr], idx) => {
        const col = targetCol + dc;
        const row = targetRow + dr;
        const key = `${col}_${row}`;
        const codeSymbol = library[Math.floor(Math.random() * library.length)];
        const life = 1400 + Math.random() * 800; // 1.4s - 2.2s lifespan
        const accent = idx === 0 || Math.random() < 0.25;

        next.set(key, {
          id: key,
          col,
          row,
          code: codeSymbol,
          opacity: 1,
          createdAt: now,
          life,
          accent
        });
      });

      setTileCount(next.size);
      return next;
    });
  }, []);


  // Handle Mouse Move over the Canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);

    const library = CODE_LIBRARIES[activeCategory];
    spawnTileCluster(col, row, library, 8);
  };

  // Handle Mouse Click (Spawns explosive tile ripple)
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    sound.playClick();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerCol = Math.floor(x / TILE_SIZE);
    const centerRow = Math.floor(y / TILE_SIZE);

    const library = CODE_LIBRARIES[activeCategory];
    // Radial burst pattern
    const burstOffsets: [number, number][] = [];
    for (let r = 0; r <= 3; r++) {
      for (let dc = -r; dc <= r; dc++) {
        for (let dr = -r; dr <= r; dr++) {
          if (Math.abs(dc) + Math.abs(dr) === r) {
            burstOffsets.push([dc, dr]);
          }
        }
      }
    }

    const now = Date.now();
    setActiveTiles((prev: Map<string, TileData>) => {
      const next = new Map<string, TileData>(prev);
      burstOffsets.forEach(([dc, dr], idx) => {
        const col = centerCol + dc;
        const row = centerRow + dr;
        const key = `${col}_${row}`;
        const codeSymbol = library[Math.floor(Math.random() * library.length)];
        const delay = (Math.abs(dc) + Math.abs(dr)) * 60;

        next.set(key, {
          id: key,
          col,
          row,
          code: codeSymbol,
          opacity: 1,
          createdAt: now + delay,
          life: 1800,
          accent: idx % 3 === 0
        });
      });
      setTileCount(next.size);
      return next;
    });
  };

  // Auto burst demonstration mode
  const triggerAutoBurst = () => {
    sound.playSwitch();
    setAutoBurst(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxCols = Math.floor(rect.width / TILE_SIZE);
    const maxRows = Math.floor(rect.height / TILE_SIZE);

    const library = CODE_LIBRARIES[activeCategory];
    let step = 0;
    const interval = setInterval(() => {
      const randomCol = Math.floor(Math.random() * (maxCols - 4)) + 2;
      const randomRow = Math.floor(Math.random() * (maxRows - 4)) + 2;
      spawnTileCluster(randomCol, randomRow, library, 10);
      step++;
      if (step >= 8) {
        clearInterval(interval);
        setAutoBurst(false);
      }
    }, 180);
  };

  // Convert active tiles map to array for rendering
  const tilesArray: TileData[] = Array.from(activeTiles.values());

  return (
    <div
      className={`relative w-full overflow-hidden select-none font-tech transition-all duration-300 ${
        fullScreen
          ? 'fixed inset-0 z-50 bg-[#050505] h-screen'
          : 'bg-[#060607] h-[85vh] sm:h-[90vh] border-y border-white/10'
      }`}
    >
      {/* Background Graphic: Warm Lighting Portrait backdrop matching Awwwards screenshot */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep ambient red-orange glow background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#120303] via-[#1a0806] to-[#450d06]" />
        
        {/* Artistic portrait with warm lighting tint */}
        <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 opacity-40 mix-blend-screen overflow-hidden">
          <img
            src="/hero-portrait.png"
            alt="Canvas Background"
            className="w-full h-full object-cover object-center filter contrast-125 saturate-150 brightness-90 hue-rotate-[-10deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060607] via-[#060607]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-[#060607]/80" />
        </div>

        {/* Technical Sub-Grid background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:58px_58px]" />
      </div>

      {/* INTERACTIVE MOUSE CANVAS AREA */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-10 cursor-crosshair overflow-hidden"
      >
        {/* DYNAMIC CODE TILES GRID LAYER (The Core Awwwards Feature) */}
        {tilesArray.map((tile) => {
          const left = tile.col * TILE_SIZE;
          const top = tile.row * TILE_SIZE;

          return (
            <motion.div
              key={tile.id}
              initial={{ scale: 0.2, opacity: 0, rotate: -6 }}
              animate={{ scale: tile.opacity, opacity: tile.opacity, rotate: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${TILE_SIZE - 2}px`,
                height: `${TILE_SIZE - 2}px`,
              }}
              className={`absolute flex items-center justify-center p-1 font-mono text-xs font-bold transition-colors select-none rounded-[2px] shadow-2xl backdrop-blur-sm ${
                tile.accent
                  ? 'bg-[#FF2B2B] text-white border border-red-400 shadow-red-500/40 z-20'
                  : 'bg-[#0a0a0c]/92 text-neutral-100 border border-white/20 hover:border-[#FF2B2B]/60 z-10'
              }`}
            >
              <span className="truncate tracking-tighter text-[11px] sm:text-xs">
                {tile.code}
              </span>

              {/* Technical corner pin detail */}
              <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/40 rounded-full" />
            </motion.div>
          );
        })}
      </div>

      {/* CONTINUOUS HORIZONTAL CODE TICKER / MARQUEE BAR (MIDDLE STRIP) */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 z-20 pointer-events-none overflow-hidden bg-black/80 backdrop-blur-md border-y border-white/20 py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 mx-2 px-3 py-1 bg-black border border-white/20 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md"
            >
              <span className="text-[#FF2B2B] font-extrabold text-[10px]">#</span>
              <span>{word}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP HEADER CONTROLS & METADATA OVERLAY */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex flex-wrap items-center justify-between gap-4 pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 p-3 sm:px-6 rounded-lg">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2B2B] animate-ping" />
            <Code2 className="w-4 h-4 text-[#FF2B2B]" />
            <span>AWWWARDS CANVAS GRID</span>
          </div>
          <span className="text-neutral-500 text-xs hidden sm:inline">|</span>
          <span className="hidden sm:inline font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            CODE TILES: {tileCount} ACTIVE
          </span>
        </div>

        {/* Category Library Switcher Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 p-1 rounded-md border border-white/10 font-mono text-[10px] sm:text-xs">
          {(Object.keys(CODE_LIBRARIES) as Array<keyof typeof CODE_LIBRARIES>).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-2.5 py-1 rounded tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF2B2B] text-white font-bold shadow-md shadow-red-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Auto Burst */}
          <button
            onClick={triggerAutoBurst}
            disabled={autoBurst}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-[#FF2B2B] text-white text-xs font-bold rounded transition-colors border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">BURST TRAIL</span>
          </button>

          {/* FullScreen Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              if (onCloseFullScreen && fullScreen) {
                onCloseFullScreen();
              } else {
                setFullScreen(!fullScreen);
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors border border-white/10"
            title={fullScreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {fullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* FOOTER INSTRUCTION & STATUS BADGE */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none text-neutral-400 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 pointer-events-auto">
          <Terminal className="w-3.5 h-3.5 text-[#FF2B2B]" />
          <span>MOVE CURSOR / CLICK CANVAS TO SPAWN CODE TILES</span>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 pointer-events-auto">
          <span>STYLE: REVEAL MATRIX</span>
          <span className="text-[#FF2B2B]">CP® / CREATIVE TECH</span>
        </div>
      </div>
    </div>
  );
}
