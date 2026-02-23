import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import danverseLogo from '@/assets/danverse-logo.webp';

const FloatingDot = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 4,
      height: 4,
      left: x,
      top: y,
      background: 'hsl(var(--rose-gold) / 0.3)',
      boxShadow: '0 0 8px hsl(var(--rose-gold) / 0.2)',
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.6, 0.2],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export default function LoadingScreen() {
  const [show, setShow] = useState(() => typeof window !== 'undefined' ? !sessionStorage.getItem('danverse-loaded') : true);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'count' | 'exit'>('enter');

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setPhase('count'), 500);
    const t2 = setTimeout(() => setPhase('exit'), 1800);
    const t3 = setTimeout(() => { setShow(false); sessionStorage.setItem('danverse-loaded', '1'); }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [show]);

  useEffect(() => {
    if (phase !== 'count') return;
    const duration = 1000;
    const startTime = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      setCounter(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  const isActive = phase !== 'enter';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 10000, backgroundColor: 'hsl(var(--void))' }}
          exit={{ clipPath: 'inset(50% 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Floating particles */}
          <FloatingDot delay={0} x="20%" y="30%" />
          <FloatingDot delay={0.8} x="75%" y="60%" />
          <FloatingDot delay={1.5} x="45%" y="75%" />

          <div className="flex flex-col items-center gap-6">
            {/* Logo with crimson glow */}
            <motion.img
              src={danverseLogo}
              alt="Danverse"
              className="h-16 md:h-20 w-auto"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: isActive
                  ? 'drop-shadow(0 0 20px hsl(0 85% 55% / 0.3)) drop-shadow(0 0 40px hsl(0 85% 55% / 0.15))'
                  : 'drop-shadow(0 0 0 transparent)',
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Progress bar - thicker with glow */}
            <div
              className="w-56 relative overflow-hidden"
              style={{
                height: 2,
                background: 'hsl(var(--white-10))',
                borderRadius: 1,
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{
                  background: 'hsl(var(--rose-gold))',
                  boxShadow: '0 0 15px hsl(var(--rose-gold) / 0.4), 0 0 30px hsl(var(--rose-gold) / 0.2)',
                  borderRadius: 1,
                }}
                initial={{ width: '0%' }}
                animate={{ width: isActive ? '100%' : '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Chrome flash sweep */}
              <motion.div
                className="absolute inset-y-0 h-full"
                style={{
                  width: 40,
                  background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.6), transparent)',
                  filter: 'blur(2px)',
                }}
                initial={{ left: '-40px' }}
                animate={{ left: isActive ? '100%' : '-40px' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>
          </div>

          {/* Counter */}
          <motion.span
            className="absolute bottom-8 right-8 font-mono-brand text-xs tabular-nums tracking-wider"
            style={{ color: 'hsl(var(--rose-gold))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 0.8 : 0 }}
          >
            {counter}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
