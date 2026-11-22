"use client";

import { useMemo, useState } from "react";
import { CollectionGrid } from "@/components/collection/collection-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { sortCollections, type SortOption } from "@/lib/collections";
import type { Collection } from "@/lib/types";

interface ExploreBrowserProps {
  collections: Collection[];
  categories: {
    key: string;
    label: string;
    description: string;
    count: number;
  }[];
  initialCategory: string;
}

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  az: "A–Z",
};

/**
 * The interactive part of the explore page: owns the category filter, the
 * sort control, and the visible result set.
 *
 * The initial category arrives from the server via the `?category=` query
 * parameter so that a shared URL lands on the correct filter.
 */
export function ExploreBrowser({
  collections,
  categories,
  initialCategory,
}: ExploreBrowserProps) {
  // An absent parameter means "all". A parameter that is present but does
  // not match any category is kept as-is, so the filter resolves to an
  // empty result set rather than silently falling back to the full list.
  const [activeCategory, setActiveCategory] = useState(
    initialCategory || "all",
  );
  const [sort, setSort] = useState<SortOption>("newest");

  const visible = useMemo(() => {
    const filtered =
      !activeCategory || activeCategory === "all"
        ? collections
        : collections.filter(
            (collection) => collection.category === activeCategory,
          );

    return sortCollections(filtered, sort);
  }, [collections, activeCategory, sort]);

  const activeCategoryInfo = categories.find(
    (category) => category.key === activeCategory,
  );

  function selectCategory(key: string) {
    setActiveCategory(key);

    // Keep the URL in sync without pushing a history entry, so the back
    // button does not have to traverse through every filter change.
    const url = new URL(window.location.href);

    if (key === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", key);
    }

    window.history.replaceState(null, "", url);
  }

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5">
        <FilterChip
          label="All"
          isActive={activeCategory === "all"}
          count={collections.length}
          onSelect={() => selectCategory("all")}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.key}
            label={category.label}
            isActive={activeCategory === category.key}
            count={category.count}
            onSelect={() => selectCategory(category.key)}
          />
        ))}
      </div>

      {/* Active category description */}
      {activeCategoryInfo ? (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          {activeCategoryInfo.description}
        </p>
      ) : null}

      {/* Sort control */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <label
          htmlFor="explore-sort"
          className="text-sm text-muted"
        >
          Sort by:
        </label>
        <select
          id="explore-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="rounded-lg border border-divider bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/50"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mt-10">
        {visible.length > 0 ? (
          <CollectionGrid collections={visible} />
        ) : (
          <EmptyState message="There are no collections in this category yet. Browse the complete collection list instead." />
        )}
      </div>
    </div>
  );
}
