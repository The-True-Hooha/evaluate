/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['upload.wikimedia.org'],
    },
    reactStrictMode: true,
    swcMinify: true,
    
}

module.exports = nextConfig
