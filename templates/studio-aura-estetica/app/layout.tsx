import type { Metadata, Viewport } from "next";
import { Gloock, Hanken_Grotesk } from "next/font/google";
import { site } from "./site.config";
import "./globals.css";

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.titulo,
  description: site.seo.descricao,
};

export const viewport: Viewport = {
  themeColor: "#19130e",
};

// Marca o documento como JS-ativo antes do primeiro paint, para que os
// reveals fiquem ocultos só quando o JS realmente for revelá-los.
const jsBootstrap = `document.documentElement.classList.add('js');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${gloock.variable} ${hanken.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
