import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type RevealVariant = 'fade-up' | 'clip-up' | 'clip-diagonal' | 'scale-fade' | 'slide-rotate';

interface SectionRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}

export default function SectionReveal({ children, variant = 'fade-up', className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3'],
  });

  // Different transform mappings per variant
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1.5, 0]);
  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const blurVal = useTransform(scrollYProgress, [0, 0.5], [12, 0]);

  const getStyle = () => {
    switch (variant) {
      case 'clip-up':
        return {
          opacity,
          clipPath: useTransform(clipProgress, (v) => `inset(${v}% 0% 0% 0%)`),
        };
      case 'clip-diagonal':
        return {
          opacity,
          clipPath: useTransform(clipProgress, (v) => `polygon(0% ${v}%, 100% ${Math.max(v - 15, 0)}%, 100% 100%, 0% 100%)`),
        };
      case 'scale-fade':
        return { opacity, scale, filter: useTransform(blurVal, (v) => `blur(${v}px)`) };
      case 'slide-rotate':
        return { opacity, y, rotateX: rotate };
      case 'fade-up':
      default:
        return { opacity, y, filter: useTransform(blurVal, (v) => `blur(${v}px)`) };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div style={getStyle()}>
        {children}
      </motion.div>
    </div>
  );
}
