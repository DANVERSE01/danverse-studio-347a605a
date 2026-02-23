import { motion, AnimatePresence } from 'framer-motion';
import { useDanverseStore } from '@/store/useDanverseStore';
import { X } from 'lucide-react';

const worksData: Record<string, {
  title: string;
  client: string;
  category: string;
  year: number;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  tools: string[];
  awards: string[];
  description: string;
  duration: string;
}> = {
  '1': {
    title: 'Neon Pulse',
    client: 'Vodafone',
    category: 'Advertising',
    year: 2024,
    challenge: 'Vodafone needed to redefine their brand perception among Gen-Z audiences in the MENA region, moving beyond traditional telecom advertising into culture-first content.',
    solution: 'We crafted a series of hyper-stylized 15-second spots using AI-generated environments and real-time motion capture, blending street culture aesthetics with futuristic telecom narratives.',
    results: [
      { metric: 'Brand Recall', value: '+340%' },
      { metric: 'Social Engagement', value: '12M+' },
      { metric: 'Ad Completion Rate', value: '89%' },
    ],
    tools: ['Midjourney', 'Runway ML', 'Unreal Engine', 'After Effects'],
    awards: ['Dubai Lynx Gold', 'Webby Award Nominee'],
    description: 'A cinematic advertising campaign that redefined telecom marketing in the Middle East.',
    duration: '8 weeks',
  },
  '2': {
    title: 'Metamorphosis',
    client: 'Samsung',
    category: 'Branding',
    year: 2024,
    challenge: 'Samsung\'s Galaxy ecosystem needed a unified visual identity that could flex across 40+ product lines while maintaining a premium, innovative feel.',
    solution: 'We developed an AI-driven generative brand system that creates unique visual assets for each product category while maintaining mathematical harmony across the entire identity.',
    results: [
      { metric: 'Brand Consistency Score', value: '97%' },
      { metric: 'Design Production Time', value: '-60%' },
      { metric: 'Market Perception Lift', value: '+28%' },
    ],
    tools: ['Figma', 'Stable Diffusion', 'Custom AI Pipeline', 'Three.js'],
    awards: ['IF Design Award', 'Red Dot'],
    description: 'A generative AI brand system for Samsung\'s global ecosystem.',
    duration: '12 weeks',
  },
  '3': {
    title: 'Neural Interface',
    client: 'IBM',
    category: 'Web',
    year: 2024,
    challenge: 'IBM\'s quantum computing division needed a web experience that could make complex quantum concepts accessible to enterprise decision-makers without dumbing down the science.',
    solution: 'An interactive WebGL experience where users manipulate quantum circuits in real-time, visualizing qubit states through particle physics simulations and interactive data narratives.',
    results: [
      { metric: 'Session Duration', value: '4.2 min' },
      { metric: 'Lead Generation', value: '+180%' },
      { metric: 'Core Web Vitals', value: 'All Green' },
    ],
    tools: ['React', 'Three.js', 'GSAP', 'WebGPU', 'D3.js'],
    awards: ['Awwwards SOTD', 'FWA of the Day'],
    description: 'An interactive quantum computing experience for IBM.',
    duration: '10 weeks',
  },
  '4': {
    title: 'Void Architecture',
    client: 'Grand Hyatt',
    category: '3D',
    year: 2024,
    challenge: 'Grand Hyatt Cairo needed a virtual tour experience that conveyed the physical grandeur and luxury of their new property before construction completion.',
    solution: 'Photorealistic real-time 3D walkthrough using Gaussian splatting and architectural renders, allowing potential guests to explore every suite and amenity in immersive detail.',
    results: [
      { metric: 'Pre-bookings', value: '+220%' },
      { metric: 'Virtual Tour Completions', value: '78%' },
      { metric: 'Media Coverage', value: '45 outlets' },
    ],
    tools: ['Unreal Engine 5', 'Gaussian Splatting', 'Blender', 'React Three Fiber'],
    awards: ['Hospitality Design Award'],
    description: 'A photorealistic virtual hotel experience built before construction.',
    duration: '14 weeks',
  },
  '5': {
    title: 'Synth Culture',
    client: 'Netflix',
    category: 'Advertising',
    year: 2023,
    challenge: 'Netflix MENA needed a campaign for their Arabic original series that would resonate globally while celebrating regional storytelling traditions.',
    solution: 'We produced a cross-platform campaign merging calligraphic motion design with AI-generated surrealist environments, each scene reflecting a different episode\'s emotional core.',
    results: [
      { metric: 'Series Viewership', value: '+85%' },
      { metric: 'Campaign Reach', value: '50M+' },
      { metric: 'Social Shares', value: '2.1M' },
    ],
    tools: ['After Effects', 'Midjourney', 'Cinema 4D', 'Houdini'],
    awards: ['Cannes Lions Bronze'],
    description: 'A surrealist campaign for Netflix Arabic originals.',
    duration: '6 weeks',
  },
  '6': {
    title: 'Quantum Brand',
    client: 'Mastercard',
    category: 'Branding',
    year: 2023,
    challenge: 'Mastercard\'s fintech division needed a sub-brand identity for their new AI-powered payment analytics platform targeting enterprise clients.',
    solution: 'A dynamic identity system where the logo morphs based on real-time transaction data, with generative patterns that visualize payment flows across global markets.',
    results: [
      { metric: 'Brand Recognition', value: '92%' },
      { metric: 'Enterprise Signups', value: '+150%' },
      { metric: 'NPS Score', value: '78' },
    ],
    tools: ['Figma', 'p5.js', 'Custom Generative System', 'React'],
    awards: ['Brand New Notable'],
    description: 'A data-driven dynamic identity for Mastercard\'s fintech arm.',
    duration: '10 weeks',
  },
  '7': {
    title: 'Genesis Engine',
    client: 'Toyota',
    category: 'AI',
    year: 2024,
    challenge: 'Toyota needed an AI content system that could generate localized marketing assets across 30+ markets while maintaining brand consistency and cultural sensitivity.',
    solution: 'We built a custom AI content operating system with brand guardrails, cultural adaptation layers, and automated QA — producing 500+ assets per week with 2 human reviewers.',
    results: [
      { metric: 'Content Output', value: '500+/week' },
      { metric: 'Production Cost', value: '-70%' },
      { metric: 'Brand Compliance', value: '99.2%' },
    ],
    tools: ['GPT-4', 'DALL-E 3', 'Custom Fine-tuned Models', 'Langchain'],
    awards: ['Marketing AI Award'],
    description: 'An AI content OS producing 500+ localized assets weekly for Toyota.',
    duration: '16 weeks',
  },
  '8': {
    title: 'Prism Reality',
    client: 'Swarovski',
    category: '3D',
    year: 2023,
    challenge: 'Swarovski wanted an AR try-on experience that could accurately simulate light refraction through crystals on any skin tone and in any lighting condition.',
    solution: 'Custom ray-tracing shader pipeline for mobile AR, achieving photorealistic crystal rendering at 60fps with physically accurate caustics and spectral dispersion.',
    results: [
      { metric: 'AR Engagement', value: '3.8 min avg' },
      { metric: 'Conversion Rate', value: '+45%' },
      { metric: 'App Downloads', value: '1.2M' },
    ],
    tools: ['ARKit', 'Custom GLSL Shaders', 'Swift', 'Metal'],
    awards: ['Apple Design Award Finalist'],
    description: 'Photorealistic AR crystal try-on with custom ray-tracing.',
    duration: '12 weeks',
  },
  '9': {
    title: 'Echo System',
    client: 'Pepsi',
    category: 'Web',
    year: 2024,
    challenge: 'Pepsi needed an interactive web platform for their annual music festival that could handle 100K concurrent users with real-time social integration.',
    solution: 'A WebSocket-powered festival hub with live streaming, interactive stage maps, social walls, and AI-powered artist recommendations based on listening history.',
    results: [
      { metric: 'Peak Concurrent Users', value: '142K' },
      { metric: 'Avg Session Time', value: '12 min' },
      { metric: 'Ticket Sales via Platform', value: '+65%' },
    ],
    tools: ['Next.js', 'WebSocket', 'Redis', 'Cloudflare Workers'],
    awards: ['Webby Award'],
    description: 'A real-time festival platform handling 142K concurrent users.',
    duration: '8 weeks',
  },
  '10': {
    title: 'Carbon Copy',
    client: 'Uber Eats',
    category: 'Advertising',
    year: 2023,
    challenge: 'Uber Eats wanted to highlight their sustainability initiatives with a campaign that didn\'t feel like greenwashing — authentic, data-driven, and culturally relevant.',
    solution: 'We created a real-time data visualization campaign showing actual carbon offset metrics per delivery zone, turning each order into a visual narrative of environmental impact.',
    results: [
      { metric: 'Campaign Sentiment', value: '94% positive' },
      { metric: 'Order Volume', value: '+22%' },
      { metric: 'Press Mentions', value: '200+' },
    ],
    tools: ['D3.js', 'MapboxGL', 'After Effects', 'Real-time Data API'],
    awards: ['Clio Sustainability Award'],
    description: 'A data-driven sustainability campaign for Uber Eats.',
    duration: '6 weeks',
  },
  '11': {
    title: 'Deep Learning Brand',
    client: 'Amazon',
    category: 'AI',
    year: 2024,
    challenge: 'Amazon Web Services needed to make their AI/ML services portfolio accessible to non-technical executives while demonstrating genuine technical depth.',
    solution: 'An interactive AI playground where executives can build, train, and deploy a simple ML model in under 5 minutes, with each step visualized through cinematic data animations.',
    results: [
      { metric: 'Enterprise Demos Booked', value: '+300%' },
      { metric: 'Platform Engagement', value: '8.5 min' },
      { metric: 'Conversion to Sales Call', value: '34%' },
    ],
    tools: ['React', 'TensorFlow.js', 'Three.js', 'AWS SageMaker'],
    awards: ['Awwwards Honorable Mention'],
    description: 'An interactive AI playground making ML accessible to executives.',
    duration: '14 weeks',
  },
  '12': {
    title: 'Cipher Design',
    client: 'Red Bull',
    category: 'Branding',
    year: 2024,
    challenge: 'Red Bull\'s esports division needed a visual identity system that could adapt to 15 different game titles while maintaining the energy and attitude of the Red Bull brand.',
    solution: 'A modular identity toolkit with game-specific color palettes, typography treatments, and motion templates — all generated from a single Figma plugin connected to brand AI.',
    results: [
      { metric: 'Design Velocity', value: '5x faster' },
      { metric: 'Tournament Branding Coverage', value: '100%' },
      { metric: 'Community Engagement', value: '+180%' },
    ],
    tools: ['Figma', 'Custom Figma Plugin', 'Stable Diffusion', 'Motion One'],
    awards: ['Esports Award Nominee'],
    description: 'A modular AI-powered identity system for Red Bull esports.',
    duration: '10 weeks',
  },
};

export default function WorkModal() {
  const selectedWork = useDanverseStore((s) => s.selectedWork);
  const setSelectedWork = useDanverseStore((s) => s.setSelectedWork);

  const work = selectedWork ? worksData[selectedWork] : null;

  return (
    <AnimatePresence>
      {work && selectedWork && (
        <motion.div
          className="fixed inset-0 flex"
          style={{ zIndex: 'var(--z-modal)' as unknown as number }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'hsl(var(--void)/0.97)' }}
            onClick={() => setSelectedWork(null)}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full h-full overflow-y-auto"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            role="dialog"
            aria-label={work.title}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedWork(null)}
              className="fixed top-6 right-6 z-20 w-12 h-12 rounded-full glass flex items-center justify-center transition-colors duration-300 hover:border-cyan/30"
              aria-label="Close"
            >
              <X size={20} style={{ color: 'hsl(var(--foreground))' }} />
            </button>

            <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
              {/* Left — Sticky info */}
              <div className="md:sticky md:top-24 md:self-start space-y-8">
                {/* Large project number */}
                <span
                  className="font-display font-black block leading-none"
                  style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    color: 'hsl(var(--foreground)/0.04)',
                  }}
                >
                  {selectedWork.padStart(2, '0')}
                </span>

                <div>
                  <span
                    className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-2"
                    style={{ color: 'hsl(var(--cyan))' }}
                  >
                    {work.client}
                  </span>
                  <h2
                    className="font-display font-black tracking-tight mb-4"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'hsl(var(--foreground))' }}
                  >
                    {work.title}
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'hsl(var(--white-60))' }}>
                    {work.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="glass rounded-full px-3 py-1 text-xs" style={{ color: 'hsl(var(--cyan))' }}>
                      {work.category}
                    </span>
                    <span className="text-xs" style={{ color: 'hsl(var(--white-30))' }}>
                      {work.year} · {work.duration}
                    </span>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="font-heading text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                    Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {work.tools.map((tool) => (
                      <span
                        key={tool}
                        className="glass rounded-full px-3 py-1 text-xs"
                        style={{ color: 'hsl(var(--white-60))' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                {work.awards.length > 0 && (
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--white-30))' }}>
                      Awards
                    </h4>
                    <div className="space-y-1">
                      {work.awards.map((award) => (
                        <div key={award} className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--gold))' }}>
                          <span>★</span> {award}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Scrollable content */}
              <div className="space-y-12">
                {/* Hero image placeholder */}
                <div
                  className="w-full aspect-video rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--deep)), hsl(var(--surface)), hsl(var(--cyan)/0.05))`,
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-4xl font-black" style={{ color: 'hsl(var(--white-10))' }}>
                      {work.title}
                    </span>
                  </div>
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--cyan))' }}>
                    The Challenge
                  </h3>
                  <p
                    className="text-lg leading-relaxed italic"
                    style={{ color: 'hsl(var(--white-60))', fontStyle: 'italic' }}
                  >
                    "{work.challenge}"
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--cyan))' }}>
                    Our Solution
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'hsl(var(--white-60))' }}>
                    {work.solution}
                  </p>
                </div>

                {/* Process images placeholder */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className="aspect-[4/3] rounded-xl overflow-hidden"
                      style={{
                        background: `linear-gradient(${n * 60}deg, hsl(var(--surface)), hsl(var(--deep)))`,
                        border: '1px solid hsl(var(--border))',
                      }}
                    />
                  ))}
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-heading font-semibold text-xs uppercase tracking-wider mb-6" style={{ color: 'hsl(var(--cyan))' }}>
                    Results
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {work.results.map((r) => (
                      <div
                        key={r.metric}
                        className="glass rounded-xl p-6 text-center"
                      >
                        <span
                          className="font-display font-black text-3xl block mb-2"
                          style={{ color: 'hsl(var(--foreground))' }}
                        >
                          {r.value}
                        </span>
                        <span className="text-xs uppercase tracking-wider" style={{ color: 'hsl(var(--white-30))' }}>
                          {r.metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next project teaser */}
                <div className="pt-8 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                  <button
                    onClick={() => {
                      const nextId = String(Number(selectedWork) >= 12 ? 1 : Number(selectedWork) + 1);
                      setSelectedWork(nextId);
                    }}
                    className="flex items-center gap-3 font-heading text-sm transition-colors duration-300 hover:text-foreground"
                    style={{ color: 'hsl(var(--white-60))' }}
                  >
                    Next Project →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
