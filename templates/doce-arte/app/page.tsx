import { StoreProvider } from "@/app/context/StoreContext";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Strip from "@/app/components/Strip";
import Bestsellers from "@/app/components/Bestsellers";
import Cardapio from "@/app/components/Cardapio";
import Historia from "@/app/components/Historia";
import Pedido from "@/app/components/Pedido";
import Fidelidade from "@/app/components/Fidelidade";
import Encomendas from "@/app/components/Encomendas";
import Info from "@/app/components/Info";
import Footer from "@/app/components/Footer";
import Modals from "@/app/components/Modals";
import Toast from "@/app/components/Toast";

export default function Home() {
  return (
    <StoreProvider>
      <Header />
      <Hero />
      <Strip />
      <Bestsellers />
      <Cardapio />
      <Historia />
      <Pedido />
      <Fidelidade />
      <Encomendas />
      <Info />
      <Footer />
      <Modals />
      <Toast />
    </StoreProvider>
  );
}
