import type { MutableRefObject } from 'react';

interface HyperspeedColors {
  roadColor?: number;
  islandColor?: number;
  background?: number;
  shoulderLines?: number;
  brokenLines?: number;
  leftCars?: number[];
  rightCars?: number[];
  sticks?: number;
}

interface HyperspeedOptions {
  onSpeedUp?: (ev?: Event) => void;
  onSlowDown?: (ev?: Event) => void;
  distortion?: string;
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: HyperspeedColors;
}

interface HyperspeedApp {
  speedUpTarget: number;
  fovTarget: number;
  dispose(): void;
}

interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
  hyperspeedRef?: MutableRefObject<HyperspeedApp | null>;
}

declare const Hyperspeed: (props: HyperspeedProps) => JSX.Element;

export default Hyperspeed;
