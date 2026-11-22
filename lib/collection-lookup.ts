import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections } from "@/lib/collections";
import type { Collection } from "@/lib/types";

/**
 * Looks up a collection and throws the not-found error when the slug does
 * not exist.
 *
 * The lookup is cached so that the result is stable during prerendering
 * and the request never waits on anything uncached. Because the check
 * happens inside a cached function, it runs before the response starts —
 * so an unknown slug produces a real HTTP 404 status rather than a 200
 * carrying 404 content.
 */
export async function getCollectionOrNotFound(
  slug: string,
): Promise<Collection> {
  "use cache";
  cacheLife("hours");

  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return collection;
}

/**
 * The prerendered slug list. Kept next to the lookup so the two stay in
 * sync.
 */
export function getCollectionSlugs(): string[] {
  return getCollections().map((collection) => collection.slug);
}
