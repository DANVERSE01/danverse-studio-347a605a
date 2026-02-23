import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const socials = [
  { name: 'LinkedIn', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'Behance', url: '#' },
  { name: 'GitHub', url: '#' },
];

const navLinks = ['Work', 'Craft', 'Process', 'Studio', 'Journal', 'Contact'];

const servicesList = [
  'Cinematic Advertising',
  'AI Brand Systems',
  '3D & Immersive',
  'Digital Product Design',
  'Motion Systems',
  'UGC Pipelines',
  'AI Content OS',
];

export default function Footer() {
  const { ref, isInView } = useInView(0.1);

  return (
    <footer className="relative pt-24 pb-8 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Ghosted text */}
      <div
        className="absolute top-8 left-0 w-full overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.span
          className="font-display font-black block text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 20vw, 20rem)',
            color: 'hsl(var(--foreground)/0.03)',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.06 } : {}}
          transition={{ duration: 1 }}
        >
          DANVERSE
        </motion.span>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pt-32">
          {/* Brand */}
          <div>
            <span className="font-display font-black text-xl block mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              DANVERSE
            </span>
            <p className="text-sm mb-6" style={{ color: 'hsl(var(--white-60))' }}>
              AI-Powered Creative Studio
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="text-xs font-heading transition-colors duration-300 hover:text-cyan"
                  style={{ color: 'hsl(var(--white-30))' }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--white-30))' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors duration-300 hover:text-foreground"
                    style={{ color: 'hsl(var(--white-60))' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--white-30))' }}>
              Services
            </h4>
            <ul className="space-y-2">
              {servicesList.map((s) => (
                <li key={s}>
                  <span className="text-sm" style={{ color: 'hsl(var(--white-60))' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--white-30))' }}>
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'hsl(var(--white-60))' }}>
              <li>hello@danverse.studio</li>
              <li>+20 2 1234 5678</li>
              <li>Cairo, Egypt</li>
              <li className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>GMT+2</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <p className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>
            © 2025 DANVERSE · Made with obsession in Cairo
          </p>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: 'hsl(var(--white-10))' }}
              />
            ))}
          </div>
          <p className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
