// const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/app-path',
  webpack: (config) => {
    // config.resolve.fallback = {
    //   fs: false
    // };

    // https://github.com/Financial-Times/origami/issues/485
    // N.B. Perhaps Origami should be updated to include main in package.json
    config.resolve.mainFields.push('browser')

    return config
  },
  transpilePackages: ['../packages/']
}

module.exports = nextConfig
