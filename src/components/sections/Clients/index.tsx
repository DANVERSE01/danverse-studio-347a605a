import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

const row1 = ['DECATHLON', 'VODAFONE', 'UBER EATS', "L'ORÉAL", 'SAMSUNG', 'PEPSI', 'BOOKING.COM', 'RED BULL', 'HENKEL', 'NOON', 'NETFLIX'];
const row2 = ['GRAND HYATT', 'TOYOTA', 'MASTERCARD', 'SWAROVSKI', 'ZAIN TELECOM', 'UNILEVER', 'IBM', 'AMAZON', 'ETISALAT'];

const Clients = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="clients" className="py-24 md:py-32 overflow-hidden">
      <motion.div
        ref={inViewRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="px-6 md:px-12 lg:px-24 mb-12"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono-brand text-xs tracking-[0.2em] uppercase block mb-4"
          style={{ color: 'hsl(var(--cyan))' }}
        >
          / 06 CLIENTS
        </motion.span>
      </motion.div>

      <div className="space-y-6">
        {/* Row 1 — left */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...row1, ...row1].map((brand, i) => (
              <span
                key={i}
                className="font-display font-bold text-2xl md:text-3xl mx-4 transition-colors duration-300 hover:text-cyan shrink-0"
                style={{ color: 'hsl(var(--white-30))', letterSpacing: '0.02em' }}
              >
                {brand}
                <span className="mx-4 text-lg" style={{ color: 'hsl(var(--white-10))' }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...row2, ...row2].map((brand, i) => (
              <span
                key={i}
                className="font-display font-bold text-2xl md:text-3xl mx-4 transition-colors duration-300 hover:text-cyan shrink-0"
                style={{ color: 'hsl(var(--white-30))', letterSpacing: '0.02em' }}
              >
                {brand}
                <span className="mx-4 text-lg" style={{ color: 'hsl(var(--white-10))' }}>·</span>
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
