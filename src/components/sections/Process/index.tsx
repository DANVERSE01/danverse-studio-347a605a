import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { forwardRef } from 'react';

const phases = [
  {
    num: '01',
    label: 'Diagnose',
    title: 'The question your brief forgot.',
    description: 'Deep immersion into your brand, audience, and competitive landscape. We uncover the real problem before proposing solutions.',
    deliverables: ['Brand Audit', 'Audience Research', 'Competitive Analysis', 'Strategic Brief'],
    time: '1–2 weeks',
  },
  {
    num: '02',
    label: 'Architect',
    title: 'Systems before aesthetics.',
    description: 'We design the system that makes the creative possible. Brand architecture, content frameworks, and technical specifications.',
    deliverables: ['Brand Architecture', 'Design System', 'Content Strategy', 'Technical Spec'],
    time: '2–3 weeks',
  },
  {
    num: '03',
    label: 'Engineer',
    title: 'Craft meets computation.',
    description: 'Pixel-level execution powered by AI tools and human intuition. Every asset, every interaction, every frame — built with obsessive precision.',
    deliverables: ['Visual Design', 'Motion Design', 'Development', 'Content Production'],
    time: '4–8 weeks',
  },
  {
    num: '04',
    label: 'Launch',
    title: 'Not delivered. Deployed.',
    description: 'We don\'t hand off and disappear. We deploy, monitor, optimize, and iterate. Your brand enters the world with full system support.',
    deliverables: ['Deployment', 'Performance Monitoring', 'A/B Testing', 'Optimization'],
    time: '1–2 weeks',
  },
];

const Process = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);

  return (
    <section ref={ref} id="process" className="py-32 md:py-40 px-6 md:px-12 lg:px-16">
      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-20"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Process
          </span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display font-normal italic tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(var(--foreground))' }}
        >
          How we think
        </motion.h2>
      </motion.div>

      <div className="space-y-0">
        {phases.map((phase, i) => (
          <PhaseBlock key={phase.num} phase={phase} index={i} />
        ))}
      </div>
    </section>
  );
});

Process.displayName = 'Process';

function PhaseBlock({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const { ref, isInView } = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      className="border-t py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16"
      style={{ borderColor: 'hsl(var(--white-10))' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left */}
      <div className="flex gap-6 items-start">
        <span
          className="font-display text-7xl md:text-8xl font-normal italic leading-none transition-colors duration-700"
          style={{
            color: isInView ? 'hsl(var(--amber) / 0.15)' : 'transparent',
            WebkitTextStroke: isInView ? 'none' : '1px hsl(var(--white-10))',
          }}
        >
          {phase.num}
        </span>
        <div>
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase block mb-2" style={{ color: 'hsl(var(--amber))' }}>
            {phase.label}
          </span>
          <h3
            className="font-display font-normal italic text-2xl md:text-3xl"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {phase.title}
          </h3>
        </div>
      </div>

      {/* Right */}
      <div>
        <p className="text-sm leading-[1.8] mb-6" style={{ color: 'hsl(var(--white-30))' }}>
          {phase.description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          {phase.deliverables.map((d) => (
            <span key={d} className="flex items-center gap-2 text-xs" style={{ color: 'hsl(var(--white-30))' }}>
              <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--amber) / 0.5)' }} />
              {d}
            </span>
          ))}
        </div>
        <span className="font-mono-brand text-[10px] tracking-wider uppercase" style={{ color: 'hsl(var(--amber) / 0.4)' }}>
          {phase.time}
        </span>
      </div>
    </motion.div>
  );
}

export default Process;
