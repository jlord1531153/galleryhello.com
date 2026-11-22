import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections } from "@/lib/collections";
import type { Collection } from "@/lib/types";

/**
 * Looks up a collection and throws the not-found error when the slug does
 * not exist.
 *
 * The lookup reads the bundled collection data, so it resolves without
 * waiting on anything. Unknown slugs are rejected by the proxy before the
 * response starts, which is what turns them into a real 404 status.
 */
export function getCollectionOrNotFound(slug: string): Collection {
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
