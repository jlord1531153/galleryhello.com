"use client";

import { useSearchParams } from "next/navigation";
import { ExploreBrowser } from "@/components/explore/explore-browser";
import { getCategories, getCollections } from "@/lib/collections";

/**
 * Renders the interactive browser.
 *
 * The `?category=` query parameter is read on the client with
 * `useSearchParams`. A server-side `searchParams` prop would make the
 * route dynamic, which a static export cannot do — the query string is
 * only available in the browser.
 */
export function ExploreContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("category");
  const initialCategory = rawCategory ?? "all";

  return (
    <ExploreBrowser
      collections={getCollections()}
      categories={getCategories()}
      initialCategory={initialCategory}
    />
  );
}
