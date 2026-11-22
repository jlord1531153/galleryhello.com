/**
 * A curated collection of images.
 *
 * `totalPhotos` is a display value describing the planned size of the
 * collection — it is not a count of the images bundled with the site.
 */
export interface Collection {
  /** URL-safe unique identifier, used as the detail route segment. */
  slug: string;
  /** English display title. */
  title: string;
  /** English short description, 2–3 lines when rendered. */
  description: string;
  /** Category key, matching one of the categories in `data/category.json`. */
  category: string;
  /** Path to the 3:4 cover image. */
  coverImage: string;
  /** Paths to the publicly viewable preview images. */
  previewImages: string[];
  /** Display-only total photo count for the collection. */
  totalPhotos: number;
  /** ISO 8601 publication date, used for "Latest" ordering. */
  publishedAt: string;
  /** Whether the collection is surfaced in the Featured section. */
  featured?: boolean;
  /** Optional label shown on the collection card. */
  tag?: "New" | "Featured" | "Preview";
}

/**
 * A category that collections can be filed under.
 *
 * The authoritative list lives in `data/category.json` — adding or
 * renaming a category requires editing only that file. The category data
 * is kept separate from `data/collections.json`; the two are linked by
 * the `slug` alone.
 */
export interface Category {
  /** Stable identifier. Mirrors `slug`, kept for explicit referencing. */
  id: string;
  /** English display name. */
  name: string;
  /**
   * The unique key for a category — used in `?category=` query parameters
   * and in each collection's `category` field.
   */
  slug: string;
  /** One-line description of the category's visual direction. */
  description: string;
  /** Display order — lower numbers come first. */
  order: number;
}
