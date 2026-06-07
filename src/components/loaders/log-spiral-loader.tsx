import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const MIN_R = 4
const MAX_R = 32
const FULL_SWEEP = 3 * Math.PI
const GROWTH = Math.log(MAX_R / MIN_R) / FULL_SWEEP

type LogSpiralLoaderProps = Omit<PathLoaderProps, "path">

function LogSpiralLoader({
  period = 2000,
  size = SIZE,
  ...props
}: LogSpiralLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath(
          (theta) => {
            const r = MIN_R * Math.exp(GROWTH * theta)
            return {
              x: center + r * Math.cos(theta),
              y: center + r * Math.sin(theta),
            }
          },
          progress * FULL_SWEEP,
          FULL_SWEEP,
        )
      }
      {...props}
    />
  )
}

export { LogSpiralLoader }
export type { LogSpiralLoaderProps }
