import { pageMetadata } from "@/lib/seo";
import ContatoSection from "@/components/ContatoSection";

export const metadata = pageMetadata({
  title: "Contato — Neovanguard",
  description:
    "Fale com a Neovanguard pelo WhatsApp ou pelo formulário. Resposta rápida, sem burocracia.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main id="main">
      <ContatoSection />
    </main>
  );
}
