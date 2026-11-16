import type { Metadata } from "next";

import { StockPilotDashboard } from "@/components/stockpilot-dashboard";

export const metadata: Metadata = {
  title: "Demo dashboard | StockPilot AI",
  description: "Explore a sample StockPilot AI inventory dashboard for Kenyan retailers.",
};

export default function StockPilotDashboardPage() {
  return <StockPilotDashboard />;
}
