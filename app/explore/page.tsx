import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreContent } from "@/components/explore/explore-content";
import { PageTitle } from "@/components/ui/page-title";

export const metadata: Metadata = {
  title: "Explore Collections",
  description:
    "Browse every curated collection on Gallery Hello — AI portraits, sweet & sultry, office, qipao and JK fashion. Filter by category and sort the full catalogue.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  return (
    <div className="container-page py-14 lg:py-20">
      <PageTitle
        eyebrow="Explore"
        title="Explore Collections"
        description="Discover portraits, creative concepts and visual stories."
      />

      <div className="mt-10 lg:mt-14">
        <Suspense
          fallback={
            <div className="flex flex-wrap gap-2.5">
              <span className="h-10 w-24 animate-pulse rounded-full bg-surface" />
              <span className="h-10 w-32 animate-pulse rounded-full bg-surface" />
              <span className="h-10 w-28 animate-pulse rounded-full bg-surface" />
            </div>
          }
        >
          <ExploreContent />
        </Suspense>
      </div>
    </div>
  );
}
