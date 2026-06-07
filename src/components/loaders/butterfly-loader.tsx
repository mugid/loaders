import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 6

type ButterflyLoaderProps = Omit<PathLoaderProps, "path">

function ButterflyLoader({
  period = 2000,
  size = SIZE,
  ...props
}: ButterflyLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      path={(progress) =>
        buildSweptPath(
          (theta) => {
            const r =
              Math.exp(Math.cos(theta)) -
              2 * Math.cos(4 * theta) +
              Math.pow(Math.sin(theta / 12), 5)
            return {
              x: center + SCALE * r * Math.cos(theta),
              y: center + SCALE * r * Math.sin(theta),
            }
          },
          progress * 2 * Math.PI,
          2 * Math.PI,
          256,
        )
      }
      {...props}
    />
  )
}

export { ButterflyLoader }
export type { ButterflyLoaderProps }
