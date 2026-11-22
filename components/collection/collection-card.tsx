import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "@/lib/collections";
import type { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
  /** `priority` for above-the-fold cards on the home page. */
  priority?: boolean;
  sizes?: string;
}

export function CollectionCard({
  collection,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
}: CollectionCardProps) {
  const { slug, title, category, coverImage, totalPhotos, tag } = collection;

  return (
    <Link
      href={`/collections/${slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`${title} — ${getCategoryLabel(category)}`}
    >
      <div className="media-3x4 overflow-hidden rounded-xl border border-divider transition-colors group-hover:border-accent/50">
        <Image
          src={coverImage}
          alt={`${title} collection cover`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[0.6875rem] uppercase tracking-widest text-accent backdrop-blur-sm">
            {tag}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted">
            {getCategoryLabel(category)}
          </p>
        </div>
        <p className="shrink-0 pt-0.5 text-xs text-muted">
          {totalPhotos} Photos
        </p>
      </div>
    </Link>
  );
}
