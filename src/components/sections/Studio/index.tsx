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
    const duration = 1800;
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
    <span ref={ref}>
      <span className="font-display italic tabular-nums" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'hsl(var(--foreground))' }}>
        {count}
      </span>
      <span className="font-display italic text-2xl md:text-3xl" style={{ color: 'hsl(var(--amber))' }}>
        {suffix}
      </span>
    </span>
  );
}

const Studio = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="studio" className="py-32 md:py-40 px-6 md:px-12 lg:px-16">
      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Studio
          </span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-display font-normal italic tracking-tight mb-20" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}>
          Behind the curtain
        </motion.h2>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mb-24 border-t border-b py-12" style={{ borderColor: 'hsl(var(--white-10))' }}>
        {[
          { end: 12, suffix: '+', label: 'Creatives' },
          { end: 4, suffix: '', label: 'Countries' },
          { end: 0, suffix: '', label: 'Templates' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <CounterUp end={stat.end} suffix={stat.suffix} />
            <p className="font-mono-brand text-[10px] mt-3 uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--white-30))' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-display italic text-2xl md:text-3xl leading-[1.4] mb-8" style={{ color: 'hsl(var(--foreground))' }}>
            We are not an agency.
            <br />
            We are a system.
          </p>
          <p className="text-sm leading-[1.8] mb-8 max-w-md" style={{ color: 'hsl(var(--white-30))' }}>
            12 humans obsessed with the future of communication,
            operating at the intersection of technology and culture.
            No templates. No shortcuts. Only intentional work.
          </p>
          <button
            className="font-heading text-xs uppercase tracking-[0.15em] flex items-center gap-3 transition-colors duration-300 group"
            style={{ color: 'hsl(var(--amber))' }}
          >
            Join the studio
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[320, 240, 240, 320].map((h, i) => (
            <div
              key={i}
              className="overflow-hidden transition-all duration-700 grayscale hover:grayscale-0"
              style={{
                height: h,
                background: `linear-gradient(${150 + i * 30}deg, hsl(var(--deep)), hsl(var(--surface)), hsl(var(--amber) / 0.03))`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Studio.displayName = 'Studio';
export default Studio;
