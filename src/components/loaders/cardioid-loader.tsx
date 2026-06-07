import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const SCALE = 14
const SIZE = 96
const CENTER = SIZE / 2
const PERIOD_MS = 2000
const FULL_SWEEP = 2 * Math.PI
const SAMPLES = 128

function cardioidPoint(theta: number) {
  const r = 1 + Math.cos(theta)
  return {
    x: CENTER + SCALE * r * Math.cos(theta),
    y: CENTER + SCALE * r * Math.sin(theta),
  }
}

function buildCardioidPath(sweepRadians: number): string {
  if (sweepRadians < 0.001) return ""

  let d = ""
  const steps = Math.max(2, Math.round((sweepRadians / FULL_SWEEP) * SAMPLES))

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * sweepRadians
    const { x, y } = cardioidPoint(theta)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

export function CardioidLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const progress = useTransform(() =>
    shouldReduceMotion ? 0 : easedLoopProgress(time.get(), PERIOD_MS),
  )

  const pathD = useTransform(() => buildCardioidPath(progress.get() * FULL_SWEEP))

  return (
    <div className="flex h-[120px] items-center justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="text-foreground"
        aria-hidden
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
