import { motion } from 'framer-motion';
import { staggerContainer, heroWord } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import NeonBorder from '@/components/ui/NeonBorder';
import WebGLFallback from './WebGLFallback';
import HeroScrollIndicator from './HeroScrollIndicator';
import { useDanverseStore } from '@/store/useDanverseStore';
import { forwardRef } from 'react';

const Hero = forwardRef<HTMLElement>((_, ref) => {
  const setCursorVariant = useDanverseStore((s) => s.setCursorVariant);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
    >
      <WebGLFallback />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-vignette)' }} />

      {/* Top right — studio info */}
      <motion.div
        className="absolute top-24 right-6 md:right-16 z-10 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono-brand text-[9px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--sage))' }}>
            Based in Cairo
          </span>
          <span className="font-mono-brand text-[9px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--white-30))' }}>
            Working Globally
          </span>
          <div className="w-8 h-px mt-2" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
        </div>
      </motion.div>

      {/* Decorative number */}
      <motion.span
        className="absolute top-[30%] left-6 md:left-16 section-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        01
      </motion.span>

      {/* Main content */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
        {/* Eyebrow */}
        <motion.div
          className="mb-4 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="w-10 h-px" style={{ background: 'hsl(var(--coral))' }} />
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Creative Studio
          </span>
        </motion.div>

        {/* Massive headline — mixed weights */}
        <motion.h1
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ lineHeight: 0.88 }}
        >
          <motion.span
            variants={heroWord}
            className="font-display italic font-normal block tracking-[-0.02em]"
            style={{ fontSize: 'var(--text-hero)', color: 'hsl(var(--foreground))' }}
          >
            We craft
          </motion.span>
          <motion.span
            variants={heroWord}
            className="font-heading font-bold block tracking-[-0.04em] uppercase"
            style={{ fontSize: 'clamp(3rem, 11vw, 12rem)', color: 'hsl(var(--coral))' }}
          >
            Cinematic
          </motion.span>
          <motion.span
            variants={heroWord}
            className="font-display italic font-normal block tracking-[-0.02em]"
            style={{ fontSize: 'var(--text-hero)', color: 'hsl(var(--foreground))' }}
          >
            universes.
          </motion.span>
        </motion.h1>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t pt-8" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <motion.p
            className="font-body text-[13px] max-w-xs leading-[1.8]"
            style={{ color: 'hsl(var(--white-30))' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            AI-powered creative studio building brands that exist beyond screens — at the intersection of technology, culture, and craft.
          </motion.p>

          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <MagneticButton
              className="group"
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <NeonBorder>
                <span
                  className="font-heading font-medium text-[12px] tracking-[0.1em] uppercase px-8 py-4 flex items-center gap-4"
                  style={{ color: 'hsl(var(--coral))' }}
                  onMouseEnter={() => setCursorVariant('cta')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  View Work
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </NeonBorder>
            </MagneticButton>

            <button
              className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 group"
              style={{ color: 'hsl(var(--white-30))' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: 'hsl(var(--sage) / 0.25)' }}>
                <span className="w-0 h-0 border-l-[5px] border-l-[hsl(var(--sage))] border-y-[3px] border-y-transparent ml-0.5" />
              </span>
              <span className="group-hover:text-foreground transition-colors duration-300">Reel</span>
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
