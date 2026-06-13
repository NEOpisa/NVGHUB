import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Cardapio from "./components/Cardapio";
import Historia from "./components/Historia";
import Encomendas from "./components/Encomendas";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Overlay from "./components/Overlay";

export default function Home() {
  return (
    <CartProvider>
      <Overlay />

      <Header />

      <main>
        <div className="wrap">
          <Hero />
        </div>

        <Marquee />

        <div className="wrap">
          <Cardapio />
        </div>

        <Historia />

        <div className="wrap">
          <Encomendas />
        </div>
      </main>

      <CartSidebar />

      <Footer />

      <WhatsAppButton />
    </CartProvider>
  );
}
