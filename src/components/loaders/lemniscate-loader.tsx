import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 40

type LemniscateLoaderProps = Omit<PathLoaderProps, "path">

function LemniscateLoader({
  period = 2000,
  size = SIZE,
  ...props
}: LemniscateLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      path={(progress) =>
        buildSweptPath((t) => {
          const sinT = Math.sin(t)
          const cosT = Math.cos(t)
          const denom = 1 + sinT * sinT
          return {
            x: center + (SCALE * cosT) / denom,
            y: center + (SCALE * sinT * cosT) / denom,
          }
        }, progress * 2 * Math.PI)
      }
      {...props}
    />
  )
}

export { LemniscateLoader }
export type { LemniscateLoaderProps }
