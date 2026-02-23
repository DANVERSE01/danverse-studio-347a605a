import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const services = [
  { num: '01', name: 'Cinematic Advertising', tagline: 'Spots that live in culture', tags: ['Film', 'Digital', 'TV'] },
  { num: '02', name: 'AI Brand Systems', tagline: 'Identities that scale with AI', tags: ['Identity', 'AI', 'Systems'] },
  { num: '03', name: '3D & Immersive', tagline: 'Worlds you inhabit', tags: ['WebGL', 'AR', 'VR'] },
  { num: '04', name: 'Digital Product Design', tagline: 'Interfaces that feel inevitable', tags: ['UX', 'UI', 'Dev'] },
  { num: '05', name: 'Motion Systems', tagline: 'Movement as language', tags: ['Motion', 'Brand', 'Systems'] },
  { num: '06', name: 'UGC → Premium Pipelines', tagline: 'Authentic at scale', tags: ['UGC', 'Content', 'Scale'] },
  { num: '07', name: 'AI Content OS', tagline: 'Create once, deploy everywhere', tags: ['AI', 'Automation', 'CMS'] },
];

const Craft = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="craft" className="py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: 'hsl(var(--cyan))' }}
          >
            / 03 THE CRAFT
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'hsl(var(--foreground))' }}
          >
            What We Build
          </motion.h2>
        </motion.div>
      </div>

      {/* Horizontal scroll on desktop */}
      <div
        className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 lg:px-24 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {services.map((service) => (
          <motion.div
            key={service.num}
            className="flex-shrink-0 w-[320px] md:w-[380px] h-[480px] md:h-[520px] rounded-2xl overflow-hidden gradient-border snap-start"
            style={{
              backgroundColor: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
              boxShadow: 'var(--shadow-card)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Animated gradient area */}
            <div className="h-[60%] relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--cyan)/0.08), hsl(var(--magenta)/0.06), hsl(var(--purple)/0.08))`,
                }}
              />
              <div
                className="absolute inset-0 opacity-30 animate-blob-1"
                style={{
                  background: `radial-gradient(circle at 30% 50%, hsl(var(--cyan)/0.2), transparent 60%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-20 animate-blob-2"
                style={{
                  background: `radial-gradient(circle at 70% 40%, hsl(var(--magenta)/0.2), transparent 60%)`,
                }}
              />
            </div>

            {/* Info panel */}
            <div className="h-[40%] p-6 glass relative">
              <span
                className="absolute top-4 right-6 font-mono-brand text-3xl font-bold"
                style={{ color: 'hsl(var(--cyan-dim))' }}
              >
                {service.num}
              </span>
              <h3 className="font-heading font-bold text-xl mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                {service.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: 'hsl(var(--white-60))' }}>
                {service.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass rounded-full px-3 py-1 text-xs font-heading"
                    style={{ color: 'hsl(var(--white-60))' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

Craft.displayName = 'Craft';
export default Craft;
