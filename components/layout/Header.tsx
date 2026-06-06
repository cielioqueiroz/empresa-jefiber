"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONTATO, PRODUTOS, SERVICOS_DETALHE } from "@/lib/constants";
import SocialIcons from "@/components/ui/SocialIcons";
import Logo from "@/components/ui/Logo";

const PRODUTOS_MENU = PRODUTOS.map((p) => ({ label: p.titulo, href: `/produtos/${p.slug}` }));
const SERVICOS_MENU = SERVICOS_DETALHE.map((s) => ({ label: s.titulo, href: `/servicos/${s.slug}` }));

const Caret = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((v) => !v)}
        className="nav-link font-mono-tech flex items-center gap-1.5 text-xs uppercase text-white/80 transition-colors hover:text-white">
        {label} <span className={open ? "rotate-180 transition-transform" : "transition-transform"}><Caret /></span>
      </button>
      <div className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 transition-all duration-200 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-marinho/95 p-2 shadow-2xl backdrop-blur">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2.5 font-body text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-papoula">
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "bg-marinho/90 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      {/* Barra de topo — redes + contatos (recolhe ao rolar) */}
      <div className={`hidden overflow-hidden border-b border-white/10 bg-marinho transition-all duration-300 md:block ${solid ? "max-h-0 opacity-0" : "max-h-20 opacity-100"}`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-2.5">
          <SocialIcons size={32} variant="chip" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-sm text-white/80">
            {CONTATO.telefones.map((t) => (
              <a key={t} href={`tel:+55${t.replace(/\D/g, "")}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-papoula" aria-hidden="true"><path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" /></svg>
                {t}
              </a>
            ))}
            <a href={`mailto:${CONTATO.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-papoula" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" strokeLinejoin="round" /></svg>
              {CONTATO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal — logo, navegação, CTA */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo className="h-8 sm:h-9" priority />
        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/#sobre" className="nav-link font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">Sobre</Link>
          <Dropdown label="Produtos" items={PRODUTOS_MENU} />
          <Dropdown label="Serviços" items={SERVICOS_MENU} />
          <Link href="/#areas" className="nav-link font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">Áreas</Link>
          <Link href="/downloads" className="nav-link font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">Downloads</Link>
          <Link href="/#contato" className="nav-link font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">Contato</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/#contato" className="btn-soft btn-red hidden bg-papoula px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white sm:inline-block">Fale conosco</Link>
          {/* botão hambúrguer (mobile/tablet) */}
          <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:border-papoula lg:hidden">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div className={`overflow-y-auto border-t border-white/10 bg-marinho transition-all duration-300 lg:hidden ${open ? "max-h-[calc(100vh-4rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5" onClick={() => setOpen(false)}>
          <Link href="/#sobre" className="rounded-lg px-3 py-2.5 font-mono-tech text-sm uppercase text-white/85 hover:bg-white/5">Sobre</Link>
          <p className="mt-2 px-3 font-mono-tech text-xs uppercase text-papoula">Produtos</p>
          {PRODUTOS_MENU.map((p) => (
            <Link key={p.href} href={p.href} className="rounded-lg px-3 py-2 font-body text-sm text-white/75 hover:bg-white/5 hover:text-white">{p.label}</Link>
          ))}
          <p className="mt-2 px-3 font-mono-tech text-xs uppercase text-papoula">Serviços</p>
          {SERVICOS_MENU.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 font-body text-sm text-white/75 hover:bg-white/5 hover:text-white">{s.label}</Link>
          ))}
          <div className="mt-2 flex flex-col gap-1">
            <Link href="/#areas" className="rounded-lg px-3 py-2.5 font-mono-tech text-sm uppercase text-white/85 hover:bg-white/5">Áreas</Link>
            <Link href="/downloads" className="rounded-lg px-3 py-2.5 font-mono-tech text-sm uppercase text-white/85 hover:bg-white/5">Downloads</Link>
            <Link href="/#contato" className="rounded-lg px-3 py-2.5 font-mono-tech text-sm uppercase text-white/85 hover:bg-white/5">Contato</Link>
          </div>
          <Link href="/#contato" className="btn-soft btn-red mt-4 bg-papoula px-5 py-3 text-center font-body text-sm font-bold uppercase tracking-wide text-white">Fale conosco</Link>
        </nav>
      </div>
    </header>
  );
}
