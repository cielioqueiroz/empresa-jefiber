import Image from "next/image";
import Link from "next/link";
import { CONTATO, NAV, PRODUTOS, SERVICOS_DETALHE, DIREITOS } from "@/lib/constants";
import SocialIcons from "@/components/ui/SocialIcons";
import Logo from "@/components/ui/Logo";

const IcPhone = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" /></svg>
);
const IcWhats = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.18c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.34.07.13.07.7-.18 1.4Z" /></svg>
);
const IcMail = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" strokeLinejoin="round" /></svg>
);
const IcLock = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);

function Contato({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-papoula transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-papoula/10">
        {icon}
      </span>
      <span className="font-body text-sm text-white/75 transition-colors group-hover:text-white">{children}</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-marinho">
      {/* faixa com os dois endereços */}
      <div className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 sm:divide-x sm:divide-white/10">
          {CONTATO.enderecos.map((e, i) => (
            <div key={i} className={i === 1 ? "sm:pl-8" : ""}>
              <span className="font-mono-tech text-xs uppercase text-papoula">Endereço</span>
              <p className="mt-2 font-body text-sm text-white/70">{e}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        {/* logo + contatos (chips) + redes */}
        <div>
          <Logo className="mb-6 h-10" />
          <div className="space-y-3">
            {CONTATO.telefones.map((t) => (
              <Contato key={t} href={`tel:+55${t.replace(/\D/g, "")}`} icon={IcPhone}>{t}</Contato>
            ))}
            <Contato href={`https://wa.me/${CONTATO.whatsapp}`} icon={IcWhats}>{CONTATO.whatsappLabel}</Contato>
            <Contato href={`mailto:${CONTATO.email}`} icon={IcMail}>{CONTATO.email}</Contato>
          </div>
          <SocialIcons size={34} className="mt-6" />
        </div>

        {/* navegação */}
        <nav className="flex flex-col gap-2.5">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Links</span>
          {NAV.map((n) => <a key={n.href} href={n.href} className="font-body text-sm text-white/75 transition-colors hover:text-white">{n.label}</a>)}
          <Link href="/downloads" className="font-body text-sm text-white/75 transition-colors hover:text-white">Downloads</Link>
        </nav>

        {/* produtos / serviços */}
        <nav className="flex flex-col gap-2.5">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Produtos / Serviços</span>
          {PRODUTOS.map((p) => (
            <Link key={p.slug} href={`/produtos/${p.slug}`} className="font-body text-sm text-white/75 transition-colors hover:text-white">{p.titulo}</Link>
          ))}
          {SERVICOS_DETALHE.slice(0, 2).map((s) => (
            <Link key={s.slug} href={`/servicos/${s.slug}`} className="font-body text-sm text-white/75 transition-colors hover:text-white">{s.titulo}</Link>
          ))}
        </nav>

        {/* localização */}
        <div>
          <span className="font-mono-tech mb-2 block text-xs uppercase text-papoula">Localização</span>
          <a
            href="https://www.google.com/maps?q=JE%20FIBER%20Ipe%C3%BAna%20SP"
            target="_blank" rel="noopener noreferrer"
            className="group block overflow-hidden rounded-xl border border-white/10"
          >
            <div className="relative h-28 w-full">
              <Image src="/images/jeFiber_29.png" alt="Localização JE FIBER" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="280px" />
              <div className="absolute inset-0 grid place-items-center bg-marinho/55 font-mono-tech text-[11px] uppercase tracking-wide text-white/90">
                Ver no mapa
              </div>
            </div>
          </a>
          <p className="mt-3 font-body text-xs text-white/60">{CONTATO.enderecoCurto}</p>
        </div>
      </div>

      {/* LGPD + direitos */}
      <div className="border-t border-white/10 bg-marinho-2/30">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center">
          <span className="flex shrink-0 items-center gap-2 rounded-lg bg-papoula px-3.5 py-2 font-mono-tech text-xs font-bold uppercase tracking-wide text-white">
            {IcLock} LGPD
          </span>
          <p className="font-body text-xs leading-relaxed text-white/60">
            © {new Date().getFullYear()} JE FIBER · {DIREITOS}
          </p>
        </div>
      </div>
    </footer>
  );
}
