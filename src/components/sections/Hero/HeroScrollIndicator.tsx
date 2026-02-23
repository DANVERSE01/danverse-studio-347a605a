import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ opacity }}
    >
      <span
        className="font-mono-brand text-[10px] tracking-[0.3em] uppercase"
        style={{ color: 'hsl(var(--white-30))' }}
      >
        SCROLL
      </span>
      <svg
        width="16"
        height="40"
        viewBox="0 0 16 40"
        fill="none"
        className="animate-scroll-indicator"
      >
        <line x1="8" y1="0" x2="8" y2="32" stroke="hsl(var(--white-30))" strokeWidth="1" />
        <path d="M4 28l4 4 4-4" stroke="hsl(var(--white-30))" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
