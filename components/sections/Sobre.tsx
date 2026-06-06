"use client";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import TechRule from "@/components/ui/TechRule";
import Counter from "@/components/ui/Counter";
import { VALORES, NUMEROS, SOBRE_TEXTO } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export default function Sobre() {
  const t = useT();
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>{t("Nossa história")}</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Fotos da empresa com efeito sutil + selo 15+ */}
        <div className="relative">
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-2xl border border-line/10">
              <Image src="/images/jeFiber_07.jpg" alt="Fachada da sede da JE FIBER" fill className="kenburns object-cover" sizes="(max-width:768px) 60vw, 30vw" />
            </div>
            <div className="relative col-span-2 mt-10 aspect-[3/4] overflow-hidden rounded-2xl border border-line/10">
              <Image src="/images/jeFiber_29.jpg" alt="Vista aérea da fábrica e pátio de tanques" fill className="kenburns object-cover" sizes="(max-width:768px) 40vw, 20vw" />
            </div>
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl bg-papoula px-6 py-4 shadow-[0_18px_40px_rgba(255,0,0,.35)]">
            <span className="font-display text-3xl font-extrabold leading-none text-ink">15+</span>
            <p className="font-mono-tech mt-1 text-[10px] uppercase tracking-wide text-ink/90">{t("anos atuando no mercado")}</p>
          </div>
        </div>

        {/* Texto institucional */}
        <div>
          <RevealText as="h2" text={t("Como chegamos até aqui")}
            className="font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl" />
          <p className="mt-6 font-body text-ink/75">{t(SOBRE_TEXTO)}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {VALORES.map((v) => (
              <li key={v} className="font-mono-tech rounded-lg border border-line/15 px-3 py-1 text-xs uppercase text-ink/80">{t(v)}</li>
            ))}
          </ul>
          <a href="#contato" className="btn-soft btn-red mt-8 inline-block bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">
            {t("Mais informações")}
          </a>
        </div>
      </div>

      <TechRule className="my-16" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {NUMEROS.map((n) => <Counter key={n.label} to={n.valor} suffix={n.sufixo} label={t(n.label)} />)}
      </div>
    </section>
  );
}
