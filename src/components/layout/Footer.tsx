import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const socials = [
  { name: 'LI', url: '#' },
  { name: 'IG', url: '#' },
  { name: 'BE', url: '#' },
  { name: 'GH', url: '#' },
];

export default function Footer() {
  const { ref, isInView } = useInView(0.1);

  return (
    <footer className="relative pt-32 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Large ghosted text */}
      <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <motion.span
          className="font-display italic block text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 22vw, 24rem)',
            color: 'hsl(var(--foreground) / 0.02)',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          Danverse
        </motion.span>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">
        {/* Main footer content */}
        <div className="border-t py-16 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12" style={{ borderColor: 'hsl(var(--white-10))' }}>
          {/* Brand */}
          <div>
            <span className="font-heading font-semibold text-sm tracking-[0.1em] uppercase block mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Danverse
            </span>
            <p className="text-xs leading-relaxed max-w-xs mb-6" style={{ color: 'hsl(var(--white-30))' }}>
              AI-powered creative studio crafting cinematic brands at the intersection of technology and culture.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="font-mono-brand text-[10px] uppercase tracking-wider transition-colors duration-300 hover:text-amber"
                  style={{ color: 'hsl(var(--white-30))' }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {['Work', 'Services', 'Process', 'Studio', 'Journal'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-xs transition-colors duration-300 hover:text-foreground" style={{ color: 'hsl(var(--white-30))' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {['Advertising', 'Branding', 'Digital Product', 'Motion', 'AI Systems'].map((s) => (
                <li key={s}>
                  <span className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>
              Contact
            </h4>
            <ul className="space-y-3 text-xs" style={{ color: 'hsl(var(--white-30))' }}>
              <li>hello@danverse.studio</li>
              <li>Cairo, Egypt</li>
              <li className="font-mono-brand text-[10px]" style={{ color: 'hsl(var(--white-10))' }}>GMT+2</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex items-center justify-between" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <p className="font-mono-brand text-[10px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>
            © 2025 DANVERSE
          </p>
          <p className="font-mono-brand text-[10px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>
            Made with obsession in Cairo
          </p>
        </div>
      </div>
    </footer>
  );
}
