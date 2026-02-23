import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { forwardRef } from 'react';

const filters = ['all', 'ads', 'branding', 'web', '3d', 'ai'] as const;

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ads' as const, year: 2024, height: 300 },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'branding' as const, year: 2024, height: 420 },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'web' as const, year: 2024, height: 340 },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3d' as const, year: 2024, height: 300 },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ads' as const, year: 2023, height: 420 },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'branding' as const, year: 2023, height: 340 },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'ai' as const, year: 2024, height: 300 },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3d' as const, year: 2023, height: 420 },
  { id: '9', title: 'Echo System', client: 'Pepsi', category: 'web' as const, year: 2024, height: 340 },
  { id: '10', title: 'Carbon Copy', client: 'Uber Eats', category: 'ads' as const, year: 2023, height: 300 },
  { id: '11', title: 'Deep Learning Brand', client: 'Amazon', category: 'ai' as const, year: 2024, height: 420 },
  { id: '12', title: 'Cipher Design', client: 'Red Bull', category: 'branding' as const, year: 2024, height: 340 },
];

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const activeFilter = useDanverseStore((s) => s.activeFilter);
  const setActiveFilter = useDanverseStore((s) => s.setActiveFilter);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const setSelectedWork = useDanverseStore((s) => s.setSelectedWork);
  const { playClick } = useSoundEffects();

  const filtered = activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  return (
    <section ref={ref} id="works" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-12"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4"
          style={{ color: 'hsl(var(--cyan))' }}
        >
          / 04 SELECTED WORKS
        </motion.span>
        <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-8">
          <h2
            className="font-display font-black tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'hsl(var(--foreground))' }}
          >
            Selected Works
          </h2>
          <span className="font-mono-brand text-sm tabular-nums" style={{ color: 'hsl(var(--cyan))' }}>
            ({filtered.length})
          </span>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 ${
                activeFilter === f
                  ? 'text-gradient font-semibold'
                  : ''
              }`}
              style={{
                background: activeFilter === f ? 'hsl(var(--cyan)/0.1)' : 'hsl(0 0% 100% / 0.03)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${activeFilter === f ? 'hsl(var(--cyan)/0.3)' : 'hsl(0 0% 100% / 0.07)'}`,
                color: activeFilter === f ? 'hsl(var(--cyan))' : 'hsl(var(--white-60))',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="mb-4 rounded-xl overflow-hidden relative group break-inside-avoid cursor-pointer"
              style={{
                height: work.height,
                backgroundColor: 'hsl(var(--surface))',
                border: '1px solid hsl(var(--border))',
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              onClick={() => {
                playClick();
                setSelectedWork(work.id);
              }}
            >
              {/* Gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${parseInt(work.id) * 30}deg, hsl(var(--cyan)/0.06), hsl(var(--magenta)/0.04), hsl(var(--purple)/0.06))`,
                }}
              />

              {/* Hover scrim */}
              <div
                className="absolute inset-0 transition-all duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0"
                style={{ backgroundColor: 'hsl(var(--void)/0.85)' }}
              />

              {/* Content on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="font-mono-brand text-xs" style={{ color: 'hsl(var(--cyan))' }}>
                  {work.category.toUpperCase()} · {work.year}
                </span>
                <h3 className="font-display font-bold text-xl mt-1" style={{ color: 'hsl(var(--foreground))' }}>
                  {work.title}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'hsl(var(--white-60))' }}>
                  {work.client}
                </p>
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
