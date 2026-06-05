"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(ref.current, { scaleX: 0 }, {
      scaleX: 1, transformOrigin: "left", ease: "power2.out", duration: 1,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });
  return <div ref={ref} className={`tech-line w-full ${className}`} />;
}
