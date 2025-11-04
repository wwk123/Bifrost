/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  // Suppress hydration warnings for client-only libraries
  reactStrictMode: true,
  // Optimize server-side rendering
  experimental: {
    optimizePackageImports: ['framer-motion'],
  }
};

export default nextConfig;
