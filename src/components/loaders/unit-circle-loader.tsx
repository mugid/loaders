import { useTransform } from "motion/react"

import {
  MathLoader,
  MathLoaderPath,
  MathLoaderSvg,
  type MathLoaderProps,
} from "@/components/ui/math-loader"
import { useLoaderProgress } from "@/hooks/use-loader-progress"
import { buildArcPath } from "@/lib/build-path"

const BASE_ANGLE = -Math.PI / 2

type UnitCircleLoaderProps = MathLoaderProps & {
  period?: number
  rotationPeriod?: number
  radius?: number
  size?: number
}

function UnitCircleLoader({
  className,
  period = 2000,
  rotationPeriod = 3000,
  radius = 28,
  size = 96,
  ...props
}: UnitCircleLoaderProps) {
  const center = size / 2
  const growth = useLoaderProgress({ period })
  const rotation = useLoaderProgress({ period: rotationPeriod })

  const pathD = useTransform(() => {
    const sweep = growth.get() * 2 * Math.PI
    const angle = rotation.get() * 2 * Math.PI
    return buildArcPath({
      cx: center,
      cy: center,
      r: radius,
      startAngle: BASE_ANGLE + angle,
      sweepRadians: sweep,
    })
  })

  return (
    <MathLoader className={className} {...props}>
      <MathLoaderSvg size={size}>
        <MathLoaderPath d={pathD} />
      </MathLoaderSvg>
    </MathLoader>
  )
}

export { UnitCircleLoader }
export type { UnitCircleLoaderProps }
