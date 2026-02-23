import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Gallery imports
import galleryNeonPulse2 from '@/assets/works/gallery/neon-pulse-2.jpg';
import galleryNeonPulse3 from '@/assets/works/gallery/neon-pulse-3.jpg';
import galleryMetamorphosis2 from '@/assets/works/gallery/metamorphosis-2.jpg';
import galleryMetamorphosis3 from '@/assets/works/gallery/metamorphosis-3.jpg';
import galleryNeuralInterface2 from '@/assets/works/gallery/neural-interface-2.jpg';
import galleryNeuralInterface3 from '@/assets/works/gallery/neural-interface-3.jpg';
import galleryVoidArchitecture2 from '@/assets/works/gallery/void-architecture-2.jpg';
import galleryVoidArchitecture3 from '@/assets/works/gallery/void-architecture-3.jpg';
import gallerySynthCulture2 from '@/assets/works/gallery/synth-culture-2.jpg';
import gallerySynthCulture3 from '@/assets/works/gallery/synth-culture-3.jpg';
import galleryQuantumBrand2 from '@/assets/works/gallery/quantum-brand-2.jpg';
import galleryQuantumBrand3 from '@/assets/works/gallery/quantum-brand-3.jpg';
import galleryGenesisEngine2 from '@/assets/works/gallery/genesis-engine-2.jpg';
import galleryGenesisEngine3 from '@/assets/works/gallery/genesis-engine-3.jpg';
import galleryPrismReality2 from '@/assets/works/gallery/prism-reality-2.jpg';
import galleryPrismReality3 from '@/assets/works/gallery/prism-reality-3.jpg';

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

const galleryImages: Record<string, { src: string; caption: string; span: 'full' | 'half' | 'tall' }[]> = {
  '1': [
    { src: galleryNeonPulse2, caption: 'Campaign visual system — neon urban activation', span: 'full' },
    { src: galleryNeonPulse3, caption: 'Hero typography — PULSE neon signage', span: 'half' },
  ],
  '2': [
    { src: galleryMetamorphosis2, caption: 'Brand identity system — stationery & collateral', span: 'full' },
    { src: galleryMetamorphosis3, caption: 'Concept art — chrome morphic sculpture', span: 'half' },
  ],
  '3': [
    { src: galleryNeuralInterface2, caption: 'AI Dashboard — curved display mockup', span: 'full' },
    { src: galleryNeuralInterface3, caption: 'UI components — glass card system', span: 'half' },
  ],
  '4': [
    { src: galleryVoidArchitecture2, caption: 'Lobby installation — projection mapping', span: 'full' },
    { src: galleryVoidArchitecture3, caption: 'Spatial concept — void light study', span: 'half' },
  ],
  '5': [
    { src: gallerySynthCulture2, caption: 'Series poster — Arabic calligraphy × synthwave', span: 'full' },
    { src: gallerySynthCulture3, caption: 'Motion design — typography animation frames', span: 'half' },
  ],
  '6': [
    { src: galleryQuantumBrand2, caption: 'Brand activation — premium card visualization', span: 'full' },
    { src: galleryQuantumBrand3, caption: 'Design system — documentation & guidelines', span: 'half' },
  ],
  '7': [
    { src: galleryGenesisEngine2, caption: 'Content OS — AI generation dashboard', span: 'full' },
    { src: galleryGenesisEngine3, caption: 'Output — automated dealer marketing assets', span: 'half' },
  ],
  '8': [
    { src: galleryPrismReality2, caption: 'Crystal formation — WebGL light refraction', span: 'full' },
    { src: galleryPrismReality3, caption: 'Detail — prismatic crystal cluster render', span: 'half' },
  ],
};

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
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [work]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (lightboxImg) { setLightboxImg(null); return; }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, lightboxImg]);

  const details = work ? caseStudyDetails[work.id] : null;
  const gallery = work ? galleryImages[work.id] : null;

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
                  <path d="M12 4L4 12M4 4l8 8" stroke="hsl(var(--pearl))" strokeWidth="1.5" strokeLinecap="round" />
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
                    <h1 className="font-heading font-extrabold uppercase tracking-[-0.03em] mt-3" style={{
                      fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                      color: 'hsl(var(--pearl))',
                    }}>
                      {work.title}
                    </h1>
                    <p className="font-display italic text-xl md:text-2xl mt-2" style={{ color: 'hsl(var(--pearl) / 0.5)' }}>
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
                      <p className="font-display italic text-2xl leading-relaxed" style={{ color: 'hsl(var(--pearl))' }}>
                        {work.role}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Challenge
                      </h3>
                      <p className="text-[14px] leading-[1.9]" style={{ color: 'hsl(var(--pearl) / 0.6)' }}>
                        {details.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono-brand text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Approach
                      </h3>
                      <p className="text-[14px] leading-[1.9]" style={{ color: 'hsl(var(--pearl) / 0.6)' }}>
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
                            <span className="font-display italic text-3xl tabular-nums" style={{ color: `hsl(var(--${work.accent}))` }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="font-heading font-medium text-lg pt-2" style={{ color: 'hsl(var(--pearl))' }}>
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
                              color: 'hsl(var(--pearl) / 0.6)',
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
                          <span className="font-heading text-sm" style={{ color: 'hsl(var(--pearl))' }}>
                            {meta.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Gallery Section */}
                {gallery && gallery.length > 0 && (
                  <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: `hsl(var(--${work.accent}))` }}>
                        Project Gallery
                      </span>
                      <div className="flex-1 h-px" style={{ background: `hsl(var(--${work.accent}) / 0.1)` }} />
                    </div>

                    <div className="space-y-4">
                      {gallery.map((img, i) => (
                        <motion.div
                          key={i}
                          className={`relative overflow-hidden cursor-pointer group ${img.span === 'full' ? 'w-full' : 'w-full md:w-[70%]'}`}
                          style={{ background: 'hsl(var(--deep))' }}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + i * 0.15, duration: 0.6 }}
                          onClick={() => setLightboxImg(img.src)}
                        >
                          <div className={`relative overflow-hidden ${img.span === 'full' ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ background: 'linear-gradient(180deg, transparent 50%, hsl(var(--void) / 0.7) 100%)' }}
                            >
                              <div className="flex items-center justify-between w-full">
                                <p className="font-body text-[12px]" style={{ color: 'hsl(var(--pearl) / 0.8)' }}>
                                  {img.caption}
                                </p>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `hsl(var(--${work.accent}) / 0.15)`, border: `1px solid hsl(var(--${work.accent}) / 0.3)` }}>
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6h8M6 2v8" stroke={`hsl(var(--${work.accent}))`} strokeWidth="1" strokeLinecap="round" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid hsl(var(--white-10))' }}>
                            <span className="font-mono-brand text-[9px] tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--white-30))' }}>
                              {String(i + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                            </span>
                            <span className="font-body text-[11px]" style={{ color: 'hsl(var(--pearl) / 0.4)' }}>
                              {img.caption}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Bottom CTA */}
                <motion.div
                  className="mt-24 pt-12 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  style={{ borderColor: 'hsl(var(--white-10))' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <p className="font-display italic text-2xl" style={{ color: 'hsl(var(--pearl) / 0.5)' }}>
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
