import type { ImageLoader } from "next/image";

/**
 * A `next/image` loader for a static export.
 *
 * A static build has no image optimizer behind `/_next/image`, so the
 * loader is the only place the source URL gets rewritten. The collection
 * images are already WebP and sized for the largest place they are
 * displayed, so the original file is served as-is.
 *
 * The `srcset` that `next/image` generates still points at this loader,
 * which means every entry in it resolves to the same original file. The
 * browser then downloads the image once and caches it.
 */
const imageLoader: ImageLoader = ({ src }) => src;

export default imageLoader;
