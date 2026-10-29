import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo-name>, so the deploy build sets this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // Pin the root: a stray lockfile in a parent directory otherwise gets picked as the workspace.
  outputFileTracingRoot: __dirname,
  images: {
    // Static hosting has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
