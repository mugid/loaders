import { Analytics } from "@vercel/analytics/react"
import { LoaderGallery } from "@/components/loader-gallery"

function App() {
  return (
    <>
      <LoaderGallery />
      <Analytics />
    </>
  )
}

export default App
