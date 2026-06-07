import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getShadcnAddCommand, loaders } from "@/components/loaders/registry"
import { cn } from "@/lib/utils"

const iconTransition = {
  initial: { opacity: 0, filter: "blur(6px)", scale: 0.85 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(6px)", scale: 0.85 },
  transition: { duration: 0.2 },
}

function LoaderTile({
  name,
  formula,
  shadcnItem,
  Component,
}: {
  name: string
  formula: string
  shadcnItem: string
  Component: (typeof loaders)[number]["Component"]
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(getShadcnAddCommand(shadcnItem))
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
          aria-label={copied ? "Copied install command" : "Copy install command"}
          className={cn(
            "relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md text-muted-foreground transition-colors",
            "hover:bg-muted hover:text-foreground",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                className="inline-flex"
                {...iconTransition}
              >
                <Check className="size-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                className="inline-flex"
                {...iconTransition}
              >
                <Copy className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
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
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-md font-semibold tracking-tight">
            loaders. the fun way.
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/sbek22_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X profile"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-4 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/mugid/loaders"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-4 fill-current"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
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
