import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, MapPin } from "lucide-react";

import { formatRent, type PropertyListing } from "@/lib/findmyhome/properties";
import { PropertyArtwork } from "@/components/findmyhome/artwork";

export function PropertyCard({ listing }: { listing: PropertyListing }) {
  return (
    <article className={`fm-property-card${listing.status === "occupied" ? " is-occupied" : ""}`}>
      <Link aria-label={`View ${listing.title}`} className="fm-card-art-link" href={`/listing?slug=${encodeURIComponent(listing.slug)}`}>
        <PropertyArtwork listing={listing} />
        <span className={`fm-status-pill${listing.status === "occupied" ? " is-occupied" : ""}`}>
          {listing.status === "available" ? "Available now" : "Currently occupied"}
        </span>
      </Link>
      <div className="fm-card-content">
        <div className="fm-card-location"><MapPin aria-hidden="true" size={14} />{listing.location}</div>
        <h3><Link href={`/listing?slug=${encodeURIComponent(listing.slug)}`}>{listing.title}</Link></h3>
        <div className="fm-card-specs">
          <span><BedDouble aria-hidden="true" size={15} />{listing.bedrooms} bed</span>
          <span><Bath aria-hidden="true" size={15} />{listing.bathrooms} bath</span>
          <span>{listing.areaSqm} m²</span>
        </div>
        <div className="fm-card-bottom">
          <p><strong>{formatRent(listing.monthlyRent)}</strong><span> / month</span></p>
          <Link aria-label={`View ${listing.title}`} className="fm-card-arrow" href={`/listing?slug=${encodeURIComponent(listing.slug)}`}>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
        {listing.status === "occupied" ? <p className="fm-occupied-note">Viewing requests are paused while this home is occupied.</p> : null}
      </div>
    </article>
  );
}
