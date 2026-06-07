import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { loaders } from "@/components/loaders/registry"

export function LoaderGallery() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-3xl px-6 py-16">
      <header className="mb-12 text-left">
        <h1 className="text-md font-semibold tracking-tight">
          Math Loaders
        </h1>
        <p className="text-md text-muted-foreground">
          Loaders driven by mathematical functions.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {loaders.map(({ id, name, formula, Component }) => (
          <Card key={id} className="gap-0 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-md">{name}</CardTitle>
                <Badge variant="secondary" className="font-mono text-sm">
                  {formula}
                </Badge>
              </div>
            </CardHeader>

            <Separator className="my-6" />

            <CardContent>
              <div className="flex items-center justify-center rounded-lg bg-muted/50 py-6">
                <Component />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
