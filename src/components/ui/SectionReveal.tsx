import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

type RevealVariant = 'fade-up' | 'clip-up' | 'clip-diagonal' | 'scale-fade' | 'slide-rotate';

interface SectionRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}

export default function SectionReveal({ children, variant = 'fade-up', className = '' }: SectionRevealProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 30 : 80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1.5, 0]);
  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipUp = useTransform(clipProgress, (v) => `inset(${v}% 0% 0% 0%)`);
  const clipDiagonal = useTransform(clipProgress, (v) => `polygon(0% ${v}%, 100% ${Math.max(v - 15, 0)}%, 100% 100%, 0% 100%)`);

  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        <motion.div style={{ opacity, y }}>
          {children}
        </motion.div>
      </div>
    );
  }

  const getStyle = () => {
    switch (variant) {
      case 'clip-up':
        return { opacity, clipPath: clipUp };
      case 'clip-diagonal':
        return { opacity, clipPath: clipDiagonal };
      case 'scale-fade':
        return { opacity, scale };
      case 'slide-rotate':
        return { opacity, y, rotateX: rotate };
      case 'fade-up':
      default:
        return { opacity, y };
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
