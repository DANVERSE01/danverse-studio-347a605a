import { forwardRef, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

function CounterUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.5);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, end]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="font-display italic tabular-nums" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: 'hsl(var(--foreground))' }}>
        {count}
      </span>
      <span className="font-display italic text-xl md:text-2xl" style={{ color: 'hsl(var(--coral))' }}>
        {suffix}
      </span>
    </span>
  );
}

const Studio = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="studio" className="relative py-32 md:py-48 px-6 md:px-20 lg:px-28">
      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Studio
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-24 flex items-baseline gap-3 md:gap-5 flex-wrap">
          <span className="font-display italic tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
            Behind the
          </span>
          <span className="font-heading font-bold uppercase tracking-[-0.04em] text-stroke-sage" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
            CURTAIN
          </span>
        </motion.h2>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 md:gap-12 mb-32 border-t border-b py-16" style={{ borderColor: 'hsl(var(--white-10))' }}>
        {[
          { end: 12, suffix: '+', label: 'Creatives', color: 'coral' },
          { end: 4, suffix: '', label: 'Countries', color: 'sage' },
          { end: 0, suffix: '', label: 'Templates', color: 'lavender' },
        ].map((stat) => (
          <div key={stat.label}>
            <CounterUp end={stat.end} suffix={stat.suffix} />
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-px" style={{ background: `hsl(var(--${stat.color}) / 0.4)` }} />
              <p className="font-mono-brand text-[9px] uppercase tracking-[0.25em]" style={{ color: 'hsl(var(--white-30))' }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Split: philosophy + visual */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start">
        <div>
          <p className="font-display italic text-3xl md:text-4xl leading-[1.3] mb-8" style={{ color: 'hsl(var(--foreground))' }}>
            We are not an agency.
            <br />
            <span className="text-stroke-coral">We are a system.</span>
          </p>
          <p className="text-[13px] leading-[1.9] mb-10 max-w-md" style={{ color: 'hsl(var(--white-30))' }}>
            12 humans obsessed with the future of communication,
            operating at the intersection of technology and culture.
            No templates. No shortcuts. Only intentional work.
          </p>
          <button
            className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.2em] group transition-colors duration-300"
            style={{ color: 'hsl(var(--coral))' }}
          >
            <span className="w-8 h-px transition-all duration-500 group-hover:w-12" style={{ background: 'hsl(var(--coral) / 0.5)' }} />
            Join the studio
          </button>
        </div>

        {/* Visual grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { h: 300, accent: 'coral' },
            { h: 220, accent: 'sage' },
            { h: 220, accent: 'lavender' },
            { h: 300, accent: 'coral' },
          ].map((item, i) => (
            <div
              key={i}
              className="overflow-hidden transition-all duration-700 grayscale hover:grayscale-0 group relative"
              style={{
                height: item.h,
                background: `linear-gradient(${130 + i * 35}deg, hsl(var(--deep)), hsl(var(--${item.accent}) / 0.05))`,
              }}
            >
              <div className="absolute top-3 left-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-px" style={{ background: `hsl(var(--${item.accent}) / 0.4)` }} />
                <div className="w-px h-full" style={{ background: `hsl(var(--${item.accent}) / 0.4)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Studio.displayName = 'Studio';
export default Studio;
