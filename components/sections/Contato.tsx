"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTATO, LGPD_CONSENTIMENTO } from "@/lib/constants";
import { buildWhatsappUrl, buildMailtoUrl, type ContactForm } from "@/lib/contact";

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

export default function Contato() {
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
      <SectionLabel>Contato</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">Vamos conversar sobre o seu projeto</h2>
          <div className="mt-8 space-y-3 font-body text-white/80">
            {CONTATO.telefones.map((t) => (
              <p key={t}>📞 <a href={`tel:+55${t.replace(/\D/g, "")}`} className="hover:text-white">{t}</a></p>
            ))}
            <p>✉️ <a href={`mailto:${CONTATO.email}`} className="hover:text-white">{CONTATO.email}</a></p>
            <p>📍 {CONTATO.endereco}</p>
          </div>
          <div className="mt-6 aspect-video overflow-hidden rounded-md border border-white/10">
            <iframe title="Mapa JE FIBER" loading="lazy" className="h-full w-full"
              src="https://www.google.com/maps?q=JE%20FIBER%20Ipe%C3%BAna%20SP&output=embed" />
          </div>
        </div>
        <form onSubmit={enviarWhats} className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_USER}</span>
            <input required aria-label="Nome" value={form.nome} onChange={set("nome")} placeholder="Nome" className="input-soft w-full border border-white/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-white placeholder:text-white/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_PHONE}</span>
            <input required aria-label="Telefone" value={form.telefone} onChange={set("telefone")} placeholder="Telefone" className="input-soft w-full border border-white/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-white placeholder:text-white/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-papoula">{ICON_MAIL}</span>
            <input required aria-label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="E-mail" className="input-soft w-full border border-white/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-white placeholder:text-white/40" />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-4 text-papoula">{ICON_MSG}</span>
            <textarea required aria-label="Mensagem" value={form.mensagem} onChange={set("mensagem")} placeholder="Mensagem" rows={5} className="input-soft w-full border border-white/15 bg-marinho-2/40 py-3 pl-11 pr-4 font-body text-white placeholder:text-white/40" />
          </div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
              aria-label="Aceito o consentimento de contato"
              className="mt-0.5 h-5 w-5 shrink-0 accent-papoula"
            />
            <span className="font-body text-xs leading-relaxed text-white/60">{LGPD_CONSENTIMENTO}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!aceito}
              className="btn-soft btn-red bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Enviar pelo WhatsApp
            </button>
            <a
              href={aceito ? buildMailtoUrl(form, CONTATO.email) : undefined}
              aria-disabled={!aceito}
              className={`btn-soft btn-ghost border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white ${aceito ? "" : "pointer-events-none opacity-40"}`}
            >
              Enviar por e-mail
            </a>
          </div>
          {/* TODO: reCAPTCHA + envio real (Formspree/Resend) exigem chaves/backend — integrar quando aprovado */}
        </form>
      </div>
    </section>
  );
}
