import { motion, useReducedMotion, useTime, useTransform } from "motion/react"

const WIDTH = 80
const HEIGHT = 40
const AMPLITUDE = 9
const SAMPLES = 64
const PERIOD_MS = 2000
const CYCLES = 2

function buildWavePath(fn: "sin" | "cos", phase: number) {
  const midY = HEIGHT / 2
  let d = ""

  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * WIDTH
    const t = (i / SAMPLES) * CYCLES * 2 * Math.PI + phase
    const y = midY + (fn === "sin" ? Math.sin(t) : Math.cos(t)) * AMPLITUDE
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

function TrigWaveLine({ fn }: { fn: "sin" | "cos" }) {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  const pathD = useTransform(() => {
    const phase = shouldReduceMotion
      ? 0
      : (time.get() / PERIOD_MS) * 2 * Math.PI
    return buildWavePath(fn, phase)
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

export function SinWaveLine() {
  return <TrigWaveLine fn="sin" />
}

export function CosWaveLine() {
  return <TrigWaveLine fn="cos" />
}
