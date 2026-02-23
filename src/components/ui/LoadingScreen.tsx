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
  const [phase, setPhase] = useState<'letters' | 'line' | 'exit'>('letters');

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setPhase('line'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('danverse-loaded', '1');
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [show]);

  useEffect(() => {
    if (phase !== 'line') return;
    const duration = 800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounter(Math.round(progress * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 10000, backgroundColor: 'hsl(var(--void))' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.span
              className="font-display italic text-3xl md:text-4xl tracking-tight"
              style={{ color: 'hsl(var(--foreground))' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Danverse
            </motion.span>

            {/* Progress line */}
            <div className="w-48 h-px relative overflow-hidden" style={{ background: 'hsl(var(--white-10))' }}>
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{ background: 'hsl(var(--amber))' }}
                initial={{ width: '0%' }}
                animate={{ width: phase !== 'letters' ? '100%' : '0%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Subtitle */}
            <motion.span
              className="font-mono-brand text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--white-30))' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase !== 'letters' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Creative Studio
            </motion.span>
          </div>

          {/* Counter */}
          <motion.span
            className="absolute bottom-8 right-8 font-mono-brand text-[10px] tabular-nums tracking-wider"
            style={{ color: 'hsl(var(--amber) / 0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'letters' ? 1 : 0 }}
          >
            {counter}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
