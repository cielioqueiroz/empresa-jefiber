import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionLabel from "@/components/ui/SectionLabel";
import { EMPRESA, VALORES, NUMEROS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "A Empresa — JE FIBER",
  description: "Conheça a JE FIBER: especialista em produtos de fibra de vidro (PRFV/RPVC) com parque fabril avançado, +15 anos de experiência em saneamento e indústria.",
};

export default function EmpresaPage() {
  return (
    <main className="bg-marinho">
      <Header />
      <PageHero titulo="A Empresa" crumb="Empresa" imagem="/images/jeFiber_07.jpg" />

      {/* Sobre a Empresa — 2 colunas + foto */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionLabel>Sobre a Empresa</SectionLabel>
        <div className="grid gap-8 md:grid-cols-2">
          {EMPRESA.intro.map((p, i) => (
            <p key={i} className="font-body text-base leading-relaxed text-ink/75">{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {VALORES.map((v) => (
            <span key={v} className="rounded-full border border-line/15 px-4 py-1.5 font-mono-tech text-xs uppercase text-ink/80">{v}</span>
          ))}
        </div>
      </section>

      {/* Excelência e Solidez — foto + texto */}
      <section className="border-y border-line/10 bg-marinho-2/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/10">
            <Image src="/images/jeFiber_07.jpg" alt="Parque fabril da JE FIBER" fill className="kenburns object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-marinho/50 to-transparent" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">{EMPRESA.destaqueTitulo}</h2>
            <span className="mt-4 block h-1 w-14 bg-papoula" />
            <div className="mt-6 space-y-4">
              {EMPRESA.destaque.map((p, i) => (
                <p key={i} className="font-body text-base leading-relaxed text-ink/75">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {NUMEROS.map((n) => (
            <div key={n.label} className="rounded-2xl border border-line/10 bg-marinho-2/30 p-8 text-center">
              <p className="font-display text-5xl font-black text-papoula">{n.valor}{n.sufixo}</p>
              <p className="mt-2 font-body text-sm text-ink/70">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mídia — Fenasucro */}
      <section className="border-t border-line/10 bg-marinho-2/40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <SectionLabel>Mídia</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase leading-tight text-ink sm:text-3xl">{EMPRESA.midiaTitulo}</h2>
              <span className="mt-3 block h-1 w-12 bg-papoula" />
              <p className="mt-5 font-body text-base leading-relaxed text-ink/75">{EMPRESA.midiaResumo}</p>
              <Link href="/#contato" className="btn-soft btn-red mt-7 inline-block bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">Fale conosco</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {EMPRESA.midiaFotos.map((src, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line/10">
                  <Image src={src} alt={`${EMPRESA.midiaTitulo} — ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
