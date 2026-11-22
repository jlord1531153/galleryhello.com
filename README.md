# Gallery Hello

A curated gallery of AI portraits — sweet & sultry, office, qipao and JK fashion — with public previews for every collection.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS 4
- Static export → Cloudflare Pages

## Getting started

```bash
pnpm install
pnpm dev
```

The site reads three environment variables. Copy `.env.example` to `.env.local` and fill them in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_IMAGE_CDN_URL` | Origin serving the collection images, e.g. `https://image.galleryhello.com` |
| `NEXT_PUBLIC_SITE_URL` | Public origin of the deployed site, used for canonical URLs, the sitemap and Open Graph metadata |
| `SITE_CONTACT_EMAIL` | Optional. The contact address in the footer and on the About page. When unset the contact row is omitted entirely. |

## Data

- `data/category.json` — the five categories and their display metadata.
- `data/collections.json` — the collection catalogue. Each entry carries a `slug`, `coverImage` and `previewImages` pointing at the image origin above.

Image URLs follow `<origin>/<category-folder>/<set-id>/<file>`, where `category-folder` is the folder name under the bucket and `set-id` is the numeric id of the set. The `sweet-sultry` category maps to the `sweet-allure` folder — see `CATEGORY_SOURCE_FOLDERS` in `lib/collections.ts`.

## Building

```bash
pnpm run build
```

The build is a static export. `next build` writes the site to `out/`, ready for any static host.

Every page is prerendered: the home page, the category pages, the collection detail pages, `robots.txt`, `sitemap.xml` and the social images. Unknown paths fall back to `out/404.html`.

### Images

A static export has no image optimizer behind `/_next/image`. `lib/image-loader.ts` rewrites those requests to Cloudflare Image Resizing instead, so the responsive `srcset` still works and the images are still served as WebP at the right size.

`public/_headers` sets the cache headers. Cloudflare Pages picks that file up automatically.

## Verifying a change

```bash
pnpm run build
./scripts/verify-site.sh
```

## Deploying

Push to the connected Git repository and let Cloudflare Pages build it, or upload the `out/` directory directly.

In the Cloudflare dashboard set the build command to `pnpm run build`, the output directory to `out`, and configure `NEXT_PUBLIC_IMAGE_CDN_URL` and `NEXT_PUBLIC_SITE_URL` as build variables.
