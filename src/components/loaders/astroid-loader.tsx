import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 32

type AstroidLoaderProps = Omit<PathLoaderProps, "path">

function AstroidLoader({ period = 2000, size = SIZE, ...props }: AstroidLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      rotateWithProgress
      path={(progress) =>
        buildSweptPath((t) => {
          const c = Math.cos(t)
          const s = Math.sin(t)
          return {
            x: center + SCALE * c * c * c,
            y: center + SCALE * s * s * s,
          }
        }, progress * 2 * Math.PI)
      }
      {...props}
    />
  )
}

export { AstroidLoader }
export type { AstroidLoaderProps }
