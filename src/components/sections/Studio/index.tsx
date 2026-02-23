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
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-display font-black tabular-nums" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}>
      {count}{suffix}
    </span>
  );
}

const Studio = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="studio" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        <motion.span variants={fadeUp} className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: 'hsl(var(--cyan))' }}>
          / 07 STUDIO
        </motion.span>
        <motion.h2 variants={fadeUp} className="font-display font-black tracking-tight mb-16" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'hsl(var(--foreground))' }}>
          Behind the Curtain
        </motion.h2>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-center">
        {[
          { end: 12, suffix: '+', label: 'Creatives' },
          { end: 4, suffix: '', label: 'Countries' },
          { end: 0, suffix: '', label: 'Templates' },
        ].map((stat) => (
          <div key={stat.label}>
            <CounterUp end={stat.end} suffix={stat.suffix} />
            <p className="font-heading text-sm mt-2 uppercase tracking-wider" style={{ color: 'hsl(var(--white-60))' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Philosophy + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(var(--white-60))' }}>
            We are not an agency. We are a system. 12 humans obsessed with the future of communication,
            operating at the intersection of technology and culture.
          </p>
          <button
            className="glass rounded-full px-6 py-3 text-sm font-heading transition-all duration-300 hover:border-cyan/30"
            style={{ color: 'hsl(var(--white-60))' }}
          >
            Join the studio →
          </button>
        </div>
        <div className="columns-2 gap-4">
          {[280, 380, 240].map((h, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden mb-4 break-inside-avoid gradient-border transition-all duration-500 grayscale hover:grayscale-0"
              style={{
                height: h,
                background: `linear-gradient(${120 + i * 40}deg, hsl(var(--deep)), hsl(var(--surface)))`,
                border: '1px solid hsl(var(--border))',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-2xl font-black" style={{ color: 'hsl(var(--white-10))' }}>
                  DANVERSE
                </span>
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
