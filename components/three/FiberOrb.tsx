"use client";
import { useMemo, useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

/* Logo da JE FIBER renderizada num plano que ondula suavemente (referência a
   água / fibra em movimento), recolorida em azul→branco com um brilho que
   atravessa. Discreta, moderna e fiel à marca — substitui as ondas antigas. */
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(uv.x * 6.0 + uTime * 1.1) * 0.055
            + sin(uv.y * 4.0 - uTime * 0.8) * 0.045
            + sin((uv.x + uv.y) * 5.0 + uTime * 0.6) * 0.03;
    p.z += w;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uLight; // 0 = tema escuro, 1 = tema claro
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vec4 t = texture2D(uMap, vUv);
    if (t.a < 0.03) discard;
    // escuro: azul->branco | claro: navy->azul (visível sobre fundo claro)
    vec3 lo = mix(vec3(0.36, 0.49, 1.0), vec3(0.02, 0.05, 0.22), uLight);
    vec3 hi = mix(vec3(1.0),             vec3(0.16, 0.27, 0.85), uLight);
    float s = clamp(vWave * 4.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(lo, hi, s);
    float band = smoothstep(0.10, 0.0, abs(fract(uTime * 0.10) - vUv.x));
    col = mix(col, hi, band * 0.6);
    gl_FragColor = vec4(col, t.a * uOpacity);
  }
`;

export default function FiberOrb({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  const tex = useLoader(THREE.TextureLoader, `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo-jefiber.png`);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMap: { value: tex }, uOpacity: { value: 0.9 }, uLight: { value: 0 } }),
    [tex]
  );

  useFrame((state, delta) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta;
      mat.current.uniforms.uLight.value = document.documentElement.classList.contains("light") ? 1 : 0;
    }
    if (mesh.current) {
      mesh.current.position.x = 5.15;
      mesh.current.position.y = 0.1 - scrollRef.current * 0.0012;
      mesh.current.rotation.y = mouse.current.x * 0.22;
      mesh.current.rotation.x = -mouse.current.y * 0.14;
    }
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    camera.position.x = mouse.current.x * 0.4;
    camera.position.y = mouse.current.y * 0.3;
    camera.lookAt(2.8, 0, 0);
  });

  return (
    <mesh ref={mesh} scale={1.1}>
      <planeGeometry args={[2.9, 0.94, 90, 36]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
