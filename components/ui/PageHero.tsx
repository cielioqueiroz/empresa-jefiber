import Image from "next/image";
import Link from "next/link";

/** Banner padrão das subpáginas: foto de fundo (opaca) + breadcrumb + título. */
export default function PageHero({
  titulo,
  crumb,
  imagem = "/images/jeFiber_16.png",
}: {
  titulo: string;
  crumb: string;
  imagem?: string;
}) {
  return (
    <section className="relative flex min-h-[44vh] items-end overflow-hidden pt-32">
      <div className="absolute inset-0 -z-10">
        <Image src={imagem} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-marinho/80" />
        <div className="absolute inset-0 [background:linear-gradient(to_top,#010238_4%,rgba(1,2,56,.4))]" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wide text-white/60">
          <Link href="/" className="transition-colors hover:text-papoula">JE FIBER</Link>
          <span className="text-papoula">/</span>
          <span className="text-white/80">{crumb}</span>
        </div>
        <h1 className="mt-3 flex items-end gap-4 font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="mb-1 h-10 w-1.5 shrink-0 bg-papoula sm:h-12" />
          {titulo}
        </h1>
      </div>
    </section>
  );
}
