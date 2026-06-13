import Header from "./components/Header";
import Hero from "./components/Hero";
import AreasAtuacao from "./components/AreasAtuacao";
import Socios from "./components/Socios";
import Calculadora from "./components/Calculadora";
import Insights from "./components/Insights";
import Contato from "./components/Contato";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AreasAtuacao />
        <Socios />
        <Calculadora />
        <Insights />
        <Contato />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
