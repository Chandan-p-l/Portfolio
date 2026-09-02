/**
 * Synthesizer-based Web Audio micro-feedback system with boosted high-fidelity audio levels and volume control.
 * Zero external audio files required.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volumeLevel: number = 0.8; // Default 80% volume
  private masterGainNode: GainNode | null = null;
  private lastMouseMoveTime = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGainNode = this.ctx.createGain();
        this.masterGainNode.gain.setValueAtTime(this.volumeLevel * 1.5, this.ctx.currentTime);
        this.masterGainNode.connect(this.ctx.destination);
      }
    }
  }

  public setVolume(level: number) {
    this.volumeLevel = Math.max(0, Math.min(1, level));
    this.init();
    if (this.ctx && this.masterGainNode) {
      this.masterGainNode.gain.setValueAtTime(this.volumeLevel * 1.5, this.ctx.currentTime);
    }
    if (this.volumeLevel === 0) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.isMuted = false;
      if (this.volumeLevel === 0) this.volumeLevel = 0.8;
      this.setVolume(this.volumeLevel);
      this.playBeep(880, 'sine', 0.05, 0.35);
    } else {
      this.isMuted = true;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted || this.volumeLevel === 0) return;
    this.init();
    if (!this.ctx || !this.masterGainNode) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      // Boosted gain multiplier
      gain.gain.setValueAtTime(0.55 * this.volumeLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio context restricted
    }
  }

  public playHover() {
    if (this.isMuted || this.volumeLevel === 0) return;
    this.init();
    if (!this.ctx || !this.masterGainNode) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.035);

      // Boosted gain multiplier
      gain.gain.setValueAtTime(0.30 * this.volumeLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  public playSwitch() {
    if (this.isMuted || this.volumeLevel === 0) return;
    this.init();
    if (!this.ctx || !this.masterGainNode) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(980, now + 0.07);

      // Boosted gain multiplier
      gain.gain.setValueAtTime(0.45 * this.volumeLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Ignore
    }
  }

  public playMouseMove() {
    if (this.isMuted || this.volumeLevel === 0) return;
    const nowMs = Date.now();
    if (nowMs - this.lastMouseMoveTime < 75) return;
    this.lastMouseMoveTime = nowMs;

    this.init();
    if (!this.ctx || !this.masterGainNode) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      const randomPitch = 1200 + Math.random() * 800;
      osc.frequency.setValueAtTime(randomPitch, now);
      osc.frequency.exponentialRampToValueAtTime(randomPitch * 0.5, now + 0.02);

      // Boosted gain multiplier
      gain.gain.setValueAtTime(0.20 * this.volumeLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Ignore
    }
  }

  private playBeep(freq: number, type: OscillatorType, duration: number, vol: number) {
    this.init();
    if (!this.ctx || !this.masterGainNode) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(vol * this.volumeLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();
