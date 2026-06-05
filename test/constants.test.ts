import { describe, it, expect } from "vitest";
import { CONTATO, REDES, SOLUCOES, NAV } from "@/lib/constants";

describe("constants", () => {
  it("tem telefone do whatsapp só com dígitos", () => {
    expect(CONTATO.whatsapp).toMatch(/^\d{12,13}$/);
  });
  it("tem soluções (>=4) com imagem e título", () => {
    expect(SOLUCOES.length).toBeGreaterThanOrEqual(4);
    for (const s of SOLUCOES) {
      expect(s.titulo.length).toBeGreaterThan(0);
      expect(s.imagem.startsWith("/images/")).toBe(true);
    }
  });
  it("tem 3 redes sociais e itens de nav", () => {
    expect(REDES).toHaveLength(3);
    expect(NAV.length).toBeGreaterThanOrEqual(5);
  });
});
