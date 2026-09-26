"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters: Record<string, string>) => void;
  }
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  itemName: string;
  category: "stay" | "activity";
};

export default function TrackedBookingLink({
  href,
  itemName,
  category,
  onClick,
  ...props
}: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    window.gtag?.("event", "booking_click", {
      item_name: itemName,
      item_category: category,
      link_url: href,
    });
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
