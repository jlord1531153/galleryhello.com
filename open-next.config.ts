import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

/**
 * The site's data lives in JSON files that are bundled at build time, so a
 * content change always arrives with a new deployment rather than a
 * runtime revalidation.
 *
 * R2 is used as the incremental cache store because the app uses
 * `use cache` (Cache Components), which stores its entries as
 * "composable" cache entries. The static-assets cache does not support
 * that entry type; R2 does.
 *
 * The tag cache is left at its default. It is only used by
 * `revalidateTag` / `revalidatePath`, which this app never calls.
 */
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
