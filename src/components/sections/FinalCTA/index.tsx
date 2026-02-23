import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useInView } from '@/hooks/useInView';
import { fadeUp } from '@/lib/animations';

const FinalCTA = forwardRef<HTMLElement>((_, ref) => {
  const mouse = useMousePosition();
  const { ref: inViewRef, isInView } = useInView(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', type: 'branding', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Animated gradient bg */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, hsl(var(--cyan)), hsl(var(--purple)), hsl(var(--magenta)), hsl(var(--cyan)))`,
          filter: 'blur(80px)',
          animation: 'gradient-rotate 8s linear infinite',
        }}
        aria-hidden="true"
      />

      {/* Mouse glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsl(var(--cyan)/0.08), transparent 60%)`,
          left: mouse.x - 400,
          top: mouse.y - 400,
          transition: 'left 100ms, top 100ms',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center mb-16" ref={inViewRef}>
        <motion.h2
          className="font-display font-black tracking-tight"
          style={{ fontSize: 'var(--text-display)', color: 'hsl(var(--foreground))' }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="text-gradient">START A</span>
          <br />
          <span className="text-gradient">PROJECT</span>
        </motion.h2>
      </div>

      {/* Form */}
      <motion.div
        className="relative z-10 w-full max-w-md glass rounded-2xl p-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {submitted ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">🎉</span>
            <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'hsl(var(--foreground))' }}>
              Message sent!
            </h3>
            <p className="text-sm" style={{ color: 'hsl(var(--white-60))' }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {[
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-heading uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--white-60))' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  className="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-cyan"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--white-60))' }}>
                Project Type
              </label>
              <select
                className="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-cyan"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="branding" style={{ background: 'hsl(var(--surface))' }}>Branding</option>
                <option value="advertising" style={{ background: 'hsl(var(--surface))' }}>Advertising</option>
                <option value="web" style={{ background: 'hsl(var(--surface))' }}>Web / Digital</option>
                <option value="3d" style={{ background: 'hsl(var(--surface))' }}>3D / Immersive</option>
                <option value="ai" style={{ background: 'hsl(var(--surface))' }}>AI Systems</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--white-60))' }}>
                Budget Range
              </label>
              <input
                type="text"
                placeholder="$10k — $50k"
                className="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-cyan placeholder:text-muted-foreground"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg py-4 text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--cyan)/0.3)]"
              style={{
                background: 'hsl(var(--cyan)/0.1)',
                border: '1px solid hsl(var(--cyan)/0.3)',
                color: 'hsl(var(--cyan))',
              }}
            >
              Send Brief →
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';
export default FinalCTA;
