import { PathLoader, type PathLoaderProps } from "@/components/ui/math-loader"
import { buildHorizontalPath } from "@/lib/build-path"

const WIDTH = 80
const HEIGHT = 40
const AMPLITUDE = 9
const CYCLES = 2

type TrigWaveLoaderProps = Omit<PathLoaderProps, "path" | "width" | "height"> & {
  fn: "sin" | "cos"
}

function TrigWaveLoader({ fn, period = 2000, ...props }: TrigWaveLoaderProps) {
  const midY = HEIGHT / 2

  return (
    <PathLoader
      width={WIDTH}
      height={HEIGHT}
      period={period}
      path={(progress) =>
        buildHorizontalPath((t) => {
          const phase = t * CYCLES * 2 * Math.PI
          const y =
            midY + (fn === "sin" ? Math.sin(phase) : Math.cos(phase)) * AMPLITUDE
          return { x: t * WIDTH, y }
        }, progress)
      }
      {...props}
    />
  )
}

type SinWaveLoaderProps = Omit<TrigWaveLoaderProps, "fn">

function SinWaveLoader(props: SinWaveLoaderProps) {
  return <TrigWaveLoader fn="sin" {...props} />
}

type CosWaveLoaderProps = Omit<TrigWaveLoaderProps, "fn">

function CosWaveLoader(props: CosWaveLoaderProps) {
  return <TrigWaveLoader fn="cos" {...props} />
}

export { SinWaveLoader, CosWaveLoader, TrigWaveLoader }
export type { SinWaveLoaderProps, CosWaveLoaderProps, TrigWaveLoaderProps }
