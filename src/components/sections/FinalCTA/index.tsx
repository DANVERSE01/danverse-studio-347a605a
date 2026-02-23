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
      {/* Warm ambient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--amber) / 0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Mouse glow */}
      <div
        className="absolute pointer-events-none transition-all duration-150"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--amber) / 0.04), transparent 60%)',
          left: mouse.x - 300,
          top: mouse.y - 300,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center mb-20" ref={inViewRef}>
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-px" style={{ background: 'hsl(var(--amber) / 0.3)' }} />
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Let's talk
          </span>
          <div className="w-12 h-px" style={{ background: 'hsl(var(--amber) / 0.3)' }} />
        </motion.div>

        <motion.h2
          className="font-display font-normal italic tracking-tight"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', color: 'hsl(var(--foreground))' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Start a project
        </motion.h2>
        <motion.p
          className="text-sm mt-4 max-w-md mx-auto"
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
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {submitted ? (
          <div className="text-center py-12 border" style={{ borderColor: 'hsl(var(--white-10))' }}>
            <h3 className="font-display italic text-2xl mb-2" style={{ color: 'hsl(var(--foreground))' }}>
              Message received.
            </h3>
            <p className="text-sm" style={{ color: 'hsl(var(--white-30))' }}>We'll be in touch shortly.</p>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-300 focus:border-amber placeholder:text-[hsl(var(--white-10))]"
                  style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                Project Type
              </label>
              <select
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-300 focus:border-amber"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="branding" style={{ background: 'hsl(var(--abyss))' }}>Branding</option>
                <option value="advertising" style={{ background: 'hsl(var(--abyss))' }}>Advertising</option>
                <option value="web" style={{ background: 'hsl(var(--abyss))' }}>Web / Digital</option>
                <option value="3d" style={{ background: 'hsl(var(--abyss))' }}>3D / Immersive</option>
                <option value="ai" style={{ background: 'hsl(var(--abyss))' }}>AI Systems</option>
              </select>
            </div>
            <div>
              <label className="block font-mono-brand text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                Budget Range
              </label>
              <input
                type="text"
                placeholder="$10k — $50k"
                className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 px-0 py-3 text-sm outline-none transition-colors duration-300 focus:border-amber placeholder:text-[hsl(var(--white-10))]"
                style={{ borderColor: 'hsl(var(--white-10))', color: 'hsl(var(--foreground))' }}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 text-xs font-mono-brand uppercase tracking-[0.2em] transition-all duration-500 border group flex items-center justify-center gap-3"
              style={{
                borderColor: 'hsl(var(--amber) / 0.3)',
                color: 'hsl(var(--amber))',
                background: 'hsl(var(--amber) / 0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'hsl(var(--amber) / 0.08)';
                e.currentTarget.style.borderColor = 'hsl(var(--amber) / 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'hsl(var(--amber) / 0.03)';
                e.currentTarget.style.borderColor = 'hsl(var(--amber) / 0.3)';
              }}
            >
              Send Brief
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
