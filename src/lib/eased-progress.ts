import { easeOut } from "motion"

/** Maps elapsed time to a looping 0–1 progress with ease-out. */
export function easedLoopProgress(timeMs: number, periodMs: number) {
  return easeOut((timeMs % periodMs) / periodMs)
}
