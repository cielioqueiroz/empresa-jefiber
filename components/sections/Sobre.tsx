import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import TechRule from "@/components/ui/TechRule";
import Counter from "@/components/ui/Counter";
import { VALORES, NUMEROS } from "@/lib/constants";

export default function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>Sobre a JE FIBER</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <RevealText as="h2" text="Uma jornada de excelência em fibra de vidro"
            className="font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl" />
          <p className="mt-6 font-body text-white/75">
            Há mais de 15 anos, a JE FIBER projeta, fabrica e mantém produtos em PRFV/RPVC com tecnologia e engenharia de ponta — reservatórios, tubos, conexões e estações de tratamento de água e esgoto.
          </p>
          <p className="mt-4 font-body text-white/70">
            Atendemos os setores de saneamento, químico e alimentício, com soluções sob medida e foco em durabilidade, segurança e desempenho.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {VALORES.map((v) => (
              <li key={v} className="font-mono-tech rounded-sm border border-white/15 px-3 py-1 text-xs uppercase text-white/80">{v}</li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src="/images/jeFiber_27.png" alt="Engenheiros analisando o projeto técnico" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
      </div>
      <TechRule className="my-16" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {NUMEROS.map((n) => <Counter key={n.label} to={n.valor} suffix={n.sufixo} label={n.label} />)}
      </div>
    </section>
  );
}
