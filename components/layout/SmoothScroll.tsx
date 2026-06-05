"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    let running = true;
    const raf = (t: number) => {
      if (!running) return;
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => {
      running = false;
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
