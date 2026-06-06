"use client";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TiltCard from "@/components/ui/TiltCard";
import { useT } from "@/lib/i18n";

const ITENS = [
  { titulo: "Fabricação", img: "/images/jeFiber_26.jpg", desc: "Produção de tubos, conexões e reservatórios por enrolamento filamentar e laminação, sob projeto." },
  { titulo: "Instalação", img: "/images/jeFiber_17.jpg", desc: "Logística, içamento e montagem em campo com equipe técnica e equipamentos próprios." },
  { titulo: "Manutenção", img: "/images/jeFiber_03.jpg", desc: "Inspeção, reparo laminado e recuperação de estruturas em PRFV com mínima parada." },
];

export default function Servicos() {
  const t = useT();
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>{t("Serviços")}</SectionLabel>
      <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
        {t("Da fabricação à manutenção em campo")}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {ITENS.map((it) => (
          <TiltCard key={it.titulo} className="group rounded-md border border-line/10 bg-marinho">
            <div className="relative h-48 overflow-hidden">
              <Image src={it.img} alt={it.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold uppercase text-ink">{t(it.titulo)}</h3>
              <p className="mt-2 font-body text-sm text-ink/70">{t(it.desc)}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
