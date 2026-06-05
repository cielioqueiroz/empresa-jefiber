"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import FiberOrb from "./FiberOrb";

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
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.8]}
        frameloop={visivel ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <FiberOrb scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
