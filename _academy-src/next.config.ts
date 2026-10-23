import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/academy",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
