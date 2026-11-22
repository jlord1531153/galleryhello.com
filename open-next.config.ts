import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * The site's data lives in JSON files that are bundled at build time, so a
 * content change always arrives with a new deployment rather than a
 * runtime revalidation. A read-only cache over the build output is
 * therefore enough — it needs no R2 bucket, no Durable Object queue and
 * no tag cache.
 *
 * Cache interception is left off because it does not work with partial
 * prerendering, which this site uses.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
