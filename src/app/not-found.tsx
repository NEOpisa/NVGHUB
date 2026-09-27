import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <section className="panel" aria-labelledby="nf-h">
        <span className="eyebrow">Página não encontrada</span>
        <h1 id="nf-h" className="h-xl">404</h1>
        <p className="lead">
          A página solicitada não foi encontrada. Verifique o endereço ou
          volte à página inicial.
        </p>
        <div className="pill-row">
          <Link href="/" className="pill">
            Voltar ao início
            <ArrowUpRight />
          </Link>
          <Link href="/baixar" className="pill pill--ghost">
            Consultar imagens
          </Link>
        </div>
      </section>

    </>
  );
}
