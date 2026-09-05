import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacidade — como tratamos seus dados",
  description:
    "Política de privacidade da Neovanguard: quais dados coletamos, por quê, e seus direitos sob a LGPD.",
  path: "/privacidade",
});

/* #080 · Política factual, espelhando os fluxos REAIS do site.
   ⚠ Revisão do responsável (Mizael) recomendada antes do deploy público. */
export default function PrivacidadePage() {
  return (
    <>
      <article className="panel prose">
        <span className="eyebrow">Privacidade · LGPD</span>
        <h1 className="h-lg">Como tratamos seus dados</h1>

        <h2>O que coletamos</h2>
        <ul>
          <li>
            <strong>Medição de audiência:</strong> estatísticas anônimas de
            navegação, sem cookies de identificação individual. É a única coisa
            que este site coleta.
          </li>
          <li>
            <strong>Nada mais.</strong> Este site deixou de ter formulários: não
            há campo de nome, e-mail ou telefone em página nenhuma, e não existe
            rota que receba dados. O pixel de campanha da Meta, que existia para
            medir anúncios, foi removido junto com a operação comercial.
          </li>
        </ul>

        <h2>O repositório de pacotes</h2>
        <p>
          O endereço <code>/repo</code> serve arquivos assinados para o gerenciador
          de pacotes de quem tem o Neovanguard OS instalado. Ele entrega arquivos
          e não recebe nada: não há login, não há identificação de máquina, e o
          que a hospedagem registra é o mesmo que qualquer servidor web registra
          ao entregar um arquivo.
        </p>

        <h2>E o sistema operacional?</h2>
        <p>
          O Neovanguard OS não envia telemetria. O registro do que a máquina faz
          vive na memória dela e não sobrevive ao desligamento. A identidade
          Nostr é sua e não passa por nenhum servidor nosso — os relays são os
          que você escolher. Nada disso depende deste site.
        </p>

        <h2>O que NÃO fazemos</h2>
        <ul>
          <li>Não vendemos nem compartilhamos seus dados com terceiros para marketing.</li>
          <li>Não enviamos e-mail em massa: você só recebe resposta ao que pediu.</li>
        </ul>

        <h2>Seus direitos (LGPD)</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados a
          qualquer momento pelo nosso canal de contato. Atendemos no prazo
          legal.
        </p>

        <h2>Retenção</h2>
        <p>
          Mensagens de contato ficam guardadas apenas pelo tempo necessário ao
          atendimento e a obrigações legais.
        </p>
      </article>

    </>
  );
}
