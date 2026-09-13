import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = process.cwd()
const outDir = path.join(root, 'dist')
const ssrDir = path.join(root, '.ssr-tmp')

// 1. Build the app for the server so we can render it to a string.
await build({
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: '.ssr-tmp',
    emptyOutDir: true,
    copyPublicDir: false
  }
})

// 2. Render every section to static markup.
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const html = render()

// 3. Inject it into the built index.html so crawlers get real content.
const indexPath = path.join(outDir, 'index.html')
const source = await readFile(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!source.includes(marker)) {
  throw new Error('prerender: could not find empty #root in dist/index.html')
}
await writeFile(indexPath, source.replace(marker, `<div id="root">${html}</div>`), 'utf8')

await rm(ssrDir, { recursive: true, force: true })

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
console.log(`prerender: injected ${html.length} chars of HTML (${text.split(' ').length} words) into dist/index.html`)
