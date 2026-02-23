import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef, useState } from 'react';

import imgNeonPulse from '@/assets/works/neon-pulse.jpg';
import imgMetamorphosis from '@/assets/works/metamorphosis.jpg';
import imgNeuralInterface from '@/assets/works/neural-interface.jpg';
import imgVoidArchitecture from '@/assets/works/void-architecture.jpg';
import imgSynthCulture from '@/assets/works/synth-culture.jpg';
import imgQuantumBrand from '@/assets/works/quantum-brand.jpg';
import imgGenesisEngine from '@/assets/works/genesis-engine.jpg';
import imgPrismReality from '@/assets/works/prism-reality.jpg';

const works = [
  { id: '1', title: 'Neon Pulse', client: 'Vodafone', category: 'ADS', year: '2024', image: imgNeonPulse, accent: 'coral', span: 'col-span-1 row-span-2' },
  { id: '2', title: 'Metamorphosis', client: 'Samsung', category: 'BRANDING', year: '2024', image: imgMetamorphosis, accent: 'sage', span: 'col-span-1 row-span-1' },
  { id: '3', title: 'Neural Interface', client: 'IBM', category: 'WEB', year: '2024', image: imgNeuralInterface, accent: 'lavender', span: 'col-span-1 row-span-1' },
  { id: '4', title: 'Void Architecture', client: 'Grand Hyatt', category: '3D', year: '2024', image: imgVoidArchitecture, accent: 'coral', span: 'col-span-2 row-span-1' },
  { id: '5', title: 'Synth Culture', client: 'Netflix', category: 'ADS', year: '2023', image: imgSynthCulture, accent: 'sage', span: 'col-span-1 row-span-1' },
  { id: '6', title: 'Quantum Brand', client: 'Mastercard', category: 'BRANDING', year: '2023', image: imgQuantumBrand, accent: 'lavender', span: 'col-span-1 row-span-2' },
  { id: '7', title: 'Genesis Engine', client: 'Toyota', category: 'AI', year: '2024', image: imgGenesisEngine, accent: 'coral', span: 'col-span-1 row-span-1' },
  { id: '8', title: 'Prism Reality', client: 'Swarovski', category: '3D', year: '2023', image: imgPrismReality, accent: 'sage', span: 'col-span-1 row-span-1' },
];

const Works = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="works"
      className="relative py-32 md:py-48"
      style={{ background: 'hsl(var(--section-warm-black))' }}
    >
      {/* Section header */}
      <div className="px-6 md:px-20 lg:px-28">
        <motion.div
          ref={inViewRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Selected Work
            </span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          </motion.div>

          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-script italic font-light tracking-[0.01em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--cream))' }}>
              Selected
            </span>
            <span
              className="font-display-alt font-extrabold uppercase tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                background: 'linear-gradient(135deg, hsl(var(--coral)), hsl(35 60% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WORKS
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Asymmetric image grid */}
      <div className="px-6 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {works.map((work, i) => {
            const isHovered = hoveredId === work.id;
            return (
              <motion.div
                key={work.id}
                className={`relative overflow-hidden cursor-pointer group ${work.span}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => { setHoveredId(work.id); setCursorVariant('hover'); }}
                onMouseLeave={() => { setHoveredId(null); setCursorVariant('default'); }}
              >
                {/* Image with zoom */}
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                />

                {/* Color overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(180deg, hsl(var(--${work.accent}) / ${isHovered ? '0.1' : '0.3'}) 0%, hsl(var(--void) / ${isHovered ? '0.4' : '0.7'}) 100%)`,
                  }}
                />

                {/* Glow border on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px hsl(var(--${work.accent}) / 0.3)` }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  {/* Top: category + year */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-brand text-[9px] uppercase tracking-[0.25em]" style={{ color: `hsl(var(--${work.accent}))` }}>
                      {work.category}
                    </span>
                    <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
                      {work.year}
                    </span>
                  </div>

                  {/* Bottom: title + client */}
                  <div>
                    <motion.h3
                      className="font-display-alt font-bold uppercase text-xl md:text-2xl tracking-[-0.02em] mb-1"
                      style={{ color: 'hsl(var(--cream))' }}
                      animate={{ y: isHovered ? 0 : 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      {work.title}
                    </motion.h3>
                    <motion.p
                      className="font-script italic text-sm"
                      style={{ color: 'hsl(var(--cream) / 0.5)' }}
                      animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 4 }}
                      transition={{ duration: 0.4 }}
                    >
                      {work.client}
                    </motion.p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  className="absolute top-5 right-5 z-10"
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `hsl(var(--${work.accent}) / 0.2)`, backdropFilter: 'blur(10px)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H7M12 4v5" stroke={`hsl(var(--${work.accent}))`} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* View all CTA */}
      <motion.div
        className="px-6 md:px-20 lg:px-28 mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button className="group flex items-center gap-4 font-mono-brand text-[10px] uppercase tracking-[0.25em] transition-colors duration-300" style={{ color: 'hsl(var(--coral))' }}>
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
