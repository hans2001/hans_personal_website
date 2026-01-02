import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'emit-sitemap',
      apply: 'build',
      generateBundle() {
        const siteUrl = 'https://chaksingho.com'
        const lastmod = new Date().toISOString()
        const routes = ['/', '/hans-ho/']
        const xmlEntries = routes
          .map((route) => {
            const normalized = route === '/' ? `${siteUrl}/` : `${siteUrl}${route.startsWith('/') ? '' : '/'}${route}`
            return `  <url>\n    <loc>${normalized}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`
          })
          .join('\n')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: xml
        })
      }
    }
  ],
})
