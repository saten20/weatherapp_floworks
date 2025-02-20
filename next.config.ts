import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;