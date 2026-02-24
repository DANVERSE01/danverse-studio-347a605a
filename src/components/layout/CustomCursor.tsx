import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDanverseStore } from '@/store/useDanverseStore';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function CustomCursor() {
  const cursorVariant = useDanverseStore((s) => s.cursorVariant);
  const prefersReduced = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch || prefersReduced) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [isTouch, prefersReduced, mouseX, mouseY]);

  if (isTouch || prefersReduced) return null;

  const isHover = cursorVariant === 'hover' || cursorVariant === 'cta';

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 'var(--z-cursor)' as unknown as number }}>
      {/* Dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHover ? 0 : 5,
          height: isHover ? 0 : 5,
          backgroundColor: 'hsl(var(--amber))',
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHover ? 64 : 36,
          height: isHover ? 64 : 36,
          borderColor: isHover ? 'hsl(var(--amber) / 0.5)' : 'hsla(40,20%,95%,0.15)',
          opacity: 0.5,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
