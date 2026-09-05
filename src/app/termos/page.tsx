import { REPO_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Termos de uso",
  description: "Termos de uso do site da Neovanguard.",
  path: "/termos",
});

/* Termos de uso do site. */
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

        <h2>Informações sobre o sistema</h2>
        <p>
          As informações do site descrevem o Neovanguard OS. Consulte o
          repositório para o código-fonte, a licença do sistema e as condições
          de distribuição.
        </p>

        <h2>Disponibilidade</h2>
        <p>
          Trabalhamos para manter o site sempre no ar, mas ele pode passar por
          manutenções sem aviso prévio.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas sobre estes termos ou sobre privacidade: use o canal de
          contato no <a href={`${REPO_URL}/issues`}>repositório do projeto</a>. Veja também a <a href="/privacidade">política de privacidade</a>.
        </p>
      </article>

    </>
  );
}
