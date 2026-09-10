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

// Sleeveless body block. Sleeves are built separately as flared 3D tubes
// so they read as volume, not a flat cutout.
function torsoShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.44, -1.2);
  shape.quadraticCurveTo(-0.56, -1.2, -0.58, -1.08);
  shape.quadraticCurveTo(-0.62, -0.5, -0.58, 0.1);
  shape.lineTo(-0.56, 0.36);
  shape.quadraticCurveTo(-0.54, 0.55, -0.4, 0.63);
  shape.quadraticCurveTo(-0.2, 0.5, 0, 0.53);
  shape.quadraticCurveTo(0.2, 0.5, 0.4, 0.63);
  shape.quadraticCurveTo(0.54, 0.55, 0.56, 0.36);
  shape.lineTo(0.58, 0.1);
  shape.quadraticCurveTo(0.62, -0.5, 0.58, -1.08);
  shape.quadraticCurveTo(0.56, -1.2, 0.44, -1.2);
  shape.closePath();
  return shape;
}

// Adds small per-vertex jitter along the local normal so the surface
// reads as woven cotton instead of injection-molded plastic.
function addFabricNoise(geo: THREE.BufferGeometry, amount: number) {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * 18 + v.y * 11) * Math.cos(v.y * 14 - v.z * 9) * amount;
    pos.setXYZ(i, v.x, v.y, v.z + n);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function capsuleSegment(
  start: THREE.Vector3,
  end: THREE.Vector3,
  r0: number,
  r1: number,
) {
  const dir = new THREE.Vector3().subVectors(end, start);
  const length = dir.length();
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );
  return { mid, quat, length, r0, r1 };
}

// Flattens the tube's cross-section (perpendicular to its length) so
// sleeves read as draped fabric rather than a fully round, inflated tube.
const SLEEVE_SQUASH: [number, number, number] = [0.9, 1, 0.74];

const sleeveMaterialProps = {
  color: "#fbfaf8",
  roughness: 0.82,
  sheen: 1,
  sheenColor: "#ffffff",
  sheenRoughness: 0.85,
} as const;

function Sleeve({ side }: { side: 1 | -1 }) {
  // The shoulder point sits *deep inside* the torso volume so the
  // cylinder's flat cap is fully buried and the sleeve reads as one
  // continuous surface growing out of the body, not a bolted-on tube.
  const shoulder = new THREE.Vector3(side * 0.05, 0.43, 0.08);
  const elbow = new THREE.Vector3(side * 0.88, 0.28, 0.22);
  const cuff = new THREE.Vector3(side * 0.83, -0.04, 0.09);

  const upper = useMemo(
    () => capsuleSegment(shoulder, elbow, 0.27, 0.15),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [side],
  );
  const lower = useMemo(
    () => capsuleSegment(elbow, cuff, 0.15, 0.128),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [side],
  );

  return (
    <group>
      <mesh
        position={upper.mid}
        quaternion={upper.quat}
        scale={SLEEVE_SQUASH}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[upper.r1, upper.r0, upper.length, 20, 1, false]}
        />
        <meshPhysicalMaterial {...sleeveMaterialProps} />
      </mesh>
      <mesh
        position={lower.mid}
        quaternion={lower.quat}
        scale={SLEEVE_SQUASH}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[lower.r1, lower.r0, lower.length, 20, 1, false]}
        />
        <meshPhysicalMaterial {...sleeveMaterialProps} />
      </mesh>
      {/* elbow joint, rounds the seam between the two tapered segments */}
      <mesh position={elbow} scale={SLEEVE_SQUASH} castShadow>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshPhysicalMaterial {...sleeveMaterialProps} />
      </mesh>

      {/* cuff opening cap */}
      <mesh position={cuff} scale={SLEEVE_SQUASH} castShadow>
        <sphereGeometry args={[0.128, 20, 20]} />
        <meshPhysicalMaterial color="#f2efe9" roughness={0.88} sheen={1} />
      </mesh>
    </group>
  );
}

function Tee({ autoRotate }: { autoRotate: boolean }) {
  const group = useRef<THREE.Group>(null);

  const torsoGeometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(torsoShape(), {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 8,
      curveSegments: 32,
    });
    geo.center();
    addFabricNoise(geo, 0.006);
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (group.current && autoRotate) group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group} rotation={[0.08, 0.32, -0.1]}>
      <mesh geometry={torsoGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#fbfaf8"
          roughness={0.8}
          sheen={1}
          sheenColor="#ffffff"
          sheenRoughness={0.85}
        />
      </mesh>

      <Sleeve side={1} />
      <Sleeve side={-1} />

      {/* collar band: a flat ring decal flush on the front face, since the
          torso has no real cutout for a true 3D ring to sit inside */}
      <mesh position={[0, 0.55, 0.175]}>
        <ringGeometry args={[0.13, 0.17, 40]} />
        <meshStandardMaterial
          color="#efece5"
          roughness={0.75}
          side={THREE.DoubleSide}
        />
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
        camera={{ position: [0, -0.05, 5.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={["#ffffff", "#e5decf", 0.55]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[3.5, 4.5, 3]}
          intensity={1.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 1.2, -2.5]} intensity={0.45} />
        <directionalLight position={[0, -1.5, 3.5]} intensity={0.25} />
        <pointLight position={[0, 2, 2]} intensity={0.3} />

        <PresentationControls
          global
          enabled
          snap={!reduced}
          speed={reduced ? 0 : 1.1}
          rotation={[0, 0, 0]}
          polar={[-0.25, 0.4]}
          azimuth={[-1.2, 1.2]}
        >
          <Tee autoRotate={!reduced} />
        </PresentationControls>

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.4}
          scale={7}
          blur={3}
          far={2.2}
        />
      </Canvas>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-muted uppercase">
        드래그하여 회전
      </p>
    </div>
  );
}
