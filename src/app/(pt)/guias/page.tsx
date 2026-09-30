import { GuideIndex } from "@/components/seo/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Guias de Linux, Bitcoin e Nostr", description: "Guias do Neovanguard OS sobre Bitcoin, Lightning, Nostr, Liquid, Tor, VPN, LUKS, Btrfs e instalação.", path: "/guias" });
export default function Page() { return <GuideIndex locale="pt" />; }

