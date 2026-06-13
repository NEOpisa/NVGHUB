import type { Metadata } from "next";
import { Italiana, Karla } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Nome do Studio] — Estética & Beleza em [Cidade]",
  description:
    "Studio de estética em [Cidade]. Sobrancelhas, cílios, skincare e nails. Agende online sem taxas, com lembrete no WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${italiana.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
