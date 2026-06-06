import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionLabel from "@/components/ui/SectionLabel";
import { SERVICOS_DETALHE } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICOS_DETALHE.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const servico = SERVICOS_DETALHE.find((s) => s.slug === slug);
  if (!servico) return { title: "Serviço — JE FIBER" };
  return { title: `${servico.titulo} — JE FIBER`, description: servico.descricao[0] };
}

export default async function ServicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servico = SERVICOS_DETALHE.find((s) => s.slug === slug);
  if (!servico) notFound();
  const relacionados = SERVICOS_DETALHE.filter((s) => s.slug !== servico.slug);

  return (
    <main className="bg-marinho">
      <Header />
      <PageHero titulo={servico.titulo} crumb="Serviços" imagem="/images/jeFiber_13.png" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
            <Image src={servico.imagem} alt={servico.titulo} fill className="kenburns object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-marinho/40 to-transparent" />
          </div>
          <div>
            <SectionLabel>Serviços</SectionLabel>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">{servico.titulo}</h2>
            <span className="mt-4 block h-1 w-14 bg-papoula" />
            <div className="mt-6 space-y-4">
              {servico.descricao.map((p, i) => (
                <p key={i} className="font-body text-base leading-relaxed text-white/75">{p}</p>
              ))}
            </div>
            <Link href="/#contato" className="btn-soft btn-red mt-7 inline-block bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">Fale conosco</Link>
          </div>
        </div>

        {/* serviços relacionados */}
        <div className="mt-20">
          <SectionLabel>Serviços Relacionados</SectionLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((s) => (
              <Link key={s.slug} href={`/servicos/${s.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-marinho-2/30 transition-all hover:-translate-y-1 hover:border-papoula/50">
                <div className="relative h-40 overflow-hidden">
                  <Image src={s.imagem} alt={s.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-marinho via-marinho/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-bold uppercase text-white">{s.titulo}</h3>
                  <span className="font-mono-tech mt-2 inline-block text-xs uppercase text-papoula group-hover:underline">Saiba mais →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
