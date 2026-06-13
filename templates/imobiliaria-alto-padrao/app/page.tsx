import Header from "./components/Header";
import Hero from "./components/Hero";
import Destaques from "./components/Destaques";
import Bairros from "./components/Bairros";
import Diferenciais from "./components/Diferenciais";
import Processo from "./components/Processo";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Destaques />
        <Bairros />
        <Diferenciais />
        <Processo />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
