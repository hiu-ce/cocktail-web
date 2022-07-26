/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  serverRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
