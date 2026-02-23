import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { forwardRef } from 'react';

const phases = [
  {
    num: '01', label: 'Diagnose', title: 'The question your brief forgot.',
    description: 'Deep immersion into your brand DNA. We challenge assumptions and uncover the real problem worth solving.',
    deliverables: ['Brand Audit', 'Audience Mapping', 'Competitive Landscape', 'Strategic Brief'],
    duration: '1–2 weeks', accent: 'cream',
  },
  {
    num: '02', label: 'Architect', title: 'Systems before aesthetics.',
    description: 'We design the invisible framework that makes the visible possible.',
    deliverables: ['Brand Architecture', 'Design System', 'Content Framework', 'Tech Spec'],
    duration: '2–3 weeks', accent: 'cream',
  },
  {
    num: '03', label: 'Engineer', title: 'Craft meets computation.',
    description: 'Pixel-perfect execution powered by AI and human obsession.',
    deliverables: ['Visual Design', 'Motion System', 'Development', 'Content Production'],
    duration: '4–8 weeks', accent: 'cream',
  },
  {
    num: '04', label: 'Launch', title: 'Not delivered. Deployed.',
    description: "We deploy, monitor, optimize, and iterate until the numbers tell us to stop.",
    deliverables: ['Deployment', 'Analytics', 'A/B Testing', 'Optimization'],
    duration: '1–2 weeks', accent: 'cream',
  },
];

const Process = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="process"
      className="relative py-32 md:py-48 px-6 md:px-20 lg:px-28"
      style={{ background: 'linear-gradient(180deg, hsl(225 40% 6%), hsl(220 30% 8%))' }}
    >
      {/* Giant outlined number */}
      <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-display-alt font-extrabold"
          style={{
            fontSize: 'clamp(12rem, 35vw, 35rem)',
            WebkitTextStroke: '2px hsl(var(--coral) / 0.06)',
            WebkitTextFillColor: 'transparent',
            lineHeight: 0.8,
          }}
        >
          04
        </span>
      </div>

      <motion.div ref={inViewRef} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-24">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Process
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.2)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
          <span className="font-script italic font-light tracking-[0.01em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--cream))' }}>
            How we
          </span>
          <span className="font-display-alt font-extrabold uppercase tracking-[-0.04em]" style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            WebkitTextStroke: '2px hsl(var(--coral) / 0.5)',
            WebkitTextFillColor: 'transparent',
          }}>
            THINK
          </span>
        </motion.h2>
      </motion.div>

      <div>
        {phases.map((phase, i) => (
          <PhaseRow key={phase.num} phase={phase} index={i} />
        ))}
        <div className="border-t" style={{ borderColor: 'hsl(var(--white-10))' }} />
      </div>
    </section>
  );
});

Process.displayName = 'Process';

function PhaseRow({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const { ref, isInView } = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      className="group relative border-t grid grid-cols-1 md:grid-cols-[120px_1fr_1.5fr] gap-6 md:gap-12 py-10 md:py-14 items-start"
      style={{ borderColor: 'hsl(var(--white-10))' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex md:flex-col items-baseline md:items-start gap-3">
        <span className="font-script italic text-5xl md:text-6xl transition-colors duration-500" style={{ color: 'hsl(var(--coral) / 0.2)' }}>
          {phase.num}
        </span>
        <span className="font-mono-brand text-[9px] uppercase tracking-[0.25em]" style={{ color: 'hsl(var(--coral) / 0.6)' }}>
          {phase.label}
        </span>
      </div>

      <div>
        <h3 className="font-script italic text-2xl md:text-3xl leading-[1.2] transition-colors duration-500 group-hover:text-foreground" style={{ color: 'hsl(var(--cream) / 0.8)' }}>
          {phase.title}
        </h3>
        <p className="text-[12px] leading-[1.9] mt-3 max-w-sm" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
          {phase.description}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {phase.deliverables.map((d) => (
            <span key={d} className="flex items-center gap-2 text-[11px]" style={{ color: 'hsl(var(--cream) / 0.5)' }}>
              <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
              {d}
            </span>
          ))}
        </div>
        <span className="font-mono-brand text-[9px] tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--cream) / 0.25)' }}>
          {phase.duration}
        </span>
      </div>
    </motion.div>
  );
}

export default Process;
