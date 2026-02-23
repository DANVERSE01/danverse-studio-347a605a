import { useEffect, useRef, useState } from 'react';

// Main project images
import genesisEngine from '@/assets/works/genesis-engine.jpg';
import metamorphosis from '@/assets/works/metamorphosis.jpg';
import neonPulse from '@/assets/works/neon-pulse.jpg';
import neuralInterface from '@/assets/works/neural-interface.jpg';
import prismReality from '@/assets/works/prism-reality.jpg';
import quantumBrand from '@/assets/works/quantum-brand.jpg';
import synthCulture from '@/assets/works/synth-culture.jpg';
import voidArchitecture from '@/assets/works/void-architecture.jpg';

// Gallery images
import genesisEngine2 from '@/assets/works/gallery/genesis-engine-2.jpg';
import genesisEngine3 from '@/assets/works/gallery/genesis-engine-3.jpg';
import metamorphosis2 from '@/assets/works/gallery/metamorphosis-2.jpg';
import metamorphosis3 from '@/assets/works/gallery/metamorphosis-3.jpg';
import neonPulse2 from '@/assets/works/gallery/neon-pulse-2.jpg';
import neonPulse3 from '@/assets/works/gallery/neon-pulse-3.jpg';
import neuralInterface2 from '@/assets/works/gallery/neural-interface-2.jpg';
import neuralInterface3 from '@/assets/works/gallery/neural-interface-3.jpg';
import prismReality2 from '@/assets/works/gallery/prism-reality-2.jpg';
import prismReality3 from '@/assets/works/gallery/prism-reality-3.jpg';
import quantumBrand2 from '@/assets/works/gallery/quantum-brand-2.jpg';
import quantumBrand3 from '@/assets/works/gallery/quantum-brand-3.jpg';
import synthCulture2 from '@/assets/works/gallery/synth-culture-2.jpg';
import synthCulture3 from '@/assets/works/gallery/synth-culture-3.jpg';
import voidArchitecture2 from '@/assets/works/gallery/void-architecture-2.jpg';
import voidArchitecture3 from '@/assets/works/gallery/void-architecture-3.jpg';

// 5 columns, each scrolling in alternating directions at different speeds
const columns: { images: string[]; speed: number; direction: 'up' | 'down' }[] = [
  {
    images: [genesisEngine, neonPulse2, metamorphosis, prismReality3, synthCulture2],
    speed: 25,
    direction: 'up',
  },
  {
    images: [neuralInterface, quantumBrand2, voidArchitecture, genesisEngine3, neonPulse3],
    speed: 18,
    direction: 'down',
  },
  {
    images: [prismReality, metamorphosis2, synthCulture, neuralInterface2, quantumBrand],
    speed: 30,
    direction: 'up',
  },
  {
    images: [voidArchitecture2, genesisEngine2, neonPulse, metamorphosis3, prismReality2],
    speed: 22,
    direction: 'down',
  },
  {
    images: [synthCulture3, neuralInterface3, quantumBrand3, voidArchitecture3, genesisEngine],
    speed: 27,
    direction: 'up',
  },
];

function MarqueeColumn({
  images,
  speed,
  direction,
  index,
}: {
  images: string[];
  speed: number;
  direction: 'up' | 'down';
  index: number;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  // Each column has different image heights for organic feel
  const heights = index % 2 === 0
    ? ['h-[220px]', 'h-[300px]', 'h-[180px]', 'h-[260px]', 'h-[240px]']
    : ['h-[280px]', 'h-[200px]', 'h-[320px]', 'h-[190px]', 'h-[250px]'];

  const mobileHeights = index % 2 === 0
    ? ['h-[140px]', 'h-[200px]', 'h-[120px]', 'h-[170px]', 'h-[160px]']
    : ['h-[180px]', 'h-[130px]', 'h-[210px]', 'h-[125px]', 'h-[165px]'];

  const duplicatedImages = [...images, ...images];
  const duplicatedHeights = [...heights, ...heights];
  const duplicatedMobileHeights = [...mobileHeights, ...mobileHeights];

  return (
    <div
      className="flex-1 min-w-0 overflow-hidden relative"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
      }}
    >
      <div
        ref={columnRef}
        className="flex flex-col gap-3"
        style={{
          animation: `hero-col-${direction} ${speed}s linear infinite`,
        }}
      >
        {duplicatedImages.map((src, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl group ${duplicatedMobileHeights[i % duplicatedMobileHeights.length]} md:${duplicatedHeights[i % duplicatedHeights.length]}`}
            style={{ minHeight: '120px' }}
          >
            <img
              src={src}
              alt=""
              loading={i < 5 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.15]"
            />
            {/* Gradient overlay for depth — dims on hover */}
            <div
              className="absolute inset-0 transition-all duration-700 group-hover:opacity-40"
              style={{
                background: `linear-gradient(
                  ${direction === 'up' ? '180deg' : '0deg'},
                  hsl(var(--abyss) / 0.2) 0%,
                  hsl(var(--abyss) / 0.45) 50%,
                  hsl(var(--abyss) / 0.25) 100%
                )`,
              }}
            />
            {/* Crimson color tint on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'hsl(0 85% 55% / 0.08)',
              }}
            />
            {/* Aggressive crimson glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                boxShadow: 'inset 0 0 40px hsl(0 85% 55% / 0.3), inset 0 0 80px hsl(0 85% 55% / 0.15), 0 0 30px hsl(0 85% 55% / 0.2)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 3D perspective container — grid rotated for cinematic depth */}
      <div
        className="absolute hero-grid-perspective"
        style={{
          top: '-20%',
          left: '-12%',
          right: '-12%',
          bottom: '-20%',
          perspective: '900px',
        }}
      >
        <div
          className="w-full h-full flex gap-3 md:gap-4 px-2"
          style={{
            transform: 'rotateX(12deg) rotateY(5deg) rotateZ(-5deg) scale(1.25)',
            transformStyle: 'preserve-3d',
          }}
        >
          {columns.map((col, i) => (
            <MarqueeColumn
              key={i}
              images={col.images}
              speed={col.speed}
              direction={col.direction}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Deep cinematic vignette layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, hsl(var(--abyss) / 0.7) 70%, hsl(var(--abyss)) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, hsl(var(--abyss) / 0.6) 0%, transparent 25%, transparent 75%, hsl(var(--abyss) / 0.8) 100%),
            linear-gradient(90deg, hsl(var(--abyss) / 0.5) 0%, transparent 20%, transparent 80%, hsl(var(--abyss) / 0.5) 100%)
          `,
        }}
      />
    </div>
  );
}
