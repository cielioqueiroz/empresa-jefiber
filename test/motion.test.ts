import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion } from "@/lib/motion";

describe("prefersReducedMotion", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("retorna true quando o matchMedia bate", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q === "(prefers-reduced-motion: reduce)" }));
    expect(prefersReducedMotion()).toBe(true);
  });
  it("retorna false quando não bate", () => {
    vi.stubGlobal("matchMedia", (_q: string) => ({ matches: false }));
    expect(prefersReducedMotion()).toBe(false);
  });
});
