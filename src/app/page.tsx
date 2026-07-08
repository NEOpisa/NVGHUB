import Voyage from "@/components/voyage/Voyage";

/**
 * Home = VOYAGE — a jornada 3D reconstruída (neobsidian + blueprint).
 * Vestíbulo neutro que apresenta o DNA e bifurca nas divisões Ouro | Platina.
 * Todo o conteúdo textual permanece no DOM (SEO/acessibilidade).
 */
export default function Home() {
  return (
    <main id="main" className="home home-voyage">
      <Voyage />
    </main>
  );
}
