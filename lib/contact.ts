export type ContactForm = { nome: string; telefone: string; email: string; mensagem: string };

function corpo(f: ContactForm): string {
  return [
    `Nome: ${f.nome}`,
    `Telefone: ${f.telefone}`,
    `E-mail: ${f.email}`,
    "",
    f.mensagem,
  ].join("\n");
}

export function buildWhatsappUrl(f: ContactForm, phone: string): string {
  const text = `Olá! Vim pelo site.\n\n${corpo(f)}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoUrl(f: ContactForm, to: string): string {
  const subject = encodeURIComponent(`Contato do site — ${f.nome}`);
  const body = encodeURIComponent(corpo(f));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
