/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
       alias: {
          ...config.resolve.alias,
          "react/jsx-runtime.js": "react/jsx-runtime",
          "react/jsx-dev-runtime.js": "react/jsx-dev-runtime"

        }
      }
    };
  }
}

module.exports = nextConfig
