"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface PreviewLightboxProps {
  images: string[];
  title: string;
  /** Index of the image to open, or `null` to keep the overlay closed. */
  activeIndex: number | null;
  onClose: () => void;
}

/**
 * An enlarged view of a public preview image, built on the native
 * `<dialog>` element so that focus trapping, Escape handling, backdrop
 * styling and top-layer rendering all come from the platform.
 */
export function PreviewLightbox({
  images,
  title,
  activeIndex,
  onClose,
}: PreviewLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = activeIndex !== null;
  const image = open ? images[activeIndex] : undefined;

  const handleClose = useCallback(() => {
    document.documentElement.style.overflow = "";
    onClose();
  }, [onClose]);

  // Open / close the dialog imperatively so React never owns the `open`
  // attribute — that keeps the element in the top layer reliably.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Close on Escape. The native <dialog> already handles this, but an
  // explicit handler guarantees the overlay closes even in browsers or
  // automation contexts where the default action does not run.
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  // Restore the scroll lock whenever the overlay goes away — including
  // when the browser closes the dialog itself (Escape key, or the `close`
  // event) rather than React driving the transition.
  useEffect(() => {
    if (!open) {
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      // Fires when the dialog closes by any means: the close button, the
      // Escape key, or a backdrop click.
      onClose={handleClose}
      onClick={(event) => {
        // A click that lands on the dialog element itself is a backdrop click.
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      {image ? (
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-8">
          <Image
            src={image}
            alt={`${title} preview image`}
            width={900}
            height={1200}
            className="h-auto w-auto max-h-full max-w-full object-contain"
            priority
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close preview image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-background"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5l10 10" />
              <path d="M15 5L5 15" />
            </svg>
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
