import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef, useState } from 'react';
import WorkModal from '@/components/ui/WorkModal';

import imgNeonPulse from '@/assets/works/neon-pulse.jpg';
import imgMetamorphosis from '@/assets/works/metamorphosis.jpg';
import imgNeuralInterface from '@/assets/works/neural-interface.jpg';
import imgVoidArchitecture from '@/assets/works/void-architecture.jpg';
import imgSynthCulture from '@/assets/works/synth-culture.jpg';
import imgQuantumBrand from '@/assets/works/quantum-brand.jpg';
import imgGenesisEngine from '@/assets/works/genesis-engine.jpg';
import imgPrismReality from '@/assets/works/prism-reality.jpg';

const filters = ['all', 'ads', 'branding', 'web', '3d', 'ai'] as const;

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ads' as const, year: 2024, role: 'Campaign Direction & Post-Production', image: imgNeonPulse },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'branding' as const, year: 2024, role: 'Visual Identity & Brand System', image: imgMetamorphosis },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'web' as const, year: 2024, role: 'Product Design & Development', image: imgNeuralInterface },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3d' as const, year: 2024, role: 'Spatial Design & CGI', image: imgVoidArchitecture },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ads' as const, year: 2023, role: 'Campaign & Motion Design', image: imgSynthCulture },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'branding' as const, year: 2023, role: 'Brand Strategy & Design System', image: imgQuantumBrand },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'ai' as const, year: 2024, role: 'AI Integration & Creative Tech', image: imgGenesisEngine },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3d' as const, year: 2023, role: 'Immersive Experience Design', image: imgPrismReality },
];

const accentColors = ['coral', 'sage', 'lavender', 'coral', 'sage', 'lavender', 'coral', 'sage'];

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const activeFilter = useDanverseStore((s) => s.activeFilter);
  const setActiveFilter = useDanverseStore((s) => s.setActiveFilter);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [selectedAccent, setSelectedAccent] = useState('coral');

  const filtered = activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  return (
    <section
      ref={ref}
      id="works"
      className="relative py-32 md:py-48"
      style={{ background: 'hsl(var(--section-warm-black))' }}
    >
      {/* Giant background text */}
      <div className="absolute top-24 left-8 pointer-events-none select-none">
        <span
          className="font-display-alt font-extrabold uppercase"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            color: 'hsl(var(--coral) / 0.025)',
            lineHeight: 0.85,
          }}
        >
          WORK
        </span>
      </div>

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
            <h2 className="flex items-baseline gap-3 md:gap-5 flex-wrap">
              <span className="font-script italic font-light tracking-[0.01em] shimmer-text" style={{ fontSize: 'var(--text-section)' }}>
                Selected
              </span>
              <span className="font-display-alt font-extrabold uppercase tracking-[-0.04em] shimmer-stroke" style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                WebkitTextStroke: '1.5px hsl(var(--coral) / 0.5)',
                WebkitTextFillColor: 'transparent',
              }}>
                WORKS
              </span>
            </h2>

            <div className="flex flex-wrap gap-1.5 p-1 rounded-full" style={{ background: 'hsl(var(--void) / 0.5)', border: '1px solid hsl(var(--white-10))' }}>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="relative px-5 py-2 text-[10px] font-mono-brand uppercase tracking-[0.15em] rounded-full transition-all duration-500"
                  style={{
                    background: activeFilter === f ? 'hsl(var(--coral) / 0.1)' : 'transparent',
                    color: activeFilter === f ? 'hsl(var(--coral))' : 'hsl(var(--white-30))',
                    boxShadow: activeFilter === f ? '0 0 20px hsl(var(--coral) / 0.08), inset 0 0 12px hsl(var(--coral) / 0.04)' : 'none',
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

      {/* Projects list */}
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
                onClick={() => { setSelectedWork(work); setSelectedAccent(accent); }}
                onMouseEnter={() => { setHoveredId(work.id); setCursorVariant('hover'); }}
                onMouseLeave={() => { setHoveredId(null); setCursorVariant('default'); }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMouseY(e.clientY - rect.top);
                }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `hsl(var(--${accent}) / 0.02)` }}
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Floating image */}
                <motion.div
                  className="absolute right-[5%] md:right-[15%] pointer-events-none z-10 overflow-hidden hidden md:block"
                  style={{ width: 280, height: 180, top: mouseY - 90 }}
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.85,
                    rotate: isHovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: `hsl(var(--${accent}) / 0.1)`, mixBlendMode: 'multiply' }} />
                </motion.div>

                <div className="relative px-6 md:px-20 lg:px-28 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] gap-4 md:gap-12 items-center">
                  <span
                    className="font-script italic text-5xl md:text-7xl transition-all duration-500 tabular-nums"
                    style={{ color: isHovered ? `hsl(var(--${accent}))` : 'hsl(var(--white-10))', minWidth: '90px' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="overflow-hidden">
                    <motion.h3
                      className="font-display-alt font-bold uppercase tracking-[-0.03em] transition-colors duration-500"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                        color: isHovered ? 'hsl(var(--cream))' : 'hsl(var(--white-30))',
                      }}
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {work.title}
                    </motion.h3>
                    <motion.p
                      className="font-script italic text-[13px] mt-1"
                      style={{ color: 'hsl(var(--cream) / 0.4)' }}
                      initial={false}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {work.role}
                    </motion.p>
                  </div>

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
          className="group glass-btn gradient-border-spin btn-shimmer rounded-full px-8 py-4 font-mono-brand text-[10px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center gap-3"
          style={{ color: 'hsl(var(--coral))' }}
        >
          View all projects
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>

      <WorkModal
        work={selectedWork ? { ...selectedWork, accent: selectedAccent } : null}
        onClose={() => setSelectedWork(null)}
      />
    </section>
  );
});

Works.displayName = 'Works';
export default Works;
