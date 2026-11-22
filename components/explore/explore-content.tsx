"use client";

import { use } from "react";
import { ExploreBrowser } from "@/components/explore/explore-browser";
import { getCategories, getCollections } from "@/lib/collections";

interface ExploreContentProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Reads the `?category=` query parameter and renders the interactive
 * browser.
 *
 * This is a separate component so the `searchParams` access sits behind a
 * `<Suspense>` boundary in the page — the static shell of the page still
 * prerenders, and only this part streams in at request time.
 */
export function ExploreContent({ searchParams }: ExploreContentProps) {
  const params = use(searchParams);
  const rawCategory = params.category;

  const initialCategory =
    typeof rawCategory === "string" ? rawCategory : "all";

  return (
    <ExploreBrowser
      collections={getCollections()}
      categories={getCategories()}
      initialCategory={initialCategory}
    />
  );
}
