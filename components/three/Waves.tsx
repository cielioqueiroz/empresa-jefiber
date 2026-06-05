"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Ondas via shader na GPU — plano em wireframe deslocado por camadas de senos
   (referência à água/saneamento e à malha de fibra). Cores da marca: marinho
   profundo nos vales, azul nas cristas, leve toque de vermelho no topo. */
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vEle;
  void main() {
    vec3 p = position;
    float e = 0.0;
    e += sin(p.x * 0.45 + uTime * 0.55) * 0.62;
    e += sin(p.y * 0.80 - uTime * 0.42) * 0.40;
    e += sin((p.x * 0.32 + p.y * 0.50) + uTime * 0.30) * 0.34;
    e += sin((p.x - p.y) * 0.22 + uTime * 0.20) * 0.22;
    // leve resposta ao mouse (empurra a malha)
    e += (p.x * uMouse.x + p.y * uMouse.y) * 0.06;
    p.z += e;
    vEle = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vEle;
  void main() {
    float t = clamp((vEle + 1.0) / 2.0, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, t);
    // toque de vermelho papoula só nas cristas mais altas
    col = mix(col, uAccent, smoothstep(0.82, 1.0, t) * 0.5);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

export default function Waves({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uLow: { value: new THREE.Color("#050a33") },
      uHigh: { value: new THREE.Color("#3f63ff") },
      uAccent: { value: new THREE.Color("#ff0000") },
      uOpacity: { value: 0.55 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!matRef.current || !group.current) return;
    // tempo avança + leve aceleração com o scroll
    matRef.current.uniforms.uTime.value += delta + scrollRef.current * 0.00002;
    // mouse suavizado
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;
    matRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    // parallax do conjunto: inclina levemente seguindo o mouse + desce com o scroll
    group.current.rotation.x = -1.05 + mouse.current.y * 0.08;
    group.current.rotation.z = 0.12 + mouse.current.x * 0.06;
    group.current.position.y = 0.2 - scrollRef.current * 0.0012;
    invalidate();
  });

  return (
    <group ref={group} rotation={[-1.05, 0, 0.12]} position={[0.3, 0.2, 0]}>
      <mesh>
        <planeGeometry args={[60, 46, 200, 150]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
