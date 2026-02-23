import type { Transition, Variants } from 'framer-motion';

export const SPRINGS = {
  gentle: { type: 'spring', stiffness: 100, damping: 20, mass: 0.8 } as Transition,
  snappy: { type: 'spring', stiffness: 300, damping: 30, mass: 0.6 } as Transition,
  bouncy: { type: 'spring', stiffness: 400, damping: 25, mass: 0.5 } as Transition,
  slow: { type: 'spring', stiffness: 60, damping: 15, mass: 1.2 } as Transition,
  cursor: { type: 'spring', stiffness: 150, damping: 18, mass: 0.8 } as Transition,
  magnetic: { type: 'spring', stiffness: 200, damping: 15, mass: 0.5 } as Transition,
};

export const TWEENS = {
  fast: { type: 'tween' as const, duration: 0.15, ease: [0.25, 1, 0.5, 1] },
  base: { type: 'tween' as const, duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  slow: { type: 'tween' as const, duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  cinematic: { type: 'tween' as const, duration: 1.4, ease: [0.19, 1, 0.22, 1] },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(20px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  }),
};
