import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildSweptPath } from "@/lib/build-path"

const SIZE = 96
const SCALE = 32
const FREQ_X = 3
const FREQ_Y = 2

type LissajousLoaderProps = Omit<PathLoaderProps, "path">

function LissajousLoader({
  period = 2000,
  size = SIZE,
  ...props
}: LissajousLoaderProps) {
  const center = size / 2

  return (
    <PathLoader
      size={size}
      period={period}
      path={(progress) =>
        buildSweptPath(
          (t) => ({
            x: center + SCALE * Math.sin(FREQ_X * t),
            y: center + SCALE * Math.sin(FREQ_Y * t),
          }),
          progress * 2 * Math.PI,
        )
      }
      {...props}
    />
  )
}

export { LissajousLoader }
export type { LissajousLoaderProps }
