import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MANIFESTO = "We don't make ads. We build worlds. Every pixel, every frame, every interaction is a statement. We exist to make the impossible feel inevitable.";

const Manifesto = forwardRef<HTMLElement>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const words = MANIFESTO.split(' ');

  return (
    <section ref={ref} id="manifesto">
      <div ref={containerRef} className="relative" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-16">
          <div className="max-w-[900px]">
            {/* Section tag */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
                Manifesto
              </span>
              <div className="w-16 h-px" style={{ background: 'hsl(var(--amber) / 0.3)' }} />
            </motion.div>

            <p className="font-display font-normal leading-[1.15] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}
            >
              {words.map((word, i) => (
                <Word key={i} index={i} total={words.length} progress={scrollYProgress}>
                  {word}
                </Word>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
Manifesto.displayName = 'Manifesto';

function Word({
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
  const start = index * (0.7 / total);
  const end = start + 0.4;
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const color = useTransform(
    opacity,
    [0.08, 1],
    ['hsl(40 10% 95% / 0.08)', 'hsl(40 20% 95%)']
  );

  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      style={{ opacity, color }}
    >
      {children}
    </motion.span>
  );
}

export default Manifesto;
