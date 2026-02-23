import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import imgNeonPulse from '@/assets/works/neon-pulse.jpg';
import imgMetamorphosis from '@/assets/works/metamorphosis.jpg';
import imgNeuralInterface from '@/assets/works/neural-interface.jpg';

export default function WebGLFallback() {
  const mouse = useMousePosition();
  const mx = (mouse.x / window.innerWidth - 0.5) * 2;
  const my = (mouse.y / window.innerHeight - 0.5) * 2;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep animated gradient background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at ${50 + mx * 15}% ${50 + my * 15}%, hsl(var(--coral) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at ${30 - mx * 10}% ${70 - my * 10}%, hsl(260 40% 30% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 90% 50% at 80% 20%, hsl(220 60% 15% / 0.15) 0%, transparent 60%),
            hsl(var(--void))
          `,
        }}
      />

      {/* Floating images — parallax with mouse */}
      <motion.div
        className="absolute top-[8%] right-[8%] w-[220px] h-[300px] overflow-hidden opacity-20 hidden md:block"
        style={{
          x: mx * -20,
          y: my * -15,
          rotate: mx * 3,
        }}
      >
        <img src={imgNeonPulse} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--coral) / 0.3), hsl(var(--void) / 0.8))' }} />
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[5%] w-[180px] h-[240px] overflow-hidden opacity-15 hidden md:block"
        style={{
          x: mx * 15,
          y: my * 20,
          rotate: mx * -2,
        }}
      >
        <img src={imgMetamorphosis} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, hsl(var(--void) / 0.9), transparent)' }} />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[25%] w-[140px] h-[200px] overflow-hidden opacity-10 hidden lg:block"
        style={{
          x: mx * 25,
          y: my * -25,
          rotate: mx * 4,
        }}
      >
        <img src={imgNeuralInterface} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'hsl(var(--void) / 0.7)' }} />
      </motion.div>

      {/* Starfield-like particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-glow"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'hsl(var(--cream) / 0.3)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative rotating ring */}
      <svg
        className="absolute top-[15%] right-[12%] w-[300px] h-[300px] animate-rotate-slow opacity-[0.04]"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="hsl(var(--coral))" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="150" cy="150" r="100" stroke="hsl(var(--sage))" strokeWidth="0.5" strokeDasharray="2 12" />
      </svg>

      {/* Gradient vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(var(--void) / 0.6) 100%)',
        }}
      />
    </div>
  );
}
