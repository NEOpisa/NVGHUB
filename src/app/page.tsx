import Journey from "@/components/journey/Journey";
import ExitNudge from "@/components/journey/ExitNudge";

/**
 * Home = jornada 3D contínua (canvas único + overlay storytelling).
 * A intro clássica com a bifurcação Ouro | Platina como destino final.
 * Todo o conteúdo textual permanece no DOM (SEO/acessibilidade).
 */
export default function Home() {
  return (
    <main id="main" className="home home-journey">
      <Journey />
      <ExitNudge />
    </main>
  );
}
