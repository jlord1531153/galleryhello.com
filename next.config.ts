import type { NextConfig } from "next";

const imageCdnUrl = process.env.NEXT_PUBLIC_IMAGE_CDN_URL;

// The collection images are served by the storage bucket. The host is read
// from the environment so it can be swapped without a code change.
const imageCdnRemotePatterns = imageCdnUrl
  ? [
      {
        protocol: new URL(imageCdnUrl).protocol.replace(
          ":",
          "",
        ) as "http" | "https",
        hostname: new URL(imageCdnUrl).hostname,
        pathname: "/**",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  // The site is fully prerendered: every page, the sitemap, the robots
  // file and the social images are written out as static files.
  //
  // Only the production build exports. The dev server keeps the normal
  // server mode, so the image optimizer and the hot reload work locally.
  ...(process.env.NODE_ENV === "production"
    ? { output: "export" as const }
    : {}),
  images: {
    remotePatterns: imageCdnRemotePatterns,
    // A static export has no image optimizer behind `/_next/image`, so a
    // custom loader points straight at the source image instead.
    //
    // The dev server keeps the default loader: it runs the optimizer
    // itself, and needs no loader file.
    ...(process.env.NODE_ENV === "production"
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : {}),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
