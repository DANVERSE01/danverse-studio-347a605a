import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LINES = [
  { text: "We don't make", style: 'script' as const },
  { text: 'ADS.', style: 'stroke' as const },
  { text: 'We build', style: 'script' as const },
  { text: 'WORLDS', style: 'bold' as const },
  { text: 'that make the impossible', style: 'script' as const },
  { text: 'INEVITABLE.', style: 'stroke' as const },
];

const Manifesto = forwardRef<HTMLElement>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative"
      style={{ background: 'linear-gradient(180deg, hsl(210 20% 7%), hsl(220 25% 6%))' }}
    >
      <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Giant background text */}
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold uppercase pointer-events-none select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(10rem, 30vw, 30rem)',
              color: 'hsl(var(--rose-gold) / 0.04)',
            }}
          >
            BOLD
          </motion.span>

          {/* Decorative corner marks */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 hidden md:block" style={{ borderColor: 'hsl(var(--rose-gold) / 0.12)' }} />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 hidden md:block" style={{ borderColor: 'hsl(var(--rose-gold) / 0.12)' }} />

          <div className="px-6 md:px-20 lg:pl-[12%] max-w-[1200px]">
            {/* Tag */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--rose-gold))' }}>
                Manifesto
              </span>
              <div className="w-12 h-px" style={{ background: 'hsl(var(--rose-gold) / 0.3)' }} />
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
  lineStyle: 'script' | 'bold' | 'stroke';
}) {
  const start = index * (0.6 / total);
  const end = start + 0.35;
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const x = useTransform(progress, [start, end], [30, 0]);

  const classMap = {
    script: 'font-display italic font-light tracking-[0.01em]',
    bold: 'font-heading font-extrabold uppercase tracking-[-0.04em]',
    stroke: 'font-heading font-extrabold uppercase tracking-[-0.04em]',
  };

  const sizeMap = {
    script: 'clamp(2.5rem, 6vw, 6rem)',
    bold: 'clamp(2.8rem, 7vw, 7.5rem)',
    stroke: 'clamp(2.8rem, 7vw, 7.5rem)',
  };

  const styleMap = {
    script: { color: 'hsl(var(--pearl))' },
    bold: { color: 'hsl(var(--rose-gold))' },
    stroke: {
      WebkitTextStroke: '1.5px hsl(var(--rose-gold) / 0.6)',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    } as React.CSSProperties,
  };

  return (
    <motion.p
      className={classMap[lineStyle]}
      style={{
        opacity,
        x,
        fontSize: sizeMap[lineStyle],
        ...styleMap[lineStyle],
      }}
    >
      {children}
    </motion.p>
  );
}

export default Manifesto;
