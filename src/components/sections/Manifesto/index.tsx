import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MANIFESTO = "WE DON'T MAKE ADS. WE BUILD WORLDS. EVERY PIXEL, EVERY FRAME, EVERY INTERACTION IS A STATEMENT. WE EXIST TO MAKE THE IMPOSSIBLE FEEL INEVITABLE.";

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
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12">
          {/* Watermark */}
          <motion.span
            className="absolute font-display font-black select-none pointer-events-none"
            style={{
              fontSize: '30vw',
              color: 'hsl(var(--foreground) / 0.03)',
              right: '-5%',
              writingMode: 'vertical-rl',
              y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']),
            }}
            aria-hidden="true"
          >
            DANVERSE
          </motion.span>

          <p className="max-w-[1000px] mx-auto font-display font-extrabold leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)' }}
          >
            {words.map((word, i) => (
              <Word key={i} index={i} total={words.length} progress={scrollYProgress}>
                {word}
              </Word>
            ))}
          </p>
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
  const opacity = useTransform(progress, [start, end], [0.06, 1]);
  const textShadow = useTransform(
    opacity,
    [0.06, 1],
    ['0 0 0px transparent', '0 0 40px hsl(0 0% 100% / 0.1)']
  );

  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      style={{ opacity, textShadow, color: 'hsl(var(--foreground))' }}
    >
      {children}
    </motion.span>
  );
}

export default Manifesto;
