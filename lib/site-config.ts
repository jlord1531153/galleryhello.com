/**
 * Site-wide configuration that is resolved at build/render time.
 *
 * Values come from environment variables so that nothing needs to be
 * edited in source when the site is deployed. The contact address is
 * intentionally NOT prefixed with NEXT_PUBLIC_ — it is only ever read
 * during Server Component rendering and never needs to reach the client.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns the configured contact address, or `null` when none is set or
 * the configured value is not a plausible email address.
 *
 * Returning `null` lets callers omit the contact row entirely instead of
 * rendering a placeholder or example address.
 */
export function getContactEmail(): string | null {
  const raw = process.env.SITE_CONTACT_EMAIL?.trim();

  if (!raw) {
    return null;
  }

  return EMAIL_PATTERN.test(raw) ? raw : null;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://galleryhello.com";

/**
 * The origin serving the collection images from the storage bucket.
 *
 * Images live at `<origin>/<category-folder>/<set-id>/<file>`, where
 * `category-folder` is the folder name under `gallery/` and `set-id` is
 * the numeric id of the set.
 */
export const IMAGE_CDN_URL = (
  process.env.NEXT_PUBLIC_IMAGE_CDN_URL ?? "https://image.galleryhello.com"
).replace(/\/+$/, "");

/**
 * Builds the URL of one image in the bucket.
 *
 * @param folder The gallery folder, e.g. `office-lady`.
 * @param setId  The set's numeric id, e.g. `15335`.
 * @param file   The file name, e.g. `cover.webp`.
 */
export function imageUrl(
  folder: string,
  setId: string,
  file: string,
): string {
  return `${IMAGE_CDN_URL}/${folder}/${setId}/${file}`;
}

/**
 * Builds the URL of one image, given its path within the bucket.
 *
 * @param path The path after the origin, e.g. `office-lady/15335/cover.webp`.
 */
export function imagePathUrl(path: string): string {
  return `${IMAGE_CDN_URL}/${path.replace(/^\/+/, "")}`;
}

export const SITE_NAME = "Gallery Hello";

export const SITE_TAGLINE = "Curated AI Portraits & Visual Stories.";

export const SITE_DESCRIPTION =
  "Gallery Hello is a curated gallery of AI portraits — sweet & sultry, office, qipao and JK fashion — with hand-picked collections and public previews.";
