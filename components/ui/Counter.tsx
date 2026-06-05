"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const node = numRef.current!;
    if (prefersReducedMotion()) { node.textContent = `${to}${suffix}`; return; }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to, duration: 1.6, ease: "power1.out",
      onUpdate: () => { node.textContent = `${Math.round(obj.v)}${suffix}`; },
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="text-center">
      <span ref={numRef} className="font-display text-5xl font-extrabold text-white">0{suffix}</span>
      <p className="font-mono-tech mt-2 text-xs uppercase text-white/60">{label}</p>
    </div>
  );
}
