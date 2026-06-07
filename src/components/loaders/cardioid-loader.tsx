import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 14

type CardioidLoaderProps = Omit<PathLoaderProps, "path">

function CardioidLoader({
  period = 2000,
  size = SIZE,
  ...props
}: CardioidLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      path={(progress) =>
        buildSweptPath((theta) => {
          const r = 1 + Math.cos(theta)
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

export { CardioidLoader }
export type { CardioidLoaderProps }
