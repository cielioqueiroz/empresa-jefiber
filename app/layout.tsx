import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

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
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>
          {children}
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
