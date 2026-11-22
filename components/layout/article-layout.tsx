interface ArticleLayoutProps {
  eyebrow?: string;
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

/**
 * The shared long-form reading layout used by About, Privacy Policy and
 * Terms of Service: a narrow content column with clear heading hierarchy.
 */
export function ArticleLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="container-page py-14 lg:py-20">
      <div className="mx-auto max-w-[760px]">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {lastUpdated ? (
          <p className="mt-4 text-sm text-muted">Last updated: {lastUpdated}</p>
        ) : null}
        <hr className="rule my-10" />
        <div className="article-body">{children}</div>
      </div>
    </div>
  );
}
