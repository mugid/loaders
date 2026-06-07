import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { loaders } from "@/components/loaders/registry"
import { cn } from "@/lib/utils"

function LoaderTile({
  name,
  formula,
  Component,
}: {
  name: string
  formula: string
  Component: (typeof loaders)[number]["Component"]
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(formula)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <article className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm text-foreground">{name.toLowerCase()}</h2>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied formula" : "Copy formula"}
          className={cn(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors",
            "hover:bg-muted hover:text-foreground",
          )}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>

      <div className="relative flex h-[160px] items-center justify-center rounded-lg bg-muted/50">
        <Component />
        <Badge
          variant="secondary"
          className="absolute right-3 bottom-3 font-mono text-xs"
        >
          {formula}
        </Badge>
      </div>
    </article>
  )
}

export function LoaderGallery() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-3xl px-6 py-16">
      <header className="mb-12 text-left">
        <h1 className="text-md font-semibold tracking-tight">
          loaders. the fun way.
        </h1>
        <p className="text-md text-muted-foreground">
          math is everywhere, apparently.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-12 gap-y-16">
        {loaders.map((loader) => (
          <LoaderTile key={loader.id} {...loader} />
        ))}
      </div>
    </main>
  )
}
