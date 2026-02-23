import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';

const articles = [
  {
    title: 'The Death of the 30-Second Spot',
    excerpt: 'Why the future of advertising is non-linear, AI-driven, and built for feeds not screens.',
    category: 'Strategy',
    readTime: '8 min',
    date: 'Dec 2024',
    accent: 'coral',
  },
  {
    title: 'Cairo Is the New Berlin',
    excerpt: 'How the Middle East is redefining the global creative landscape — from the inside out.',
    category: 'Culture',
    readTime: '6 min',
    date: 'Nov 2024',
    accent: 'sage',
  },
  {
    title: 'Building an AI Content OS',
    excerpt: "We replaced 3 agencies with one system. Here's what happened next.",
    category: 'Engineering',
    readTime: '12 min',
    date: 'Oct 2024',
    accent: 'lavender',
  },
];

const Journal = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section ref={ref} id="journal" className="relative py-32 md:py-48">
      <div className="px-6 md:px-20 lg:px-28">
        <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-20">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Journal
            </span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-display italic tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
              Thinking,
            </span>
            <span className="font-heading font-bold uppercase tracking-[-0.04em] text-stroke-coral" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              VISIBLE
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Articles — full-width editorial list */}
      <div className="w-full">
        {articles.map((article, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <motion.article
              key={article.title}
              className="group relative border-t cursor-pointer"
              style={{ borderColor: 'hsl(var(--white-10))' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => { setHoveredIdx(i); setCursorVariant('hover'); }}
              onMouseLeave={() => { setHoveredIdx(null); setCursorVariant('default'); }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `hsl(var(--${article.accent}) / 0.015)` }}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative px-6 md:px-20 lg:px-28 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto] gap-4 md:gap-12 items-center">
                {/* Number */}
                <span
                  className="font-display italic text-4xl md:text-5xl tabular-nums transition-colors duration-500"
                  style={{ color: isHovered ? `hsl(var(--${article.accent}))` : 'hsl(var(--white-10))' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <div>
                  <motion.h3
                    className="font-heading font-semibold text-lg md:text-2xl tracking-[-0.02em] transition-colors duration-500"
                    style={{ color: isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--white-30))' }}
                    animate={{ x: isHovered ? 6 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {article.title}
                  </motion.h3>
                  <motion.p
                    className="text-[11px] mt-1.5 max-w-xs"
                    style={{ color: 'hsl(var(--white-30))' }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {article.excerpt}
                  </motion.p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4">
                  <span className="font-mono-brand text-[9px] uppercase tracking-[0.2em]" style={{ color: `hsl(var(--${article.accent}))` }}>
                    {article.category}
                  </span>
                  <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-10))' }}>
                    {article.readTime}
                  </span>
                  <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-10))' }}>
                    {article.date}
                  </span>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0.1, x: isHovered ? 0 : -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke={`hsl(var(--${article.accent}))`} strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-px origin-left"
                style={{ background: `hsl(var(--${article.accent}))` }}
                initial={false}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.article>
          );
        })}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>
    </section>
  );
});

Journal.displayName = 'Journal';
export default Journal;
