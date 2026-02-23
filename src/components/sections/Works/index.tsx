import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const filters = ['all', 'ads', 'branding', 'web', '3d', 'ai'] as const;

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ads' as const, year: 2024, span: 'col-span-1 row-span-2' },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'branding' as const, year: 2024, span: 'col-span-1 row-span-1' },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'web' as const, year: 2024, span: 'col-span-1 row-span-1' },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3d' as const, year: 2024, span: 'col-span-1 row-span-2' },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ads' as const, year: 2023, span: 'col-span-1 row-span-1' },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'branding' as const, year: 2023, span: 'col-span-1 row-span-1' },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'ai' as const, year: 2024, span: 'col-span-1 row-span-1' },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3d' as const, year: 2023, span: 'col-span-1 row-span-2' },
  { id: '9', title: 'Echo System', client: 'Pepsi', category: 'web' as const, year: 2024, span: 'col-span-1 row-span-1' },
  { id: '10', title: 'Carbon Copy', client: 'Uber Eats', category: 'ads' as const, year: 2023, span: 'col-span-1 row-span-1' },
  { id: '11', title: 'Deep Learning', client: 'Amazon', category: 'ai' as const, year: 2024, span: 'col-span-1 row-span-1' },
  { id: '12', title: 'Cipher Design', client: 'Red Bull', category: 'branding' as const, year: 2024, span: 'col-span-1 row-span-2' },
];

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const activeFilter = useDanverseStore((s) => s.activeFilter);
  const setActiveFilter = useDanverseStore((s) => s.setActiveFilter);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  const filtered = activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  // Color per project for visual variety
  const projectColors = [
    'hsl(var(--coral) / 0.06)', 'hsl(var(--sage) / 0.06)', 'hsl(var(--lavender) / 0.06)',
    'hsl(var(--coral) / 0.04)', 'hsl(var(--sage) / 0.04)', 'hsl(var(--cream) / 0.03)',
    'hsl(var(--lavender) / 0.05)', 'hsl(var(--coral) / 0.05)', 'hsl(var(--sage) / 0.05)',
    'hsl(var(--cream) / 0.04)', 'hsl(var(--lavender) / 0.04)', 'hsl(var(--coral) / 0.07)',
  ];

  return (
    <section ref={ref} id="works" className="relative py-32 md:py-48 px-6 md:px-16">
      <span className="absolute top-16 left-6 md:left-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        04
      </span>

      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-20"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Portfolio
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          <span className="font-mono-brand text-[10px] tabular-nums" style={{ color: 'hsl(var(--white-30))' }}>
            ({filtered.length})
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2>
            <span className="font-display italic block tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
              Selected
            </span>
            <span className="font-heading font-bold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: 'hsl(var(--coral))' }}>
              Works
            </span>
          </h2>

          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 text-[10px] font-mono-brand uppercase tracking-[0.15em] transition-all duration-400"
                style={{
                  background: activeFilter === f ? 'hsl(var(--coral) / 0.08)' : 'transparent',
                  color: activeFilter === f ? 'hsl(var(--coral))' : 'hsl(var(--white-30))',
                  border: `1px solid ${activeFilter === f ? 'hsl(var(--coral) / 0.2)' : 'transparent'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, i) => {
            const heights = [360, 280, 420, 300, 380, 260];
            const h = heights[i % heights.length];
            return (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 overflow-hidden relative group break-inside-avoid"
                style={{ height: h }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {/* Background with color accent */}
                <div
                  className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  style={{
                    background: `linear-gradient(${140 + i * 25}deg, hsl(var(--deep)), ${projectColors[i % projectColors.length]})`,
                  }}
                />

                {/* Geometric decoration per card */}
                <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-500">
                  {i % 3 === 0 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="18" stroke="hsl(var(--coral))" strokeWidth="0.5" />
                    </svg>
                  )}
                  {i % 3 === 1 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="4" y="4" width="32" height="32" stroke="hsl(var(--sage))" strokeWidth="0.5" />
                    </svg>
                  )}
                  {i % 3 === 2 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <polygon points="20,4 36,36 4,36" stroke="hsl(var(--lavender))" strokeWidth="0.5" fill="none" />
                    </svg>
                  )}
                </div>

                {/* Hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225_50%_3%/0.92)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono-brand text-[9px] uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--coral))' }}>
                      {work.category}
                    </span>
                    <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-30))' }}>
                      {work.year}
                    </span>
                  </div>
                  <h3 className="font-display italic text-2xl" style={{ color: 'hsl(var(--foreground))' }}>
                    {work.title}
                  </h3>
                  <p className="font-mono-brand text-[10px] mt-1 tracking-wider uppercase" style={{ color: 'hsl(var(--white-30))' }}>
                    {work.client}
                  </p>
                </div>

                {/* Top corner arrow */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-400 scale-75 group-hover:scale-100">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 14L14 4M14 4H7M14 4v7" stroke="hsl(var(--coral))" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
});

Works.displayName = 'Works';
export default Works;
