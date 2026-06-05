import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TiltCard from "@/components/ui/TiltCard";

const ITENS = [
  { titulo: "Fabricação", img: "/images/jeFiber_26.png", desc: "Produção de tubos, conexões e reservatórios por enrolamento filamentar e laminação, sob projeto." },
  { titulo: "Instalação", img: "/images/jeFiber_17.png", desc: "Logística, içamento e montagem em campo com equipe técnica e equipamentos próprios." },
  { titulo: "Manutenção", img: "/images/jeFiber_03.png", desc: "Inspeção, reparo laminado e recuperação de estruturas em PRFV com mínima parada." },
];

export default function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>Serviços</SectionLabel>
      <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
        Da fabricação à manutenção em campo
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {ITENS.map((it) => (
          <TiltCard key={it.titulo} className="group rounded-md border border-white/10 bg-marinho">
            <div className="relative h-48 overflow-hidden">
              <Image src={it.img} alt={it.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold uppercase text-white">{it.titulo}</h3>
              <p className="mt-2 font-body text-sm text-white/70">{it.desc}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
