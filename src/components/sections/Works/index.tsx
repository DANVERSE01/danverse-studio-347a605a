import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const filters = ['all', 'ads', 'branding', 'web', '3d', 'ai'] as const;

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ads' as const, year: 2024, aspect: 'tall' },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'branding' as const, year: 2024, aspect: 'wide' },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'web' as const, year: 2024, aspect: 'square' },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3d' as const, year: 2024, aspect: 'tall' },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ads' as const, year: 2023, aspect: 'wide' },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'branding' as const, year: 2023, aspect: 'square' },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'ai' as const, year: 2024, aspect: 'wide' },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3d' as const, year: 2023, aspect: 'tall' },
  { id: '9', title: 'Echo System', client: 'Pepsi', category: 'web' as const, year: 2024, aspect: 'square' },
  { id: '10', title: 'Carbon Copy', client: 'Uber Eats', category: 'ads' as const, year: 2023, aspect: 'wide' },
  { id: '11', title: 'Deep Learning', client: 'Amazon', category: 'ai' as const, year: 2024, aspect: 'tall' },
  { id: '12', title: 'Cipher Design', client: 'Red Bull', category: 'branding' as const, year: 2024, aspect: 'square' },
];

const aspectHeights = { tall: 420, wide: 280, square: 340 };

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const activeFilter = useDanverseStore((s) => s.activeFilter);
  const setActiveFilter = useDanverseStore((s) => s.setActiveFilter);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  const filtered = activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  return (
    <section ref={ref} id="works" className="py-32 md:py-40 px-6 md:px-12 lg:px-16">
      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Portfolio
          </span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
          <span className="font-mono-brand text-xs tabular-nums" style={{ color: 'hsl(var(--white-30))' }}>
            {filtered.length} projects
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2
            className="font-display font-normal italic tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}
          >
            Selected works
          </h2>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 text-[11px] font-mono-brand uppercase tracking-wider transition-all duration-300"
                style={{
                  background: activeFilter === f ? 'hsl(var(--amber) / 0.1)' : 'transparent',
                  border: `1px solid ${activeFilter === f ? 'hsl(var(--amber) / 0.3)' : 'hsl(var(--white-10))'}`,
                  color: activeFilter === f ? 'hsl(var(--amber))' : 'hsl(var(--white-30))',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 overflow-hidden relative group break-inside-avoid"
              style={{ height: aspectHeights[work.aspect] }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* Warm gradient placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(${parseInt(work.id) * 30 + 120}deg, hsl(var(--deep)), hsl(var(--surface)), hsl(var(--amber) / 0.03))`,
                }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to top, hsl(0 0% 2% / 0.9) 0%, transparent 60%)' }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-brand text-[10px] uppercase tracking-wider" style={{ color: 'hsl(var(--amber))' }}>
                    {work.category}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--white-30))' }} />
                  <span className="font-mono-brand text-[10px]" style={{ color: 'hsl(var(--white-30))' }}>
                    {work.year}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg" style={{ color: 'hsl(var(--foreground))' }}>
                  {work.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'hsl(var(--white-30))' }}>
                  {work.client}
                </p>
              </div>

              {/* Top-right arrow */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15L15 5M15 5H8M15 5v7" stroke="hsl(var(--amber))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
});

Works.displayName = 'Works';
export default Works;
