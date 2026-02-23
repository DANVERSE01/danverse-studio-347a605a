import { HelmetProvider, Helmet } from 'react-helmet-async';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Craft from '@/components/sections/Craft';
import Works from '@/components/sections/Works';
import WorkModal from '@/components/sections/Works/WorkModal';
import Process from '@/components/sections/Process';
import Clients from '@/components/sections/Clients';
import Studio from '@/components/sections/Studio';
import Journal from '@/components/sections/Journal';
import FinalCTA from '@/components/sections/FinalCTA';

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

      <SmoothScroll>
        <main>
          <Hero />
          <Manifesto />
          <Craft />
          <Works />
          <Process />
          <Clients />
          <Studio />
          <Journal />
          <FinalCTA />
        </main>

        <Footer />
      </SmoothScroll>

      <WorkModal />
    </HelmetProvider>
  );
};

export default Index;
