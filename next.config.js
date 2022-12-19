/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:3000", "localhost:3001", "loremflickr.com"],
  },
}

module.exports = nextConfig
