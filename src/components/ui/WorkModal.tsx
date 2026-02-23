import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface WorkData {
  id: string;
  title: string;
  client: string;
  category: string;
  year: number;
  role: string;
  image: string;
  accent: string;
}

interface WorkModalProps {
  work: WorkData | null;
  onClose: () => void;
}

const caseStudyDetails: Record<string, { challenge: string; approach: string; results: string[]; tools: string[] }> = {
  '1': {
    challenge: 'Vodafone needed a campaign that cut through digital noise and resonated with Gen-Z audiences across MENA.',
    approach: 'We built a multi-sensory campaign blending AI-generated visuals with real cinematography, creating a neon-drenched visual language that felt native to social feeds.',
    results: ['320% increase in engagement', '45M+ impressions in 2 weeks', '2x brand recall vs. benchmark'],
    tools: ['After Effects', 'Midjourney', 'Cinema 4D', 'DaVinci Resolve'],
  },
  '2': {
    challenge: 'Samsung required a unified brand system that could flex across 12 product lines while maintaining premium perception.',
    approach: 'We designed a modular identity system with dynamic typography rules, adaptive color matrices, and motion principles that scale from app icons to stadium screens.',
    results: ['Brand consistency score: 94%', 'Rolled out across 8 markets', 'Design system adopted by 200+ designers'],
    tools: ['Figma', 'After Effects', 'Custom Type Design', 'Brand.ai'],
  },
  '3': {
    challenge: 'IBM needed a product interface that made complex AI tools feel approachable without sacrificing depth for power users.',
    approach: 'Progressive disclosure architecture with contextual AI assistance. Every interaction was designed to teach while performing.',
    results: ['40% reduction in time-to-task', 'NPS increased from 32 to 71', '60% decrease in support tickets'],
    tools: ['React', 'TypeScript', 'Framer Motion', 'Figma'],
  },
  '4': {
    challenge: 'Grand Hyatt envisioned a lobby experience that merged physical architecture with digital storytelling.',
    approach: 'We created a spatial narrative using projection mapping, reactive surfaces, and ambient soundscapes that respond to guest movement.',
    results: ['Guest satisfaction +28%', 'Social media mentions 5x', 'Featured in Dezeen & ArchDaily'],
    tools: ['Cinema 4D', 'TouchDesigner', 'Unreal Engine', 'Arduino'],
  },
  '5': {
    challenge: 'Netflix wanted a launch campaign for a MENA original series that felt culturally authentic yet globally cinematic.',
    approach: 'We crafted a motion-first campaign system with Arabic-forward typography, blending calligraphic traditions with synth-wave aesthetics.',
    results: ['#1 trending in 6 countries', '12M views in first week', 'Campaign extended to season 2'],
    tools: ['After Effects', 'Houdini', 'Premiere Pro', 'Illustrator'],
  },
  '6': {
    challenge: 'Mastercard needed to reposition as a technology company, not just a payment network, in the Middle East market.',
    approach: 'We developed a "Priceless Technology" narrative with a design system that visualized data flows, security, and human connection simultaneously.',
    results: ['Brand perception shift: +34%', 'B2B lead generation 2.5x', 'Cannes Lions shortlist'],
    tools: ['Figma', 'Three.js', 'After Effects', 'Lottie'],
  },
  '7': {
    challenge: 'Toyota wanted an AI-powered content system that could generate dealer-level marketing across 14 MENA markets.',
    approach: 'We engineered a content OS that combines brand guidelines with generative AI, producing on-brand assets in seconds while maintaining creative quality.',
    results: ['Content production cost -70%', '14 markets automated', '10,000+ assets generated monthly'],
    tools: ['GPT-4', 'Stable Diffusion', 'Next.js', 'Supabase'],
  },
  '8': {
    challenge: 'Swarovski wanted an immersive digital experience that translated the physical brilliance of crystal into a virtual environment.',
    approach: 'We designed a WebGL experience with real-time light refraction simulations, allowing users to interact with crystal formations in 3D space.',
    results: ['Average session time: 4.2 min', 'Conversion rate +18%', 'FWA Site of the Day'],
    tools: ['Three.js', 'GLSL Shaders', 'React Three Fiber', 'Blender'],
  },
};

export default function WorkModal({ work, onClose }: WorkModalProps) {
  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [work]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const details = work ? caseStudyDetails[work.id] : null;

  return (
    <AnimatePresence>
      {work && details && (
        <motion.div
          className="fixed inset-0 z-[500] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'hsl(var(--void) / 0.92)', backdropFilter: 'blur(20px)' }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full h-full overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="min-h-full" style={{ background: 'hsl(var(--abyss))' }}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="fixed top-6 right-6 md:top-10 md:right-10 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"
                style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--white-10))' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="hsl(var(--cream))" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Hero image */}
              <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(180deg, transparent 40%, hsl(var(--abyss)) 100%)`,
                }} />
                <div className="absolute inset-0" style={{
                  background: `hsl(var(--${work.accent}) / 0.08)`,
                  mixBlendMode: 'multiply',
                }} />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-20 lg:px-28 pb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: `hsl(var(--${work.accent}))` }}>
                      {work.category} — {work.year}
                    </span>
                    <h1 className="font-display-alt font-extrabold uppercase tracking-[-0.03em] mt-3" style={{
                      fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                      color: 'hsl(var(--cream))',
                    }}>
                      {work.title}
                    </h1>
                    <p className="font-script italic text-xl md:text-2xl mt-2" style={{ color: 'hsl(var(--cream) / 0.5)' }}>
                      {work.client}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 2-column layout */}
              <div className="px-6 md:px-20 lg:px-28 py-16 md:py-24">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {/* Left column — narrative */}
                  <div className="space-y-12">
                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Role
                      </h3>
                      <p className="font-script italic text-2xl leading-relaxed" style={{ color: 'hsl(var(--cream))' }}>
                        {work.role}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Challenge
                      </h3>
                      <p className="text-[14px] leading-[1.9]" style={{ color: 'hsl(var(--cream) / 0.6)' }}>
                        {details.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Approach
                      </h3>
                      <p className="text-[14px] leading-[1.9]" style={{ color: 'hsl(var(--cream) / 0.6)' }}>
                        {details.approach}
                      </p>
                    </div>
                  </div>

                  {/* Right column — data & meta */}
                  <div className="space-y-12">
                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Results
                      </h3>
                      <div className="space-y-4">
                        {details.results.map((result, i) => (
                          <motion.div
                            key={result}
                            className="flex items-start gap-4 py-4 border-t"
                            style={{ borderColor: 'hsl(var(--white-10))' }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                          >
                            <span className="font-script italic text-3xl tabular-nums" style={{ color: `hsl(var(--${work.accent}))` }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="font-heading font-medium text-lg pt-2" style={{ color: 'hsl(var(--cream))' }}>
                              {result}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Tools & Tech
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {details.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-4 py-2 text-[11px] font-mono-brand tracking-wider"
                            style={{
                              border: `1px solid hsl(var(--${work.accent}) / 0.15)`,
                              color: 'hsl(var(--cream) / 0.6)',
                              background: `hsl(var(--${work.accent}) / 0.03)`,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project meta */}
                    <div className="grid grid-cols-2 gap-6 pt-8 border-t" style={{ borderColor: 'hsl(var(--white-10))' }}>
                      {[
                        { label: 'Client', value: work.client },
                        { label: 'Year', value: String(work.year) },
                        { label: 'Category', value: work.category.toUpperCase() },
                        { label: 'Status', value: 'Completed' },
                      ].map((meta) => (
                        <div key={meta.label}>
                          <span className="font-mono-brand text-[9px] tracking-[0.25em] uppercase block mb-1" style={{ color: 'hsl(var(--white-30))' }}>
                            {meta.label}
                          </span>
                          <span className="font-heading text-sm" style={{ color: 'hsl(var(--cream))' }}>
                            {meta.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                  className="mt-24 pt-12 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  style={{ borderColor: 'hsl(var(--white-10))' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <p className="font-script italic text-2xl" style={{ color: 'hsl(var(--cream) / 0.5)' }}>
                    Interested in similar work?
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 400);
                    }}
                    className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.25em] group transition-colors duration-300"
                    style={{ color: `hsl(var(--${work.accent}))` }}
                  >
                    <span className="w-8 h-px transition-all duration-500 group-hover:w-14" style={{ background: `hsl(var(--${work.accent}) / 0.4)` }} />
                    Start a project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}