import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style={{ opacity }}
    >
      <span
        className="font-mono-brand text-[9px] tracking-[0.3em] uppercase"
        style={{ color: 'hsl(var(--white-30))' }}
      >
        Scroll
      </span>
      <div className="w-px h-8 relative overflow-hidden" style={{ background: 'hsl(var(--white-10))' }}>
        <motion.div
          className="w-full absolute top-0"
          style={{
            height: '50%',
            background: 'hsl(var(--amber) / 0.5)',
          }}
          animate={{ y: ['0%', '200%'] }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
