import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Provador from "./components/Provador";
import Vitrine from "./components/Vitrine";
import Manifesto from "./components/Manifesto";
import Lookbook from "./components/Lookbook";
import Depoimentos from "./components/Depoimentos";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Provador />
        <Vitrine />
        <Manifesto />
        <Lookbook />
        <Depoimentos />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
