import { motion } from 'framer-motion';
import { staggerContainer, heroWord } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import NeonBorder from '@/components/ui/NeonBorder';
import HeroGrid from './HeroGrid';
import HeroScrollIndicator from './HeroScrollIndicator';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const Hero = forwardRef<HTMLElement>((_, ref) => {
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden"
    >
      <HeroGrid />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-vignette)' }} />

      {/* Left vertical label */}
      <motion.div
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-vertical font-mono-brand text-[9px] tracking-[0.4em] uppercase" style={{ color: 'hsl(var(--white-10))' }}>
          Danverse Creative Studio © 2025
        </span>
      </motion.div>

      {/* Right side */}
      <motion.div
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-end gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono-brand text-[9px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--sage))' }}>
            30.0444° N
          </span>
          <span className="font-mono-brand text-[9px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--white-10))' }}>
            31.2357° E
          </span>
        </div>
        <div className="w-px h-12" style={{ background: 'hsl(var(--coral) / 0.1)' }} />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: 'hsl(var(--sage))' }} />
          <span className="font-mono-brand text-[9px] tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--white-10))' }}>
            Available
          </span>
        </div>
      </motion.div>

      {/* Top spacer */}
      <div className="pt-32" />

      {/* Center headline */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-20 lg:px-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className="flex items-center gap-4 mb-6" variants={heroWord}>
            <motion.div
              className="h-px origin-left"
              style={{ background: 'hsl(var(--coral))' }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="font-mono-brand text-[10px] tracking-[0.4em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Creative Studio / Cairo
            </span>
          </motion.div>

          {/* Line 1: Script "We" + huge outlined "CRAFT" */}
          <div className="flex items-baseline gap-4 md:gap-6 flex-wrap">
            <motion.span
              variants={heroWord}
              className="font-script italic font-light shimmer-text"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              We
            </motion.span>
            <motion.span
              variants={heroWord}
              className="font-display-alt font-extrabold uppercase tracking-[-0.05em] shimmer-stroke"
              style={{
                fontSize: 'clamp(4rem, 13vw, 14rem)',
                WebkitTextStroke: '2px hsl(var(--coral))',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CRAFT
            </motion.span>
          </div>

          {/* Line 2: "cinematic" in script + filled "WORLDS" */}
          <div className="flex items-baseline gap-3 md:gap-6 flex-wrap -mt-2 md:-mt-6">
            <motion.span
              variants={heroWord}
              className="font-script italic font-light shimmer-text"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              cinematic
            </motion.span>
            <motion.span
              variants={heroWord}
              className="font-display-alt font-extrabold uppercase tracking-[-0.04em]"
              style={{ fontSize: 'clamp(4rem, 13vw, 14rem)', color: 'hsl(var(--coral))' }}
            >
              WORLDS
            </motion.span>
          </div>

          {/* Line 3 */}
          <motion.div className="flex items-center gap-6 mt-4 md:mt-2" variants={heroWord}>
            <span className="font-script italic text-lg md:text-xl" style={{ color: 'hsl(var(--cream) / 0.25)' }}>
              that feel inevitable.
            </span>
            <svg className="w-6 h-6 animate-rotate-slow opacity-20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L22 12L12 22L2 12Z" stroke="hsl(var(--coral))" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 w-full px-6 md:px-20 lg:px-28 pb-8 md:pb-12">
        <div className="border-t pt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <motion.p
            className="font-body text-[12px] max-w-[280px] leading-[1.9]"
            style={{ color: 'hsl(var(--cream) / 0.3)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            AI-powered creative studio engineering brands at the intersection of technology, culture & obsessive craft.
          </motion.p>

          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.7 }}
          >
            <MagneticButton
              className="group"
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <NeonBorder>
                <span
                  className="font-heading font-medium text-[11px] tracking-[0.15em] uppercase px-8 py-4 flex items-center gap-4"
                  style={{ color: 'hsl(var(--coral))' }}
                  onMouseEnter={() => setCursorVariant('cta')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Explore Work
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </NeonBorder>
            </MagneticButton>

            <button
              className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 group"
              style={{ color: 'hsl(var(--cream) / 0.3)' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:border-sage" style={{ borderColor: 'hsl(var(--sage) / 0.15)' }}>
                <span className="w-0 h-0 border-l-[5px] border-l-[hsl(var(--sage))] border-y-[3px] border-y-transparent ml-0.5" />
              </span>
              <span className="group-hover:text-foreground transition-colors duration-300">Showreel</span>
            </button>
          </motion.div>
        </div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
