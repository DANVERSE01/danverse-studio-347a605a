import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useDanverseStore } from '@/store/useDanverseStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import MagneticButton from '@/components/ui/MagneticButton';
import { staggerContainerFast, fadeUp } from '@/lib/animations';

const navLinks = [
  { label: 'Work', href: '#works' },
  { label: 'Craft', href: '#craft' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
  { label: 'Journal', href: '#journal' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const activeSection = useDanverseStore((s) => s.activeSection);
  const isMobileMenuOpen = useDanverseStore((s) => s.isMobileMenuOpen);
  const setMobileMenuOpen = useDanverseStore((s) => s.setMobileMenuOpen);
  const isSoundEnabled = useDanverseStore((s) => s.isSoundEnabled);
  const toggleSound = useDanverseStore((s) => s.toggleSound);
  const { playClick } = useSoundEffects();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (y) => {
      const diff = y - lastScrollY;
      setIsScrolled(y > 80);
      if (diff > 10 && y > 200) setIsVisible(false);
      else if (diff < -5) setIsVisible(true);
      setLastScrollY(y);
    });
  }, [scrollY, lastScrollY]);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
    playClick();
  }, [setMobileMenuOpen, playClick]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] px-6 md:px-12 py-4"
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        style={{
          backgroundColor: isScrolled ? 'hsl(var(--abyss)/0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="font-display font-black text-lg tracking-tight group"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {'DANVERSE'.split('').map((l, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 group-hover:rotate-[var(--r)]"
                style={{ '--r': `${(Math.random() - 0.5) * 10}deg` } as React.CSSProperties}
              >
                {l}
              </span>
            ))}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="relative font-heading text-sm transition-colors duration-300 hover:text-foreground"
                style={{
                  color: activeSection === link.href.replace('#', '')
                    ? 'hsl(var(--foreground))'
                    : 'hsl(var(--white-60))',
                }}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--cyan))' }}
                    layoutId="nav-dot"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
              style={{ color: isSoundEnabled ? 'hsl(var(--cyan))' : 'hsl(var(--white-30))' }}
              aria-label={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5.5h2.5L8 2v12l-3.5-3.5H2V5.5z" />
                {isSoundEnabled && (
                  <>
                    <path d="M11 5.5a3 3 0 010 5" />
                    <path d="M13 3.5a6 6 0 010 9" />
                  </>
                )}
                {!isSoundEnabled && <path d="M11 5l4 6M15 5l-4 6" />}
              </svg>
            </button>

            {/* CTA */}
            <div className="hidden md:block">
              <MagneticButton
                className="glass rounded-full px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider"
                onClick={() => scrollTo('#contact')}
              >
                <span style={{ color: 'hsl(var(--cyan))' }}>Start a Project</span>
              </MagneticButton>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-5 h-px block"
                style={{ backgroundColor: 'hsl(var(--foreground))' }}
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 3 : 0 }}
              />
              <motion.span
                className="w-5 h-px block"
                style={{ backgroundColor: 'hsl(var(--foreground))' }}
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3 : 0 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[calc(var(--z-sticky)-1)] flex items-center justify-center"
            style={{ backgroundColor: 'hsl(var(--void)/0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={fadeUp}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="font-display font-bold text-3xl"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                variants={fadeUp}
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="font-display font-bold text-3xl"
                style={{ color: 'hsl(var(--cyan))' }}
              >
                Contact
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
