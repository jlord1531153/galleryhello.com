import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCollectionSlugs } from "@/lib/collection-lookup";

/**
 * Validates collection slugs before the response starts.
 *
 * Under Cache Components the prerendered shell is sent first, which fixes
 * the status code at 200 — so a `notFound()` thrown while rendering the
 * page body can only produce 404 *content*, never a 404 *status*. This
 * proxy runs before any rendering, so it can return a real 404.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").filter(Boolean)[1];

  if (!slug || getCollectionSlugs().includes(slug)) {
    return NextResponse.next();
  }

  // Rewrite to the not-found route so the site renders its own 404 page
  // (with the global header and footer) under a 404 status.
  const notFoundUrl = request.nextUrl.clone();
  notFoundUrl.pathname = "/_not-found";

  return NextResponse.rewrite(notFoundUrl, {
    status: 404,
  });
}

export const config = {
  matcher: "/collections/:slug",
};
