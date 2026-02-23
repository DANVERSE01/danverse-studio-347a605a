import { useCallback } from 'react';
import { useDanverseStore } from '@/store/useDanverseStore';

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, gain: number, type: OscillatorType = 'sine') {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useSoundEffects() {
  const isSoundEnabled = useDanverseStore((s) => s.isSoundEnabled);
  const toggleSound = useDanverseStore((s) => s.toggleSound);

  const playHover = useCallback(() => {
    if (!isSoundEnabled) return;
    playTone(800, 0.05, 0.02, 'sine');
  }, [isSoundEnabled]);

  const playClick = useCallback(() => {
    if (!isSoundEnabled) return;
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, [isSoundEnabled]);

  const playTransition = useCallback(() => {
    if (!isSoundEnabled) return;
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    g.gain.setValueAtTime(0.03, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, [isSoundEnabled]);

  return { playHover, playClick, playTransition, isSoundEnabled, toggleSound };
}
