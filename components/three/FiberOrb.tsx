"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Esfera de "fibra" em wireframe, deslocada organicamente por ruído de senos —
   morpha lentamente como uma malha viva. Halo de partículas ao redor. Distinta
   de um plano de ondas: é um objeto volumétrico que respira e gira. */
const vertexShader = `
  uniform float uTime;
  varying float vD;
  void main() {
    vec3 p = position;
    vec3 n = normalize(position);
    float d = 0.0;
    d += sin(p.x * 1.5 + uTime * 0.8) * 0.18;
    d += sin(p.y * 1.8 - uTime * 0.6) * 0.16;
    d += sin(p.z * 1.3 + uTime * 0.5) * 0.16;
    d += sin((p.x + p.y + p.z) * 1.1 + uTime) * 0.12;
    p += n * d;
    vD = d;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vD;
  void main() {
    float t = clamp((vD + 0.4) / 0.8, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, t);
    col = mix(col, uAccent, smoothstep(0.86, 1.0, t) * 0.45);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

export default function FiberOrb({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const halo = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLow: { value: new THREE.Color("#0a1a6e") },
      uHigh: { value: new THREE.Color("#5b7cff") },
      uAccent: { value: new THREE.Color("#ff2b2b") },
      uOpacity: { value: 0.6 },
    }),
    []
  );

  const haloGeo = useMemo(() => {
    const n = 450;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // distribuição em casca esférica ao redor do orbe
      const r = 3.2 + Math.random() * 3.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
      group.current.position.x = 2.0;
      group.current.position.y = -scrollRef.current * 0.0012;
    }
    if (halo.current) halo.current.rotation.y -= delta * 0.03;
    // parallax suave da câmera com o mouse
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    camera.position.x = mouse.current.x * 1.1;
    camera.position.y = mouse.current.y * 0.7;
    camera.lookAt(1.6, 0, 0);
  });

  return (
    <>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[2.1, 6]} />
          <shaderMaterial
            ref={mat}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            wireframe
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
      <points ref={halo} geometry={haloGeo} position={[2.0, 0, 0]}>
        <pointsMaterial color="#9fb4ff" size={0.03} transparent opacity={0.55} sizeAttenuation />
      </points>
    </>
  );
}
