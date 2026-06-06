import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeoVanguard — Agência de Soluções Digitais",
  description:
    "Criamos sites e sistemas para pequenos negócios locais. Site pronto em até 7 dias. Você aparece no Google, seus clientes chegam.",
  openGraph: {
    title: "NeoVanguard — Agência de Soluções Digitais",
    description:
      "Criamos sites e sistemas para pequenos negócios locais. Site pronto em até 7 dias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Orbitron:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
