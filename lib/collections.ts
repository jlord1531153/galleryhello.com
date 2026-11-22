import categoryData from "@/data/category.json";
import collectionsData from "@/data/collections.json";
import type { Category, Collection } from "@/lib/types";

/**
 * The full catalogue, ordered by publication date descending.
 *
 * `data/collections.json` is the single source of truth for the
 * collections — adding one requires editing only that file. The category
 * each collection belongs to is referenced by slug; the category details
 * live separately in `data/category.json`.
 */
const collections = (collectionsData as Collection[])
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/**
 * Every category, ordered by the `order` field in `data/category.json`.
 */
const categories = (categoryData as Category[])
  .slice()
  .sort((a, b) => a.order - b.order);

/**
 * Maps a category slug to the folder that holds its source images under
 * `gallery/`.
 *
 * Most slugs match their folder name directly. The one exception is
 * `sweet-sultry`, whose images live in `gallery/sweet-allure/` — the
 * category was renamed but the folder kept its original name. Keeping the
 * mapping here means the folder can be renamed later without touching any
 * category or collection data.
 */
export const CATEGORY_SOURCE_FOLDERS: Record<string, string> = {
  "sweet-sultry": "sweet-allure",
  "office-lady": "office-lady",
  "ai-portraits": "ai-portraits",
  qipao: "qipao",
  "jk-fashion": "jk-fashion",
};

/**
 * The id of the set a collection was built from — the trailing number in
 * its slug, e.g. `15335` for `hot-secretary-office-fashion-15335`.
 *
 * The storage bucket keeps its folders under the original `gallery/`
 * layout, so the id and the category folder are what locate a set's
 * images there.
 */
export function getCollectionSetId(slug: string): string {
  const id = slug.match(/(\d+)$/)?.[1];

  if (!id) {
    throw new Error(`Collection slug has no trailing id: ${slug}`);
  }

  return id;
}

/** The bucket path of a collection's images: `<category-folder>/<set-id>`. */
export function getCollectionImagePath(slug: string): string {
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    throw new Error(`Unknown collection: ${slug}`);
  }

  const folder = CATEGORY_SOURCE_FOLDERS[collection.category];

  if (!folder) {
    throw new Error(
      `No image folder mapped for category "${collection.category}"`,
    );
  }

  return `${folder}/${getCollectionSetId(slug)}`;
}

export type SortOption = "newest" | "az";

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

/**
 * Every category from `data/category.json`, paired with the number of
 * collections filed under it.
 *
 * The category list comes from `data/category.json` and the counts from
 * `data/collections.json`; the two files stay separate and are joined
 * here, on the category slug.
 */
export function getCategories(): {
  key: string;
  label: string;
  description: string;
  count: number;
}[] {
  return categories.map((category) => ({
    key: category.slug,
    label: category.name,
    description: category.description,
    count: collections.filter(
      (collection) => collection.category === category.slug,
    ).length,
  }));
}

/**
 * The category record for a given key.
 *
 * The `slug` is the single key that links categories to collections, so a
 * lookup only matches on it.
 */
export function getCategory(key: string): Category | undefined {
  return categories.find((category) => category.slug === key);
}

/** Returns the display label for a category key, falling back to the raw key. */
export function getCategoryLabel(key: string): string {
  return getCategory(key)?.name ?? key;
}

/**
 * The `gallery/` folder that holds the source images for a category.
 *
 * Returns `null` for an unknown category.
 */
export function getCategorySourceFolder(key: string): string | null {
  return CATEGORY_SOURCE_FOLDERS[key] ?? null;
}

/** The collections surfaced in the home page Featured section. */
export function getFeaturedCollections(): Collection[] {
  return collections.filter((collection) => collection.featured);
}

/** The most recently published collections, newest first. */
export function getLatestCollections(): Collection[] {
  return collections;
}

/**
 * Collections related to the given one: same category first, then any
 * other collection, excluding the collection itself. Capped at four.
 * Returns an empty array when nothing else is related.
 */
export function getRelatedCollections(slug: string, limit = 4): Collection[] {
  const current = getCollectionBySlug(slug);

  if (!current) {
    return [];
  }

  const others = collections.filter((collection) => collection.slug !== slug);

  const sameCategory = others.filter(
    (collection) => collection.category === current.category,
  );
  const otherCategories = others.filter(
    (collection) => collection.category !== current.category,
  );

  return [...sameCategory, ...otherCategories].slice(0, limit);
}

/** Sorts a list of collections according to the requested option. */
export function sortCollections(
  list: Collection[],
  sort: SortOption,
): Collection[] {
  const sorted = list.slice();

  if (sort === "az") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  return sorted;
}
