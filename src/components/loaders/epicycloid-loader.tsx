import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const SIZE = 96
const CENTER = SIZE / 2
const R = 24
const ROLLER = 6
const K = (R + ROLLER) / ROLLER
const PERIOD_MS = 2000
const FULL_SWEEP = 2 * Math.PI
const SAMPLES = 256

function epicycloidPoint(t: number) {
  return {
    x: CENTER + (R + ROLLER) * Math.cos(t) - ROLLER * Math.cos(K * t),
    y: CENTER + (R + ROLLER) * Math.sin(t) - ROLLER * Math.sin(K * t),
  }
}

function buildEpicycloidPath(sweepRadians: number): string {
  if (sweepRadians < 0.001) return ""

  let d = ""
  const steps = Math.max(2, Math.round((sweepRadians / FULL_SWEEP) * SAMPLES))

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * sweepRadians
    const { x, y } = epicycloidPoint(t)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

export function EpicycloidLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const progress = useTransform(() =>
    shouldReduceMotion ? 0 : easedLoopProgress(time.get(), PERIOD_MS),
  )

  const pathD = useTransform(() => buildEpicycloidPath(progress.get() * FULL_SWEEP))

  const rotate = useTransform(() => progress.get() * 360)

  return (
    <div className="flex h-[120px] items-center justify-center">
      <motion.div style={{ rotate }}>
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
      </motion.div>
    </div>
  )
}
