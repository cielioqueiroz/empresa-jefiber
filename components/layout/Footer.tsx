import Image from "next/image";
import { CONTATO, REDES, NAV } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-marinho">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="relative mb-4 h-9 w-36"><Image src="/images/logo-jefiber.png" alt="JE FIBER" fill className="object-contain object-left" /></div>
          <p className="max-w-xs font-body text-sm text-white/70">Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro.</p>
        </div>
        <nav className="flex flex-col gap-2">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Navegação</span>
          {NAV.map((n) => <a key={n.href} href={n.href} className="font-body text-sm text-white/80 hover:text-white">{n.label}</a>)}
        </nav>
        <div className="flex flex-col gap-2">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Contato</span>
          {CONTATO.telefones.map((t) => <span key={t} className="font-body text-sm text-white/80">{t}</span>)}
          <a href={`mailto:${CONTATO.email}`} className="font-body text-sm text-white/80 hover:text-white">{CONTATO.email}</a>
          <span className="font-body text-sm text-white/60">{CONTATO.enderecoCurto}</span>
          <div className="mt-3 flex gap-4">
            {REDES.map((r) => <a key={r.nome} href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono-tech text-xs uppercase text-white/70 hover:text-white">{r.nome}</a>)}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center font-mono-tech text-[11px] uppercase tracking-wider text-white/40">© {new Date().getFullYear()} JE FIBER · Ipeúna/SP</div>
    </footer>
  );
}
