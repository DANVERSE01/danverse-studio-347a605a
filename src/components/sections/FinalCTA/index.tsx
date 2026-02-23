import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useInView } from '@/hooks/useInView';

const FinalCTA = forwardRef<HTMLElement>((_, ref) => {
  const mouse = useMousePosition();
  const { ref: inViewRef, isInView } = useInView(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', type: 'branding', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--void)), hsl(var(--section-terracotta) / 0.15), hsl(var(--void)))' }}
    >
      {/* Giant background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-display-alt font-extrabold uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(8rem, 25vw, 25rem)',
            color: 'hsl(var(--coral) / 0.03)',
          }}
        >
          HELLO
        </span>
      </div>

      {/* Mouse glow */}
      <div
        className="absolute pointer-events-none transition-all duration-200"
        style={{
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--coral) / 0.025), transparent 60%)',
          left: mouse.x - 250, top: mouse.y - 250,
        }}
        aria-hidden="true"
      />

      {/* Heading */}
      <div className="relative z-10 text-center mb-16" ref={inViewRef}>
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-10 h-px" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Contact
          </span>
          <div className="w-10 h-px" style={{ background: 'hsl(var(--coral) / 0.3)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-script italic block tracking-[0.01em] shimmer-text" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
            Start a
          </span>
          <span className="font-display-alt font-extrabold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', color: 'hsl(var(--coral))' }}>
            Project
          </span>
        </motion.h2>

        <motion.p
          className="font-script italic text-[15px] mt-5 max-w-sm mx-auto leading-relaxed"
          style={{ color: 'hsl(var(--cream) / 0.4)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Tell us about your vision. We respond within 24 hours.
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {submitted ? (
          <div className="text-center py-16 border" style={{ borderColor: 'hsl(var(--coral) / 0.15)' }}>
            <span className="font-script italic text-4xl block mb-3" style={{ color: 'hsl(var(--coral))' }}>✓</span>
            <h3 className="font-script italic text-2xl mb-2" style={{ color: 'hsl(var(--cream))' }}>
              Received.
            </h3>
            <p className="text-[13px]" style={{ color: 'hsl(var(--cream) / 0.4)' }}>We'll be in touch shortly.</p>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral placeholder:opacity-20"
                  style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--cream))' }}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
                Project Type
              </label>
              <select
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--cream))' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {['Branding', 'Advertising', 'Web / Digital', '3D / Immersive', 'AI Systems'].map((opt) => (
                  <option key={opt} value={opt.toLowerCase()} style={{ background: 'hsl(var(--void))' }}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--cream) / 0.4)' }}>
                Budget
              </label>
              <input
                type="text"
                placeholder="$10k — $50k"
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral placeholder:opacity-20"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--cream))' }}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-5 text-[10px] font-mono-brand uppercase tracking-[0.25em] glass-btn gradient-border-spin btn-shimmer group flex items-center justify-center gap-3 rounded-sm"
              style={{ color: 'hsl(var(--coral))' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Send Brief
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';
export default FinalCTA;
