import type { Metadata } from "next";
import { Suspense } from "react";

import { FindMyHomeShell } from "@/components/findmyhome/site";
import { PropertyExplorer } from "@/components/findmyhome/property-explorer";

export const metadata: Metadata = {
  title: "Rental homes | FindMyHome",
  description: "Search rental homes by neighbourhood, property type, availability, and monthly rent.",
};

export default function PropertiesPage() {
  return (
    <FindMyHomeShell>
      <main className="fm-main fm-page">
        <header className="fm-page-heading">
          <div>
            <p className="fm-eyebrow">Explore the collection</p>
            <h1>Find your next <em>address.</em></h1>
          </div>
          <p>Browse homes with clear pricing, practical details, and up-to-date availability.</p>
        </header>
        <Suspense fallback={<div className="fm-loading-state">Finding homes…</div>}>
          <PropertyExplorer />
        </Suspense>
      </main>
    </FindMyHomeShell>
  );
}
