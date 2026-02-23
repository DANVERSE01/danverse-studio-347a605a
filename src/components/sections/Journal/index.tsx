import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';

const articles = [
  {
    title: 'The Death of the 30-Second Spot',
    excerpt: 'Why the future of advertising is non-linear, AI-driven, and built for feeds.',
    category: 'Strategy',
    readTime: '8 min',
    date: 'Dec 2024',
    accent: 'coral',
  },
  {
    title: 'Cairo Is the New Berlin',
    excerpt: 'How the Middle East is redefining the global creative landscape.',
    category: 'Culture',
    readTime: '6 min',
    date: 'Nov 2024',
    accent: 'sage',
  },
  {
    title: 'Building an AI Content OS',
    excerpt: "We replaced 3 agencies with one system. Here's what happened.",
    category: 'Engineering',
    readTime: '12 min',
    date: 'Oct 2024',
    accent: 'lavender',
  },
];

const Journal = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="journal" className="relative py-32 md:py-48 px-6 md:px-16">
      <span className="absolute top-16 left-6 md:left-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        08
      </span>

      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-20">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Journal
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp}>
          <span className="font-display italic block tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
            Thinking,
          </span>
          <span className="font-heading font-bold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: 'hsl(var(--coral))' }}>
            Visible
          </span>
        </motion.h2>
      </motion.div>

      {/* Articles — card-based with visual accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, i) => (
          <motion.article
            key={article.title}
            className="group relative p-8 overflow-hidden transition-all duration-500"
            style={{
              background: 'hsl(var(--deep))',
              border: '1px solid hsl(var(--white-10))',
              minHeight: 380,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Category color bar top */}
            <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px transition-all duration-700" style={{ background: `hsl(var(--${article.accent}))` }} />

            {/* Number */}
            <span className="font-display italic text-6xl block mb-8" style={{ color: `hsl(var(--${article.accent}) / 0.08)` }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-brand text-[9px] uppercase tracking-[0.2em]" style={{ color: `hsl(var(--${article.accent}))` }}>
                {article.category}
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--white-30))' }} />
              <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-30))' }}>
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display italic text-xl md:text-2xl mb-3 transition-colors duration-500 group-hover:text-foreground leading-[1.3]" style={{ color: 'hsl(var(--white-60))' }}>
              {article.title}
            </h3>

            <p className="text-[12px] leading-[1.8]" style={{ color: 'hsl(var(--white-30))' }}>
              {article.excerpt}
            </p>

            {/* Date + arrow at bottom */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
              <span className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-30))' }}>
                {article.date}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke={`hsl(var(--${article.accent}))`} strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
});

Journal.displayName = 'Journal';
export default Journal;
