import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LINES = [
  "We don't make ads.",
  "We build worlds.",
  "Every pixel is a statement.",
  "We make the impossible",
  "feel inevitable.",
];

const Manifesto = forwardRef<HTMLElement>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={ref} id="manifesto">
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Decorative section number */}
          <motion.span
            className="absolute right-6 md:right-16 section-num"
            style={{
              fontSize: 'clamp(6rem, 15vw, 12rem)',
              top: '10%',
            }}
          >
            02
          </motion.span>

          {/* Decorative vertical line */}
          <div className="absolute left-[8%] top-[20%] bottom-[20%] w-px hidden md:block" style={{ background: 'hsl(var(--coral) / 0.06)' }} />

          <div className="px-6 md:px-16 lg:pl-[12%] max-w-[1100px]">
            {/* Tag */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
                Manifesto
              </span>
              <div className="w-12 h-px" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
            </motion.div>

            {/* Lines — each reveals independently */}
            <div className="space-y-2">
              {LINES.map((line, i) => (
                <ManifestoLine key={i} index={i} total={LINES.length} progress={scrollYProgress}>
                  {line}
                </ManifestoLine>
              ))}
            </div>
          </div>

          {/* Decorative dots - bottom right */}
          <div className="absolute bottom-[15%] right-[10%] hidden md:grid grid-cols-3 gap-3 opacity-[0.05]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--sage))' }} />
            ))}
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
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index * (0.6 / total);
  const end = start + 0.35;
  const opacity = useTransform(progress, [start, end], [0.04, 1]);
  const x = useTransform(progress, [start, end], [20, 0]);

  // Alternate between serif italic and sans bold for visual rhythm
  const isSerif = index % 2 === 0;

  return (
    <motion.p
      className={`${isSerif ? 'font-display italic font-normal' : 'font-heading font-bold uppercase'} tracking-[-0.02em]`}
      style={{
        opacity,
        x,
        fontSize: isSerif ? 'clamp(2rem, 5vw, 5rem)' : 'clamp(1.8rem, 4.5vw, 4.5rem)',
        color: 'hsl(var(--foreground))',
      }}
    >
      {children}
    </motion.p>
  );
}

export default Manifesto;
