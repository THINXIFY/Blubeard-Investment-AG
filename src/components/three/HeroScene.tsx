"use client";

import { SceneCanvas } from "./SceneCanvas";
import { HeroComposition } from "./HeroComposition";

type HeroSceneProps = {
  active: boolean;
  still: boolean;
  onReady: () => void;
};

/** Default export so it can be code-split with next/dynamic. */
export default function HeroScene({ active, still, onReady }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <SceneCanvas
        active={active && !still}
        onReady={onReady}
        camera={{ position: [0, 2.3, 6.3], fov: 33, near: 0.1, far: 50 }}
      >
        <HeroComposition still={still} />
      </SceneCanvas>
    </div>
  );
}
