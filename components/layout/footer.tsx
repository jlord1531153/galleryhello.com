import Link from "next/link";
import { cacheLife } from "next/cache";
import { getContactEmail, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

/**
 * The current year, for the copyright line.
 *
 * Cached so the value is stable during prerendering. The cache entry is
 * revalidated daily, so the year rolls over automatically without needing
 * a code change or a request-time render.
 */
async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("hours");
  return new Date().getFullYear();
}

export async function Footer() {
  const contactEmail = getContactEmail();
  const year = await getCurrentYear();

  return (
    <footer className="mt-24 border-t border-divider bg-surface">
      <div className="container-page py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          {/* Brand block */}
          <div className="max-w-sm">
            <p className="font-display text-lg tracking-tight text-foreground">
              GALLERY <span className="text-accent">HELLO.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {SITE_TAGLINE} {SITE_NAME} is a curated gallery of AI portraits —
              sweet &amp; sultry, office, qipao and JK fashion — with public
              previews for every collection.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="min-w-48">
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — omitted entirely when no address is configured */}
          {contactEmail ? (
            <div className="min-w-48">
              <p className="eyebrow">Contact</p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 inline-block text-sm text-muted transition-colors hover:text-foreground"
              >
                {contactEmail}
              </a>
            </div>
          ) : null}
        </div>

        <hr className="rule my-10" />

        <div className="w-full text-xs text-muted sm:flex-row sm:items-center  text-center">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
