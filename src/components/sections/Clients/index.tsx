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
      <div className="px-6 md:px-20 lg:px-28 mb-20">
        <motion.div
          ref={inViewRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--coral))' }}>
              Trusted by
            </span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--coral) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-display italic tracking-[-0.02em]" style={{ fontSize: 'var(--text-section)', color: 'hsl(var(--foreground))' }}>
              Global
            </span>
            <span className="font-heading font-bold uppercase tracking-[-0.04em] text-stroke-sage" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              PARTNERS
            </span>
          </motion.h2>
        </motion.div>
      </div>

      <div className="space-y-8">
        <div className="overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap" style={{ willChange: 'transform' }}>
            {[...row1, ...row1].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-xl md:text-3xl mx-8 md:mx-12 transition-colors duration-500 hover:text-coral shrink-0 tracking-[0.05em] uppercase"
                style={{ color: 'hsl(var(--white-10))' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap" style={{ willChange: 'transform' }}>
            {[...row2, ...row2].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-xl md:text-3xl mx-8 md:mx-12 transition-colors duration-500 hover:text-sage shrink-0 tracking-[0.05em] uppercase"
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
