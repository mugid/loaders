import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const R = 24
const ROLLER = 6
const K = (R + ROLLER) / ROLLER

type EpicycloidLoaderProps = Omit<PathLoaderProps, "path">

function EpicycloidLoader({
  period = 2000,
  size = SIZE,
  ...props
}: EpicycloidLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath(
          (t) => ({
            x: center + (R + ROLLER) * Math.cos(t) - ROLLER * Math.cos(K * t),
            y: center + (R + ROLLER) * Math.sin(t) - ROLLER * Math.sin(K * t),
          }),
          progress * 2 * Math.PI,
          2 * Math.PI,
          256,
        )
      }
      {...props}
    />
  )
}

export { EpicycloidLoader }
export type { EpicycloidLoaderProps }
