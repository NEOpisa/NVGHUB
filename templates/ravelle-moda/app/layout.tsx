import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { site } from "./site.config";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.titulo,
  description: site.seo.descricao,
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
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
    <html lang="pt-BR" className={`${bodoni.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
