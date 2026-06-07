import { motion } from "motion/react"
import { useTrigMotion } from "@/hooks/use-trig-motion"

const RADIUS = 38

export function UnitCircleLoader() {
  const x = useTrigMotion("cos", 0, RADIUS)
  const y = useTrigMotion("sin", 0, RADIUS)

  return (
    <div className="flex h-[120px] items-center justify-center">
      <div
        className="relative flex items-center justify-center rounded-full border border-dashed border-muted-foreground/30"
        style={{ width: RADIUS * 2 + 16, height: RADIUS * 2 + 16 }}
      >
        <motion.span
          style={{ x, y }}
          className="absolute size-3.5 rounded-full bg-foreground"
        />
      </div>
    </div>
  )
}
