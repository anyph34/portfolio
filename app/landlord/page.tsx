import type { Metadata } from "next";

import { FindMyHomeShell } from "@/components/findmyhome/site";
import { LandlordDashboard } from "@/components/findmyhome/landlord-dashboard";

export const metadata: Metadata = {
  title: "Landlord dashboard | FindMyHome",
  description: "Create rental listings, upload property photos, and manage availability.",
};

export default function LandlordPage() {
  return (
    <FindMyHomeShell>
      <main className="fm-main fm-page">
        <LandlordDashboard />
      </main>
    </FindMyHomeShell>
  );
}
