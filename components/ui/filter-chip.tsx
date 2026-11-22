interface FilterChipProps {
  label: string;
  isActive: boolean;
  count?: number;
  onSelect: () => void;
}

/**
 * A category filter control.
 *
 * Rendered as a button so that switching filters is instant. The parent
 * keeps the `?category=` query parameter in sync so the filtered view stays
 * shareable and the back button still works.
 */
export function FilterChip({
  label,
  isActive,
  count,
  onSelect,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        isActive
          ? "border-accent bg-accent/10 text-foreground"
          : "border-divider text-muted hover:border-accent/60 hover:text-foreground"
      }`}
    >
      {label}
      {typeof count === "number" ? (
        <span className={isActive ? "text-accent" : "text-muted/70"}>
          {count}
        </span>
      ) : null}
    </button>
  );
}
