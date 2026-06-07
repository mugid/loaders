import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { loaders } from "@/components/loaders/registry"

export function LoaderGallery() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-5xl px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Math Loaders
        </h1>
        <p className="mt-3 text-muted-foreground">
          Loaders driven by mathematical functions.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loaders.map(({ id, name, formula, description, Component }) => (
          <Card key={id} className="gap-0 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{name}</CardTitle>
                <Badge variant="secondary" className="font-mono">
                  {formula}
                </Badge>
              </div>
              <CardDescription className="mt-2">{description}</CardDescription>
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
