import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useDanverseStore } from '@/store/useDanverseStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { staggerContainerFast, fadeUp } from '@/lib/animations';
import danverseLogo from '@/assets/danverse-logo.webp';

const navLinks = [
  { label: 'Work', href: '#works' },
  { label: 'Services', href: '#craft' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
  { label: 'Journal', href: '#journal' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const activeSection = useDanverseStore((s) => s.activeSection);
  const isMobileMenuOpen = useDanverseStore((s) => s.isMobileMenuOpen);
  const setMobileMenuOpen = useDanverseStore((s) => s.setMobileMenuOpen);
  const { playClick } = useSoundEffects();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (y) => {
      const diff = y - lastScrollY;
      setIsScrolled(y > 60);
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
        className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-16"
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between py-5 transition-all duration-500"
          style={{ borderBottom: isScrolled ? '1px solid hsl(var(--white-10))' : '1px solid transparent' }}
        >
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-2"
          >
            <img src={danverseLogo} alt="Danverse" className="h-8 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="relative font-body text-[12px] tracking-wide transition-colors duration-300"
                style={{ color: activeSection === link.href.replace('#', '') ? 'hsl(var(--foreground))' : 'hsl(var(--white-30))' }}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: 'hsl(var(--coral))' }} layoutId="nav-indicator" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hidden md:flex items-center gap-2 font-mono-brand text-[9px] uppercase tracking-[0.25em]"
              style={{ color: 'hsl(var(--coral))' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: 'hsl(var(--coral))' }} />
              Get in touch
            </a>
            <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              <motion.span className="w-5 h-px block" style={{ backgroundColor: 'hsl(var(--foreground))' }} animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 3 : 0 }} />
              <motion.span className="w-5 h-px block" style={{ backgroundColor: 'hsl(var(--foreground))' }} animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3 : 0 }} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="fixed inset-0 z-[199] flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--void) / 0.98)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div variants={staggerContainerFast} initial="hidden" animate="visible" className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.a key={link.href} href={link.href} variants={fadeUp} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="font-display italic text-3xl" style={{ color: 'hsl(var(--foreground))' }}>
                  {link.label}
                </motion.a>
              ))}
              <motion.a href="#contact" variants={fadeUp} onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} className="font-mono-brand text-[10px] uppercase tracking-[0.25em] mt-4" style={{ color: 'hsl(var(--coral))' }}>
                Get in touch
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
