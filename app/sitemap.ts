import type { MetadataRoute } from "next";
import { getCollections } from "@/lib/collections";
import { SITE_URL } from "@/lib/site-config";

// A static export has no server to render this route at request time, so
// the route is prerendered into a file during the build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/explore`, lastModified: now, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, priority: 0.3 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = getCollections().map(
    (collection) => ({
      url: `${SITE_URL}/collections/${collection.slug}`,
      lastModified: new Date(collection.publishedAt),
      priority: 0.8,
    }),
  );

  return [...staticRoutes, ...collectionRoutes];
}
