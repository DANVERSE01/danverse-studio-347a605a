import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type DividerVariant = 'morph-wave' | 'expanding-line' | 'diamond' | 'orbiting-dots' | 'gradient-wipe';

interface SectionDividerProps {
  variant?: DividerVariant;
  accent?: string;
  className?: string;
}

export default function SectionDivider({ variant = 'morph-wave', accent = 'coral', className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ height: 120 }}>
      {variant === 'morph-wave' && <MorphWave progress={progress} accent={accent} />}
      {variant === 'expanding-line' && <ExpandingLine progress={progress} accent={accent} />}
      {variant === 'diamond' && <Diamond progress={progress} accent={accent} />}
      {variant === 'orbiting-dots' && <OrbitingDots progress={progress} accent={accent} />}
      {variant === 'gradient-wipe' && <GradientWipe progress={progress} accent={accent} />}
    </div>
  );
}

function MorphWave({ progress, accent }: { progress: any; accent: string }) {
  const d1 = 'M0,60 C200,60 300,60 500,60 C700,60 800,60 1000,60';
  const d2 = 'M0,60 C200,20 300,100 500,40 C700,90 800,30 1000,60';

  const path = useTransform(progress, [0, 0.5, 1], [d1, d2, d1]);

  return (
    <svg viewBox="0 0 1000 120" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <motion.path
        d={path}
        fill="none"
        stroke={`hsl(var(--${accent}) / 0.15)`}
        strokeWidth="1"
      />
      <motion.path
        d={path}
        fill="none"
        stroke={`hsl(var(--${accent}) / 0.06)`}
        strokeWidth="1"
        style={{ translateY: 10 }}
      />
    </svg>
  );
}

function ExpandingLine({ progress, accent }: { progress: any; accent: string }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 1, 0.6]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="h-px origin-center"
        style={{
          width: '80%',
          scaleX,
          opacity,
          background: `linear-gradient(90deg, transparent, hsl(var(--${accent}) / 0.3), transparent)`,
        }}
      />
      {/* Center dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: `hsl(var(--${accent}))`,
          scale: useTransform(progress, [0.3, 0.6], [0, 1]),
          opacity: useTransform(progress, [0.3, 0.5, 0.8], [0, 1, 0.4]),
        }}
      />
    </div>
  );
}

function Diamond({ progress, accent }: { progress: any; accent: string }) {
  const rotate = useTransform(progress, [0, 1], [45, 225]);
  const scale = useTransform(progress, [0, 0.5, 1], [0, 1, 0.8]);
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0.2]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border"
        style={{
          borderColor: `hsl(var(--${accent}) / 0.2)`,
          rotate,
          scale,
          opacity,
        }}
      />
      <motion.div
        className="absolute w-4 h-4 border"
        style={{
          borderColor: `hsl(var(--${accent}) / 0.1)`,
          rotate: useTransform(progress, [0, 1], [0, -180]),
          scale: useTransform(progress, [0.1, 0.6], [0, 1]),
          opacity,
        }}
      />
    </div>
  );
}

function OrbitingDots({ progress, accent }: { progress: any; accent: string }) {
  const rotation = useTransform(progress, [0, 1], [0, 360]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative w-16 h-16"
        style={{ rotate: rotation }}
      >
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsl(var(--${accent}) / 0.4)`,
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(32px) translate(-50%, -50%)`,
              scale: useTransform(progress, [0.1, 0.5], [0, 1]),
            }}
          />
        ))}
      </motion.div>
      {/* Center line extensions */}
      <motion.div
        className="absolute h-px"
        style={{
          width: useTransform(progress, [0.2, 0.8], ['0%', '60%']),
          background: `linear-gradient(90deg, transparent, hsl(var(--${accent}) / 0.08), transparent)`,
        }}
      />
    </div>
  );
}

function GradientWipe({ progress, accent }: { progress: any; accent: string }) {
  const x = useTransform(progress, [0, 1], ['-100%', '100%']);

  return (
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-px relative overflow-hidden" style={{ background: `hsl(var(--${accent}) / 0.04)` }}>
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            x,
            background: `linear-gradient(90deg, transparent, hsl(var(--${accent}) / 0.3), transparent)`,
          }}
        />
      </div>
    </div>
  );
}
