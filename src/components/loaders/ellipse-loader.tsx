import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const RX = 34
const RY = 20

type EllipseLoaderProps = Omit<PathLoaderProps, "path">

function EllipseLoader({ period = 2000, size = SIZE, ...props }: EllipseLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      path={(progress) =>
        buildSweptPath(
          (t) => ({
            x: center + RX * Math.cos(t),
            y: center + RY * Math.sin(t),
          }),
          progress * 2 * Math.PI,
        )
      }
      {...props}
    />
  )
}

export { EllipseLoader }
export type { EllipseLoaderProps }
