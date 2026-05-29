const routes = ['/', '/equipe', '/calendrier', '/resultats', '/sponsors', '/shop', '/contact']

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(route => `  <url><loc>${siteUrl}${route}</loc></url>`)
    .join('\n')}\n</urlset>`
})
