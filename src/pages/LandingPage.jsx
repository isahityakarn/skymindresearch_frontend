import TopNavBar from '../components/TopNavBar';
import HeroSection from '../components/HeroSection';
import TrustedBySection from '../components/TrustedBySection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import InsightsSection from '../components/InsightsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="bg-dark text-white">
      <TopNavBar />
      <main className="pt-5">
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <ProcessSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
