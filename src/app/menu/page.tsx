import { pageMetadata } from "@/lib/seo";
import MenuView from "@/app/menu/MenuView";

export const metadata = pageMetadata({
  title: "Menu — Neovanguard",
  description:
    "Navegue pela Neovanguard: sua solução, quem somos, perguntas frequentes e contato.",
  path: "/menu",
});

export default function MenuPage() {
  return <MenuView />;
}
