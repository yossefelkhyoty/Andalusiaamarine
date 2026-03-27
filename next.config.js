/** @type {import('next').NextConfig} */
const nextConfig = {
    // Vercel deployment optimizations
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // For now since everything is in ./images/
    },
}

module.exports = nextConfig
