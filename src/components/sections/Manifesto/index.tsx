import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import imgNeonPulse from '@/assets/works/neon-pulse.jpg';

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

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.15]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative"
      style={{ background: 'hsl(var(--section-terracotta))' }}
    >
      <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Background image with parallax */}
          <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
            <motion.img
              src={imgNeonPulse}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, hsl(var(--section-terracotta) / 0.8) 0%, hsl(var(--section-terracotta) / 0.6) 50%, hsl(var(--section-terracotta) / 0.9) 100%)',
            }} />
          </motion.div>

          {/* Corner marks */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 hidden md:block" style={{ borderColor: 'hsl(35 30% 88% / 0.15)' }} />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 hidden md:block" style={{ borderColor: 'hsl(35 30% 88% / 0.15)' }} />

          <div className="relative z-10 px-6 md:px-20 lg:pl-[12%] max-w-[1200px]">
            <motion.div className="flex items-center gap-4 mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(35 30% 88%)' }}>Manifesto</span>
              <div className="w-12 h-px" style={{ background: 'hsl(35 30% 88% / 0.4)' }} />
            </motion.div>

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

function ManifestoLine({ children, index, total, progress, lineStyle }: {
  children: string; index: number; total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  lineStyle: 'script' | 'bold' | 'stroke';
}) {
  const start = index * (0.6 / total);
  const end = start + 0.35;
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const x = useTransform(progress, [start, end], [30, 0]);

  const classMap = {
    script: 'font-script italic font-light tracking-[0.01em]',
    bold: 'font-display-alt font-extrabold uppercase tracking-[-0.04em]',
    stroke: 'font-display-alt font-extrabold uppercase tracking-[-0.04em]',
  };

  const sizeMap = {
    script: 'clamp(2.5rem, 6vw, 6rem)',
    bold: 'clamp(2.8rem, 7vw, 7.5rem)',
    stroke: 'clamp(2.8rem, 7vw, 7.5rem)',
  };

  const styleMap = {
    script: { color: 'hsl(35 30% 88%)' },
    bold: {
      background: 'linear-gradient(90deg, hsl(35 30% 88%), hsl(35 50% 75%))',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    } as React.CSSProperties,
    stroke: {
      WebkitTextStroke: '1.5px hsl(35 30% 88% / 0.6)',
      WebkitTextFillColor: 'transparent', color: 'transparent',
    } as React.CSSProperties,
  };

  return (
    <motion.p className={classMap[lineStyle]} style={{ opacity, x, fontSize: sizeMap[lineStyle], ...styleMap[lineStyle] }}>
      {children}
    </motion.p>
  );
}

export default Manifesto;
