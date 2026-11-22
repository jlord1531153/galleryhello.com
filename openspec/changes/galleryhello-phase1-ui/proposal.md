## Why

GalleryHello (`galleryhello.com`) needs a publicly deployable, brand-consistent English image gallery. The repository currently contains only the `create-next-app` scaffold — no pages, no components, no content, no images. Phase 1 must deliver a complete visitor journey (Home → Explore → Collection Detail → preview lightbox) plus the About / Privacy / Terms / 404 pages, with every visible control resolving to a real destination and zero broken images or fake interactive affordances.

## What Changes

- **Design system**: Replace the default scaffold styling with a "Dark Editorial Gallery" token set (background `#101014`, surface `#1B1B22`, hover `#272730`, text `#F5F2EF` / `#AAA6AF`, accent `#C29B84`, divider `#33313A`), Playfair Display for headings, Inter for UI, `1280px` content max width, `12px` card radius, and `3:4` image ratio with `object-cover`.
- **Shared shell**: Add a sticky `Header` (logo → `/`, nav → Explore / About, mobile menu) and a `Footer` (brand blurb, nav links, contact email, auto-updating year, AI-generated-content note). The footer contact row renders only when a real address is configured.
- **Content model**: Add a typed `Collection` data layer (JSON) with 6–12 seeded collections covering 3–5 categories, each carrying slug, English title, description, category, cover, three public preview images, total photo count, publish date, and featured flag.
- **Pages**:
  - `/` — hero with brand statement + single primary CTA, Featured Collections, Explore by Style category shortcuts, Latest Collections.
  - `/explore` — all collections with working category filter (`/explore?category=…`), Newest / A–Z sort, responsive 4/3/2 grid, and an empty state offering "View all collections".
  - `/collections/[slug]` — cover + copy two-column hero, public preview grid, locked-placeholder section labelled "unlocking coming soon", related collections, and a closable preview lightbox (Esc / backdrop / mobile close).
  - `/about`, `/privacy`, `/terms` — real English content in a narrow (~760px) long-form reading layout.
  - `not-found` — `Page Not Found` with working Back Home / Explore Collections links, retaining Header and Footer.
- **Media**: Generate local placeholder imagery into `public/` so no page renders a broken image and the site works fully offline.
- **SEO**: Per-page titles and descriptions, per-collection metadata with OG images, favicon, `robots.txt`, and `sitemap.xml`.
- **Excluded from Phase 1** (per design doc §7): CPA/offerwall unlocking, unlock-success or callback flows, auth, favorites, payments, admin tooling, a standalone search-results page, standalone category pages, and forwarding mailboxes. Locked areas are visual placeholders only — no clickable unlock buttons, no fabricated view counts, or fake task states.

## Capabilities

### New Capabilities
- `gallery-collection-browsing`: Public browsing surface for curated collections — home page merchandising (featured / latest / by-style), explore page filtering and sorting, and the responsive collection grid.
- `gallery-collection-detail`: Individual collection presentation — cover, metadata, public preview gallery, related collections, and the preview lightbox interaction, including correct 404 behavior for unknown slugs.
- `gallery-site-content`: Static editorial pages (About, Privacy Policy, Terms of Service), the shared 404 page, and the site-wide metadata / SEO surface.
- `gallery-design-system`: The dark editorial visual language — design tokens, typography pairing, responsive grid rules, and the reusable Header / Footer / CollectionCard / FilterChip / EmptyState components.

### Modified Capabilities
<!-- None. This is a greenfield site built on an unmodified scaffold. -->

## Impact

- **Code**: `app/` routes (`/`, `/explore`, `/collections/[slug]`, `/about`, `/privacy`, `/terms`, `not-found.tsx`), plus new `components/`, `lib/` (collection data + helpers), and `data/` (collection JSON) directories. Root `layout.tsx` and `globals.css` are rewritten.
- **Dependencies**: No new runtime dependencies. Uses the existing Next.js 16.4.6 / React 19.3 / Tailwind CSS 4 stack. `next/font/google` supplies Playfair Display and Inter.
- **Assets**: New generated images under `public/`; existing scaffold SVGs removed. New `app/icon` / `app/opengraph-image` metadata files, `app/robots.ts`, and `app/sitemap.ts`.
- **Configuration**: `SITE_CONTACT_EMAIL` environment variable added (with `.env.example`); the contact row is omitted entirely when it is unset. `next.config.ts` gains `images.remotePatterns` only if a remote host is introduced later.
- **Not affected**: No database, no auth, no payment, no third-party unlock integration, no email delivery.
