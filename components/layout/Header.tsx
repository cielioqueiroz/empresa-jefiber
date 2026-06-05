"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/constants";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "bg-marinho/90 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#topo" aria-label="JE FIBER — início" className="relative h-9 w-36">
          <Image src="/images/logo-jefiber.png" alt="JE FIBER" fill className="object-contain object-left brightness-0 invert" priority />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">{n.label}</a>
          ))}
        </nav>
        <a href="#contato" className="rounded-sm bg-papoula px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Fale conosco</a>
      </div>
    </header>
  );
}
