import RevealText from "@/components/ui/RevealText";

export default function Hero() {
  return (
    <section id="topo" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-marinho">
        <div className="absolute inset-0 opacity-[0.15] [background:repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,255,255,.6)_6px_7px)]" />
        <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_70%_40%,rgba(10,12,74,.9),#010238)]" />
      </div>
      <div id="hero-canvas-slot" className="absolute inset-0 -z-10" />

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
