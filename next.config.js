/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // logging: 'verbose',
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/unit/1',
      },
    ];
  },
};

module.exports = nextConfig;
