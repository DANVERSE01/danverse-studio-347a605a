import { forwardRef, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import imgMetamorphosis from '@/assets/works/metamorphosis.jpg';
import imgVoidArchitecture from '@/assets/works/void-architecture.jpg';
import imgPrismReality from '@/assets/works/prism-reality.jpg';
import imgQuantumBrand from '@/assets/works/quantum-brand.jpg';

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
      <span className="font-script italic tabular-nums" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: 'hsl(var(--cream))' }}>
        {count}
      </span>
      <span className="font-script italic text-xl md:text-2xl" style={{ color: 'hsl(var(--coral))' }}>
        {suffix}
      </span>
    </span>
  );
}

const studioImages = [
  { src: imgMetamorphosis, accent: 'coral' },
  { src: imgVoidArchitecture, accent: 'sage' },
  { src: imgPrismReality, accent: 'lavender' },
  { src: imgQuantumBrand, accent: 'coral' },
];

const Studio = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="studio"
      className="relative py-32 md:py-48 px-6 md:px-20 lg:px-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--section-olive)) 0%, hsl(80 15% 8%) 50%, hsl(var(--section-olive)) 100%)',
      }}
    >
      {/* Giant background text */}
      <div className="absolute bottom-8 left-8 pointer-events-none select-none">
        <span className="font-display-alt font-extrabold uppercase" style={{
          fontSize: 'clamp(6rem, 18vw, 18rem)', color: 'hsl(var(--sage) / 0.04)', lineHeight: 0.85,
        }}>WE<br/>ARE</span>
      </div>

      <div ref={containerRef}>
        <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--sage))' }}>Studio</span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--sage) / 0.25)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-24 flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-script italic font-light tracking-[0.01em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--cream))' }}>Behind the</span>
            <span className="font-display-alt font-extrabold uppercase tracking-[-0.04em]" style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              background: 'linear-gradient(135deg, hsl(var(--sage)), hsl(100 20% 65%))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>CURTAIN</span>
          </motion.h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-32 border-t border-b py-16" style={{ borderColor: 'hsl(var(--sage) / 0.1)' }}>
          {[
            { end: 12, suffix: '+', label: 'Creatives' },
            { end: 4, suffix: '', label: 'Countries' },
            { end: 0, suffix: '', label: 'Templates' },
          ].map((stat) => (
            <div key={stat.label}>
              <CounterUp end={stat.end} suffix={stat.suffix} />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-px" style={{ background: 'hsl(var(--sage) / 0.4)' }} />
                <p className="font-mono-brand text-[9px] uppercase tracking-[0.25em]" style={{ color: 'hsl(var(--cream) / 0.4)' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Split: philosophy + image grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <p className="font-script italic text-3xl md:text-4xl leading-[1.3] mb-8" style={{ color: 'hsl(var(--cream))' }}>
              We are not an agency.
              <br />
              <span style={{
                background: 'linear-gradient(90deg, hsl(var(--sage)), hsl(100 20% 65%))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>We are a system.</span>
            </p>
            <p className="text-[13px] leading-[1.9] mb-10 max-w-md" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
              12 humans obsessed with the future of communication, operating at the intersection of technology and culture. No templates. No shortcuts. Only intentional work.
            </p>
            <button className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.2em] group transition-colors duration-300" style={{ color: 'hsl(var(--sage))' }}>
              <span className="w-8 h-px transition-all duration-500 group-hover:w-12" style={{ background: 'hsl(var(--sage) / 0.5)' }} />
              Join the studio
            </button>
          </div>

          {/* Image grid with parallax */}
          <motion.div className="grid grid-cols-2 gap-3" style={{ y: parallaxY }}>
            {studioImages.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden group relative cursor-pointer"
                style={{ height: i % 2 === 0 ? 300 : 220 }}
              >
                <motion.img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: `linear-gradient(180deg, transparent 50%, hsl(var(--${item.accent}) / 0.15) 100%)` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1px hsl(var(--${item.accent}) / 0.3)` }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Studio.displayName = 'Studio';
export default Studio;
