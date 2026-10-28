import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Volume2, Waves, Activity, Play, RefreshCw, Cpu, Layers, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

type Mode = 'PARTICLES' | 'AUDIO_SYNTH';

export function InteractiveSandbox() {
  const [activeMode, setActiveMode] = useState<Mode>('PARTICLES');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Audio Synth State
  const [synthFreq, setSynthFreq] = useState(220);
  const [synthWave, setSynthWave] = useState<OscillatorType>('sine');
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);


  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Canvas Particles animation
  useEffect(() => {
    if (activeMode !== 'PARTICLES' || !isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ['#FF2B2B', '#FFFFFF', '#8A8A84', '#FF5555'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = '#090909';
      ctx.fillRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 43, 43, ${0.4 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          p.vx += Math.cos(angle) * force * 0.4;
          p.vy += Math.sin(angle) * force * 0.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeMode, isInView]);

  // Audio Synth Controls
  const toggleSynth = () => {
    sound.playClick();
    if (isPlayingSynth) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsPlayingSynth(false);
    } else {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = synthWave;
      osc.frequency.setValueAtTime(synthFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlayingSynth(true);
    }
  };

  const handleFreqChange = (newFreq: number) => {
    setSynthFreq(newFreq);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(newFreq, audioCtxRef.current.currentTime);
    }
  };

  return (
    <section
      id="sandbox"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section Marker */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">07 // CREATIVE-TECH PLAYGROUND</span>
            <span className="text-white">THE LAB SANDBOX</span>
          </div>
          <span className="hidden sm:inline">LIVE PARTICLES · WEB AUDIO</span>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <FitText as="h2" text="INTERACTIVE SANDBOX." max={8} className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white">
            INTERACTIVE<br />
            <span className="text-[#FF2B2B]">SANDBOX.</span>
          </FitText>
          <p className="font-sans text-[#8A8A84] text-base sm:text-lg mt-4 max-w-2xl">
            A real-time playground combining canvas physics and generative sound synthesis—small, inspectable browser experiments.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border-b border-white/10 pb-8 mb-12">
          {[
            { id: 'PARTICLES', label: '01 // PARTICLE FIELD', icon: Activity },
            { id: 'AUDIO_SYNTH', label: '02 // WEB AUDIO SYNTH', icon: Volume2 },
          ].map((tab) => {
            const isSelected = activeMode === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playSwitch();
                  if (isPlayingSynth && tab.id !== 'AUDIO_SYNTH') toggleSynth();
                  setActiveMode(tab.id as Mode);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="SWITCH"
                className={`p-4 text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#FF2B2B] text-black border-[#FF2B2B] shadow-xl font-bold'
                    : 'bg-black/50 text-[#8A8A84] border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-tech text-[10px] opacity-75">{tab.label}</div>
                  <div className="font-display font-black text-sm sm:text-base tracking-wider mt-1">
                    {tab.id.replace('_', ' ')}
                  </div>
                </div>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-neutral-500'}`} />
              </button>
            );
          })}
        </div>

        {/* Dynamic Sandbox Display Canvas */}
        <div className="border border-white/15 bg-[#090909] p-6 sm:p-10 relative">
          {/* Mode 1: Interactive Particles Canvas */}
          {activeMode === 'PARTICLES' && (
            <div>
              <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] pb-4 border-b border-white/10 mb-6">
                <span>CANVAS PHYSICS ENGINE</span>
                <span className="text-[#FF2B2B]">MOVE CURSOR TO REPEL & WEAVE PARTICLES</span>
              </div>
              <div className="relative w-full h-[360px] bg-black border border-white/10 overflow-hidden cursor-crosshair">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            </div>
          )}

          {/* Mode 2: Web Audio Synthesizer */}
          {activeMode === 'AUDIO_SYNTH' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] pb-4 border-b border-white/10">
                <span>WEB AUDIO API OSCILLATOR</span>
                <span className="text-[#FF2B2B]">LIVE MATHEMATICAL WAVE SYNTHESIZER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black border border-white/10 p-6">
                <div className="space-y-6">
                  <div>
                    <span className="font-tech text-xs text-[#8A8A84] block mb-2">WAVEFORM TYPE:</span>
                    <div className="flex gap-2">
                      {(['sine', 'square', 'sawtooth', 'triangle'] as OscillatorType[]).map((w) => (
                        <button
                          key={w}
                          onClick={() => {
                            sound.playClick();
                            setSynthWave(w);
                            if (oscRef.current) oscRef.current.type = w;
                          }}
                          className={`font-tech text-xs px-3 py-1.5 border uppercase ${
                            synthWave === w ? 'bg-white text-black font-bold border-white' : 'border-white/15 text-[#8A8A84]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-tech text-xs text-[#8A8A84] mb-2">
                      <span>FREQUENCY: {synthFreq} Hz</span>
                      <span>PITCH: {synthFreq > 400 ? 'TREBLE' : 'BASS'}</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="880"
                      value={synthFreq}
                      onChange={(e) => handleFreqChange(Number(e.target.value))}
                      className="w-full accent-[#FF2B2B] bg-neutral-800"
                    />
                  </div>

                  <button
                    onClick={toggleSynth}
                    className={`w-full py-3 font-tech text-xs font-bold uppercase tracking-widest transition-all ${
                      isPlayingSynth ? 'bg-red-600 text-white' : 'bg-[#FF2B2B] text-black hover:bg-white'
                    }`}
                  >
                    {isPlayingSynth ? '■ STOP TONE GENERATOR' : '▶ START TONE GENERATOR'}
                  </button>
                </div>

                <div className="border border-white/10 p-6 bg-[#0D0D0D] font-tech text-xs space-y-3">
                  <div className="text-[#FF2B2B] font-bold">SYNTHESIS TELEMETRY:</div>
                  <div className="text-neutral-300">
                    Oscillator: <span className="text-white font-mono">{synthWave.toUpperCase()}</span>
                  </div>
                  <div className="text-neutral-300">
                    Frequency: <span className="text-white font-mono">{synthFreq} Hz</span>
                  </div>
                  <div className="text-neutral-300">
                    Sample Rate: <span className="text-white font-mono">48000 Hz</span>
                  </div>
                  <div className="text-[10px] text-[#8A8A84] pt-2 border-t border-white/10">
                    Zero external MP3 assets. Synthesized directly with the browser's hardware DAC.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
