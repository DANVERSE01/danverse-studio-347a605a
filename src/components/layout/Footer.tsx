import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import danverseLogo from '@/assets/danverse-logo.webp';

const EmailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13L2 4" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

export default function Footer() {
  const { ref, isInView } = useInView(0.1);

  const nav = [
    { label: 'Work', href: '#works' },
    { label: 'Services', href: '#craft' },
    { label: 'Process', href: '#process' },
    { label: 'Studio', href: '#studio' },
    { label: 'Journal', href: '#journal' },
  ];

  return (
    <footer className="relative pt-32 pb-8 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <motion.span className="font-display italic block text-center whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 22vw, 24rem)', color: 'hsl(var(--foreground) / 0.015)' }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1.2 }}>
          Danverse
        </motion.span>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">
        <div className="border-t py-16 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <div>
            <img src={danverseLogo} alt="Danverse" className="h-10 w-auto mb-4" loading="lazy" />
            <p className="text-[12px] leading-relaxed max-w-xs mb-6" style={{ color: 'hsl(var(--white-30))' }}>AI-powered creative studio at the intersection of technology and culture.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/muhammedd_adel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono-brand text-[9px] uppercase tracking-wider transition-colors duration-300 hover:text-rose-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm" style={{ color: 'hsl(var(--white-30))', outlineColor: 'hsl(var(--rose-gold))' }}>
                <InstagramIcon /> IG
              </a>
              <a href="https://wa.me/201207346648" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono-brand text-[9px] uppercase tracking-wider transition-colors duration-300 hover:text-rose-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm" style={{ color: 'hsl(var(--white-30))', outlineColor: 'hsl(var(--rose-gold))' }}>
                <WhatsAppIcon /> WA
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-mono-brand text-[9px] uppercase tracking-[0.25em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>Navigate</h4>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[12px] transition-colors duration-300 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
                    style={{ color: 'hsl(var(--white-30))', outlineColor: 'hsl(var(--rose-gold))' }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-brand text-[9px] uppercase tracking-[0.25em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>Services</h4>
            <ul className="space-y-3">
              {['Advertising', 'Branding', 'Product', 'Motion', 'AI'].map((s) => (
                <li key={s}><span className="text-[12px]" style={{ color: 'hsl(var(--white-30))' }}>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-brand text-[9px] uppercase tracking-[0.25em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>Contact</h4>
            <ul className="space-y-3 text-[12px]" style={{ color: 'hsl(var(--white-30))' }}>
              <li>
                <a href="mailto:danverseai@gmail.com" className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm" style={{ outlineColor: 'hsl(var(--rose-gold))' }}>
                  <EmailIcon /> danverseai@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/muhammedd_adel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm" style={{ outlineColor: 'hsl(var(--rose-gold))' }}>
                  <InstagramIcon /> @muhammedd_adel
                </a>
              </li>
              <li>
                <a href="https://wa.me/201207346648" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm" style={{ outlineColor: 'hsl(var(--rose-gold))' }}>
                  <WhatsAppIcon /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex items-center justify-between" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <p className="font-mono-brand text-[9px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>© 2025 DANVERSE</p>
          <p className="font-mono-brand text-[9px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>DANVERSE.AI</p>
        </div>
      </div>
    </footer>
  );
}
