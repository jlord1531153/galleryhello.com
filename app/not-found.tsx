import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Page Not Found
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        The page you are looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          Back Home
        </Link>
        <Link
          href="/explore"
          className="inline-flex items-center justify-center rounded-full border border-divider px-7 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Explore Collections
        </Link>
      </div>
    </div>
  );
}
