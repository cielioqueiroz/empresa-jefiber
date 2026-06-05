"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLIDES = [
  { src: "/images/jeFiber_17.png", titulo: "Reservatório Sanepar", desc: "Içamento e instalação de reservatório PRFV em obra de saneamento." },
  { src: "/images/jeFiber_08.png", titulo: "Estação de tratamento", desc: "Tanques e tubulações em PRFV para ETA." },
  { src: "/images/jeFiber_10.png", titulo: "Bateria de reservatórios", desc: "Reservatórios PRFV em campo." },
  { src: "/images/jeFiber_20.png", titulo: "Fenasucro & Agrocana", desc: "Presença da JE FIBER em feiras do setor." },
  { src: "/images/jeFiber_31.png", titulo: "Equipe JE FIBER", desc: "Time técnico e comercial no stand." },
];

export default function Projetos() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) return;
    const t = track.current!;
    const dist = () => t.scrollWidth - window.innerWidth;
    gsap.to(t, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: wrap.current, pin: true, scrub: 1, start: "top top",
        end: () => `+=${dist()}`, invalidateOnRefresh: true,
      },
    });
  }, { scope: wrap });
  return (
    <section id="projetos" ref={wrap} className="overflow-hidden py-24 md:py-0">
      <div className="mx-auto max-w-7xl px-6 md:pt-28">
        <SectionLabel>Projetos & Clientes</SectionLabel>
      </div>
      <div ref={track} className="flex flex-col gap-6 px-6 md:mt-8 md:flex-row md:gap-8 md:px-[8vw]">
        {SLIDES.map((s) => (
          <article key={s.titulo} className="md:w-[60vw] md:shrink-0 lg:w-[42vw]">
            <div className="relative h-64 overflow-hidden rounded-md md:h-[60vh]">
              <Image src={s.src} alt={s.titulo} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">{s.titulo}</h3>
            <p className="font-body text-sm text-white/70">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
