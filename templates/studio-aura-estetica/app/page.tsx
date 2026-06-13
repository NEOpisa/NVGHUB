import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicos from "./components/Servicos";
import Fidelidade from "./components/Fidelidade";
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
        <div className="wrap">
          <Hero />
          <Servicos />
        </div>

        <Fidelidade />

        <div className="wrap">
          <Equipe />
        </div>

        <Agendar />

        <div className="wrap">
          <Galeria />
          <Depoimentos />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
