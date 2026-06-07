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
    description: "A sine curve drawn progressively from left to right.",
    Component: SinWaveLoader,
  },
  {
    id: "cos-wave",
    name: "Cosine Wave",
    formula: "cos(x)",
    description: "A cosine curve drawn progressively from left to right.",
    Component: CosWaveLoader,
  },
  {
    id: "unit-circle",
    name: "Unit Circle",
    formula: "(cos t, sin t)",
    description: "A curvy arc growing from 0 to the full circumference 2πr.",
    Component: UnitCircleLoader,
  },
  {
    id: "polar-2cos",
    name: "Rose Curve",
    formula: "r = 2cos(3θ)",
    description: "A rose curve with 3 petals, drawn from zero to the full flower.",
    Component: Polar2CosLoader,
  },
  {
    id: "lissajous",
    name: "Lissajous",
    formula: "sin(3t), sin(2t)",
    description: "A Lissajous figure traced by two sine waves at different frequencies.",
    Component: LissajousLoader,
  },
  {
    id: "spiral",
    name: "Spiral",
    formula: "r = θ",
    description: "An Archimedean spiral winding outward from the center.",
    Component: SpiralLoader,
  },
  {
    id: "cardioid",
    name: "Cardioid",
    formula: "r = 1+cos(θ)",
    description: "A heart-shaped cardioid drawn in polar coordinates.",
    Component: CardioidLoader,
  },
  {
    id: "astroid",
    name: "Astroid",
    formula: "cos³t, sin³t",
    description: "A four-cusped hypocycloid traced parametrically.",
    Component: AstroidLoader,
  },
  {
    id: "lemniscate",
    name: "Lemniscate",
    formula: "r² = cos(2θ)",
    description: "A figure-eight curve from the lemniscate of Bernoulli.",
    Component: LemniscateLoader,
  },
  {
    id: "log-spiral",
    name: "Log Spiral",
    formula: "r = e^θ",
    description: "A logarithmic spiral that grows exponentially with angle.",
    Component: LogSpiralLoader,
  },
  {
    id: "damped-sine",
    name: "Damped Sine",
    formula: "e^(−x)·sin(5x)",
    description: "A damped oscillation drawn progressively from left to right.",
    Component: DampedSineLoader,
  },
  {
    id: "ellipse",
    name: "Ellipse",
    formula: "(3cos t, 2sin t)",
    description: "An ellipse traced parametrically from zero to a full revolution.",
    Component: EllipseLoader,
  },
  {
    id: "fermat-spiral",
    name: "Fermat Spiral",
    formula: "r = √θ",
    description: "A parabolic spiral where radius grows with the square root of angle.",
    Component: FermatSpiralLoader,
  },
  {
    id: "even-rose",
    name: "Even Rose",
    formula: "r = 2cos(4θ)",
    description: "An eight-petaled rose from an even-frequency cosine.",
    Component: EvenRoseLoader,
  },
  {
    id: "butterfly",
    name: "Butterfly",
    formula: "r = e^cos θ − 2cos 4θ",
    description: "The butterfly curve traced in polar coordinates.",
    Component: ButterflyLoader,
  },
  {
    id: "epicycloid",
    name: "Epicycloid",
    formula: "(R+r)cos t − r cos(kt)",
    description: "A spirograph curve traced by a circle rolling around another.",
    Component: EpicycloidLoader,
  },
]
