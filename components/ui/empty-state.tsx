import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * Shown when a filtered result set contains no collections. Offers a way
 * back to the complete list.
 */
export function EmptyState({
  title = "No collections found",
  message,
  actionLabel = "View all collections",
  actionHref = "/explore",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-divider bg-surface px-6 py-20 text-center">
      <p className="font-display text-xl text-foreground">{title}</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        {message}
      </p>
      <Link
        href={actionHref}
        className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
