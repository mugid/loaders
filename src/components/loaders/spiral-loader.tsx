import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const MAX_R = 32
const FULL_SWEEP = 4 * Math.PI

type SpiralLoaderProps = Omit<PathLoaderProps, "path">

function SpiralLoader({ period = 2000, size = SIZE, ...props }: SpiralLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath(
          (theta) => {
            const r = (theta / FULL_SWEEP) * MAX_R
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

export { SpiralLoader }
export type { SpiralLoaderProps }
