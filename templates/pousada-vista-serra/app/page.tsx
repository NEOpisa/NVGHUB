import Header from "./components/Header";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Acomodacoes from "./components/Acomodacoes";
import Comodidades from "./components/Comodidades";
import Galeria from "./components/Galeria";
import Depoimentos from "./components/Depoimentos";
import Reservar from "./components/Reservar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Acomodacoes />
        <Comodidades />
        <Galeria />
        <Depoimentos />
        <Reservar />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
