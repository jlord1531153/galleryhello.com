# Gallery Hello

A curated gallery of AI portraits — sweet & sultry, office, qipao and JK fashion — with public previews for every collection.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components)
- Tailwind CSS 4
- Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare)

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

## Verifying a change

```bash
pnpm run build && pnpm start   # then:
./scripts/verify-site.sh       # HTTP checks against the running site
```

## Deploying to Cloudflare Workers

The build output is produced by OpenNext, then deployed with Wrangler.

```bash
pnpm run build:cf     # -> .open-next/
pnpm run deploy       # build + upload to Cloudflare
pnpm run preview      # build + run locally in workerd
```

`wrangler.jsonc` holds the Worker configuration. The R2 bucket backing the incremental cache is created automatically on the first deploy.

In the Cloudflare dashboard set the build command to `npx opennextjs-cloudflare build` and the deploy command to `npx opennextjs-cloudflare deploy`, with `NEXT_PUBLIC_IMAGE_CDN_URL` and `NEXT_PUBLIC_SITE_URL` configured as build variables.
