"use client";

import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, type Group, type Mesh } from "three";
import { palette } from "./palette";

type HeroCompositionProps = {
  /** Disable continuous motion (prefers-reduced-motion). Renders the final, assembled state. */
  still?: boolean;
};

/* Sculpture parameters — a twisting stack of platinum slabs around a softly lit core. */
const SLABS = 16;
const PITCH = 0.165; // vertical spacing
const BASE_Y = -1.32;
const TWIST = 0.078; // radians per slab (~70° over the tower)
const ASSEMBLE = 2.4; // seconds for the entrance

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

type Slab = { y: number; rot: number; w: number; d: number };

/**
 * Hero sculpture — an abstract architectural tower: sixteen rounded platinum slabs,
 * each turned slightly from the last, around an Imperial Blue light core.
 * Environment lighting is generated locally from Lightformers (no network HDR).
 */
export function HeroComposition({ still = false }: HeroCompositionProps) {
  const root = useRef<Group>(null);
  const tower = useRef<Group>(null);
  const slabRefs = useRef<(Mesh | null)[]>([]);
  const core = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);

  const slabs = useMemo<Slab[]>(
    () =>
      Array.from({ length: SLABS }, (_, i) => {
        const k = i / (SLABS - 1);
        return {
          y: BASE_Y + i * PITCH,
          rot: i * TWIST,
          // Gentle entasis: slabs taper toward the top.
          w: 1.62 - k * 0.42,
          d: 0.66 - k * 0.14,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (startedAt.current === null) startedAt.current = t;
    const progress = still ? 1 : Math.min((t - startedAt.current) / ASSEMBLE, 1);

    // Entrance: slabs rise into place in sequence, bottom first.
    slabRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const local = easeOutQuart(MathUtils.clamp(progress * 1.6 - (i / SLABS) * 0.6, 0, 1));
      const s = slabs[i];
      mesh.position.y = s.y - (1 - local) * 0.5;
      mesh.rotation.y = s.rot - (1 - local) * 0.6;
      mesh.scale.setScalar(0.001 + local * 0.999);
    });

    // The light core grows upward with the slabs, so it never stands bare.
    if (core.current)
      core.current.scale.y = Math.max(0.001, easeOutQuart(MathUtils.clamp(progress * 1.6 - 0.55, 0, 1)));

    if (still) return;
    if (tower.current) tower.current.rotation.y += delta * 0.09;
    if (root.current) {
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, state.pointer.x * 0.28, 2.2, delta);
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, -state.pointer.y * 0.12, 2.2, delta);
    }
  });

  return (
    <>
      {/* Studio lighting baked into an environment map once. */}
      <Environment resolution={256} frames={1}>
        {/* Mid-tone backdrop gives the metal real highlight-to-shadow contrast. */}
        <color attach="background" args={["#6b7285"]} />
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -4]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-5, 1.5, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={3.2}
          color={palette.imperial}
          position={[5, 0.5, -1]}
          rotation-y={-Math.PI / 2}
          scale={[6, 1.2, 1]}
        />
        <Lightformer form="ring" intensity={2.2} color={palette.imperial} position={[0, -4, 2]} scale={3} />
      </Environment>

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <pointLight position={[0, -0.2, 0]} intensity={1.2} distance={2.2} color={palette.imperial} />

      <group ref={root} position={[0, 0.2, 0]} scale={0.9}>
        <group ref={tower}>
          {slabs.map((s, i) => (
            <RoundedBox
              key={i}
              ref={(m: Mesh | null) => {
                slabRefs.current[i] = m;
              }}
              args={[s.w, 0.055, s.d]}
              radius={0.018}
              smoothness={3}
              position={[0, s.y, 0]}
              rotation={[0, s.rot, 0]}
            >
              <meshStandardMaterial color={palette.platinum} metalness={0.92} roughness={0.2} envMapIntensity={1.15} />
            </RoundedBox>
          ))}

          {/* Light core — anchored at the base so it can grow upward */}
          <group ref={core} position={[0, BASE_Y - 0.05, 0]}>
            <mesh position={[0, ((SLABS - 1) * PITCH + 0.1) / 2, 0]}>
              <cylinderGeometry args={[0.032, 0.032, (SLABS - 1) * PITCH + 0.1, 24]} />
              <meshStandardMaterial
                color={palette.imperial}
                emissive={palette.imperial}
                emissiveIntensity={0.45}
                roughness={0.4}
              />
            </mesh>
          </group>
        </group>

        {/* Plinth */}
        <mesh position={[0, BASE_Y - 0.12, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.03, 96]} />
          <meshStandardMaterial color={palette.platinum} metalness={0.85} roughness={0.35} envMapIntensity={0.9} />
        </mesh>
        <mesh position={[0, BASE_Y - 0.104, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 0.962, 128]} />
          <meshBasicMaterial color={palette.imperial} transparent opacity={0.55} />
        </mesh>
      </group>

      <ContactShadows
        position={[0, (BASE_Y - 0.15) * 0.9 + 0.2, 0]}
        opacity={0.28}
        scale={5}
        blur={2.6}
        far={2}
        frames={1}
      />
    </>
  );
}
