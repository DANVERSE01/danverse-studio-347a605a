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
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      <WebGLFallback />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-vignette)' }}
      />

      {/* Content — editorial bottom-aligned */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        {/* Top eyebrow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px" style={{ background: 'hsl(var(--amber))' }} />
            <span
              className="font-mono-brand text-[10px] md:text-xs tracking-[0.25em] uppercase"
              style={{ color: 'hsl(var(--amber))' }}
            >
              Creative Studio — Cairo × Global
            </span>
          </div>
        </motion.div>

        {/* Main headline — massive serif */}
        <motion.h1
          className="flex flex-col gap-0 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ lineHeight: 0.85 }}
        >
          {[
            { text: 'We craft', italic: true, accent: false },
            { text: 'cinematic', italic: false, accent: true },
            { text: 'universes.', italic: false, accent: false },
          ].map((line, i) => (
            <motion.span
              key={i}
              variants={heroWord}
              className={`font-display font-black tracking-[-0.03em] ${
                line.italic ? 'italic font-normal' : ''
              }`}
              style={{
                fontSize: 'var(--text-hero)',
                color: line.accent ? 'hsl(var(--amber))' : 'hsl(var(--foreground))',
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Bottom row: tagline + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            className="font-body text-base md:text-lg max-w-sm leading-relaxed"
            style={{ color: 'hsl(var(--white-60))' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            AI-powered creative studio engineering brands that exist beyond screens.
          </motion.p>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <MagneticButton
              className="group"
              onClick={() => {
                document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <NeonBorder>
                <span
                  className="font-heading font-medium text-sm tracking-wide px-8 py-4 flex items-center gap-3"
                  style={{ color: 'hsl(var(--amber))' }}
                  onMouseEnter={() => setCursorVariant('cta')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Explore Work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path
                      d="M4 12L12 4M12 4H5M12 4v7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </NeonBorder>
            </MagneticButton>

            <button
              className="flex items-center gap-3 font-heading text-sm transition-colors duration-300 hover:text-foreground"
              style={{ color: 'hsl(var(--white-30))' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: 'hsl(var(--amber) / 0.2)' }}
              >
                <span className="absolute inset-0 rounded-full animate-pulse-glow" />
                <svg width="10" height="12" viewBox="0 0 10 12" fill="hsl(var(--amber))">
                  <path d="M0 0v12l10-6z" />
                </svg>
              </span>
              Showreel
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
