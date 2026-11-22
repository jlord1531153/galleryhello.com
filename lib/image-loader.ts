import type { ImageLoader } from "next/image";

/**
 * A `next/image` loader for a static export.
 *
 * A static build has no image optimizer behind `/_next/image`, so the
 * loader rewrites the request to Cloudflare Image Resizing instead — the
 * same transformation the Worker performs, but as a plain URL. That keeps
 * the responsive sizing (`sizes`, `fill`, `width`) working without a
 * server of our own.
 *
 * Cloudflare Image Resizing is enabled on the zone by default; it needs
 * no Workers Images binding and no paid plan.
 */
const imageLoader: ImageLoader = ({ src, width, quality }) => {
  // A quality of 75 is what Next.js itself uses by default. Cloudflare
  // accepts it through the `quality` option.
  const params = new URLSearchParams();
  params.set("width", String(width));

  if (quality) {
    params.set("quality", String(quality));
  }

  return `/cdn-cgi/image/${params.toString()}/${src}`;
};

export default imageLoader;
