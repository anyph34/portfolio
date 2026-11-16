import Image from "next/image";

import type { PropertyListing } from "@/lib/findmyhome/properties";

const variants = ["sage", "clay", "sky", "sand"] as const;

export function PropertyArtwork({
  listing,
  large = false,
}: {
  listing: PropertyListing;
  large?: boolean;
}) {
  const photo = listing.images[0];
  if (photo) {
    return (
      <div className={`fm-artwork fm-artwork--photo${large ? " fm-artwork--large" : ""}`}>
        <Image alt={listing.title} fill sizes={large ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 33vw"} src={photo} unoptimized />
      </div>
    );
  }

  const variant = variants[Math.abs(listing.slug.length) % variants.length];
  return (
    <div
      aria-label={`Illustration of a ${listing.propertyType.toLowerCase()} in ${listing.neighborhood}`}
      className={`fm-artwork fm-artwork--${variant}${large ? " fm-artwork--large" : ""}`}
      role="img"
    >
      <svg aria-hidden="true" className="fm-house-art" viewBox="0 0 640 360">
        <path d="M0 245h640v115H0z" fill="var(--fm-ground)" />
        <circle cx="500" cy="78" r="36" fill="var(--fm-sun)" />
        <path d="M65 245V150l80-54 80 54v95z" fill="var(--fm-home)" />
        <path d="M48 154l97-67 96 67-10 15-86-60-87 60z" fill="var(--fm-roof)" />
        <path d="M120 185h50v60h-50z" fill="var(--fm-window)" />
        <path d="M187 178h25v25h-25zM187 216h25v29h-25z" fill="var(--fm-window)" />
        <path d="M298 245V126l105-70 105 70v119z" fill="var(--fm-home-secondary)" />
        <path d="M276 132L403 44l127 88-10 15-117-80-117 80z" fill="var(--fm-roof-secondary)" />
        <path d="M365 159h75v86h-75z" fill="var(--fm-door)" />
        <path d="M462 148h26v34h-26zM462 197h26v29h-26z" fill="var(--fm-window)" />
        <path d="M35 245h580" fill="none" stroke="var(--fm-line)" strokeWidth="3" />
        <path d="M81 245c0-22 13-38 28-38s28 16 28 38m344 0c0-22 13-38 28-38s28 16 28 38" fill="var(--fm-leaf)" />
        <path d="M106 245v-20m375 20v-20" stroke="var(--fm-line)" strokeWidth="3" />
      </svg>
      <span className="fm-artwork-caption">{listing.neighborhood} · Kenya</span>
    </div>
  );
}
