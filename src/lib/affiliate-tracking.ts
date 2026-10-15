// Match hostnames, rather than URL text: a destination in a query string or
// a lookalike domain must not determine the provider.
const providerDomains: Record<string, string> = {
  "klook.com": "Klook",
  "klook.tpo.li": "Klook",
  "klook.tp.st": "Klook",
  "agoda.com": "Agoda",
  "airalo.com": "Airalo",
  "travelkon.com.au": "TravelKon",
  "you.co": "YouTrip",
};

export function getAffiliateProvider(href: string): string | undefined {
  try {
    const url = new URL(href);
    if (url.protocol !== "https:" && url.protocol !== "http:") return;
    for (const [domain, provider] of Object.entries(providerDomains)) {
      if (url.hostname === domain || url.hostname.endsWith(`.${domain}`)) {
        return provider;
      }
    }
  } catch {
    // Invalid or relative links have no inferred provider.
  }
}
