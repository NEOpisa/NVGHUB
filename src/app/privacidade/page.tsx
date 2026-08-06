import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";

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
            <strong>Formulários de contato e consulta:</strong> nome, e-mail,
            telefone/WhatsApp e a mensagem que você escreve. Usamos esses dados
            exclusivamente para responder ao seu pedido.
          </li>
          <li>
            <strong>Medição de audiência:</strong> estatísticas anônimas de
            navegação (sem cookies de identificação individual).
          </li>
          <li>
            <strong>Pixel de campanha (opcional):</strong> só é carregado se
            você aceitar no aviso de privacidade. Serve para medir o alcance de
            anúncios. Você pode recusar sem perder nenhuma função do site.
          </li>
        </ul>

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
      <Foot />
    </>
  );
}
