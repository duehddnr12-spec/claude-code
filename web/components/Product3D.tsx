"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PresentationControls } from "@react-three/drei";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useMemo(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);
  return reduced;
}

function teeSilhouette() {
  const shape = new THREE.Shape();

  // Flat-lay t-shirt outline, front view, drawn with smooth curves so
  // sleeves, shoulders and the crew neckline read clearly at small sizes.
  shape.moveTo(-0.78, -1.15);
  shape.lineTo(-0.78, -0.15);
  shape.quadraticCurveTo(-1.05, -0.03, -1.35, 0.1);
  shape.lineTo(-1.3, 0.5);
  shape.quadraticCurveTo(-1.16, 0.68, -0.7, 0.74);
  shape.quadraticCurveTo(-0.35, 0.52, 0, 0.56);
  shape.quadraticCurveTo(0.35, 0.52, 0.7, 0.74);
  shape.quadraticCurveTo(1.16, 0.68, 1.3, 0.5);
  shape.lineTo(1.35, 0.1);
  shape.quadraticCurveTo(1.05, -0.03, 0.78, -0.15);
  shape.lineTo(0.78, -1.15);
  shape.closePath();

  return shape;
}

function Tee({ autoRotate }: { autoRotate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(teeSilhouette(), {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (group.current && autoRotate) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#fbfaf8"
          roughness={0.72}
          clearcoat={0.08}
          clearcoatRoughness={0.6}
          sheen={1}
          sheenColor="#ffffff"
          sheenRoughness={0.8}
        />
      </mesh>
      {/* collar band */}
      <mesh position={[0, 0.6, 0.09]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.24, 0.022, 12, 32, Math.PI * 1.3]} />
        <meshPhysicalMaterial color="#f3f1ec" roughness={0.65} sheen={1} />
      </mesh>
    </group>
  );
}

export default function Product3D() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative h-[420px] w-full sm:h-[520px] lg:h-[640px]"
      role="img"
      aria-label="화이트 티셔츠 3D 인터랙티브 뷰어 — 드래그하여 회전"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.05, 4.6], fov: 36 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#faf9f7"]} />
        <hemisphereLight args={["#ffffff", "#e5decf", 0.65]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.4} />
        <directionalLight position={[0, -2, 3]} intensity={0.2} />

        <PresentationControls
          global
          enabled
          snap={!reduced}
          speed={reduced ? 0 : 1.1}
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.35]}
          azimuth={[-1.1, 1.1]}
        >
          <Tee autoRotate={!reduced} />
        </PresentationControls>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.45}
          scale={6}
          blur={2.4}
          far={2}
        />
      </Canvas>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-muted uppercase">
        드래그하여 회전
      </p>
    </div>
  );
}
