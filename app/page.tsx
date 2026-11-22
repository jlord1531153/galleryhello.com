import Link from "next/link";
import { CollectionGrid } from "@/components/collection/collection-grid";
import {
  getCategories,
  getFeaturedCollections,
  getLatestCollections,
} from "@/lib/collections";

export default function HomePage() {
  const featured = getFeaturedCollections();
  const latest = getLatestCollections();
  const categories = getCategories();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-divider">
        <div className="container-page py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Curated Visual Collections</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Discover Beautiful
              <br />
              Visual Stories.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Explore curated AI portraits across five distinct styles. Every
              collection is hand-picked and previewed in public.
            </p>
            <Link
              href="/explore"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Explore Collections
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 8h11" />
                <path d="M9 3.5L13.5 8L9 12.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container-page py-16 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-heading">Featured Collections</h2>
          <Link
            href="/explore"
            className="shrink-0 text-sm text-muted transition-colors hover:text-accent"
          >
            View all
          </Link>
        </div>
        <CollectionGrid collections={featured} priorityCount={4} />
      </section>

      {/* Explore by Style */}
      <section className="border-y border-divider bg-surface">
        <div className="container-page py-14 lg:py-16">
          <h2 className="section-heading">Explore by Style</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/explore?category=${category.key}`}
                className="rounded-full border border-divider px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collections */}
      <section className="container-page py-16 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-heading">Latest Collections</h2>
          <Link
            href="/explore"
            className="shrink-0 text-sm text-muted transition-colors hover:text-accent"
          >
            View all
          </Link>
        </div>
        <CollectionGrid collections={latest} />
      </section>
    </>
  );
}
