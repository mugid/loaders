import { motion, useReducedMotion, useTime, useTransform } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

const R = 28
const SIZE = 96
const CENTER = SIZE / 2
const GROWTH_PERIOD_MS = 2000
const ROTATION_PERIOD_MS = 3000
const BASE_ANGLE = -Math.PI / 2

function buildArcPath(sweepRadians: number, rotation: number): string {
  if (sweepRadians < 0.001) return ""

  const startAngle = BASE_ANGLE + rotation
  const x0 = CENTER + R * Math.cos(startAngle)
  const y0 = CENTER + R * Math.sin(startAngle)

  if (sweepRadians >= 2 * Math.PI - 0.001) {
    const xMid = CENTER + R * Math.cos(startAngle + Math.PI)
    const yMid = CENTER + R * Math.sin(startAngle + Math.PI)
    return `M ${x0} ${y0} A ${R} ${R} 0 1 1 ${xMid} ${yMid} A ${R} ${R} 0 1 1 ${x0} ${y0}`
  }

  const endAngle = startAngle + sweepRadians
  const x1 = CENTER + R * Math.cos(endAngle)
  const y1 = CENTER + R * Math.sin(endAngle)
  const largeArc = sweepRadians > Math.PI ? 1 : 0

  return `M ${x0} ${y0} A ${R} ${R} 0 ${largeArc} 1 ${x1} ${y1}`
}

export function UnitCircleLoader() {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const pathD = useTransform(() => {
    const sweep = shouldReduceMotion
      ? 0
      : easedLoopProgress(time.get(), GROWTH_PERIOD_MS) * 2 * Math.PI
    const rotation = shouldReduceMotion
      ? 0
      : easedLoopProgress(time.get(), ROTATION_PERIOD_MS) * 2 * Math.PI
    return buildArcPath(sweep, rotation)
  })

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
        />
      </svg>
    </div>
  )
}
