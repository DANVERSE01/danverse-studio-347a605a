import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { forwardRef } from 'react';

const phases = [
  {
    num: '01',
    label: 'Diagnose',
    title: 'The question your brief forgot.',
    description: 'Deep immersion into your brand DNA. We challenge assumptions and uncover the real problem worth solving.',
    deliverables: ['Brand Audit', 'Audience Mapping', 'Competitive Landscape', 'Strategic Brief'],
    duration: '1–2 weeks',
    visual: '◎',
  },
  {
    num: '02',
    label: 'Architect',
    title: 'Systems before aesthetics.',
    description: 'We design the invisible framework that makes the visible possible. Architecture, strategy, and specifications.',
    deliverables: ['Brand Architecture', 'Design System', 'Content Framework', 'Tech Spec'],
    duration: '2–3 weeks',
    visual: '◇',
  },
  {
    num: '03',
    label: 'Engineer',
    title: 'Craft meets computation.',
    description: 'Pixel-perfect execution powered by AI and human obsession. Every asset built with surgical precision.',
    deliverables: ['Visual Design', 'Motion System', 'Development', 'Content Production'],
    duration: '4–8 weeks',
    visual: '△',
  },
  {
    num: '04',
    label: 'Launch',
    title: 'Not delivered. Deployed.',
    description: "We don't hand off and vanish. We deploy, monitor, optimize, and iterate until the numbers tell us to stop.",
    deliverables: ['Deployment', 'Analytics', 'A/B Testing', 'Optimization'],
    duration: '1–2 weeks',
    visual: '□',
  },
];

const Process = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);

  return (
    <section ref={ref} id="process" className="relative py-32 md:py-48 px-6 md:px-16">
      <span className="absolute top-16 right-6 md:right-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        05
      </span>

      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-24"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Process
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
        </motion.div>
        <motion.h2 variants={fadeUp}>
          <span className="font-display italic block tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
            How we
          </span>
          <span className="font-heading font-bold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: 'hsl(var(--sage))' }}>
            Think
          </span>
        </motion.h2>
      </motion.div>

      {/* Phases — asymmetric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {phases.map((phase, i) => (
          <PhaseCard key={phase.num} phase={phase} index={i} />
        ))}
      </div>
    </section>
  );
});

Process.displayName = 'Process';

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const { ref, isInView } = useInView(0.3);
  const accentColors = ['coral', 'sage', 'lavender', 'coral'];
  const accent = accentColors[index];

  return (
    <motion.div
      ref={ref}
      className="relative p-8 md:p-10 group overflow-hidden"
      style={{
        background: 'hsl(var(--deep))',
        border: '1px solid hsl(var(--white-10))',
        minHeight: 340,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Large decorative symbol */}
      <span
        className="absolute top-6 right-8 text-6xl md:text-7xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
        style={{ color: `hsl(var(--${accent}) / 0.06)` }}
      >
        {phase.visual}
      </span>

      {/* Number + label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono-brand text-[10px] tabular-nums" style={{ color: `hsl(var(--${accent}) / 0.5)` }}>
          {phase.num}
        </span>
        <div className="w-4 h-px" style={{ background: `hsl(var(--${accent}) / 0.3)` }} />
        <span className="font-mono-brand text-[10px] tracking-[0.2em] uppercase" style={{ color: `hsl(var(--${accent}))` }}>
          {phase.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display italic text-2xl md:text-3xl mb-4" style={{ color: 'hsl(var(--foreground))' }}>
        {phase.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] leading-[1.8] mb-6 max-w-sm" style={{ color: 'hsl(var(--white-30))' }}>
        {phase.description}
      </p>

      {/* Deliverables */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
        {phase.deliverables.map((d) => (
          <span key={d} className="flex items-center gap-2 text-[11px]" style={{ color: 'hsl(var(--white-30))' }}>
            <span className="w-1 h-1 rounded-full" style={{ background: `hsl(var(--${accent}) / 0.4)` }} />
            {d}
          </span>
        ))}
      </div>

      {/* Duration */}
      <span className="font-mono-brand text-[9px] tracking-[0.2em] uppercase" style={{ color: `hsl(var(--${accent}) / 0.3)` }}>
        {phase.duration}
      </span>

      {/* Bottom line that grows on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700" style={{ background: `hsl(var(--${accent}) / 0.3)` }} />
    </motion.div>
  );
}

export default Process;
