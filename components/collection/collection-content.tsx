import Image from "next/image";
import { notFound } from "next/navigation";
import { CollectionCard } from "@/components/collection/collection-card";
import { PreviewGallery } from "@/components/collection/preview-gallery";
import {
  getCollectionBySlug,
  getCategoryLabel,
  getRelatedCollections,
} from "@/lib/collections";

interface CollectionContentProps {
  slug: string;
}

/**
 * Renders a single collection. Split out of the page so the `params`
 * access sits behind a `<Suspense>` boundary — the page shell still
 * prerenders, while the collection body streams in.
 */
export function CollectionContent({ slug }: CollectionContentProps) {
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const related = getRelatedCollections(collection.slug, 4);
  const categoryLabel = getCategoryLabel(collection.category);

  // Placeholder covers for the locked section. The full set is already
  // published, so these reuse the tail of the preview list with a blur —
  // no separate image files are needed.
  // const lockedImages = collection.previewImages
  //   .slice(-3)
  //   .reverse();

  return (
    <>
      {/* Header — cover beside copy on desktop, stacked on mobile */}
      <section className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="media-3x4 overflow-hidden rounded-xl border border-divider">
          <Image
            src={collection.coverImage}
            alt={`${collection.title} collection cover`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="lg:pt-4">
          <p className="eyebrow">Collection / {categoryLabel}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {collection.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {collection.description}
          </p>
          <p className="mt-6 text-sm text-muted">
            {collection.totalPhotos} Photos · {categoryLabel}
          </p>
          <a
            href="#preview-gallery"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-divider px-6 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Browse Preview
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
              <path d="M8 3v10" />
              <path d="M3.5 8.5L8 13l4.5-4.5" />
            </svg>
          </a>
        </div>
      </section>

      {/* Public preview gallery */}
      <section id="preview-gallery" className="scroll-mt-24 pt-16 lg:pt-24">
        <h2 className="section-heading">Preview Gallery</h2>
        <p className="mt-2 text-sm text-muted">
          A selection of publicly viewable images from this collection.
        </p>
        <div className="mt-8">
          <PreviewGallery
            images={collection.previewImages}
            title={collection.title}
          />
        </div>
      </section>

      {/* Exclusive collection — hidden for now, no unlock control
      <section className="pt-16 lg:pt-24">
        <h2 className="section-heading">Exclusive Collection</h2>
        <p className="mt-2 text-sm text-muted">
          Exclusive gallery — unlocking coming soon.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-5">
          {lockedImages.map((image, index) => (
            <div
              key={image}
              className="media-3x4 overflow-hidden rounded-xl border border-divider"
            >
              <Image
                src={image}
                alt={`${collection.title} exclusive placeholder ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover blur-xl scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-background/70"
              />
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          These previews are placeholders. The full set is not yet available.
        </p>
      </section>
      */}

      {/* Related collections — omitted entirely when there are none */}
      {related.length > 0 ? (
        <section className="pt-16 lg:pt-24">
          <h2 className="section-heading">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {related.map((item) => (
              <CollectionCard key={item.slug} collection={item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
