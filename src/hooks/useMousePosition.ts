import { useEffect } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

export function useMousePosition(enabled = true): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [enabled, x, y]);

  return { x, y };
}
