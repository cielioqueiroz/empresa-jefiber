"use client";
import { useCallback, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Card com inclinação 3D + spotlight + glare que seguem o cursor.
 * Publica --mx/--my (%) para o `.spotlight` (globals.css) e desenha um reflexo
 * (glare) por cima. Respeita prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  lift = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 2 * max;
      const rx = -(py - 0.5) * 2 * max;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${lift}px)`;
      });
    },
    [max, lift]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`card-3d spotlight ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="tilt-glare pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 220px at var(--mx,50%) var(--my,50%), color-mix(in srgb, #fff 32%, transparent), transparent 60%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
