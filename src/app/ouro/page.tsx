import { pageMetadata } from "@/lib/seo";
import OuroExperience from "@/components/ouro/OuroExperience";

export const metadata = pageMetadata({
  title: "Ouro — a ferramenta do seu negócio no ar em até 16 dias",
  description:
    "A divisão Ouro da Neovanguard: sistemas, automações e lojas com escopo fechado e consulta objetiva. Valor apresentado na consulta.",
  path: "/ouro",
});

/**
 * DIVISÃO OURO — o chamariz: jornada própria, dourada, sobre cenário 3D
 * exclusivo (marca NV em ouro + barras em deriva). Toda a experiência vive
 * no client component; aqui ficam só metadata e o wrapper de tema.
 */
export default function OuroPage() {
  return (
    <main id="main" data-tier="ouro" className="tp tp-ouro">
      <OuroExperience />
    </main>
  );
}
