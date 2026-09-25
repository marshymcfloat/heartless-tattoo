"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const options: LenisOptions = {
  autoRaf: true,
  lerp: 0.085,
  smoothWheel: true,
  syncTouch: false,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
  virtualScroll: ({ deltaX, deltaY }) => Math.abs(deltaY) >= Math.abs(deltaX),
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <ReactLenis root options={options}>{children}</ReactLenis>;
}
