import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: imageCdnRemotePatterns,
  },
  cacheLife: {
    // A short-lived profile used for values that must stay stable during
    // prerendering but still refresh over time — currently the copyright
    // year in the footer.
    hours: {
      stale: 3600,
      revalidate: 900,
      expire: 86400,
    },
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

// Wires the Cloudflare bindings into the local dev server, so `next dev`
// behaves like the deployed Worker.
initOpenNextCloudflareForDev();
