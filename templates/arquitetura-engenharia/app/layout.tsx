import type { Metadata } from "next";
import { Syne, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
  title: "Valença & Antunes — Arquitetura & Engenharia em São Paulo - SP",
  description:
    "Escritório de arquitetura e engenharia em São Paulo - SP. Projeto arquitetônico, estrutural, interiores e gestão de obra — do conceito à entrega das chaves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
