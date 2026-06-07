import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const MAX_R = 32
const FULL_SWEEP = 4 * Math.PI
const GROWTH = MAX_R / Math.sqrt(FULL_SWEEP)

type FermatSpiralLoaderProps = Omit<PathLoaderProps, "path">

function FermatSpiralLoader({
  period = 2000,
  size = SIZE,
  ...props
}: FermatSpiralLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath(
          (theta) => {
            const r = GROWTH * Math.sqrt(theta)
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

export { FermatSpiralLoader }
export type { FermatSpiralLoaderProps }
