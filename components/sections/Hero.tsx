"use client";
import Image from "next/image";
import RevealText from "@/components/ui/RevealText";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

export default function Hero() {
  const t = useT();
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setShow3D(mq.matches);
  }, []);

  return (
    <section id="topo" className="relative flex min-h-screen items-center overflow-hidden">
      {/* foto da sede cobrindo toda a seção (segundo plano, opaca) */}
      <div className="absolute inset-0 -z-30 bg-marinho">
        <Image src="/images/jeFiber33.jpg" alt="Sede da JE FIBER em Ipeúna/SP" fill priority className="kenburns object-cover" sizes="100vw" />
      </div>
      {/* escurecimento leve — foto bem visível, com véu só à esquerda p/ legibilidade do texto */}
      <div className="absolute inset-0 -z-20 bg-marinho/30" />
      <div className="absolute inset-0 -z-20 [background:linear-gradient(90deg,rgb(var(--c-bg))_0%,rgb(var(--c-bg)/0.74)_36%,rgb(var(--c-bg)/0.12)_100%)]" />

      {/* aurora + ondas 3D (wireframe) sobrepondo a foto */}
      <div className="absolute inset-0 -z-10">
        <div className="aurora-backdrop opacity-50">
          <span className="aurora aurora--a" />
          <span className="aurora aurora--b" />
          <span className="aurora aurora--c" />
        </div>
        <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,255,255,.5)_6px_7px)]" />
      </div>
      <div id="hero-canvas-slot" className="absolute inset-0 -z-10">
        {show3D && <Suspense fallback={null}><HeroCanvas /></Suspense>}
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 [background:linear-gradient(to_top,rgb(var(--c-bg)),transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 sm:pt-24 lg:pt-0">
        <div className="flex items-stretch gap-4 sm:gap-5">
          <span className="mt-2 w-1.5 shrink-0 bg-papoula" />
          <div className="max-w-3xl">
            <p className="font-mono-tech mb-5 text-xs uppercase text-ink/70">{t("+15 anos · PRFV / RPVC · Ipeúna/SP")}</p>
            <RevealText as="h1" immediate text={t("TECNOLOGIA E QUALIDADE NA FABRICAÇÃO E MANUTENÇÃO")}
              className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink [text-shadow:0_2px_22px_rgb(var(--c-bg)),0_1px_3px_rgb(var(--c-bg))] sm:text-6xl lg:text-7xl" />
            <p className="mt-6 max-w-xl font-body text-base text-ink/75 sm:text-lg">
              {t("Produtos em fibra de vidro (PRFV/RPVC) com engenharia avançada para os setores de saneamento, químico e alimentício.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contato" className="btn-soft btn-red bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">{t("Fale conosco")}</a>
              <a href="#solucoes" className="btn-soft btn-ghost border border-line/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-ink/90 hover:border-papoula">{t("Ver soluções")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
