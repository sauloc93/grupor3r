import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R3R Crédito | Soluções Financeiras Estratégicas",
  description: "Plataforma completa de crédito do Grupo R3R. Consórcio contemplado, cartas programadas, capital de giro e home equity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--bg)", color: "var(--fg)" }}>
        {children}
      </body>
    </html>
  );
}
