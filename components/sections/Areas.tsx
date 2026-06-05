import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { AREAS } from "@/lib/constants";

const ICONS = [
  // Açúcar e Álcool
  <path key="0" d="M12 2c3 4 5 6.5 5 9.5A5 5 0 0 1 7 11.5C7 8.5 9 6 12 2Z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  // Químicas (erlenmeyer)
  <path key="1" d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  // Alimentos (caixa)
  <path key="2" d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  // Papel e celulose (documento)
  <path key="3" d="M7 3h7l4 4v14H7V3Zm7 0v4h4M9.5 12h6M9.5 16h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  // Petroquímica (gota)
  <path key="4" d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  // Saneamento (ondas)
  <path key="5" d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
];

export default function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden py-24 md:py-32">
      {/* foto de fundo com overlay marinho */}
      <div className="absolute inset-0 -z-10">
        <Image src="/images/jeFiber_14.png" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-marinho/92" />
        <div className="absolute inset-0 [background:radial-gradient(70%_60%_at_50%_0%,rgba(10,12,74,.6),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Áreas de atuação</SectionLabel>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Áreas em que atuamos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <article
              key={a.nome}
              className="group rounded-2xl border border-white/10 bg-marinho-2/40 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-papoula/40 hover:shadow-[0_20px_50px_rgba(0,0,0,.4)]"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-papoula text-white transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">{ICONS[i % ICONS.length]}</svg>
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white">{a.nome}</h3>
              <ul className="mt-4 space-y-2.5">
                {a.itens.map((it) => (
                  <li key={it} className="flex gap-2 font-body text-sm text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-papoula" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
