"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const el = dot.current!;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const interactive = (e: MouseEvent) =>
      el.classList.toggle("cursor-grow", !!(e.target as HTMLElement).closest("a,button,[data-cursor]"));
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", interactive);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", interactive); };
  }, []);
  return <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] -ml-3 -mt-3 hidden h-6 w-6 rounded-full border border-papoula/80 mix-blend-difference transition-[width,height] duration-200 md:block [&.cursor-grow]:h-10 [&.cursor-grow]:w-10" />;
}
