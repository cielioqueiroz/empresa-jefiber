import type { Metadata } from "next";
import { Archivo, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import CustomCursor from "@/components/layout/CustomCursor";

const archivo = Archivo({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-archivo" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "JE FIBER — Produtos em fibra de vidro PRFV/RPVC",
  description: "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro. Reservatórios, tubos, conexões e estações de tratamento (ETA/ETE).",
  openGraph: {
    title: "JE FIBER — Produtos em fibra de vidro",
    description: "+15 anos em PRFV/RPVC para saneamento, químico e alimentício.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
