import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Disciplinas from "./components/Disciplinas";
import Projetos from "./components/Projetos";
import Gallery from "./components/Gallery";
import Numeros from "./components/Numeros";
import Processo from "./components/Processo";
import Sobre from "./components/Sobre";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <section id="disciplinas">
          <div className="wrap">
            <Disciplinas />
          </div>
        </section>
        <section id="projetos">
          <div className="wrap">
            <Projetos />
            <Gallery />
          </div>
        </section>
        <Numeros />
        <section id="processo">
          <div className="wrap">
            <Processo />
          </div>
        </section>
        <Sobre />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
