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

  const words = [
    { text: 'WE', gradient: false },
    { text: 'ENGINEER', gradient: false },
    { text: 'CINEMATIC', gradient: true },
    { text: 'UNIVERSES', gradient: false },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <WebGLFallback />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-vignette)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 py-32">
        {/* Pre-headline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span
            className="font-mono-brand text-xs md:text-sm tracking-[0.2em] uppercase inline-flex items-center gap-1"
            style={{ color: 'hsl(var(--cyan))' }}
          >
            AI-Powered Creative Studio / Cairo × Global
            <span
              className="inline-block w-2 h-4 ml-1"
              style={{
                backgroundColor: 'hsl(var(--cyan))',
                animation: 'typewriter-cursor 1s step-end infinite',
              }}
            />
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="flex flex-col gap-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ lineHeight: 0.9 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={heroWord}
              className={`font-display font-black tracking-[-0.05em] ${
                word.gradient ? 'text-gradient' : ''
              }`}
              style={{
                fontSize: 'var(--text-hero)',
                color: word.gradient ? undefined : 'hsl(var(--foreground))',
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-8 font-heading font-light italic text-lg md:text-xl max-w-md"
          style={{ color: 'hsl(var(--gold))' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          Crafting brands that exist beyond screens
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <MagneticButton
            className="group"
            onClick={() => {
              document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <NeonBorder>
              <span
                className="text-gradient font-heading font-semibold text-sm tracking-wide px-8 py-4 flex items-center gap-3"
                onMouseEnter={() => setCursorVariant('cta')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Enter the Studio
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'hsl(var(--cyan))' }}
                  />
                </svg>
              </span>
            </NeonBorder>
          </MagneticButton>

          <button
            className="flex items-center gap-3 font-heading text-sm transition-colors duration-300 hover:text-foreground"
            style={{ color: 'hsl(var(--white-60))' }}
          >
            <span
              className="w-10 h-10 rounded-full border flex items-center justify-center animate-pulse-glow"
              style={{ borderColor: 'hsl(var(--cyan)/0.3)' }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="hsl(var(--cyan))">
                <path d="M0 0v14l12-7z" />
              </svg>
            </span>
            Watch Showreel
          </button>
        </motion.div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
