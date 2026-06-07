import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const SIZE = 96
const CENTER = SIZE / 2
const SCALE = 32
const PERIOD_MS = 2000
const FULL_SWEEP = 2 * Math.PI
const SAMPLES = 128
const FREQ_X = 3
const FREQ_Y = 2

function lissajousPoint(t: number) {
  return {
    x: CENTER + SCALE * Math.sin(FREQ_X * t),
    y: CENTER + SCALE * Math.sin(FREQ_Y * t),
  }
}

function buildLissajousPath(sweepRadians: number): string {
  if (sweepRadians < 0.001) return ""

  let d = ""
  const steps = Math.max(2, Math.round((sweepRadians / FULL_SWEEP) * SAMPLES))

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * sweepRadians
    const { x, y } = lissajousPoint(t)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

export function LissajousLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const progress = useTransform(() =>
    shouldReduceMotion ? 0 : easedLoopProgress(time.get(), PERIOD_MS),
  )

  const pathD = useTransform(() => buildLissajousPath(progress.get() * FULL_SWEEP))

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
