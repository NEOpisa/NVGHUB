import { DevelopmentNotes } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Novidades e estado do desenvolvimento", description: "Notas do desenvolvimento do Neovanguard OS, validações e estado da publicação das imagens NVG Live e NVG Install.", path: "/novidades" });
export default function Page() { return <DevelopmentNotes locale="pt" />; }

