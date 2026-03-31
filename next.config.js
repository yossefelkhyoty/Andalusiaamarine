/** @type {import('next').NextConfig} */
const nextConfig = {
    // Vercel deployment optimizations
    reactStrictMode: true,
    swcMinify: true,
    images: {
      // Enable Next.js image optimization for better Lighthouse scores.
      formats: ['image/avif', 'image/webp'],
      // Allow Supabase Storage public URLs (and any other HTTPS images) if configured.
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.supabase.co',
        },
      ],
    },
    async headers() {
      return [
        // Cache static images aggressively (safe because filenames are content-addressed or manually managed).
        {
          source: '/images/:path*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
        // Uploaded media can still be cached; adjust if you overwrite files with same name.
        {
          source: '/uploads/:path*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
          ],
        },
      ]
    },
}

module.exports = nextConfig
