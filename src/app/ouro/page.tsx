import { pageMetadata } from "@/lib/seo";
import OuroExperience from "@/components/ouro/OuroExperience";

export const metadata = pageMetadata({
  title: "Ouro — seu negócio no ar, vendendo, em até 16 dias",
  description:
    "A divisão Ouro da Neovanguard: sites, sistemas e e-commerce com escopo claro e consulta objetiva. Valor apresentado na consulta.",
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
