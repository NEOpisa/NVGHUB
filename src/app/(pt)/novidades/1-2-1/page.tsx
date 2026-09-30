import { DevelopmentNotes } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "1.2.1 em preparação", description: "Mudanças documentadas da versão 1.2.1 do Neovanguard OS, limites da validação e status das ISOs ainda não publicadas.", path: "/novidades/1-2-1" });
export default function Page() { return <DevelopmentNotes locale="pt" detail />; }

