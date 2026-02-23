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

const Index = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>DANVERSE — AI-Powered Creative Studio | Cairo</title>
        <meta name="description" content="Premium creative studio engineering cinematic brands at the intersection of AI, design, and culture. Cairo × Global." />
        <meta property="og:title" content="DANVERSE — AI-Powered Creative Studio" />
        <meta property="og:description" content="We engineer cinematic universes. AI-powered creative studio based in Cairo." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://danverse.studio" />
      </Helmet>

      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <SectionDivider variant="expanding-line" accent="coral" />

        <Manifesto />

        <SectionDivider variant="morph-wave" accent="sage" />

        <SectionReveal variant="clip-diagonal">
          <Craft />
        </SectionReveal>

        <SectionDivider variant="diamond" accent="coral" />

        <SectionReveal variant="scale-fade">
          <Works />
        </SectionReveal>

        <SectionDivider variant="orbiting-dots" accent="sage" />

        <SectionReveal variant="slide-rotate">
          <Process />
        </SectionReveal>

        <SectionDivider variant="gradient-wipe" accent="lavender" />

        <SectionReveal variant="clip-up">
          <Clients />
        </SectionReveal>

        <SectionDivider variant="expanding-line" accent="sage" />

        <SectionReveal variant="fade-up">
          <Studio />
        </SectionReveal>

        <SectionDivider variant="morph-wave" accent="coral" />

        <SectionReveal variant="clip-diagonal">
          <Journal />
        </SectionReveal>

        <SectionDivider variant="diamond" accent="lavender" />

        <SectionReveal variant="scale-fade">
          <FinalCTA />
        </SectionReveal>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default Index;
