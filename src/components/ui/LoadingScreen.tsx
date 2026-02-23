import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import danverseLogo from '@/assets/danverse-logo.webp';

export default function LoadingScreen() {
  const [show, setShow] = useState(() => typeof window !== 'undefined' ? !sessionStorage.getItem('danverse-loaded') : true);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'count' | 'exit'>('enter');

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setPhase('count'), 500);
    const t2 = setTimeout(() => setPhase('exit'), 1500);
    const t3 = setTimeout(() => { setShow(false); sessionStorage.setItem('danverse-loaded', '1'); }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [show]);

  useEffect(() => {
    if (phase !== 'count') return;
    const duration = 700;
    const startTime = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      setCounter(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 10000, backgroundColor: 'hsl(var(--void))' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex flex-col items-center gap-5">
            <motion.img src={danverseLogo} alt="Danverse" className="h-16 md:h-20 w-auto"
              initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            <div className="w-40 h-px relative overflow-hidden" style={{ background: 'hsl(var(--white-10))' }}>
              <motion.div className="absolute inset-y-0 left-0 h-full" style={{ background: 'hsl(var(--coral))' }}
                initial={{ width: '0%' }} animate={{ width: phase !== 'enter' ? '100%' : '0%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
          <motion.span className="absolute bottom-8 right-8 font-mono-brand text-[9px] tabular-nums tracking-wider"
            style={{ color: 'hsl(var(--coral) / 0.3)' }} initial={{ opacity: 0 }} animate={{ opacity: phase !== 'enter' ? 1 : 0 }}>
            {counter}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
