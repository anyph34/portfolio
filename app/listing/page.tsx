import type { Metadata } from "next";
import { Suspense } from "react";

import { FindMyHomeShell } from "@/components/findmyhome/site";
import { PropertyDetail } from "@/components/findmyhome/property-detail";

export const metadata: Metadata = {
  title: "Property details | FindMyHome",
  description: "See rent, amenities, availability, and request a viewing for a rental home.",
};

export default function ListingPage() {
  return (
    <FindMyHomeShell>
      <main className="fm-main fm-page">
        <Suspense fallback={<div className="fm-loading-state">Loading property details…</div>}>
          <PropertyDetail />
        </Suspense>
      </main>
    </FindMyHomeShell>
  );
}
