import { Activity, Clock, Cpu, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { LIVE_TELEMETRY } from '../data/portfolioData';
import { sound } from '../utils/sound';

export function CurrentlyBuilding() {
  return (
    <section
      id="currently-building"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2A2A] font-bold">10 // LIVE TELEMETRY</span>
            <span>STATUS MATRIX</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <div className="font-tech text-xs text-[#FF2A2A] tracking-[0.3em] uppercase mb-2">
            LIVE VENTURE DASHBOARD // {LIVE_TELEMETRY.systemStats.lastUpdated}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white">
            CURRENTLY<br />
            <span className="text-[#FF2A2A]">BUILDING.</span>
          </h2>
        </div>

        {/* Live Ventures Status Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {LIVE_TELEMETRY.activeProjects.map((item, idx) => (
            <div
              key={item.name}
              onMouseEnter={() => sound.playHover()}
              className="bg-neutral-950 border border-white/10 p-6 flex flex-col justify-between h-56 hover:border-[#FF2A2A] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between font-tech text-[10px] mb-4">
                  <span className="text-[#FF2A2A]">0{idx + 1}</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-neutral-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl text-white group-hover:text-[#FF2A2A] transition-colors">
                  {item.name}
                </h3>

                <div className="font-tech text-xs text-neutral-400 mt-1">
                  {item.role}
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 font-tech text-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-neutral-400">STATUS:</span>
                  <span className={`font-bold ${
                    item.status === 'ACTIVE' ? 'text-emerald-400' : item.status === 'EXPLORING' ? 'text-[#FF2A2A]' : 'text-amber-400'
                  }`}>
                    ● {item.status}
                  </span>
                </div>

                <div className="w-full bg-neutral-900 h-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neutral-600 to-[#FF2A2A]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global System Telemetry Strip */}
        <div className="border border-white/15 bg-black p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 font-tech text-xs">
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">COORDINATES</span>
            <span className="text-white font-bold text-sm">{LIVE_TELEMETRY.systemStats.coordinates}</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">LAST UPDATED</span>
            <span className="text-[#FF2A2A] font-bold text-sm">{LIVE_TELEMETRY.systemStats.lastUpdated}</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">CORE ARCHITECTURE</span>
            <span className="text-white font-bold text-sm">{LIVE_TELEMETRY.systemStats.coreEngine}</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">STATUS PROTOCOL</span>
            <span className="text-emerald-400 font-bold text-sm">ONLINE / AVAILABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
