import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import { PRODUTOS } from "@/lib/constants";

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const produto = PRODUTOS.find((p) => p.slug === slug);
  if (!produto) return { title: "Produto — JE FIBER" };
  return { title: `${produto.titulo} — JE FIBER`, description: produto.resumo };
}

const Check = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true" className="mt-0.5 shrink-0 text-papoula"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Coluna({ titulo, itens }: { titulo: string; itens: readonly string[] }) {
  return (
    <div className="rounded-xl border border-line/10 bg-marinho-2/40 p-6 transition-colors hover:border-papoula/40">
      <h3 className="font-display text-lg font-bold uppercase text-ink">{titulo}</h3>
      <span className="mt-2 block h-0.5 w-10 bg-papoula" />
      <ul className="mt-4 space-y-3">
        {itens.map((it) => (
          <li key={it} className="flex gap-2.5 font-body text-sm text-ink/75"><Check />{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const produto = PRODUTOS.find((p) => p.slug === slug);
  if (!produto) notFound();

  return (
    <main className="bg-marinho">
      <Header />
      <PageHero titulo={produto.titulo} crumb="Produtos" imagem="/images/jeFiber_16.jpg" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* menu lateral de produtos */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono-tech text-xs uppercase text-papoula">Nossos Produtos</span>
            <nav className="mt-4 flex flex-col gap-2">
              {PRODUTOS.map((p) => {
                const ativo = p.slug === produto.slug;
                return (
                  <Link key={p.slug} href={`/produtos/${p.slug}`}
                    className={`rounded-lg border px-4 py-3 font-body text-sm transition-all ${ativo ? "border-papoula bg-papoula text-white" : "border-line/10 bg-marinho-2/30 text-ink/75 hover:border-papoula/50 hover:text-white"}`}>
                    {p.titulo}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* conteúdo */}
          <div>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/10">
                <Image src={produto.imagem} alt={produto.titulo} fill className="kenburns object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-marinho/50 to-transparent" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold uppercase leading-tight text-ink sm:text-3xl">{produto.titulo}</h2>
                <span className="mt-3 block h-1 w-14 bg-papoula" />
                <p className="mt-5 font-body text-base leading-relaxed text-ink/75">{produto.descricao}</p>
                <Link href="/#contato" className="btn-soft btn-red mt-7 inline-block bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white">Solicitar orçamento</Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              <Coluna titulo="Projeto" itens={produto.projeto} />
              <Coluna titulo="Montagem" itens={produto.montagem} />
              <Coluna titulo="Supervisão" itens={produto.supervisao} />
            </div>

            {/* galeria */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {produto.galeria.map((src, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-line/10">
                  <Image src={src} alt={`${produto.titulo} — imagem ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
