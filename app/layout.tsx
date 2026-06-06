import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { LangProvider } from "@/lib/i18n";

const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jefiber.com.br"),
  title: "JE FIBER — Produtos em fibra de vidro PRFV/RPVC",
  description: "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro. Reservatórios, tubos, conexões e estações de tratamento (ETA/ETE).",
  keywords: ["fibra de vidro", "PRFV", "RPVC", "reservatórios", "tubos e conexões", "ETA", "ETE", "saneamento", "Ipeúna"],
  openGraph: {
    title: "JE FIBER — Produtos em fibra de vidro",
    description: "+15 anos em PRFV/RPVC para saneamento, químico e alimentício.",
    type: "website",
    locale: "pt_BR",
    siteName: "JE FIBER",
  },
  twitter: {
    card: "summary_large_image",
    title: "JE FIBER — Produtos em fibra de vidro",
    description: "+15 anos em PRFV/RPVC para saneamento, químico e alimentício.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('jefiber-theme')==='light')document.documentElement.classList.add('light')}catch(e){}" }} />
        <LangProvider>
          <SmoothScroll>
            {children}
            <WhatsAppFloat />
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
