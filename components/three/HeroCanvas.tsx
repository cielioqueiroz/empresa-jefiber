"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FiberTube from "./FiberTube";

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
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} frameloop={visivel ? "always" : "demand"}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -2, 3]} intensity={2} color="#3b3fff" />
        <FiberTube scrollRef={scrollRef} />
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
