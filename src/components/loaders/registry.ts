import type { ComponentType } from "react"
import { SinWaveLine } from "./trig-wave-line"
import { CosWaveLine } from "./trig-wave-line"
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
    description: "A line tracing the sine curve as it shifts through time.",
    Component: SinWaveLine,
  },
  {
    id: "cos-wave",
    name: "Cosine Wave",
    formula: "cos(x)",
    description: "A line tracing the cosine curve, phase-shifted from sine.",
    Component: CosWaveLine,
  },
  {
    id: "unit-circle",
    name: "Unit Circle",
    formula: "(cos t, sin t)",
    description: "A curvy arc growing from 0 to the full circumference 2πr.",
    Component: UnitCircleLoader,
  },
]
