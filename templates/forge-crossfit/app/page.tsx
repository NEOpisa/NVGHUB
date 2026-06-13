import { StoreProvider } from "@/app/context/StoreContext";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import VoltStripe from "@/app/components/VoltStripe";
import Porque from "@/app/components/Porque";
import AreaAluno from "@/app/components/AreaAluno";
import Dashboard from "@/app/components/Dashboard";
import Modalidades from "@/app/components/Modalidades";
import Planos from "@/app/components/Planos";
import Horarios from "@/app/components/Horarios";
import Professores from "@/app/components/Professores";
import Depoimentos from "@/app/components/Depoimentos";
import Experimental from "@/app/components/Experimental";
import Blog from "@/app/components/Blog";
import Footer from "@/app/components/Footer";
import Modals from "@/app/components/Modals";
import Toast from "@/app/components/Toast";

export default function Home() {
  return (
    <StoreProvider>
      <Nav />
      <Hero />
      <VoltStripe />
      <Porque />
      <AreaAluno />
      <Dashboard />
      <Modalidades />
      <Planos />
      <Horarios />
      <Professores />
      <Depoimentos />
      <Experimental />
      <Blog />
      <Footer />
      <Modals />
      <Toast />
    </StoreProvider>
  );
}
