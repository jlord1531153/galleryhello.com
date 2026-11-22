import { CollectionCard } from "@/components/collection/collection-card";
import type { Collection } from "@/lib/types";

interface CollectionGridProps {
  collections: Collection[];
  /** Prioritise the first N covers for faster LCP on the home page. */
  priorityCount?: number;
}

/**
 * The responsive collection grid: 2 cards per row below 640px, 3 between
 * 640px and 1023px, and 4 at 1024px and above.
 */
export function CollectionGrid({
  collections,
  priorityCount = 0,
}: CollectionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection.slug}
          collection={collection}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
