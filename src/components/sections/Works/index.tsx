import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef, useState } from 'react';

const filters = ['all', 'ads', 'branding', 'web', '3d', 'ai'] as const;

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ads' as const, year: 2024, role: 'Campaign Direction & Post-Production' },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'branding' as const, year: 2024, role: 'Visual Identity & Brand System' },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'web' as const, year: 2024, role: 'Product Design & Development' },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3d' as const, year: 2024, role: 'Spatial Design & CGI' },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ads' as const, year: 2023, role: 'Campaign & Motion Design' },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'branding' as const, year: 2023, role: 'Brand Strategy & Design System' },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'ai' as const, year: 2024, role: 'AI Integration & Creative Tech' },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3d' as const, year: 2023, role: 'Immersive Experience Design' },
];

const accentColors = ['coral', 'sage', 'lavender', 'coral', 'sage', 'lavender', 'coral', 'sage'];

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const activeFilter = useDanverseStore((s) => s.activeFilter);
  const setActiveFilter = useDanverseStore((s) => s.setActiveFilter);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  return (
    <section ref={ref} id="works" className="relative py-32 md:py-48">
      {/* Section header */}
      <div className="px-6 md:px-20 lg:px-28">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Selected Work
            </span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
            <span className="font-mono-brand text-[10px] tabular-nums" style={{ color: 'hsl(var(--white-30))' }}>
              ({filtered.length})
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Headline with outlined text */}
            <h2 className="flex items-baseline gap-3 md:gap-5 flex-wrap">
              <span className="font-display italic tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
                Selected
              </span>
              <span className="font-heading font-bold uppercase tracking-[-0.04em] text-stroke-coral" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
                WORKS
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
      </div>

      {/* Projects — full-width editorial list with dramatic hover */}
      <div className="w-full">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, i) => {
            const accent = accentColors[i % accentColors.length];
            const isHovered = hoveredId === work.id;
            return (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="group relative border-t cursor-pointer"
                style={{ borderColor: 'hsl(var(--white-10))' }}
                onMouseEnter={() => { setHoveredId(work.id); setCursorVariant('hover'); }}
                onMouseLeave={() => { setHoveredId(null); setCursorVariant('default'); }}
              >
                {/* Background reveal on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `hsl(var(--${accent}) / 0.02)` }}
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative px-6 md:px-20 lg:px-28 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] gap-4 md:gap-12 items-center">
                  {/* Large number */}
                  <span
                    className="font-display italic text-5xl md:text-7xl transition-all duration-500 tabular-nums"
                    style={{ 
                      color: isHovered ? `hsl(var(--${accent}))` : 'hsl(var(--white-10))',
                      minWidth: '90px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title — massive on hover */}
                  <div className="overflow-hidden">
                    <motion.h3
                      className="font-heading font-bold uppercase tracking-[-0.03em] transition-colors duration-500"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                        color: isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--white-30))',
                      }}
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {work.title}
                    </motion.h3>
                    {/* Role — reveals on hover */}
                    <motion.p
                      className="font-body text-[11px] mt-1"
                      style={{ color: 'hsl(var(--white-30))' }}
                      initial={false}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {work.role}
                    </motion.p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-6">
                    <span className="font-mono-brand text-[9px] uppercase tracking-[0.2em]" style={{ color: `hsl(var(--${accent}))` }}>
                      {work.category}
                    </span>
                    <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-10))' }}>
                      {work.year}
                    </span>
                    <span className="font-body text-[11px] hidden md:inline" style={{ color: 'hsl(var(--white-30))' }}>
                      {work.client}
                    </span>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="flex items-center justify-end"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0.1, x: isHovered ? 0 : -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H10M17 7v7" stroke={`hsl(var(--${accent}))`} strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom growing line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px origin-left"
                  style={{ background: `hsl(var(--${accent}))` }}
                  initial={false}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {/* Final border */}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>

      {/* View all CTA */}
      <motion.div
        className="px-6 md:px-20 lg:px-28 mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button
          className="group flex items-center gap-4 font-mono-brand text-[10px] uppercase tracking-[0.25em] transition-colors duration-300"
          style={{ color: 'hsl(var(--coral))' }}
        >
          <span className="w-10 h-px transition-all duration-500 group-hover:w-16" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
          View all projects
          <span className="w-10 h-px transition-all duration-500 group-hover:w-16" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
        </button>
      </motion.div>
    </section>
  );
});

Works.displayName = 'Works';
export default Works;
