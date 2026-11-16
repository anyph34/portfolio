import Link from "next/link";
import { ArrowRight, ArrowUpRight, KeyRound, MapPin, ShieldCheck } from "lucide-react";

import { PropertyArtwork } from "@/components/findmyhome/artwork";
import { HomeSearch } from "@/components/findmyhome/home-search";
import { FindMyHomeShell } from "@/components/findmyhome/site";
import { PropertyCard } from "@/components/findmyhome/property-card";
import { DEMO_PROPERTIES } from "@/lib/findmyhome/properties";

export function FindMyHomeLanding() {
  const featured = DEMO_PROPERTIES[0];
  const recent = DEMO_PROPERTIES.slice(0, 3);

  return (
    <FindMyHomeShell>
      <main className="fm-main">
        <section className="fm-hero">
          <div className="fm-hero-copy">
            <p className="fm-eyebrow"><span className="fm-eyebrow-dot" /> A better way to rent in Kenya</p>
            <h1>Find a place<br />to <em>feel at home.</em></h1>
            <p className="fm-hero-lede">
              Thoughtfully presented rental homes, clear details, and a simpler way to find your next neighbourhood.
            </p>
            <HomeSearch />
            <div className="fm-trust-row">
              <span><ShieldCheck aria-hidden="true" size={16} /> Clear listing details</span>
              <span><KeyRound aria-hidden="true" size={16} /> Direct viewing requests</span>
            </div>
          </div>
          <div className="fm-hero-art-wrap">
            <PropertyArtwork large listing={featured} />
            <div className="fm-hero-float">
              <span className="fm-hero-float-icon"><MapPin aria-hidden="true" size={16} /></span>
              <span><strong>Good places, closer</strong><small>Explore homes across Nairobi</small></span>
              <ArrowUpRight aria-hidden="true" size={17} />
            </div>
            <div className="fm-hero-note"><span>01</span> Homes chosen for everyday living</div>
          </div>
        </section>

        <section aria-labelledby="fm-recent-heading" className="fm-section">
          <div className="fm-section-heading">
            <div>
              <p className="fm-eyebrow">A good place to begin</p>
              <h2 id="fm-recent-heading">Homes to <em>come home to.</em></h2>
            </div>
            <Link className="fm-text-link" href="/properties">See all homes <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className="fm-property-grid">
            {recent.map((listing) => <PropertyCard key={listing.id} listing={listing} />)}
          </div>
        </section>

        <section className="fm-landlord-callout">
          <div className="fm-landlord-mark"><KeyRound aria-hidden="true" size={22} /></div>
          <div>
            <p className="fm-eyebrow">For property owners</p>
            <h2>Make room for a <em>good tenant.</em></h2>
            <p>Share the details that matter and keep your availability up to date.</p>
          </div>
          <Link className="fm-button fm-button-dark" href="/landlord">Open landlord dashboard <ArrowUpRight aria-hidden="true" size={17} /></Link>
        </section>
      </main>
    </FindMyHomeShell>
  );
}
