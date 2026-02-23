import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef, useState } from 'react';

const services = [
  { num: '01', name: 'Cinematic Ads', fill: 'ADVERTISING', tagline: 'Stories that outlive the scroll.', accent: 'rose-gold' },
  { num: '02', name: 'Brand Systems', fill: 'IDENTITY', tagline: 'Identities that scale with intelligence.', accent: 'platinum' },
  { num: '03', name: '3D & Immersive', fill: 'SPATIAL', tagline: 'Environments you experience.', accent: 'rose-gold' },
  { num: '04', name: 'Digital Product', fill: 'PRODUCT', tagline: 'Interfaces that feel inevitable.', accent: 'platinum' },
  { num: '05', name: 'Motion Design', fill: 'KINETIC', tagline: 'Movement as communication.', accent: 'rose-gold' },
  { num: '06', name: 'AI Content OS', fill: 'INTELLIGENCE', tagline: 'Create once. Deploy everywhere.', accent: 'platinum' },
];

const Craft = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="craft"
      className="relative py-32 md:py-48"
      style={{ background: 'hsl(var(--section-midnight))' }}
    >
      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-heading font-extrabold uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(8rem, 25vw, 28rem)',
            color: 'hsl(var(--rose-gold) / 0.03)',
          }}
        >
          BUILD
        </span>
      </div>

      {/* Header */}
      <div className="px-6 md:px-20 lg:px-28">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--rose-gold))' }}>
              Capabilities
            </span>
            <div className="flex-1 max-w-[200px] h-px" style={{ background: 'hsl(var(--rose-gold) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-display italic font-light tracking-[0.01em] shimmer-text" style={{ fontSize: 'var(--text-section)' }}>
              What we
            </span>
            <span className="font-heading font-extrabold uppercase tracking-[-0.04em] shimmer-stroke" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', WebkitTextStroke: '1.5px hsl(var(--rose-gold))', WebkitTextFillColor: 'transparent' }}>
              BUILD
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Services */}
      <div className="w-full">
        {services.map((service, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <motion.div
              key={service.num}
              className="group relative border-t overflow-hidden cursor-pointer"
              style={{ borderColor: 'hsl(var(--white-10))' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onMouseEnter={() => { setHoveredIdx(i); setCursorVariant('hover'); }}
              onMouseLeave={() => { setHoveredIdx(null); setCursorVariant('default'); }}
            >
              {/* Background text */}
              <motion.span
                className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 font-heading font-extrabold uppercase tracking-[-0.05em] pointer-events-none select-none"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  WebkitTextStroke: `1px hsl(var(--${service.accent}) / 0.04)`,
                  WebkitTextFillColor: 'transparent',
                }}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? -20 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {service.fill}
              </motion.span>

              <div className="relative px-6 md:px-20 lg:px-28 py-7 md:py-9 grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-4 md:gap-10 items-center">
                <span
                  className="font-mono-brand text-[10px] tabular-nums transition-colors duration-500 hidden md:block"
                  style={{ color: isHovered ? `hsl(var(--${service.accent}))` : 'hsl(var(--white-10))' }}
                >
                  {service.num}
                </span>

                <div>
                  <motion.h3
                    className="font-heading font-semibold text-xl md:text-3xl tracking-[-0.02em] transition-colors duration-500"
                    style={{ color: isHovered ? 'hsl(var(--pearl))' : 'hsl(var(--white-30))' }}
                    animate={{ x: isHovered ? 6 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.name}
                  </motion.h3>
                  <motion.p
                    className="font-display italic text-[14px] mt-1.5"
                    style={{ color: 'hsl(var(--pearl) / 0.5)' }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.tagline}
                  </motion.p>
                </div>

                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0.1, rotate: isHovered ? 0 : -45, scale: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H8M15 5v7" stroke={`hsl(var(--${service.accent}))`} strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-px origin-left"
                style={{ background: `hsl(var(--${service.accent}))` }}
                initial={false}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          );
        })}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>
    </section>
  );
});

Craft.displayName = 'Craft';
export default Craft;
