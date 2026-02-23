import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('danverse-loaded');
    }
    return true;
  });
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'letters' | 'line' | 'counter' | 'exit'>('letters');

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setPhase('line'), 500);
    const t2 = setTimeout(() => setPhase('counter'), 1100);
    const t3 = setTimeout(() => setPhase('exit'), 1800);
    const t4 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('danverse-loaded', '1');
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [show]);

  useEffect(() => {
    if (phase !== 'counter') return;
    let start = 0;
    const end = 100;
    const duration = 400;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      start = Math.round(progress * end);
      setCounter(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  const letters = 'DANVERSE'.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10000, backgroundColor: 'hsl(var(--void))' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Letters */}
            <div className="flex">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-4xl md:text-6xl font-black tracking-tight"
                  style={{ color: 'hsl(var(--foreground))' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Gradient line */}
            <motion.div
              className="h-[2px] rounded-full"
              style={{ background: 'var(--gradient-text)' }}
              initial={{ width: 0 }}
              animate={{ width: phase !== 'letters' ? 200 : 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            />

            {/* Subtitle */}
            <motion.p
              className="font-mono-brand text-xs tracking-[0.2em] uppercase"
              style={{ color: 'hsl(var(--cyan))' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'counter' || phase === 'exit' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              AI-Powered Creative Studio
            </motion.p>
          </div>

          {/* Counter */}
          <motion.span
            className="absolute bottom-8 right-8 font-mono-brand text-sm tabular-nums"
            style={{ color: 'hsl(var(--cyan))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'counter' || phase === 'exit' ? 1 : 0 }}
          >
            {counter}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
