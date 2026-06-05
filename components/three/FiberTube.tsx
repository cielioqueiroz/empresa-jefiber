"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Cilindro de fibra com fios helicoidais (filament winding) reativo a mouse/scroll. */
export default function FiberTube({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Geometrias dos filamentos (várias hélices ao redor do cilindro), memoizadas.
  const helices = useMemo(() => {
    const geos: THREE.BufferGeometry[] = [];
    const voltas = 6, raio = 1.02, altura = 4, passos = 120, nFios = 16;
    for (let f = 0; f < nFios; f++) {
      const fase = (f / nFios) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= passos; i++) {
        const t = i / passos;
        const ang = fase + t * voltas * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(ang) * raio, (t - 0.5) * altura, Math.sin(ang) * raio));
      }
      geos.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    return geos;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    group.current.rotation.y += delta * 0.15 + scrollRef.current * 0.0005;
    group.current.rotation.z = mouse.current.x * 0.15;
    group.current.rotation.x = -0.2 + mouse.current.y * 0.15;
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2.3]}>
      <mesh>
        <cylinderGeometry args={[1, 1, 4, 48, 1, true]} />
        <meshStandardMaterial color="#0a0c4a" metalness={0.3} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {helices.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({
          color: i % 5 === 0 ? "#FF0000" : "#9fa6ff", transparent: true, opacity: 0.7,
        }))} />
      ))}
    </group>
  );
}
