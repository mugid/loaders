import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const WIDTH = 80
const HEIGHT = 40
const AMPLITUDE = 14
const SAMPLES = 64
const PERIOD_MS = 2000
const CYCLES = 2
const DECAY = 0.35
const FREQ = 5

function buildDampedSinePath(progress: number) {
  if (progress < 0.001) return ""

  const midY = HEIGHT / 2
  let d = ""
  const steps = Math.max(1, Math.round(progress * SAMPLES))

  for (let i = 0; i <= steps; i++) {
    const x = (i / SAMPLES) * WIDTH
    const t = (i / SAMPLES) * CYCLES * 2 * Math.PI
    const envelope = Math.exp(-DECAY * (i / SAMPLES) * CYCLES * 2 * Math.PI)
    const y = midY + Math.sin(FREQ * t) * AMPLITUDE * envelope
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

export function DampedSineLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const pathD = useTransform(() => {
    const progress = shouldReduceMotion
      ? 0
      : easedLoopProgress(time.get(), PERIOD_MS)
    return buildDampedSinePath(progress)
  })

  return (
    <div className="flex h-[120px] items-center justify-center">
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
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
