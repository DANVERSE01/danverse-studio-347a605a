import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

const row1 = ['DECATHLON', 'VODAFONE', 'UBER EATS', "L'ORÉAL", 'SAMSUNG', 'PEPSI', 'BOOKING.COM', 'RED BULL', 'HENKEL', 'NOON', 'NETFLIX'];
const row2 = ['GRAND HYATT', 'TOYOTA', 'MASTERCARD', 'SWAROVSKI', 'ZAIN TELECOM', 'UNILEVER', 'IBM', 'AMAZON', 'ETISALAT'];

const Clients = forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, isInView } = useInView(0.1);

  return (
    <section
      ref={ref}
      id="clients"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: 'hsl(var(--section-warm-black))' }}
    >
      {/* Giant background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-display-alt font-extrabold uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(10rem, 28vw, 28rem)',
            color: 'hsl(var(--cream) / 0.02)',
          }}
        >
          TRUST
        </span>
      </div>

      <div className="px-6 md:px-20 lg:px-28 mb-20">
        <motion.div ref={inViewRef} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-mono-brand text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--sage))' }}>
              Trusted by
            </span>
            <div className="w-16 h-px" style={{ background: 'hsl(var(--sage) / 0.15)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
            <span className="font-script italic font-light tracking-[0.01em] shimmer-text" style={{ fontSize: 'var(--text-section)' }}>
              Global
            </span>
            <span className="font-display-alt font-extrabold uppercase tracking-[-0.04em] shimmer-stroke" style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              WebkitTextStroke: '1.5px hsl(var(--sage) / 0.4)',
              WebkitTextFillColor: 'transparent',
            }}>
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
                className="font-display-alt font-bold text-xl md:text-3xl mx-8 md:mx-12 transition-colors duration-500 hover:text-coral shrink-0 tracking-[0.05em] uppercase"
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
                className="font-script italic text-2xl md:text-4xl mx-8 md:mx-12 transition-colors duration-500 hover:text-sage shrink-0"
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
