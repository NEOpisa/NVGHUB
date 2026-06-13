import Hero from "./Hero";
import VideoSection from "./VideoSection";
import PainGrid from "./PainGrid";
import Curriculum from "./Curriculum";
import Expert from "./Expert";
import Testimonials from "./Testimonials";
import BonusSection from "./BonusSection";
import Guarantee from "./Guarantee";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

interface SalesViewProps {
  onPurchase: () => void;
}

export default function SalesView({ onPurchase }: SalesViewProps) {
  return (
    <div className="view active" id="salesView">
      <Hero />
      <VideoSection />
      <PainGrid />
      <Curriculum />
      <Expert />
      <Testimonials />
      <BonusSection />
      <Guarantee />
      <PricingSection onPurchase={onPurchase} />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
