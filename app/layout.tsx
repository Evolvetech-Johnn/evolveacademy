import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Evolveacademy - Plataforma de Cursos da EvolveTech Solutions",
  description: "Cursos online práticos da EvolveTech Solutions, começando pelo Curso de Marketing: do Zero ao Avançado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
