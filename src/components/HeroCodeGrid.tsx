import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../utils/sound';

// Combined master library of snippets, binary data, tech stack, and syntax symbols
const ALL_CODE_SYMBOLS = [
  // Snippets & Logic
  'const', 'fn()', 'async', 'import', 'export', 'return', '=>', '{...}', '</>', 'state', 'yield', 'await', 'struct', 'interface', 'impl', 'void', 'public', 'static',
  // Binary & System Telemetry
  '0101', '0x7FFF', '01100011', '0x4A00', '200 OK', 'HTTP/3', 'TLS 1.3', 'ACK', 'SYN', '0x00FF', 'v1.24', 'sysctl', 'pm2', '01000001', '0x99',
  // Tech Stack & Frameworks
  'REACT', 'TYPESCRIPT', 'VITE', 'NODE.JS', 'DOCKER', 'RUST', 'GO', 'TAILWIND', 'API', 'V8', 'npm', 'WEBGL', 'GSAP', 'LENIS', 'PWA',
  // Syntax & Operations
  '<div/>', '[]', '()=>{}', '!==', '&&', '||', '??', '${...}', '/*', '*/', '::', '->', '==', '#[inline]', 'ref', 'err!=nil'
];

export interface TileData {
  id: string;
  col: number;
  row: number;
  code: string;
  opacity: number;
  createdAt: number;
  life: number;
  accentType: 'dark' | 'red' | 'white';
}

export function HeroCodeGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTiles, setActiveTiles] = useState<Map<string, TileData>>(() => new Map<string, TileData>());
  const lastPosRef = useRef<{ col: number; row: number }>({ col: -1, row: -1 });

  const TILE_SIZE = 54; // Grid tile block size in px
  const MAX_TILES = 24; // Max active tiles at any time to preserve 60-120fps performance

  // Tiles fade out with a CSS animation; React only re-renders when tiles are added or removed.
  const timersRef = useRef<number[]>([]);
  const scheduleRemoval = useCallback((keys: string[], createdAt: number, after: number) => {
    const t = window.setTimeout(() => {
      setActiveTiles((prev: Map<string, TileData>) => {
        let changed = false;
        const next = new Map<string, TileData>(prev);
        for (const k of keys) {
          if (next.get(k)?.createdAt === createdAt) {
            next.delete(k);
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, after);
    timersRef.current.push(t);
  }, []);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  // Spawn tile cluster at column & row
  const spawnTileCluster = useCallback((targetCol: number, targetRow: number, count = 5) => {
    const offsets = [
      [0, 0], [1, 0], [0, 1], [-1, 0], [0, -1],
      [1, 1], [-1, -1]
    ];

    const shuffled = [...offsets].sort(() => Math.random() - 0.5).slice(0, count);
    const now = Date.now();
    scheduleRemoval(shuffled.map(([dc, dr]) => `${targetCol + dc}_${targetRow + dr}`), now, 1900);

    setActiveTiles((prev: Map<string, TileData>) => {
      const next = new Map<string, TileData>(prev);
      
      // If tile count exceeds cap, purge oldest entries
      if (next.size >= MAX_TILES) {
        const keys = Array.from(next.keys());
        keys.slice(0, count).forEach((k) => next.delete(k));
      }

      shuffled.forEach(([dc, dr]) => {
        const col = targetCol + dc;
        const row = targetRow + dr;
        const key = `${col}_${row}`;
        const randomSymbol = ALL_CODE_SYMBOLS[Math.floor(Math.random() * ALL_CODE_SYMBOLS.length)];
        const life = 1100 + Math.random() * 700;

        const accentRand = Math.random();
        // 55% Bright Red background blocks, 30% Black blocks with glowing Red text/border, 15% Black with white text
        const accentType = accentRand < 0.55 ? 'white' : accentRand < 0.85 ? 'red' : 'dark';

        next.set(key, {
          id: key,
          col,
          row,
          code: randomSymbol,
          opacity: 1,
          createdAt: now,
          life,
          accentType
        });
      });

      return next;
    });
  }, [scheduleRemoval]);

  // Spawn radial burst pattern
  const triggerBurst = useCallback((centerCol: number, centerRow: number) => {
    sound.playClick();
    const burstOffsets: [number, number][] = [];
    for (let r = 0; r <= 2; r++) {
      for (let dc = -r; dc <= r; dc++) {
        for (let dr = -r; dr <= r; dr++) {
          if (Math.abs(dc) + Math.abs(dr) === r) {
            burstOffsets.push([dc, dr]);
          }
        }
      }
    }

    const now = Date.now();
    scheduleRemoval(burstOffsets.map(([dc, dr]) => `${centerCol + dc}_${centerRow + dr}`), now, 1800);
    setActiveTiles((prev: Map<string, TileData>) => {
      const next = new Map<string, TileData>(prev);
      burstOffsets.forEach(([dc, dr]) => {
        const col = centerCol + dc;
        const row = centerRow + dr;
        const key = `${col}_${row}`;
        const randomSymbol = ALL_CODE_SYMBOLS[Math.floor(Math.random() * ALL_CODE_SYMBOLS.length)];
        const delay = (Math.abs(dc) + Math.abs(dr)) * 40;

        const accentRand = Math.random();
        const accentType = accentRand < 0.65 ? 'white' : accentRand < 0.90 ? 'red' : 'dark';

        next.set(key, {
          id: key,
          col,
          row,
          code: randomSymbol,
          opacity: 1,
          createdAt: now,
          life: 1500 + delay,
          accentType
        });
      });

      return next;
    });
  }, [scheduleRemoval]);

  // Global window listeners for mouse move and click over the Hero container rect
  useEffect(() => {
    let frame = 0;
    let lastEvent: MouseEvent | null = null;
    const handleWindowMouseMove = (e: MouseEvent) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(processMove);
    };
    const processMove = () => {
      frame = 0;
      const e = lastEvent;
      if (!e || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0) return;

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const col = Math.floor(x / TILE_SIZE);
        const row = Math.floor(y / TILE_SIZE);

        // Only spawn tile when entering a new tile square
        if (col !== lastPosRef.current.col || row !== lastPosRef.current.row) {
          lastPosRef.current = { col, row };
          sound.playMouseMove();
          spawnTileCluster(col, row, 5);
        }
      }
    };

    const handleWindowClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const col = Math.floor(x / TILE_SIZE);
        const row = Math.floor(y / TILE_SIZE);
        triggerBurst(col, row);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('click', handleWindowClick, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('click', handleWindowClick);
    };
  }, [spawnTileCluster, triggerBurst]);

  const tilesArray: TileData[] = Array.from(activeTiles.values());

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* DYNAMIC CODE BLOCK TILES (BACKGROUND GRID LAYER IN RED & BLACK) */}
      {tilesArray.map((tile) => {
        const left = tile.col * TILE_SIZE;
        const top = tile.row * TILE_SIZE;

        return (
          <div
            key={`${tile.id}-${tile.createdAt}`}
            style={{
              animationDuration: `${tile.life}ms`,
              left: `${left}px`,
              top: `${top}px`,
              width: `${TILE_SIZE - 2}px`,
              height: `${TILE_SIZE - 2}px`,
            }}
            className={`absolute flex items-center justify-center p-1 font-tech font-bold text-xs rounded-[2px] pointer-events-none code-tile ${
              tile.accentType === 'white'
                ? 'bg-[#FF2B2B] text-black font-black border-2 border-black shadow-[0_0_18px_rgba(255,43,43,0.7)] z-30'
                : tile.accentType === 'red'
                ? 'bg-black text-[#FF2B2B] font-extrabold border-2 border-[#FF2B2B] shadow-[0_0_14px_rgba(255,43,43,0.6)] z-20'
                : 'bg-black text-white font-bold border border-[#FF2B2B]/70 shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10'
            }`}
          >
            <span className="truncate tracking-tighter text-[10px] sm:text-[11px]">
              {tile.code}
            </span>

            {/* Corner technical indicator dot in Red */}
            <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#FF2B2B] rounded-full shadow-[0_0_4px_#FF2B2B]" />
          </div>
        );
      })}
    </div>
  );
}
