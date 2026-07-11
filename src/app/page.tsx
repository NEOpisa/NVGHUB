import NovaHome from "@/components/nova/NovaHome";
import ExitNudge from "@/components/journey/ExitNudge";

/**
 * HOME NOVA — content-first: zero loader, texto no DOM desde o primeiro
 * paint, e UM canvas fixo carregando todo o show (a marca NV em bismuto).
 * Scroll nativo; quatro capitulos: heroi -> manifesto -> divisoes -> chamada.
 */
export default function Home() {
  return (
    <main id="main" className="home">
      <NovaHome />
      <ExitNudge />
    </main>
  );
}
