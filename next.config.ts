import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1420028-5294304.cloudwaysapps.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "print-perfect.local",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
