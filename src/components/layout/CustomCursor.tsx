import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDanverseStore } from '@/store/useDanverseStore';

export default function CustomCursor() {
  const cursorVariant = useDanverseStore((s) => s.cursorVariant);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.8 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  const isHover = cursorVariant === 'hover';
  const isCta = cursorVariant === 'cta';

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 'var(--z-cursor)' as unknown as number }}>
      {/* Dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHover || isCta ? 0 : 6,
          height: isHover || isCta ? 0 : 6,
          backgroundColor: 'hsl(var(--cyan))',
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="absolute rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHover ? 80 : isCta ? 88 : 44,
          height: isHover ? 80 : isCta ? 88 : 44,
          borderColor: isHover ? 'hsl(var(--cyan))' : 'hsla(0,0%,100%,0.3)',
          opacity: cursorVariant === 'disabled' ? 0.2 : 0.5,
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <AnimatePresence>
          {isHover && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-heading uppercase tracking-widest"
              style={{ color: 'hsl(var(--cyan))' }}
            >
              VIEW
            </motion.span>
          )}
          {isCta && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-heading uppercase tracking-widest"
              style={{ color: 'hsl(var(--cyan))' }}
            >
              ENTER
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
