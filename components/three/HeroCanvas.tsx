"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Waves from "./Waves";

/** Brilho difuso atrás das ondas — dá profundidade ao fundo marinho. */
function Glow() {
  return (
    <mesh position={[1, 0.4, -6]}>
      <circleGeometry args={[7, 48]} />
      <meshBasicMaterial color="#1e3bd6" transparent opacity={0.08} />
    </mesh>
  );
}

export default function HeroCanvas() {
  const scrollRef = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 1.3, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={visivel ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Glow />
        <Waves scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
