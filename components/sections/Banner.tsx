import Image from "next/image";

/** Banner full-width com foto da empresa + efeito ken-burns sutil. */
export default function Banner() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/jeFiber_16.png"
          alt="Tubos PRFV fabricados pela JE FIBER"
          fill
          priority={false}
          className="kenburns object-cover"
          sizes="100vw"
        />
        {/* overlays para contraste e identidade */}
        <div className="absolute inset-0 [background:linear-gradient(90deg,#010238_0%,rgba(1,2,56,.75)_45%,rgba(1,2,56,.35)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 [background:linear-gradient(to_bottom,#010238,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 [background:linear-gradient(to_top,#010238,transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-stretch gap-5">
          <span className="mt-2 w-1.5 shrink-0 bg-papoula" />
          <div className="max-w-2xl">
            <p className="font-mono-tech mb-4 text-xs uppercase text-papoula">Tecnologia e qualidade</p>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Produtos em fibra de vidro
            </h2>
            <p className="mt-6 max-w-xl font-body text-base text-white/80 sm:text-lg">
              Reservatórios, tubos, conexões e estações de tratamento em PRFV/RPVC — engenharia
              avançada, alta resistência química e longa vida útil para saneamento e indústria.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#solucoes" className="btn-soft btn-red bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">Ver soluções</a>
              <a href="#contato" className="btn-soft btn-ghost border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white">Fale conosco</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
