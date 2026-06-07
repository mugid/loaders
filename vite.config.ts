import fs from "fs"
import path from "path"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

function resolveSiteUrl() {
  const fromEnv = process.env.VITE_SITE_URL?.replace(/\/$/, "")
  if (fromEnv) return fromEnv

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl.replace(/\/$/, "")}`

  return ""
}

function seoPlugin(siteUrl: string): Plugin {
  return {
    name: "seo",
    transformIndexHtml(html) {
      if (!siteUrl) {
        return html.replaceAll("%SITE_URL%", "")
      }

      return html.replaceAll("%SITE_URL%", siteUrl)
    },
    closeBundle() {
      if (!siteUrl) return

      const outDir = path.resolve(__dirname, "dist")
      fs.mkdirSync(outDir, { recursive: true })

      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      )

      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
      )
    },
  }
}

const siteUrl = resolveSiteUrl()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin(siteUrl)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
