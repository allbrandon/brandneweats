# BrandNewEats

Travel Vietnam & Asia Like a Local — built with Next.js 14, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Next.js 14** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS** (standalone Studio in `/studio/` directory)
- **Vercel** (hosting)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

```bash
npx sanity@latest init --env
```

Or create one at [sanity.io/manage](https://sanity.io/manage) and copy your Project ID.

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | e.g. `2024-01-01` |
| `SANITY_API_READ_TOKEN` | From Sanity → API → Tokens |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (no trailing slash) |
| `VERCEL_DEPLOY_HOOK_URL` | Vercel deploy hook URL |

### 4. Run locally

**Next.js site:**
```bash
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

**Sanity Studio (in a separate terminal):**
```bash
cd studio
cp .env.example .env
# fill in your project ID and dataset
npx sanity@latest dev
```

Studio: [http://localhost:3333](http://localhost:3333)

---

## Sanity Studio

The Studio lives in the `studio/` directory and runs separately. Log in with your Sanity account.

> **Why separate?** Sanity Studio requires React 19, while Next.js 14 uses React 18. Running them as separate processes avoids the version conflict.

**Schemas:**
- **Post** — title, slug, status (draft/published), hero image, excerpt, content (Portable Text), tags, reading time, destination, SEO fields
- **Tag** — name, slug

---

## Auto-Rebuild on Publish (Vercel + Sanity Webhook)

1. In Vercel: **Project Settings → Git → Deploy Hooks** → create a hook → copy the URL
2. Add it to `.env.local` as `VERCEL_DEPLOY_HOOK_URL`
3. In Sanity Studio: **API → Webhooks** → create a new webhook:
   - URL: your Vercel deploy hook URL
   - Dataset: `production`
   - Trigger on: **Create**, **Update**
   - Filter: `_type == "post" && status == "published"`

Every time you publish a post, Sanity fires the webhook → Vercel triggers a full rebuild → new post goes live.

---

## Deployment

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy

---

## Adding Your Logo & Photos

- **Logo**: Replace the text logo in `src/components/layout/Navbar.tsx` with `<Image src="/logo.svg" ...>`
- **Hero illustration**: Replace the placeholder in `src/app/(frontend)/page.tsx`
- **Brandon's photo**: Replace the placeholder in the About section of `src/app/(frontend)/page.tsx`
- **Destination images**: Upload sketch-style images via Sanity and update destination cards in `src/app/(frontend)/destinations/page.tsx`

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx           # Nav + Footer + global metadata + JSON-LD
│   │   ├── page.tsx             # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/page.tsx  # Individual post
│   │   ├── destinations/
│   │   │   ├── page.tsx
│   │   │   └── [country]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── api/contact/route.ts     # Contact form endpoint
│   └── studio/[[...index]]/page.tsx  # Sanity Studio
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   ├── blog/PostCard.tsx
│   ├── blog/PostHeader.tsx
│   ├── blog/PostBody.tsx
│   ├── blog/PortableTextComponents.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── sanity.client.ts
│   ├── sanity.image.ts
│   └── queries.ts
├── sanity/
│   ├── env.ts
│   ├── structure.ts
│   └── schemaTypes/
│       ├── index.ts
│       ├── post.ts
│       ├── tag.ts
│       └── blockContent.ts
└── sanity.config.ts
```
