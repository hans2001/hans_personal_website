import { renderToStaticMarkup } from 'react-dom/server'
import App from './App.jsx'

// Renders every section at once so non-JS crawlers (and LLM agents, which
// mostly do not execute JavaScript) receive the full page as static HTML.
export function render() {
  return renderToStaticMarkup(<App seoMode />)
}
