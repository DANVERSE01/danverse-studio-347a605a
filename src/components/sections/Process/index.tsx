import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';
import { forwardRef } from 'react';

const phases = [
  {
    num: '01',
    label: 'DIAGNOSE',
    title: 'We ask the question your brief forgot',
    description: 'Deep immersion into your brand, audience, and competitive landscape. We uncover the real problem before proposing solutions.',
    deliverables: ['Brand Audit', 'Audience Research', 'Competitive Analysis', 'Strategic Brief'],
    time: '1–2 weeks',
  },
  {
    num: '02',
    label: 'ARCHITECT',
    title: 'Systems before aesthetics',
    description: 'We design the system that makes the creative possible. Brand architecture, content frameworks, and technical specifications.',
    deliverables: ['Brand Architecture', 'Design System', 'Content Strategy', 'Technical Spec'],
    time: '2–3 weeks',
  },
  {
    num: '03',
    label: 'ENGINEER',
    title: 'Where craft meets computation',
    description: 'Pixel-level execution powered by AI tools and human intuition. Every asset, every interaction, every frame — built with obsessive precision.',
    deliverables: ['Visual Design', 'Motion Design', 'Development', 'Content Production'],
    time: '4–8 weeks',
  },
  {
    num: '04',
    label: 'LAUNCH',
    title: 'Not delivered. Deployed.',
    description: 'We don\'t hand off and disappear. We deploy, monitor, optimize, and iterate. Your brand enters the world with full system support.',
    deliverables: ['Deployment', 'Performance Monitoring', 'A/B Testing', 'Ongoing Optimization'],
    time: '1–2 weeks',
  },
];

const Process = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.05);

  return (
    <section ref={ref} id="process" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        ref={inViewRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4"
          style={{ color: 'hsl(var(--cyan))' }}
        >
          / 05 PROCESS
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="font-display font-black tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'hsl(var(--foreground))' }}
        >
          How We Think
        </motion.h2>
      </motion.div>

      <div className="space-y-32">
        {phases.map((phase, i) => (
          <PhaseBlock key={phase.num} phase={phase} index={i} />
        ))}
      </div>
    </section>
  );
});

Process.displayName = 'Process';

function PhaseBlock({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Phase number */}
      <div className="flex flex-col">
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            WebkitTextStroke: isInView ? '0px' : '1px hsl(var(--white-10))',
            color: isInView ? 'hsl(var(--foreground)/0.1)' : 'transparent',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          {phase.num}
        </span>
      </div>

      {/* Content */}
      <div>
        <span
          className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4"
          style={{ color: 'hsl(var(--cyan))' }}
        >
          / {phase.num} {phase.label}
        </span>
        <h3
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'hsl(var(--foreground))' }}
        >
          {phase.title}
        </h3>
        <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: 'hsl(var(--white-60))' }}>
          {phase.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-4">
          {phase.deliverables.map((d) => (
            <span
              key={d}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'hsl(var(--white-60))' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--cyan))' }} />
              {d}
            </span>
          ))}
        </div>

        <span
          className="glass rounded-full px-4 py-1.5 text-xs font-heading inline-block"
          style={{ color: 'hsl(var(--white-60))' }}
        >
          {phase.time}
        </span>
      </div>
    </motion.div>
  );
}

export default Process;
