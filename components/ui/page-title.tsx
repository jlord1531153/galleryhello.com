interface PageTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/**
 * The shared page header used by Explore and the long-form pages.
 */
export function PageTitle({ eyebrow, title, description }: PageTitleProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
