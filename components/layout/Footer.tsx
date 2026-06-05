import Image from "next/image";
import { CONTATO, NAV, SOLUCOES } from "@/lib/constants";
import SocialIcons from "@/components/ui/SocialIcons";

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
        {/* logo + contatos + redes */}
        <div>
          <div className="relative mb-5 h-9 w-36">
            <Image src="/images/logo-jefiber.png" alt="JE FIBER" fill className="object-contain object-left brightness-0 invert" />
          </div>
          <ul className="space-y-2 font-body text-sm text-white/80">
            {CONTATO.telefones.map((t) => (
              <li key={t}><a href={`tel:+55${t.replace(/\D/g, "")}`} className="hover:text-white">📞 {t}</a></li>
            ))}
            <li><a href={`https://wa.me/${CONTATO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">💬 {CONTATO.whatsappLabel}</a></li>
            <li><a href={`mailto:${CONTATO.email}`} className="hover:text-white">✉ {CONTATO.email}</a></li>
          </ul>
          <SocialIcons size={36} className="mt-5" />
        </div>

        {/* navegação */}
        <nav className="flex flex-col gap-2.5">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Links</span>
          {NAV.map((n) => <a key={n.href} href={n.href} className="font-body text-sm text-white/75 hover:text-white">{n.label}</a>)}
        </nav>

        {/* serviços / produtos */}
        <nav className="flex flex-col gap-2.5">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Serviços / Produtos</span>
          {SOLUCOES.slice(0, 5).map((s) => (
            <a key={s.id} href="#solucoes" className="font-body text-sm text-white/75 hover:text-white">{s.titulo}</a>
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

      <div className="border-t border-white/10 py-5 text-center font-mono-tech text-[11px] uppercase tracking-wider text-white/40">
        © {new Date().getFullYear()} JE FIBER · Todo o conteúdo é de uso exclusivo da JE FIBER · Ipeúna/SP
      </div>
    </footer>
  );
}
