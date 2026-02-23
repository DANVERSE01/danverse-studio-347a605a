import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LINES = [
  { text: "We don't make", style: 'serif' as const },
  { text: 'ADS.', style: 'stroke' as const },
  { text: 'We build', style: 'serif' as const },
  { text: 'WORLDS', style: 'bold' as const },
  { text: 'that make the impossible', style: 'serif' as const },
  { text: 'INEVITABLE.', style: 'stroke' as const },
];

const Manifesto = forwardRef<HTMLElement>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={ref} id="manifesto">
      <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Decorative section number */}
          <motion.span
            className="absolute right-6 md:right-16 section-num"
            style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', top: '10%' }}
          >
            02
          </motion.span>

          {/* Decorative vertical line */}
          <div className="absolute left-[8%] top-[20%] bottom-[20%] w-px hidden md:block" style={{ background: 'hsl(var(--coral) / 0.04)' }} />

          {/* Decorative rotating ring */}
          <svg className="absolute bottom-[15%] right-[15%] w-24 h-24 animate-rotate-slow opacity-[0.03] hidden md:block" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="hsl(var(--coral))" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>

          <div className="px-6 md:px-20 lg:pl-[12%] max-w-[1200px]">
            {/* Tag */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
                Manifesto
              </span>
              <div className="w-12 h-px" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
            </motion.div>

            {/* Lines */}
            <div className="space-y-1 md:space-y-0">
              {LINES.map((line, i) => (
                <ManifestoLine key={i} index={i} total={LINES.length} progress={scrollYProgress} lineStyle={line.style}>
                  {line.text}
                </ManifestoLine>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
Manifesto.displayName = 'Manifesto';

function ManifestoLine({
  children,
  index,
  total,
  progress,
  lineStyle,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  lineStyle: 'serif' | 'bold' | 'stroke';
}) {
  const start = index * (0.6 / total);
  const end = start + 0.35;
  const opacity = useTransform(progress, [start, end], [0.03, 1]);
  const x = useTransform(progress, [start, end], [30, 0]);

  const classMap = {
    serif: 'font-display italic font-normal tracking-[-0.02em]',
    bold: 'font-heading font-bold uppercase tracking-[-0.04em]',
    stroke: 'font-heading font-bold uppercase tracking-[-0.04em] text-stroke-coral',
  };

  const sizeMap = {
    serif: 'clamp(2.2rem, 5.5vw, 5.5rem)',
    bold: 'clamp(2.5rem, 6.5vw, 7rem)',
    stroke: 'clamp(2.5rem, 6.5vw, 7rem)',
  };

  const colorMap = {
    serif: 'hsl(var(--foreground))',
    bold: 'hsl(var(--coral))',
    stroke: undefined,
  };

  return (
    <motion.p
      className={classMap[lineStyle]}
      style={{
        opacity,
        x,
        fontSize: sizeMap[lineStyle],
        color: colorMap[lineStyle],
      }}
    >
      {children}
    </motion.p>
  );
}

export default Manifesto;
