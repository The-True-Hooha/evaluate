/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    baseUrl: 'https://main.dn1yub99dp50a.amplifyapp.com/',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'robohash.org',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
