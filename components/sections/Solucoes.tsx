"use client";
import { useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TiltCard from "@/components/ui/TiltCard";
import { SOLUCOES } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export default function Solucoes() {
  const t = useT();
  const [aberto, setAberto] = useState<string | null>(null);
  return (
    <section id="solucoes" className="bg-marinho-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>{t("Soluções")}</SectionLabel>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
          {t("Engenharia em fibra de vidro de ponta a ponta")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {SOLUCOES.map((s) => {
            const open = aberto === s.id;
            return (
              <TiltCard key={s.id} className="group rounded-md">
                <div className="overflow-hidden rounded-md border border-line/10 bg-marinho">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={s.imagem} alt={s.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-marinho via-marinho/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold uppercase text-ink">{t(s.titulo)}</h3>
                    <p className="mt-2 font-body text-sm text-ink/70">{t(s.resumo)}</p>
                    <button type="button" data-cursor onClick={() => setAberto(open ? null : s.id)}
                      className="font-mono-tech mt-4 text-xs uppercase text-papoula hover:underline">
                      {open ? t("Fechar −") : t("Detalhes +")}
                    </button>
                    {open && (
                      <dl className="mt-4 space-y-3 border-t border-line/10 pt-4">
                        <div><dt className="font-mono-tech text-xs uppercase text-ink/50">{t("Funções / Aplicações")}</dt><dd className="font-body text-sm text-ink/80">{t(s.funcoes)}</dd></div>
                        <div><dt className="font-mono-tech text-xs uppercase text-ink/50">{t("Fabricação")}</dt><dd className="font-body text-sm text-ink/80">{t(s.fabricacao)}</dd></div>
                        <div><dt className="font-mono-tech text-xs uppercase text-ink/50">{t("Manutenção")}</dt><dd className="font-body text-sm text-ink/80">{t(s.manutencao)}</dd></div>
                      </dl>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
