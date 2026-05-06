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
