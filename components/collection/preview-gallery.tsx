"use client";

import Image from "next/image";
import { useState } from "react";
import { PreviewLightbox } from "@/components/collection/preview-lightbox";

interface PreviewGalleryProps {
  images: string[];
  title: string;
}

/**
 * The public preview grid. Clicking an image opens the enlarged view.
 */
export function PreviewGallery({ images, title }: PreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-5">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open preview image ${index + 1} of ${images.length}`}
            className="media-3x4 overflow-hidden rounded-xl border border-divider transition-colors hover:border-accent/60"
          >
            <Image
              src={image}
              alt={`${title} preview ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <PreviewLightbox
        images={images}
        title={title}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
