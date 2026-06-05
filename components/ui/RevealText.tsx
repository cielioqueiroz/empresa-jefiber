"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string };

export default function RevealText({ text, as = "h2", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;
  const words = text.split(" ");
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const els = ref.current!.querySelectorAll(".rw");
    gsap.fromTo(els, { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, stagger: 0.05, ease: "power3.out", duration: 0.8,
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="rw inline-block">{w}{i < words.length - 1 ? " " : ""}</span>
        </span>
      ))}
    </Tag>
  );
}
