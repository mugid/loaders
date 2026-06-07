import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const SIZE = 96
const CENTER = SIZE / 2
const SCALE = 32
const PERIOD_MS = 2000
const FULL_SWEEP = 2 * Math.PI
const SAMPLES = 128

function astroidPoint(t: number) {
  const c = Math.cos(t)
  const s = Math.sin(t)
  return {
    x: CENTER + SCALE * c * c * c,
    y: CENTER + SCALE * s * s * s,
  }
}

function buildAstroidPath(sweepRadians: number): string {
  if (sweepRadians < 0.001) return ""

  let d = ""
  const steps = Math.max(2, Math.round((sweepRadians / FULL_SWEEP) * SAMPLES))

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * sweepRadians
    const { x, y } = astroidPoint(t)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

export function AstroidLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const progress = useTransform(() =>
    shouldReduceMotion ? 0 : easedLoopProgress(time.get(), PERIOD_MS),
  )

  const pathD = useTransform(() => buildAstroidPath(progress.get() * FULL_SWEEP))

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
