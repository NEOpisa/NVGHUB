import Header from "./components/Header";
import Hero from "./components/Hero";
import Especialidades from "./components/Especialidades";
import Sobre from "./components/Sobre";
import Equipe from "./components/Equipe";
import Depoimentos from "./components/Depoimentos";
import Galeria from "./components/Galeria";
import Agendar from "./components/Agendar";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="wrap">
          <Hero />
          <Especialidades />
        </div>
        <Sobre />
        <div className="wrap">
          <Equipe />
          <Depoimentos />
          <Galeria />
        </div>
        <Agendar />
        <div className="wrap">
          <Blog />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
