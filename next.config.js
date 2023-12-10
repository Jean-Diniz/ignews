/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/',
  assetPrefix: '/',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
