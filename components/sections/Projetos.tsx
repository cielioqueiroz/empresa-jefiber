import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const SLIDES = [
  { src: "/images/jeFiber_17.png", titulo: "Reservatório Sanepar", desc: "Içamento e instalação de reservatório PRFV em obra de saneamento." },
  { src: "/images/jeFiber_08.png", titulo: "Estação de tratamento", desc: "Tanques e tubulações em PRFV para ETA." },
  { src: "/images/jeFiber_10.png", titulo: "Bateria de reservatórios", desc: "Reservatórios PRFV em campo." },
  { src: "/images/jeFiber_20.png", titulo: "Fenasucro & Agrocana", desc: "Presença da JE FIBER em feiras do setor." },
  { src: "/images/jeFiber_31.png", titulo: "Equipe JE FIBER", desc: "Time técnico e comercial no stand." },
  { src: "/images/jeFiber_29.png", titulo: "Unidade fabril", desc: "Vista aérea da fábrica e pátio de tanques." },
];

export default function Projetos() {
  // duplicado para o loop contínuo (a animação translada -50%)
  const loop = [...SLIDES, ...SLIDES];
  return (
    <section id="projetos" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Projetos & Clientes</SectionLabel>
        <h2 className="mb-3 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Obras realizadas e presença no setor
        </h2>
        <p className="font-body text-sm text-white/55">Passe o mouse sobre o carrossel para pausar.</p>
      </div>

      <div className="proj-marquee mt-10">
        <div className="proj-track">
          {loop.map((s, i) => (
            <article
              key={i}
              aria-hidden={i >= SLIDES.length}
              className="group w-[280px] shrink-0 transition-transform duration-300 hover:-translate-y-1.5 sm:w-[360px]"
            >
              <div className="relative h-60 overflow-hidden rounded-xl border border-white/10 sm:h-72">
                <Image
                  src={s.src}
                  alt={s.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marinho via-marinho/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-bold uppercase text-white">{s.titulo}</h3>
                  <p className="mt-1 font-body text-sm text-white/75">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
