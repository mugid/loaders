import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 14
const PETALS = 3

type RoseLoaderProps = Omit<PathLoaderProps, "path">

function RoseLoader({ period = 2000, size = SIZE, ...props }: RoseLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath((theta) => {
          const r = 2 * Math.cos(PETALS * theta)
          return {
            x: center + SCALE * r * Math.cos(theta),
            y: center + SCALE * r * Math.sin(theta),
          }
        }, progress * 2 * Math.PI)
      }
      {...props}
    />
  )
}

export { RoseLoader as Polar2CosLoader }
export type { RoseLoaderProps as Polar2CosLoaderProps }
