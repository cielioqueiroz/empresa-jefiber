import { describe, it, expect, vi } from "vitest";
import { prefersReducedMotion } from "@/lib/motion";

describe("prefersReducedMotion", () => {
  it("retorna true quando o matchMedia bate", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
  it("retorna false quando não bate", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    expect(prefersReducedMotion()).toBe(false);
  });
});
