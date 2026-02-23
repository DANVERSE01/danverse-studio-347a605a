import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

const row1 = ['DECATHLON', 'VODAFONE', 'UBER EATS', "L'ORÉAL", 'SAMSUNG', 'PEPSI', 'BOOKING.COM', 'RED BULL', 'HENKEL', 'NOON', 'NETFLIX'];
const row2 = ['GRAND HYATT', 'TOYOTA', 'MASTERCARD', 'SWAROVSKI', 'ZAIN TELECOM', 'UNILEVER', 'IBM', 'AMAZON', 'ETISALAT'];

const Clients = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="clients" className="relative py-32 md:py-48 overflow-hidden">
      {/* Decorative */}
      <span className="absolute top-16 left-6 md:left-16 section-num" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
        06
      </span>

      <motion.div
        ref={inViewRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="px-6 md:px-16 mb-20"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
            Trusted by
          </span>
          <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
        </motion.div>
        <motion.p variants={fadeUp} className="font-display italic text-2xl md:text-3xl max-w-lg" style={{ color: 'hsl(var(--foreground))' }}>
          Global brands that share our obsession with craft.
        </motion.p>
      </motion.div>

      <div className="space-y-10">
        <div className="overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...row1, ...row1].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-lg md:text-2xl mx-8 transition-colors duration-500 hover:text-coral shrink-0 tracking-wide"
                style={{ color: 'hsl(var(--white-10))' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...row2, ...row2].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-lg md:text-2xl mx-8 transition-colors duration-500 hover:text-sage shrink-0 tracking-wide"
                style={{ color: 'hsl(var(--white-10))' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Clients.displayName = 'Clients';
export default Clients;
