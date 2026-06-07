import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildHorizontalPath } from "@/lib/build-path"

const WIDTH = 80
const HEIGHT = 40
const AMPLITUDE = 14
const CYCLES = 2
const DECAY = 0.35
const FREQ = 5

type DampedSineLoaderProps = Omit<PathLoaderProps, "path" | "width" | "height">

function DampedSineLoader({ period = 2000, ...props }: DampedSineLoaderProps) {
  const midY = HEIGHT / 2

  return (
    <PathLoader
      width={WIDTH}
      height={HEIGHT}
      period={period}
      path={(progress) =>
        buildHorizontalPath((t) => {
          const phase = t * CYCLES * 2 * Math.PI
          const envelope = Math.exp(-DECAY * phase)
          const y = midY + Math.sin(FREQ * phase) * AMPLITUDE * envelope
          return { x: t * WIDTH, y }
        }, progress)
      }
      {...props}
    />
  )
}

export { DampedSineLoader }
export type { DampedSineLoaderProps }
