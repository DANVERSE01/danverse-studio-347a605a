import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

const row1 = ['DECATHLON', 'VODAFONE', 'UBER EATS', "L'ORÉAL", 'SAMSUNG', 'PEPSI', 'BOOKING.COM', 'RED BULL', 'HENKEL', 'NOON', 'NETFLIX'];
const row2 = ['GRAND HYATT', 'TOYOTA', 'MASTERCARD', 'SWAROVSKI', 'ZAIN TELECOM', 'UNILEVER', 'IBM', 'AMAZON', 'ETISALAT'];

const Clients = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section ref={ref} id="clients" className="py-32 md:py-40 overflow-hidden">
      <motion.div
        ref={inViewRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="px-6 md:px-12 lg:px-16 mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <span className="font-mono-brand text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--amber))' }}>
            Trusted by
          </span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--amber) / 0.15)' }} />
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        {/* Row 1 */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...row1, ...row1].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-xl md:text-2xl mx-6 transition-colors duration-500 hover:text-amber shrink-0 tracking-tight"
                style={{ color: 'hsl(var(--white-10))' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...row2, ...row2].map((brand, i) => (
              <span
                key={i}
                className="font-heading font-medium text-xl md:text-2xl mx-6 transition-colors duration-500 hover:text-amber shrink-0 tracking-tight"
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
