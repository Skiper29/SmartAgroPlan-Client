import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import SolutionOverview from '../components/SolutionOverview';
import KeyFeatures from '../components/KeyFeatures';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import DemoPreview from '../components/DemoPreview';
import Testimonials from '../components/Testimonials';
import PricingPreview from '../components/PricingPreview';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemStatement />
        <SolutionOverview />
        <KeyFeatures />
        <HowItWorks />
        <Benefits />
        <DemoPreview />
        <Testimonials />
        <PricingPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
