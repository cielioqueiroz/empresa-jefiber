"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTATO, LGPD_CONSENTIMENTO } from "@/lib/constants";
import { buildWhatsappUrl, buildMailtoUrl, type ContactForm } from "@/lib/contact";
import { useT } from "@/lib/i18n";

const VAZIO: ContactForm = { nome: "", telefone: "", email: "", mensagem: "" };

const ICON_USER = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" strokeLinejoin="round" />
  </svg>
);
const ICON_MSG = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 5h16v11H9l-4 3v-3H4V5Z" strokeLinejoin="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 4.7 6 12.3 6.3 12.6.4.5 1 .5 1.4 0C13 21.3 19 13.7 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
);

export default function Contato() {
  const tr = useT();
  const [form, setForm] = useState<ContactForm>(VAZIO);
  const [aceito, setAceito] = useState(false);
  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const enviarWhats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceito) return;
    window.open(buildWhatsappUrl(form, CONTATO.whatsapp), "_blank");
  };

  return (
    <section id="contato" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>{tr("Contato")}</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">{tr("Vamos conversar sobre o seu projeto")}</h2>
          <div className="mt-8 space-y-3.5 font-body text-ink/80">
            {CONTATO.telefones.map((t) => (
              <a key={t} href={`tel:+55${t.replace(/\D/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-ink">
                <span className="text-papoula">{ICON_PHONE}</span>{t}
              </a>
            ))}
            <a href={`mailto:${CONTATO.email}`} className="flex items-center gap-3 transition-colors hover:text-ink">
              <span className="text-papoula">{ICON_MAIL}</span>{CONTATO.email}
            </a>
            <p className="flex items-start gap-3">
              <span className="mt-0.5 text-papoula">{ICON_PIN}</span>{CONTATO.endereco}
            </p>
          </div>
          <div className="mt-6 aspect-video overflow-hidden rounded-md border border-line/10">
            <iframe title="Mapa JE FIBER" loading="lazy" className="h-full w-full"
              src="https://www.google.com/maps?q=JE%20FIBER%20Ipe%C3%BAna%20SP&output=embed" />
          </div>
        </div>
        <form onSubmit={enviarWhats} className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_USER}</span>
            <input required aria-label={tr("Nome")} value={form.nome} onChange={set("nome")} placeholder={tr("Nome")} className="input-soft w-full border border-line/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-ink placeholder:text-ink/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_PHONE}</span>
            <input required aria-label={tr("Telefone")} value={form.telefone} onChange={set("telefone")} placeholder={tr("Telefone")} className="input-soft w-full border border-line/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-ink placeholder:text-ink/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_MAIL}</span>
            <input required aria-label={tr("E-mail")} type="email" value={form.email} onChange={set("email")} placeholder={tr("E-mail")} className="input-soft w-full border border-line/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-ink placeholder:text-ink/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-4 text-papoula">{ICON_MSG}</span>
            <textarea required aria-label={tr("Mensagem")} value={form.mensagem} onChange={set("mensagem")} placeholder={tr("Mensagem")} rows={5} className="input-soft w-full border border-line/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-ink placeholder:text-ink/40" />
          </div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
              aria-label="Aceito o consentimento de contato"
              className="mt-0.5 h-5 w-5 shrink-0 accent-papoula"
            />
            <span className="font-body text-xs leading-relaxed text-ink/60">{tr(LGPD_CONSENTIMENTO)}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!aceito}
              className="btn-soft btn-red bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {tr("Enviar pelo WhatsApp")}
            </button>
            <a
              href={aceito ? buildMailtoUrl(form, CONTATO.email) : undefined}
              aria-disabled={!aceito}
              className={`btn-soft btn-ghost border border-line/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-ink/90 hover:border-papoula ${aceito ? "" : "pointer-events-none opacity-40"}`}
            >
              {tr("Enviar por e-mail")}
            </a>
          </div>
          {/* TODO: reCAPTCHA + envio real (Formspree/Resend) exigem chaves/backend — integrar quando aprovado */}
        </form>
      </div>
    </section>
  );
}
