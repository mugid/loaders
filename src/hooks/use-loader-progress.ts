import { useReducedMotion, useTime, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { easedLoopProgress } from "@/lib/eased-progress"

type UseLoaderProgressOptions = {
  period?: number
}

/** Returns a looping 0–1 motion value with ease-out, respecting reduced motion. */
export function useLoaderProgress({
  period = 2000,
}: UseLoaderProgressOptions = {}): MotionValue<number> {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  return useTransform(() =>
    shouldReduceMotion ? 0 : easedLoopProgress(time.get(), period),
  )
}
