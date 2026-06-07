import { motion, useReducedMotion, useTime, useTransform } from "motion/react"

const R = 28
const SIZE = 96
const CENTER = SIZE / 2
const PERIOD_MS = 2000
const START_ANGLE = -Math.PI / 2

function buildArcPath(sweepRadians: number): string {
  if (sweepRadians < 0.001) return ""

  const x0 = CENTER + R * Math.cos(START_ANGLE)
  const y0 = CENTER + R * Math.sin(START_ANGLE)

  if (sweepRadians >= 2 * Math.PI - 0.001) {
    const xMid = CENTER + R * Math.cos(START_ANGLE + Math.PI)
    const yMid = CENTER + R * Math.sin(START_ANGLE + Math.PI)
    return `M ${x0} ${y0} A ${R} ${R} 0 1 1 ${xMid} ${yMid} A ${R} ${R} 0 1 1 ${x0} ${y0}`
  }

  const endAngle = START_ANGLE + sweepRadians
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
      : ((time.get() % PERIOD_MS) / PERIOD_MS) * 2 * Math.PI
    return buildArcPath(sweep)
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
