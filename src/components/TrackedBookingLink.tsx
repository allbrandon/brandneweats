"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { getAffiliateProvider } from "../lib/affiliate-tracking";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters: Record<string, string>) => void;
  }
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  itemName: string;
  category: "stay" | "activity" | "essential";
  placement?: string;
  provider?: string;
};

export default function TrackedBookingLink({
  href,
  itemName,
  category,
  placement,
  provider,
  onClick,
  onAuxClick,
  ...props
}: Props) {
  const trackClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    // A blocked or unavailable analytics script must never stop the booking link.
    try {
      window.gtag?.("event", "booking_click", {
        item_name: itemName,
        item_category: category,
        link_url: href,
        affiliate_provider: provider || getAffiliateProvider(href) || new URL(href).hostname,
        affiliate_item: itemName,
        affiliate_placement: placement || (category === "stay" ? "arrival_stays" : category === "activity" ? "itinerary_activity" : "pre_trip"),
        page_location: window.location.href,
      });
    } catch {
      // Navigation remains the browser's normal anchor behavior.
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.button === 0) trackClick(event);
  };

  const handleAuxClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onAuxClick?.(event);
    if (event.button === 1) trackClick(event);
  };

  return <a href={href} onClick={handleClick} onAuxClick={handleAuxClick} {...props} />;
}
