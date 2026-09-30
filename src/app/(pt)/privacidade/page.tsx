import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacidade",
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
        <h1 className="h-lg">Política de privacidade</h1>

        <h2>O que coletamos</h2>
        <ul>
          <li>
            <strong>Medição de audiência:</strong> estatísticas anônimas de
            navegação, sem cookies de identificação individual.
          </li>
          <li>
            <strong>Formulários:</strong> o site não possui formulários para
            envio de nome, e-mail ou telefone.
          </li>
        </ul>

        <h2>O repositório de pacotes</h2>
        <p>
          O endereço <code>/repo</code> distribui pacotes assinados sem exigir
          login ou identificador da instalação. O acesso aos arquivos pode
          gerar registros na hospedagem, como em outros serviços web.
        </p>

        <h2>Sistema operacional</h2>
        <p>
          O Neovanguard OS não envia telemetria. Por padrão, os logs do sistema
          ficam em RAM e são descartados ao desligar. Os relays usados pela
          identidade Nostr são definidos pelo usuário, independentemente
          deste site.
        </p>

        <h2>Uso dos dados</h2>
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
