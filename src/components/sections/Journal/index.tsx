import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { useDanverseStore } from '@/store/useDanverseStore';

const articles = [
  {
    title: 'The Death of the 30-Second Spot',
    excerpt: 'Why the future of advertising is non-linear, AI-driven, and built for feeds — not living rooms.',
    category: 'STRATEGY',
    readTime: '8 min',
    date: '2024-12',
  },
  {
    title: 'Cairo Is the New Berlin for Creative Tech',
    excerpt: 'How the Middle East is redefining the global creative landscape with AI-first studios.',
    category: 'CULTURE',
    readTime: '6 min',
    date: '2024-11',
  },
  {
    title: 'Building an AI Content OS in 90 Days',
    excerpt: 'We replaced 3 agencies with one system. Here\'s the architecture, the failures, and the numbers.',
    category: 'AI',
    readTime: '12 min',
    date: '2024-10',
  },
];

const Journal = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section ref={ref} id="journal" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-12">
        <motion.span variants={fadeUp} className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: 'hsl(var(--cyan))' }}>
          / 08 JOURNAL
        </motion.span>
        <motion.h2 variants={fadeUp} className="font-display font-black tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'hsl(var(--foreground))' }}>
          Thinking Made Visible
        </motion.h2>
      </motion.div>

      <div className="space-y-8">
        {articles.map((article, i) => (
          <motion.article
            key={article.title}
            className={`grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 rounded-2xl overflow-hidden group ${i === 0 ? 'md:grid-cols-[1fr_2fr]' : ''}`}
            style={{
              backgroundColor: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Image placeholder */}
            <div
              className={`relative h-64 md:h-80 overflow-hidden ${i === 0 ? 'md:order-2' : ''}`}
              style={{
                background: `linear-gradient(${135 + i * 45}deg, hsl(var(--deep)), hsl(var(--surface)), hsl(var(--cyan)/0.05))`,
              }}
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>

            {/* Text */}
            <div className={`p-8 flex flex-col justify-center ${i === 0 ? 'md:order-1' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="glass rounded-full px-3 py-1 text-xs font-heading" style={{ color: 'hsl(var(--cyan))' }}>
                  {article.category}
                </span>
                <span className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>
                  {article.readTime} · {article.date}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-3" style={{ color: 'hsl(var(--foreground))' }}>
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--white-60))' }}>
                {article.excerpt}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
});

Journal.displayName = 'Journal';
export default Journal;
