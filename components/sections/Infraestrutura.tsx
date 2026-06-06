"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/motion";
import { useT } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOTOS = [
  { src: "/images/jeFiber_29.jpg", alt: "Vista aérea da fábrica e pátio de tanques", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/jeFiber_11.jpg", alt: "Fachada da fábrica JE FIBER", span: "" },
  { src: "/images/jeFiber_26.jpg", alt: "Interior do galpão de produção", span: "" },
  { src: "/images/jeFiber_13.png", alt: "Vista aérea lateral da unidade", span: "" },
];

export default function Infraestrutura() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "bottom top" } });
    });
  }, { scope: ref });
  return (
    <section id="infraestrutura" ref={ref} className="bg-marinho-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>{t("Infraestrutura")}</SectionLabel>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
          {t("Estrutura industrial preparada para grandes obras")}
        </h2>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {FOTOS.map((f) => (
            <div key={f.src} className={`relative overflow-hidden rounded-md ${f.span}`}>
              <Image src={f.src} alt={f.alt} fill className="parallax-img scale-110 object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
