import type { ComponentType, HTMLAttributes, RefObject } from "react";

/** Types for the third-party React Bits LaserFlow component, kept as supplied in LaserFlow.jsx. */
export type LaserFlowProps = HTMLAttributes<HTMLDivElement> & {
  surfaceRef?: RefObject<HTMLElement | null>;
  beamPosition?: number;
  surfaceLevel?: number;
  color?: string;
  intensity?: number;
  beamWidth?: number;
  flare?: number;
  spread?: number;
  spill?: number;
  fog?: number;
  dust?: number;
  streaks?: number;
  dots?: number;
  pulse?: number;
  speed?: number;
  seed?: number;
  mouseInteraction?: boolean;
  revealImage?: string;
  revealRadius?: number;
  revealOpacity?: number;
  intro?: boolean;
  theme?: "dark" | "light";
  paused?: boolean;
  dpr?: number;
};

export const LaserFlow: ComponentType<LaserFlowProps>;
export default LaserFlow;
