import type { ComponentType } from "react"
import { SinWaveBars } from "./sin-wave-bars"
import { CosWaveBars } from "./cos-wave-bars"
import { UnitCircleLoader } from "./unit-circle-loader"

export type LoaderEntry = {
  id: string
  name: string
  formula: string
  description: string
  Component: ComponentType
}

export const loaders: LoaderEntry[] = [
  {
    id: "sin-wave",
    name: "Sine Wave",
    formula: "sin(x)",
    description: "Bars rise and fall along the sine curve, each phase-shifted.",
    Component: SinWaveBars,
  },
  {
    id: "cos-wave",
    name: "Cosine Wave",
    formula: "cos(x)",
    description: "The same wave shifted by π/2 — cosine leads sine.",
    Component: CosWaveBars,
  },
  {
    id: "unit-circle",
    name: "Unit Circle",
    formula: "(cos t, sin t)",
    description: "A point orbiting the origin, parameterized by sine and cosine.",
    Component: UnitCircleLoader,
  },
]
