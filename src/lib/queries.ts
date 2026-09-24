import { client } from "./sanity.client";
import { groq } from "next-sanity";

// No need to filter by a custom "status" field — Sanity's CDN only
// serves published documents (those without the "drafts." _id prefix).
const postFields = groq`
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  readingTime,
  destination,
  "heroImage": heroImage{
    asset->{_id, url},
    alt,
    hotspot,
    crop
  },
  "tags": tags[]->{name, slug},
  seo
`;

export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      ${postFields}
    }`
  );
}

export async function getLatestPosts(count: number = 3) {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...${count}] {
      ${postFields}
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      content
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  return client.fetch(
    groq`*[_type == "post"] {
      "slug": slug.current,
      publishedAt
    }`
  );
}

export async function getPostsByDestination(destination: string) {
  return client.fetch(
    groq`*[_type == "post" && destination == $destination] | order(publishedAt desc) {
      ${postFields}
    }`,
    { destination }
  );
}

export async function getAllDestinations() {
  return client.fetch(
    groq`*[_type == "destination"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      tagline,
      "coverImage": coverImage{ asset->{_id, url}, alt, hotspot, crop }
    }`
  );
}

export async function getAllCityGuidePaths() {
  return client.fetch(groq`*[_type == "cityGuide" && defined(slug.current) && defined(destination->slug.current)] {
    "city": slug.current,
    "country": destination->slug.current
  }`);
}

export async function getCityGuide(country: string, city: string) {
  return client.fetch(
    groq`*[_type == "cityGuide" && slug.current == $city && destination->slug.current == $country][0] {
      _id, city, title, intro, duration, budget, heroCaption,
      "heroImage": heroImage{asset->{_id, url}, alt, hotspot, crop},
      "destination": destination->{name, slug},
      days[]{
        _key, tabTitle, heading, description,
        activities[]{
          _key, time, title, summary, details, price, priceNote, mapUrl, videoUrl, bookingUrl,
          "image": image{asset->{_id, url}, alt, hotspot, crop}
        }
      }
    }`,
    { country, city }
  );
}

export async function getDestinationBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "destination" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      coverCaption,
      "coverImage": coverImage{ asset->{_id, url}, alt, hotspot, crop },
      essentials{ bestTimeToVisit, currency, mustTry },
      "cities": cities[]{
        name,
        isMustSee,
        "guideSlug": guide->slug.current,
        "image": image{ asset->{_id, url}, alt, hotspot, crop }
      },
      "backgroundImage": backgroundImage{
        asset->{_id, url, metadata{dimensions{width, height}}},
        alt, hotspot, crop
      }
    }`,
    { slug }
  );
}

export async function getSiteSettings() {
  return client.fetch(
    groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
      heroHeading,
      heroSubtext,
      heroTagline,
      "heroImage": heroImage{ asset->{_id, url}, alt, hotspot, crop },
      aboutName,
      aboutBio,
      "profileImage": profileImage{ asset->{_id, url}, alt, hotspot, crop },
      "homeBackground": homeBackground{ asset->{_id, url, metadata{dimensions{width, height}}}, alt, hotspot, crop },
      "blogBackground": blogBackground{ asset->{_id, url, metadata{dimensions{width, height}}}, alt, hotspot, crop },
      "destinationsBackground": destinationsBackground{ asset->{_id, url, metadata{dimensions{width, height}}}, alt, hotspot, crop },
      "contactBackground": contactBackground{ asset->{_id, url, metadata{dimensions{width, height}}}, alt, hotspot, crop }
    }`
  );
}
