import { pageMetadata } from "@/lib/seo";
import MenuView from "@/app/menu/MenuView";

export const metadata = pageMetadata({
  title: "Menu — Neovanguard",
  description:
    "Navegue pela Neovanguard: pacotes, quem somos, perguntas frequentes, contato e sua solução.",
  path: "/menu",
});

export default function MenuPage() {
  return <MenuView />;
}
