import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';

const articles = [
  {
    title: 'The Death of the 30-Second Spot',
    excerpt: 'Why the future of advertising is non-linear, AI-driven, and built for feeds — not living rooms.',
    category: 'Strategy',
    readTime: '8 min',
    date: 'Dec 2024',
  },
  {
    title: 'Cairo Is the New Berlin for Creative Tech',
    excerpt: 'How the Middle East is redefining the global creative landscape with AI-first studios.',
    category: 'Culture',
    readTime: '6 min',
    date: 'Nov 2024',
  },
  {
    title: 'Building an AI Content OS in 90 Days',
    excerpt: 'We replaced 3 agencies with one system. Here\'s the architecture, the failures, and the numbers.',
    category: 'Engineering',
    readTime: '12 min',
    date: 'Oct 2024',
  },
];

const Journal = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="journal" className="py-32 md:py-40 px-6 md:px-12 lg:px-16">
      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-16">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Journal
          </span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-display font-normal italic tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}>
          Thinking, visible
        </motion.h2>
      </motion.div>

      <div className="space-y-0">
        {articles.map((article, i) => (
          <motion.article
            key={article.title}
            className="group border-t py-10 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-12 items-start"
            style={{ borderColor: 'hsl(var(--white-10))' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Meta */}
            <div className="flex md:flex-col gap-3 md:gap-2">
              <span className="font-mono-brand text-[10px] uppercase tracking-wider" style={{ color: 'hsl(var(--amber))' }}>
                {article.category}
              </span>
              <span className="font-mono-brand text-[10px]" style={{ color: 'hsl(var(--white-30))' }}>
                {article.readTime}
              </span>
              <span className="font-mono-brand text-[10px]" style={{ color: 'hsl(var(--white-30))' }}>
                {article.date}
              </span>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-heading font-semibold text-xl md:text-2xl tracking-tight mb-2 transition-colors duration-500 group-hover:text-amber" style={{ color: 'hsl(var(--foreground))' }}>
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'hsl(var(--white-30))' }}>
                {article.excerpt}
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center self-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 15L15 5M15 5H8M15 5v7" stroke="hsl(var(--amber))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.article>
        ))}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>
    </section>
  );
});

Journal.displayName = 'Journal';
export default Journal;
