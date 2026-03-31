import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
       userAgent: '*',
       allow: '/',
       disallow: '/admin', // Protect admin area from search results
    },
    sitemap: 'https://andalusiaamarine.com/sitemap.xml',
  }
}
