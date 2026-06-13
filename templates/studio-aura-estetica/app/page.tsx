import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Rituais from "./components/Rituais";
import AntesDepois from "./components/AntesDepois";
import ClubeAura from "./components/ClubeAura";
import Equipe from "./components/Equipe";
import Agendar from "./components/Agendar";
import Galeria from "./components/Galeria";
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
        <Rituais />
        <AntesDepois />
        <ClubeAura />
        <Equipe />
        <Agendar />
        <Galeria />
        <Depoimentos />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
