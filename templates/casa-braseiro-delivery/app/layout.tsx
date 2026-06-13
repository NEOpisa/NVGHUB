import type { Metadata } from "next";
import { Archivo_Black, Archivo } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Nome do Restaurante] — Cozinha de fogo & delivery direto",
  description:
    "Restaurante e delivery em [Bairro, Cidade - UF]. Peça direto pelo nosso site, sem taxa de marketplace, com cashback em cada pedido.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${archivoBlack.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
