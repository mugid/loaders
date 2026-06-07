import type { ComponentType } from "react"

import {
  SinWaveLoader,
  CosWaveLoader,
  UnitCircleLoader,
  Polar2CosLoader,
  LissajousLoader,
  SpiralLoader,
  CardioidLoader,
  AstroidLoader,
  LemniscateLoader,
  LogSpiralLoader,
  DampedSineLoader,
  EllipseLoader,
  FermatSpiralLoader,
  EvenRoseLoader,
  ButterflyLoader,
  EpicycloidLoader,
} from "./index"

export const REGISTRY_SLUG = "mugid/loaders"

export function getShadcnAddCommand(item: string) {
  return `npx shadcn@latest add ${REGISTRY_SLUG}/${item}`
}

export type LoaderEntry = {
  id: string
  name: string
  formula: string
  description: string
  shadcnItem: string
  Component: ComponentType
}

export const loaders: LoaderEntry[] = [
  {
    id: "sin-wave",
    name: "Sine Wave",
    formula: "sin(x)",
    description: "A sine curve drawn progressively from left to right.",
    shadcnItem: "trig-wave-loader",
    Component: SinWaveLoader,
  },
  {
    id: "cos-wave",
    name: "Cosine Wave",
    formula: "cos(x)",
    description: "A cosine curve drawn progressively from left to right.",
    shadcnItem: "trig-wave-loader",
    Component: CosWaveLoader,
  },
  {
    id: "unit-circle",
    name: "Unit Circle",
    formula: "(cos t, sin t)",
    description: "A curvy arc growing from 0 to the full circumference 2πr.",
    shadcnItem: "unit-circle-loader",
    Component: UnitCircleLoader,
  },
  {
    id: "polar-2cos",
    name: "Rose Curve",
    formula: "r = 2cos(3θ)",
    description: "A rose curve with 3 petals, drawn from zero to the full flower.",
    shadcnItem: "polar-2cos-loader",
    Component: Polar2CosLoader,
  },
  {
    id: "lissajous",
    name: "Lissajous",
    formula: "sin(3t), sin(2t)",
    description: "A Lissajous figure traced by two sine waves at different frequencies.",
    shadcnItem: "lissajous-loader",
    Component: LissajousLoader,
  },
  {
    id: "spiral",
    name: "Spiral",
    formula: "r = θ",
    description: "An Archimedean spiral winding outward from the center.",
    shadcnItem: "spiral-loader",
    Component: SpiralLoader,
  },
  {
    id: "cardioid",
    name: "Cardioid",
    formula: "r = 1+cos(θ)",
    description: "A heart-shaped cardioid drawn in polar coordinates.",
    shadcnItem: "cardioid-loader",
    Component: CardioidLoader,
  },
  {
    id: "astroid",
    name: "Astroid",
    formula: "cos³t, sin³t",
    description: "A four-cusped hypocycloid traced parametrically.",
    shadcnItem: "astroid-loader",
    Component: AstroidLoader,
  },
  {
    id: "lemniscate",
    name: "Lemniscate",
    formula: "r² = cos(2θ)",
    description: "A figure-eight curve from the lemniscate of Bernoulli.",
    shadcnItem: "lemniscate-loader",
    Component: LemniscateLoader,
  },
  {
    id: "log-spiral",
    name: "Log Spiral",
    formula: "r = e^θ",
    description: "A logarithmic spiral that grows exponentially with angle.",
    shadcnItem: "log-spiral-loader",
    Component: LogSpiralLoader,
  },
  {
    id: "damped-sine",
    name: "Damped Sine",
    formula: "e^(−x)·sin(5x)",
    description: "A damped oscillation drawn progressively from left to right.",
    shadcnItem: "damped-sine-loader",
    Component: DampedSineLoader,
  },
  {
    id: "ellipse",
    name: "Ellipse",
    formula: "(3cos t, 2sin t)",
    description: "An ellipse traced parametrically from zero to a full revolution.",
    shadcnItem: "ellipse-loader",
    Component: EllipseLoader,
  },
  {
    id: "fermat-spiral",
    name: "Fermat Spiral",
    formula: "r = √θ",
    description: "A parabolic spiral where radius grows with the square root of angle.",
    shadcnItem: "fermat-spiral-loader",
    Component: FermatSpiralLoader,
  },
  {
    id: "even-rose",
    name: "Even Rose",
    formula: "r = 2cos(4θ)",
    description: "An eight-petaled rose from an even-frequency cosine.",
    shadcnItem: "even-rose-loader",
    Component: EvenRoseLoader,
  },
  {
    id: "butterfly",
    name: "Butterfly",
    formula: "r = e^cos θ − 2cos 4θ",
    description: "The butterfly curve traced in polar coordinates.",
    shadcnItem: "butterfly-loader",
    Component: ButterflyLoader,
  },
  {
    id: "epicycloid",
    name: "Epicycloid",
    formula: "(R+r)cos t − r cos(kt)",
    description: "A spirograph curve traced by a circle rolling around another.",
    shadcnItem: "epicycloid-loader",
    Component: EpicycloidLoader,
  },
]
