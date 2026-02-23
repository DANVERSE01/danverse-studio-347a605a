import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const services = [
  { num: '01', name: 'Cinematic Advertising', tagline: 'Spots that live in culture.', icon: '◎' },
  { num: '02', name: 'AI Brand Systems', tagline: 'Identities that learn and scale.', icon: '◇' },
  { num: '03', name: '3D & Immersive', tagline: "Worlds you inhabit.", icon: '△' },
  { num: '04', name: 'Digital Product', tagline: 'Interfaces that feel inevitable.', icon: '□' },
  { num: '05', name: 'Motion Systems', tagline: 'Movement as language.', icon: '○' },
  { num: '06', name: 'UGC Pipelines', tagline: 'Authentic content at scale.', icon: '⬡' },
  { num: '07', name: 'AI Content OS', tagline: 'Create once. Deploy everywhere.', icon: '◈' },
];

const Craft = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="craft" className="relative py-32 md:py-48">
      {/* Background decorative number */}
      <span className="absolute top-16 right-6 md:right-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        03
      </span>

      <div className="px-6 md:px-16">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Services
            </span>
            <div className="flex-1 max-w-[200px] h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="max-w-2xl">
            <span className="font-display italic block tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
              What we
            </span>
            <span className="font-heading font-bold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: 'hsl(var(--coral))' }}>
              Build
            </span>
          </motion.h2>
        </motion.div>

        {/* Services — editorial list with hover reveals */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className="group border-t grid grid-cols-1 md:grid-cols-[60px_1fr_1fr_40px] gap-4 md:gap-8 items-center py-6 md:py-7 transition-colors duration-500"
              style={{ borderColor: 'hsl(var(--white-10))' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* Number */}
              <span className="font-mono-brand text-[10px] tabular-nums hidden md:block" style={{ color: 'hsl(var(--coral) / 0.3)' }}>
                {service.num}
              </span>

              {/* Name + icon */}
              <div className="flex items-center gap-4">
                <span className="text-sm transition-colors duration-500 group-hover:text-coral" style={{ color: 'hsl(var(--white-30))' }}>
                  {service.icon}
                </span>
                <h3 className="font-heading font-semibold text-lg md:text-xl tracking-tight transition-colors duration-500 group-hover:text-foreground" style={{ color: 'hsl(var(--white-60))' }}>
                  {service.name}
                </h3>
              </div>

              {/* Tagline — slides in */}
              <p className="text-[13px] md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500" style={{ color: 'hsl(var(--white-30))' }}>
                {service.tagline}
              </p>

              {/* Arrow */}
              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H7M12 4v5" stroke="hsl(var(--coral))" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
        </div>
      </div>
    </section>
  );
});

Craft.displayName = 'Craft';
export default Craft;
