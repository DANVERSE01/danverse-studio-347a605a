import { motion } from 'framer-motion';

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

interface GridItem {
  src: string;
  span: 'tall' | 'wide' | 'small' | 'medium';
}

const gridItems: GridItem[] = [
  { src: genesisEngine, span: 'tall' },
  { src: neonPulse, span: 'wide' },
  { src: quantumBrand2, span: 'small' },
  { src: metamorphosis3, span: 'small' },
  { src: synthCulture, span: 'wide' },
  { src: neuralInterface, span: 'tall' },
  { src: prismReality2, span: 'medium' },
  { src: voidArchitecture2, span: 'small' },
  { src: genesisEngine2, span: 'medium' },
  { src: neonPulse3, span: 'small' },
  { src: metamorphosis, span: 'tall' },
  { src: prismReality, span: 'wide' },
  { src: quantumBrand, span: 'small' },
  { src: synthCulture2, span: 'small' },
  { src: voidArchitecture, span: 'wide' },
  { src: neuralInterface2, span: 'tall' },
  { src: genesisEngine3, span: 'medium' },
  { src: neonPulse2, span: 'small' },
  { src: metamorphosis2, span: 'medium' },
  { src: neuralInterface3, span: 'small' },
  { src: prismReality3, span: 'tall' },
  { src: quantumBrand3, span: 'wide' },
  { src: synthCulture3, span: 'small' },
  { src: voidArchitecture3, span: 'small' },
];

const spanClasses: Record<GridItem['span'], string> = {
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1',
};

const spanClassesMobile: Record<GridItem['span'], string> = {
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1',
};

function GridBlock({ items, offset = 0 }: { items: GridItem[]; offset?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] md:auto-rows-[140px] gap-2 md:gap-3 w-full px-2 md:px-4">
      {items.map((item, i) => {
        const floatDelay = ((i + offset) % 8) * 0.8;
        return (
          <motion.div
            key={`${offset}-${i}`}
            className={`relative overflow-hidden rounded-lg hero-grid-item ${spanClasses[item.span]} max-md:${spanClassesMobile[item.span]}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.05 * (i % 12),
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ animationDelay: `${floatDelay}s` }}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'hsl(var(--abyss) / 0.45)' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HeroGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-grid-scroll flex flex-col gap-2 md:gap-3">
        <GridBlock items={gridItems} offset={0} />
        <GridBlock items={gridItems} offset={24} />
      </div>
    </div>
  );
}
