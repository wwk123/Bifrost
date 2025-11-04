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
  // Enable instrumentation for SSR polyfills
  experimental: {
    instrumentationHook: true,
  }
};

export default nextConfig;
