import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R3R Crédito | Soluções em Consórcio e Investimentos",
  description: "Plataforma completa de crédito sob medida do Grupo R3R.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", background: "#F5F7FA" }}>
        {children}
      </body>
    </html>
  );
}
