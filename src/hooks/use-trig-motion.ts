import { useReducedMotion, useTime, useTransform } from "motion/react"

export type TrigFn = "sin" | "cos"

/**
 * Returns a motion value that traces a trigonometric function over time.
 *
 * The value oscillates in [-amplitude, amplitude], completing one full
 * period every `periodMs`. `phase` offsets the curve along the x-axis so
 * multiple instances can be staggered to render a continuous wave.
 *
 * When the user prefers reduced motion, the value is frozen at t = 0
 * (i.e. the function evaluated at the phase offset only).
 */
export function useTrigMotion(
  fn: TrigFn,
  phase = 0,
  amplitude = 1,
  periodMs = 2000,
) {
  const time = useTime()
  const shouldReduceMotion = useReducedMotion()

  return useTransform(() => {
    const t = shouldReduceMotion
      ? phase
      : (time.get() / periodMs) * 2 * Math.PI + phase
    const value = fn === "sin" ? Math.sin(t) : Math.cos(t)
    return value * amplitude
  })
}
