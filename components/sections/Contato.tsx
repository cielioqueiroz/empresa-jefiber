"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTATO } from "@/lib/constants";
import { buildWhatsappUrl, buildMailtoUrl, type ContactForm } from "@/lib/contact";

const VAZIO: ContactForm = { nome: "", telefone: "", email: "", mensagem: "" };

export default function Contato() {
  const [form, setForm] = useState<ContactForm>(VAZIO);
  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const enviarWhats = (e: React.FormEvent) => { e.preventDefault(); window.open(buildWhatsappUrl(form, CONTATO.whatsapp), "_blank"); };

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
          <input required aria-label="Nome" value={form.nome} onChange={set("nome")} placeholder="Nome" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <input required aria-label="Telefone" value={form.telefone} onChange={set("telefone")} placeholder="Telefone" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <input required aria-label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="E-mail" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <textarea required aria-label="Mensagem" value={form.mensagem} onChange={set("mensagem")} placeholder="Mensagem" rows={5} className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <div className="flex flex-wrap gap-3">
            <button type="submit" data-cursor className="rounded-sm bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Enviar pelo WhatsApp</button>
            <a href={buildMailtoUrl(form, CONTATO.email)} data-cursor className="rounded-sm border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white">Enviar por e-mail</a>
          </div>
          {/* TODO: integrar envio real (Formspree/Resend) quando aprovado */}
        </form>
      </div>
    </section>
  );
}
