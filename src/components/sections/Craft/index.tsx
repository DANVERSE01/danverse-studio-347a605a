import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef, useState } from 'react';
import imgNeonPulse from '@/assets/works/neon-pulse.jpg';
import imgSynthCulture from '@/assets/works/synth-culture.jpg';
import imgGenesisEngine from '@/assets/works/genesis-engine.jpg';

const services = [
  { num: '01', name: 'Cinematic Ads', tagline: 'Stories that outlive the scroll.', accent: 'coral', image: imgNeonPulse },
  { num: '02', name: 'Brand Systems', tagline: 'Identities that scale with intelligence.', accent: 'sage', image: imgSynthCulture },
  { num: '03', name: '3D & Immersive', tagline: 'Environments you experience.', accent: 'lavender', image: imgGenesisEngine },
  { num: '04', name: 'Digital Product', tagline: 'Interfaces that feel inevitable.', accent: 'coral', image: imgNeonPulse },
  { num: '05', name: 'Motion Design', tagline: 'Movement as communication.', accent: 'sage', image: imgSynthCulture },
  { num: '06', name: 'AI Content OS', tagline: 'Create once. Deploy everywhere.', accent: 'lavender', image: imgGenesisEngine },
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
      style={{
        background: 'linear-gradient(180deg, hsl(var(--section-midnight)) 0%, hsl(220 50% 8%) 50%, hsl(var(--section-midnight)) 100%)',
      }}
    >
      {/* Header */}
      <div className="px-6 md:px-20 lg:px-28">
        <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-20">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>Capabilities</span>
            <div className="flex-1 max-w-[200px] h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-script italic font-light tracking-[0.01em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--cream))' }}>What we</span>
            <span className="font-display-alt font-extrabold uppercase tracking-[-0.04em]" style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              background: 'linear-gradient(135deg, hsl(var(--coral)), hsl(260 30% 55%))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>BUILD</span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Services grid with images */}
      <div className="px-6 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={service.num}
                className="relative overflow-hidden cursor-pointer group h-[320px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onMouseEnter={() => { setHoveredIdx(i); setCursorVariant('hover'); }}
                onMouseLeave={() => { setHoveredIdx(null); setCursorVariant('default'); }}
              >
                {/* Background image */}
                <motion.img
                  src={service.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.1 : 1.02 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: isHovered
                      ? `linear-gradient(180deg, hsl(var(--${service.accent}) / 0.15) 0%, hsl(var(--void) / 0.6) 100%)`
                      : `linear-gradient(180deg, hsl(var(--void) / 0.7) 0%, hsl(var(--void) / 0.85) 100%)`,
                  }}
                />

                {/* Glow line at bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(var(--${service.accent})), transparent)` }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-brand text-[10px] tabular-nums" style={{ color: `hsl(var(--${service.accent}) / 0.5)` }}>
                      {service.num}
                    </span>
                    <motion.div animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? 0 : -45 }} transition={{ duration: 0.3 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M5 13L13 5M13 5H7M13 5v6" stroke={`hsl(var(--${service.accent}))`} strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>

                  <div>
                    <motion.h3
                      className="font-display-alt font-bold text-xl md:text-2xl uppercase tracking-[-0.02em] mb-2"
                      style={{ color: 'hsl(var(--cream))' }}
                      animate={{ y: isHovered ? 0 : 4 }}
                    >
                      {service.name}
                    </motion.h3>
                    <motion.p
                      className="font-script italic text-sm"
                      style={{ color: `hsl(var(--${service.accent}) / 0.7)` }}
                      animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 8 }}
                      transition={{ duration: 0.4 }}
                    >
                      {service.tagline}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Craft.displayName = 'Craft';
export default Craft;
