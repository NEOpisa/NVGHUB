import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";

export const metadata = pageMetadata({
  title: "Termos de uso",
  description: "Termos de uso do site da Neovanguard.",
  path: "/termos",
});

/* #080 · Termos de USO DO SITE (não é contrato de serviço — propostas
   comerciais são formalizadas na consulta). ⚠ Revisão do Mizael recomendada. */
export default function TermosPage() {
  return (
    <>
      <article className="panel prose">
        <span className="eyebrow">Termos de uso</span>
        <h1 className="h-lg">Termos de uso do site</h1>

        <h2>Conteúdo</h2>
        <p>
          Textos, marca e material visual deste site pertencem à Neovanguard e
          não podem ser reproduzidos sem autorização.
        </p>

        <h2>Propostas e valores</h2>
        <p>
          As informações do site têm caráter informativo. Escopo, prazos e
          valores são definidos e formalizados na consulta — nenhum conteúdo
          aqui constitui oferta vinculante.
        </p>

        <h2>Disponibilidade</h2>
        <p>
          Trabalhamos para manter o site sempre no ar, mas ele pode passar por
          manutenções sem aviso prévio.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas sobre estes termos ou sobre privacidade: use o canal de
          contato do site. Veja também a <a href="/privacidade">política de privacidade</a>.
        </p>
      </article>
      <Foot />
    </>
  );
}
