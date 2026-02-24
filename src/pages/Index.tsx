import { HelmetProvider, Helmet } from 'react-helmet-async';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Craft from '@/components/sections/Craft';
import Works from '@/components/sections/Works';
import Process from '@/components/sections/Process';
import Clients from '@/components/sections/Clients';
import Studio from '@/components/sections/Studio';
import Journal from '@/components/sections/Journal';
import FinalCTA from '@/components/sections/FinalCTA';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionDivider from '@/components/ui/SectionDivider';
import { useLenis } from '@/hooks/useLenis';

const Index = () => {
  useLenis();
  return (
    <HelmetProvider>
      <Helmet>
        <title>DANVERSE — AI-Powered Creative Studio</title>
        <meta name="description" content="Premium creative studio engineering cinematic brands at the intersection of AI, design, and culture." />
        <meta property="og:title" content="DANVERSE — AI-Powered Creative Studio" />
        <meta property="og:description" content="We engineer cinematic universes. AI-powered creative studio at the intersection of technology, culture & obsessive craft." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://danverse.ai" />
      </Helmet>

      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <SectionDivider variant="expanding-line" accent="rose-gold" />

        <Manifesto />

        <SectionDivider variant="morph-wave" accent="platinum" />

        <SectionReveal variant="clip-diagonal">
          <Craft />
        </SectionReveal>

        <SectionDivider variant="diamond" accent="rose-gold" />

        <SectionReveal variant="scale-fade">
          <Works />
        </SectionReveal>

        <SectionDivider variant="orbiting-dots" accent="platinum" />

        <SectionReveal variant="slide-rotate">
          <Process />
        </SectionReveal>

        <SectionDivider variant="gradient-wipe" accent="rose-gold" />

        <SectionReveal variant="clip-up">
          <Clients />
        </SectionReveal>

        <SectionDivider variant="expanding-line" accent="platinum" />

        <SectionReveal variant="fade-up">
          <Studio />
        </SectionReveal>

        <SectionDivider variant="morph-wave" accent="rose-gold" />

        <SectionReveal variant="clip-diagonal">
          <Journal />
        </SectionReveal>

        <SectionDivider variant="diamond" accent="platinum" />

        <SectionReveal variant="scale-fade">
          <FinalCTA />
        </SectionReveal>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default Index;
