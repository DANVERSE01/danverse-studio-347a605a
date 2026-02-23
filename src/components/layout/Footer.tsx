import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import danverseLogo from '@/assets/danverse-logo.webp';

export default function Footer() {
  const { ref, isInView } = useInView(0.1);

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
            <img src={danverseLogo} alt="Danverse" className="h-10 w-auto mb-4" />
            <p className="text-[12px] leading-relaxed max-w-xs mb-6" style={{ color: 'hsl(var(--white-30))' }}>AI-powered creative studio at the intersection of technology and culture.</p>
            <div className="flex gap-4">
              {['LI', 'IG', 'BE', 'GH'].map((s) => (
                <a key={s} href="#" className="font-mono-brand text-[9px] uppercase tracking-wider transition-colors duration-300 hover:text-rose-gold" style={{ color: 'hsl(var(--white-30))' }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono-brand text-[9px] uppercase tracking-[0.25em] mb-5" style={{ color: 'hsl(var(--white-30))' }}>Navigate</h4>
            <ul className="space-y-3">
              {['Work', 'Services', 'Process', 'Studio', 'Journal'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-[12px] transition-colors duration-300 hover:text-foreground" style={{ color: 'hsl(var(--white-30))' }}>{l}</a></li>
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
              <li>hello@danverse.studio</li>
              <li>Cairo, Egypt</li>
              <li className="font-mono-brand text-[9px]" style={{ color: 'hsl(var(--white-10))' }}>GMT+2</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex items-center justify-between" style={{ borderColor: 'hsl(var(--white-10))' }}>
          <p className="font-mono-brand text-[9px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>© 2025 DANVERSE</p>
          <p className="font-mono-brand text-[9px] tracking-wider" style={{ color: 'hsl(var(--white-10))' }}>Cairo</p>
        </div>
      </div>
    </footer>
  );
}
