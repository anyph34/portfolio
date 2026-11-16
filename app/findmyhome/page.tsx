import type { Metadata } from "next";

import { FindMyHomeLanding } from "@/components/findmyhome/landing";

export const metadata: Metadata = {
  title: "FindMyHome | Rental homes in Kenya",
  description: "Explore rental homes across Nairobi and find a place to feel at home.",
};

export default function FindMyHomePage() {
  return <FindMyHomeLanding />;
}
