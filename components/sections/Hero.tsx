"use client";
import RevealText from "@/components/ui/RevealText";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

export default function Hero() {
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setShow3D(mq.matches);
  }, []);

  return (
    <section id="topo" className="relative flex min-h-screen items-center overflow-hidden">
      {/* fundo: marinho + aurora (gradientes animados) + textura de fibra sutil */}
      <div className="absolute inset-0 -z-10 bg-marinho">
        <div className="aurora-backdrop">
          <span className="aurora aurora--a" />
          <span className="aurora aurora--b" />
          <span className="aurora aurora--c" />
        </div>
        <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,255,255,.5)_6px_7px)]" />
      </div>
      {/* ondas 3D (wireframe) */}
      <div id="hero-canvas-slot" className="absolute inset-0 -z-10">
        {show3D && <Suspense fallback={null}><HeroCanvas /></Suspense>}
      </div>
      {/* véu para legibilidade do texto à esquerda */}
      <div className="absolute inset-0 -z-10 [background:linear-gradient(90deg,#010238_0%,rgba(1,2,56,.55)_38%,transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 [background:linear-gradient(to_top,#010238,transparent)]" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-stretch gap-5">
          <span className="mt-2 w-1.5 shrink-0 bg-papoula" />
          <div className="max-w-3xl">
            <p className="font-mono-tech mb-5 text-xs uppercase text-white/70">+15 anos · PRFV / RPVC · Ipeúna/SP</p>
            <RevealText as="h1" text="TECNOLOGIA E QUALIDADE NA FABRICAÇÃO E MANUTENÇÃO"
              className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl" />
            <p className="mt-6 max-w-xl font-body text-base text-white/75 sm:text-lg">
              Produtos em fibra de vidro (PRFV/RPVC) com engenharia avançada para os setores de saneamento, químico e alimentício.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contato" data-cursor className="rounded-sm bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Fale conosco</a>
              <a href="#solucoes" data-cursor className="rounded-sm border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white">Ver soluções</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
