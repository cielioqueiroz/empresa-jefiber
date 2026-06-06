import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import { DOWNLOADS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Downloads — JE FIBER",
  description: "Catálogos técnicos da JE FIBER em PDF: reservatórios, tubos e conexões e estações de tratamento.",
};

const IcPdf = (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="text-papoula">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
    <path d="M9 13h6M9 16h4" strokeLinecap="round" />
  </svg>
);
const IcDown = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function DownloadsPage() {
  return (
    <main className="bg-marinho">
      <Header />
      <PageHero titulo="Downloads" crumb="Download" imagem="/images/jeFiber_18.png" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-mono-tech text-xs uppercase text-papoula">Todos · {DOWNLOADS.length} arquivos</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOWNLOADS.map((d) => (
            <a key={d.arquivo} href={d.arquivo} target="_blank" rel="noopener noreferrer" download
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-marinho-2/40 p-5 transition-all hover:-translate-y-1 hover:border-papoula/50 hover:shadow-[0_18px_40px_rgba(0,0,0,.35)]">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-marinho">{IcPdf}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-base font-bold text-white">{d.nome}</span>
                <span className="font-mono-tech text-xs uppercase text-white/50">PDF · {d.tamanho}</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-papoula text-white transition-transform group-hover:-translate-y-0.5">{IcDown}</span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
