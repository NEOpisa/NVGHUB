import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicos from "./components/Servicos";
import Diferenciais from "./components/Diferenciais";
import Processo from "./components/Processo";
import Depoimentos from "./components/Depoimentos";
import Orcamento from "./components/Orcamento";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Diferenciais />
        <Processo />
        <Depoimentos />
        <Orcamento />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
