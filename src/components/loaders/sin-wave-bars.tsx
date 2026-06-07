import { motion } from "motion/react"
import { useTrigMotion } from "@/hooks/use-trig-motion"

const BAR_COUNT = 5
const TRAVEL = 16

function Bar({ phase }: { phase: number }) {
  const y = useTrigMotion("sin", phase, TRAVEL)
  return (
    <motion.span
      style={{ y }}
      className="h-12 w-2 rounded-full bg-foreground"
    />
  )
}

export function SinWaveBars() {
  return (
    <div className="flex h-[120px] items-center justify-center gap-1.5">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <Bar key={i} phase={(i / BAR_COUNT) * Math.PI * 2} />
      ))}
    </div>
  )
}
