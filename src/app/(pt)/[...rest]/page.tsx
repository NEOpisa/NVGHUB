import { notFound } from "next/navigation";

/** Endereços sem página caem aqui para que o 404 use o layout do site
 * (`not-found.tsx` deste grupo), e não a página nua do `app/not-found.tsx`. */
export default function Page() {
  notFound();
}
