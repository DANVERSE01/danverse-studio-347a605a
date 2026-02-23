import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const services = [
  { num: '01', name: 'Cinematic Advertising', tagline: 'Spots that live in culture, not just feeds.', tags: ['Film', 'Digital', 'TV'] },
  { num: '02', name: 'AI Brand Systems', tagline: 'Identities that learn, adapt, and scale.', tags: ['Identity', 'AI', 'Systems'] },
  { num: '03', name: '3D & Immersive', tagline: 'Worlds you don\'t visit — you inhabit.', tags: ['WebGL', 'AR', 'VR'] },
  { num: '04', name: 'Digital Product', tagline: 'Interfaces that feel inevitable.', tags: ['UX', 'UI', 'Dev'] },
  { num: '05', name: 'Motion Systems', tagline: 'Movement as a language.', tags: ['Motion', 'Brand'] },
  { num: '06', name: 'UGC Pipelines', tagline: 'Authentic content at scale.', tags: ['UGC', 'Content'] },
  { num: '07', name: 'AI Content OS', tagline: 'Create once. Deploy everywhere.', tags: ['AI', 'Automation'] },
];

const Craft = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="craft" className="py-32 md:py-40">
      <div className="px-6 md:px-12 lg:px-16 mb-16">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
              Services
            </span>
            <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-normal italic tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}
          >
            What we build
          </motion.h2>
        </motion.div>
      </div>

      {/* Services list — editorial style */}
      <div className="px-6 md:px-12 lg:px-16">
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            className="group border-t py-8 md:py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-8 items-start"
            style={{ borderColor: 'hsl(var(--white-10))' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span
              className="font-mono-brand text-xs tabular-nums"
              style={{ color: 'hsl(var(--amber) / 0.4)' }}
            >
              {service.num}
            </span>
            <div>
              <h3
                className="font-heading font-semibold text-xl md:text-2xl tracking-tight transition-colors duration-500 group-hover:text-amber"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {service.name}
              </h3>
              <div className="flex gap-2 mt-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-brand uppercase tracking-wider px-2 py-0.5 rounded-sm"
                    style={{
                      color: 'hsl(var(--white-30))',
                      border: '1px solid hsl(var(--white-10))',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p
              className="font-body text-sm leading-relaxed md:text-right"
              style={{ color: 'hsl(var(--white-30))' }}
            >
              {service.tagline}
            </p>
          </motion.div>
        ))}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>
    </section>
  );
});

Craft.displayName = 'Craft';
export default Craft;
