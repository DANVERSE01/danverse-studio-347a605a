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
    <section ref={ref} id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute w-[800px] h-[800px] rounded-full animate-float-1"
          style={{ background: 'radial-gradient(circle, hsl(var(--coral) / 0.04) 0%, transparent 60%)', top: '-10%', right: '-15%' }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full animate-float-2"
          style={{ background: 'radial-gradient(circle, hsl(var(--sage) / 0.03) 0%, transparent 60%)', bottom: '-10%', left: '-10%' }}
        />
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

      {/* Section number */}
      <span className="absolute top-16 right-6 md:right-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        09
      </span>

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
          <span className="font-display italic block tracking-[-0.02em]" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'hsl(var(--foreground))' }}>
            Start a
          </span>
          <span className="font-heading font-bold uppercase block tracking-[-0.03em]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', color: 'hsl(var(--coral))' }}>
            Project
          </span>
        </motion.h2>

        <motion.p
          className="text-[13px] mt-5 max-w-sm mx-auto leading-relaxed"
          style={{ color: 'hsl(var(--white-30))' }}
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
            <span className="font-display italic text-4xl block mb-3" style={{ color: 'hsl(var(--coral))' }}>✓</span>
            <h3 className="font-display italic text-2xl mb-2" style={{ color: 'hsl(var(--foreground))' }}>
              Received.
            </h3>
            <p className="text-[13px]" style={{ color: 'hsl(var(--white-30))' }}>We'll be in touch shortly.</p>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral placeholder:opacity-20"
                  style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                Project Type
              </label>
              <select
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {['Branding', 'Advertising', 'Web / Digital', '3D / Immersive', 'AI Systems'].map((opt) => (
                  <option key={opt} value={opt.toLowerCase()} style={{ background: 'hsl(var(--abyss))' }}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono-brand text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                Budget
              </label>
              <input
                type="text"
                placeholder="$10k — $50k"
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-400 focus:border-coral placeholder:opacity-20"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 text-[10px] font-mono-brand uppercase tracking-[0.25em] transition-all duration-500 border group flex items-center justify-center gap-3"
              style={{
                borderColor: 'hsl(var(--coral) / 0.2)',
                color: 'hsl(var(--coral))',
                background: 'hsl(var(--coral) / 0.02)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'hsl(var(--coral) / 0.06)'; e.currentTarget.style.borderColor = 'hsl(var(--coral) / 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'hsl(var(--coral) / 0.02)'; e.currentTarget.style.borderColor = 'hsl(var(--coral) / 0.2)'; }}
            >
              Send Brief
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';
export default FinalCTA;
