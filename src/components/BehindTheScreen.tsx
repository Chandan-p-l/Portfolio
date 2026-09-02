import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Server, Database, Code, Cloud, Users, Activity, Play, CheckCircle2, Globe, Shield, Cpu, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

const REQUEST_HOPS = [
  { id: 'user', label: 'USER BROWSER', icon: Users, ip: 'CLIENT IP', latency: '0ms', desc: 'User requests https://chandanpal.dev/api/v1/products' },
  { id: 'dns', label: 'DNS RESOLUTION', icon: Globe, ip: '1.1.1.1', latency: '12ms', desc: 'Recursive lookup resolves A-record to edge IP' },
  { id: 'nginx', label: 'NGINX REVERSE PROXY', icon: Shield, ip: 'EDGE GATEWAY', latency: '4ms', desc: 'SSL termination, HTTP/2 multiplexing, Gzip decompression' },
  { id: 'server', label: 'LINUX / PM2 CLUSTER', icon: Server, ip: '127.0.0.1:3000', latency: '2ms', desc: 'Node.js clustered worker processes request lifecycle' },
  { id: 'api', label: 'EXPRESS CONTROLLER', icon: Cpu, ip: 'INTERNAL ROUTE', latency: '3ms', desc: 'JWT verification, Zod schema validation, middleware pipeline' },
  { id: 'db', label: 'HYBRID DATABASE', icon: Database, ip: 'SQL / NOSQL CLUSTER', latency: '8ms', desc: 'B+ Tree index scan returns sanitized JSON dataset' },
];

export function BehindTheScreen() {
  const [activeHop, setActiveHop] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const triggerPacketSimulation = () => {
    sound.playClick();
    setIsSimulating(true);
    setSimStep(0);
    setActiveHop(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < REQUEST_HOPS.length) {
        setSimStep(step);
        setActiveHop(step);
        sound.playHover();
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        sound.playSwitch();
      }
    }, 450);
  };

  return (
    <section
      id="behind-screen"
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">06 // ARCHITECTURE PIPELINE</span>
            <span className="text-white">UNDER THE HOOD</span>
          </div>
          <span className="hidden sm:inline">REQUEST LIFECYCLE FROM 0ms TO 200 OK</span>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-white">
            NOT JUST SURFACES.<br />
            <span className="text-[#FF2B2B]">THE ENTIRE ENGINE.</span>
          </h2>
          <p className="font-sans text-[#8A8A84] text-base sm:text-lg mt-4 max-w-2xl">
            A software product is only as reliable as the systems underneath. Here is the millisecond journey of how a packet travels through my architecture.
          </p>
        </div>

        {/* 6-Hop Request Journey Visualization */}
        <div className="border border-white/15 bg-[#090909] p-6 sm:p-10 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
              <span className="text-white font-bold">LIVE HTTP PACKET DISPATCHER</span>
            </div>
            <button
              onClick={triggerPacketSimulation}
              disabled={isSimulating}
              data-cursor-text="FIRE"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF2B2B] text-black font-tech text-xs font-bold uppercase hover:bg-white transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'TRANSMITTING PACKET...' : 'TRIGGER REQUEST SIMULATION'}</span>
            </button>
          </div>

          {/* Hop Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-8">
            {REQUEST_HOPS.map((hop, idx) => {
              const Icon = hop.icon;
              const isCurrent = activeHop === idx;
              const isPassed = activeHop !== null && activeHop >= idx;

              return (
                <button
                  key={hop.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveHop(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor-text="HOP"
                  className={`p-4 text-left border transition-all relative flex flex-col justify-between h-40 ${
                    isCurrent
                      ? 'bg-[#FF2B2B] text-black border-[#FF2B2B] shadow-xl'
                      : isPassed
                      ? 'bg-black/80 text-white border-white/30'
                      : 'bg-black/40 text-[#8A8A84] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-tech text-[10px]">
                    <span className={isCurrent ? 'text-black font-bold' : 'text-[#FF2B2B]'}>
                      0{idx + 1} // HOP
                    </span>
                    <span className={`text-[9px] font-mono ${isCurrent ? 'text-black font-bold' : 'text-emerald-400'}`}>
                      +{hop.latency}
                    </span>
                  </div>

                  <div>
                    <Icon className={`w-5 h-5 mb-2 ${isCurrent ? 'text-black' : 'text-white'}`} />
                    <div className={`font-display font-black text-xs sm:text-sm tracking-tight ${isCurrent ? 'text-black' : 'text-white'}`}>
                      {hop.label}
                    </div>
                  </div>

                  <div className={`font-tech text-[9px] truncate border-t pt-2 ${
                    isCurrent ? 'border-black/20 text-black' : 'border-white/10 text-[#8A8A84]'
                  }`}>
                    {hop.ip}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hop Deep Dive Telemetry Box */}
          <div className="bg-black border border-white/10 p-6 font-tech">
            {activeHop !== null ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8A8A84] border-b border-white/10 pb-2">
                  <span className="text-[#FF2B2B] font-bold">PACKET INSPECTOR // HOP 0{activeHop + 1}</span>
                  <span className="text-emerald-400">TOTAL LATENCY: ~29ms</span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-black text-white">
                  {REQUEST_HOPS[activeHop].label}
                </h4>
                <p className="font-sans text-sm text-neutral-300">
                  {REQUEST_HOPS[activeHop].desc}
                </p>
                <div className="text-[11px] text-[#8A8A84] bg-neutral-950 p-3 border border-white/5 font-mono">
                  [HEADER] X-Request-ID: {`req_${Math.random().toString(36).substring(2, 9)}`} · TLS: TLSv1.3 · Status: 200 OK
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-[#8A8A84]">
                Click "TRIGGER REQUEST SIMULATION" above to watch a packet hop through the pipeline.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
