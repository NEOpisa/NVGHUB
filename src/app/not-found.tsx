import Link from "next/link";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <section className="panel" aria-labelledby="nf-h">
        <span className="eyebrow">Rota não mapeada</span>
        <h1 id="nf-h" className="h-xl">404</h1>
        <p className="lead">
          Esta coordenada não existe por aqui. O caminho pode ter sido movido —
          ou nunca foi traçado.
        </p>
        <div className="pill-row">
          <Link href="/" className="pill">
            Voltar ao início
            <ArrowUpRight />
          </Link>
          <Link href="/baixar" className="pill pill--ghost">
            Baixar o sistema
          </Link>
        </div>
      </section>
      <Foot />
    </>
  );
}
