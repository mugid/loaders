import * as React from "react"
import { motion, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"

import { useLoaderProgress } from "@/hooks/use-loader-progress"
import { cn } from "@/lib/utils"

type MathLoaderProps = React.ComponentProps<"div">

function MathLoader({ className, ...props }: MathLoaderProps) {
  return (
    <div
      data-slot="math-loader"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    />
  )
}

type MathLoaderSvgProps = React.ComponentProps<"svg"> & {
  size?: number
}

function MathLoaderSvg({
  className,
  size = 96,
  width,
  height,
  viewBox,
  children,
  ...props
}: MathLoaderSvgProps) {
  const w = width ?? size
  const h = height ?? size

  return (
    <svg
      data-slot="math-loader-svg"
      width={w}
      height={h}
      viewBox={viewBox ?? `0 0 ${w} ${h}`}
      className={cn("text-foreground", className)}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

type MathLoaderPathProps = Omit<
  React.ComponentProps<typeof motion.path>,
  "d"
> & {
  d: MotionValue<string> | string
}

function MathLoaderPath({
  className,
  strokeWidth = 3.5,
  ...props
}: MathLoaderPathProps) {
  return (
    <motion.path
      data-slot="math-loader-path"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    />
  )
}

type PathLoaderProps = Omit<MathLoaderProps, "children"> & {
  /** Returns SVG path `d` for a normalized progress value in [0, 1]. */
  path: (progress: number) => string
  period?: number
  size?: number
  width?: number
  height?: number
  strokeWidth?: number
  rotateWithProgress?: boolean
}

function PathLoader({
  className,
  path,
  period = 2000,
  size = 96,
  width,
  height,
  strokeWidth = 3.5,
  rotateWithProgress = false,
  ...props
}: PathLoaderProps) {
  const progress = useLoaderProgress({ period })
  const pathD = useTransform(() => path(progress.get()))
  const rotate = useTransform(() =>
    rotateWithProgress ? progress.get() * 360 : 0,
  )

  const svg = (
    <MathLoaderSvg size={size} width={width} height={height}>
      <MathLoaderPath d={pathD} strokeWidth={strokeWidth} />
    </MathLoaderSvg>
  )

  return (
    <MathLoader className={className} {...props}>
      {rotateWithProgress ? (
        <motion.div style={{ rotate }}>{svg}</motion.div>
      ) : (
        svg
      )}
    </MathLoader>
  )
}

export { MathLoader, MathLoaderSvg, MathLoaderPath, PathLoader }
export type {
  MathLoaderProps,
  MathLoaderSvgProps,
  MathLoaderPathProps,
  PathLoaderProps,
}
