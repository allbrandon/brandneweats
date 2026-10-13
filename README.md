# BrandNewEats

Travel Vietnam & Asia Like a Local — built with Next.js 16, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Next.js 16** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS** (Studio at `/studio` in the Next.js site)
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

**Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Sanity Studio

The Studio is mounted in the Next.js site at `/studio`. Log in with your Sanity account. The `studio/` directory also contains an older standalone configuration.

**Schemas:**
- **Post** — title, slug, status (draft/published), hero image, excerpt, content (Portable Text), tags, reading time, destination, SEO fields
- **Tag** — name, slug
- **Destination** — country overview and city cards
- **City Guide** — reusable city itinerary pages with day tabs and activities

### Creating a city itinerary

1. In Studio, create a **City Guide**. Set its city, URL slug, country, page heading and optional intro, budget and hero image.
2. Add itinerary days and activities. Each activity can have its own time, photo, full description, price, map link and video link.
3. Add a **Booking link** only for activities that need a Book button. Leaving it empty hides the button.
4. Open the matching **Destination**, find the city card under **Explore Cities**, and select its City Guide. That card will then link to `/destinations/<country>/<city>`.

The Hanoi starter itinerary is already in Sanity. Its images and expanded notes are placeholders to replace in Studio.

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

## Booking click tracking

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the local and Vercel environments to the
website's GA4 measurement ID. Booking buttons (hotels, itinerary activities, and
pre-trip cards) send one `booking_click` event per left/keyboard or middle click.
Blog links are not included in this custom tracking.

The event includes `item_name`, `item_category`, `link_url`, `page_location`,
`affiliate_provider`, `affiliate_item`, and `affiliate_placement`. Pre-trip cards
use `item_category = essential` and `affiliate_placement = pre_trip`. Providers
are inferred from the destination hostname; unknown providers use the hostname.
`TrackedBookingLink` also accepts a `provider` override for future shortened links.
These events measure outbound intent, including the YouTrip information button;
they do not establish a completed booking or commission.

In GA4 **Admin → Data display → Custom definitions**, register event-scoped
dimensions for `affiliate_provider`, `affiliate_item`, and `affiliate_placement`.
To report only pre-trip clicks, filter `Event name = booking_click` and
`Affiliate placement = pre_trip`, then use Affiliate item and Affiliate provider
with Event count. Use the built-in Page location and Link URL dimensions for
source and destination. New custom dimensions can take 24–48 hours to appear in
reports and do not backfill older events.

After deployment, click a pre-trip button and check GA4 Realtime (or DebugView
with a debug-enabled browser) for `booking_click` and its parameters. Local
payload tests and a successful build do not confirm receipt by GA4.

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
