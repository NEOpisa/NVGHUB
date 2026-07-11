import Link from "next/link";

// #079 · 404 na linguagem Neobsidian: mono label, hairline violeta, bevel.
export default function NotFound() {
  return (
    <main id="main" className="nf-stage">
      <div className="nf-card card-1">
        <span className="section-eyebrow">rota não mapeada</span>
        <h1 className="nf-code">404</h1>
        <p className="nf-msg">
          Esta coordenada não existe no blueprint. O caminho pode ter sido
          movido — ou nunca foi traçado.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            Voltar ao início
          </Link>
          <Link href="/solucao" className="btn-ghost">
            Consulta rápida
          </Link>
        </div>
      </div>
    </main>
  );
}
