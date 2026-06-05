import { describe, it, expect } from "vitest";
import { buildWhatsappUrl, buildMailtoUrl } from "@/lib/contact";

const form = { nome: "Maria", telefone: "19999999999", email: "m@x.com", mensagem: "Olá & cia" };

describe("contact builders", () => {
  it("monta url do whatsapp com mensagem codificada", () => {
    const url = buildWhatsappUrl(form, "5519996063421");
    expect(url.startsWith("https://wa.me/5519996063421?text=")).toBe(true);
    expect(url).toContain("Maria");
    expect(url).toContain("%26"); // & codificado
    expect(url).not.toContain(" "); // sem espaços crus
    expect(url).toContain("Vim%20pelo%20site");
  });

  it("monta mailto com subject e body", () => {
    const url = buildMailtoUrl(form, "comercial@jefiber.com.br");
    expect(url.startsWith("mailto:comercial@jefiber.com.br?")).toBe(true);
    expect(url).toContain("subject=");
    expect(url).toContain("body=");
    expect(url).toContain("m%40x.com");
  });
});
