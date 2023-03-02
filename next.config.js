/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['files.stripe.com'],
  },

  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
