export type Point = { x: number; y: number }

const TAU = 2 * Math.PI

/** Builds an SVG path by sweeping a parametric curve from 0 to `sweepRadians`. */
export function buildSweptPath(
  sample: (t: number) => Point,
  sweepRadians: number,
  fullSweepRadians = TAU,
  samples = 128,
): string {
  if (sweepRadians < 0.001) return ""

  let d = ""
  const steps = Math.max(2, Math.round((sweepRadians / fullSweepRadians) * samples))

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * sweepRadians
    const { x, y } = sample(t)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

/** Builds an SVG path by drawing left-to-right as `progress` goes from 0 to 1. */
export function buildHorizontalPath(
  sample: (t: number) => Point,
  progress: number,
  samples = 64,
): string {
  if (progress < 0.001) return ""

  let d = ""
  const steps = Math.max(1, Math.round(progress * samples))

  for (let i = 0; i <= steps; i++) {
    const t = i / samples
    const { x, y } = sample(t)
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return d.trim()
}

/** Builds a circular arc or full circle from a start angle and sweep. */
export function buildArcPath({
  cx,
  cy,
  r,
  startAngle,
  sweepRadians,
}: {
  cx: number
  cy: number
  r: number
  startAngle: number
  sweepRadians: number
}): string {
  if (sweepRadians < 0.001) return ""

  const x0 = cx + r * Math.cos(startAngle)
  const y0 = cy + r * Math.sin(startAngle)

  if (sweepRadians >= TAU - 0.001) {
    const xMid = cx + r * Math.cos(startAngle + Math.PI)
    const yMid = cy + r * Math.sin(startAngle + Math.PI)
    return `M ${x0} ${y0} A ${r} ${r} 0 1 1 ${xMid} ${yMid} A ${r} ${r} 0 1 1 ${x0} ${y0}`
  }

  const endAngle = startAngle + sweepRadians
  const x1 = cx + r * Math.cos(endAngle)
  const y1 = cy + r * Math.sin(endAngle)
  const largeArc = sweepRadians > Math.PI ? 1 : 0

  return `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`
}
