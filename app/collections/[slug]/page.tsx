import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CollectionContent } from "@/components/collection/collection-content";
import { getCollectionOrNotFound } from "@/lib/collection-lookup";
import {
  getCollectionBySlug,
  getCategoryLabel,
  getCollections,
} from "@/lib/collections";
import { SITE_URL } from "@/lib/site-config";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every collection is known at build time, so each detail page is
 * prerendered ahead of the request.
 */
export function generateStaticParams() {
  return getCollections().map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  const title = `${collection.title} — ${getCategoryLabel(collection.category)}`;

  return {
    title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      type: "article",
      title,
      description: collection.description,
      url: `${SITE_URL}/collections/${collection.slug}`,
      images: [
        {
          url: collection.coverImage,
          width: 900,
          height: 1200,
          alt: `${collection.title} collection cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: collection.description,
      images: [collection.coverImage],
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;

  // The lookup is cached and throws the not-found error for an unknown
  // slug. Running it here — before the Suspense boundary — means the
  // response status is set to 404 rather than 200 with 404 content.
  await getCollectionOrNotFound(slug);

  return (
    <div className="container-page py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-divider">
            /
          </li>
          <li>
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground"
            >
              Explore
            </Link>
          </li>
          <li aria-hidden="true" className="text-divider">
            /
          </li>
          <li aria-current="page" className="text-foreground">
            Collection
          </li>
        </ol>
      </nav>

      <Suspense
        fallback={
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="media-3x4 animate-pulse rounded-xl bg-surface" />
            <div className="space-y-4 lg:pt-4">
              <div className="h-4 w-32 animate-pulse rounded bg-surface" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-surface" />
              <div className="h-20 w-full animate-pulse rounded bg-surface" />
            </div>
          </div>
        }
      >
        <CollectionResolver slug={slug} />
      </Suspense>
    </div>
  );
}

function CollectionResolver({ slug }: { slug: string }) {
  return <CollectionContent slug={slug} />;
}
