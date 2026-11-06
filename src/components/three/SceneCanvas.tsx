"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { ReactNode } from "react";

export type SceneCanvasProps = {
  children: ReactNode;
  /** When false the render loop pauses (offscreen / reduced motion) and only re-renders on demand. */
  active?: boolean;
  onReady?: () => void;
  className?: string;
  camera?: CanvasProps["camera"];
};

/**
 * Shared R3F canvas with performance-minded defaults:
 * capped DPR, transparent background, no shadows, pausable render loop.
 * Every future 3D scene should render inside this wrapper.
 */
export function SceneCanvas({
  children,
  active = true,
  onReady,
  className,
  camera = { position: [0, 0, 6.5], fov: 35, near: 0.1, far: 50 },
}: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      camera={camera}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
      aria-hidden
    >
      {children}
    </Canvas>
  );
}
