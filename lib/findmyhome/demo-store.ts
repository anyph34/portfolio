import { DEMO_PROPERTIES, type PropertyListing } from "@/lib/findmyhome/properties";

const LISTINGS_KEY = "findmyhome.demo-listings.v1";
const REQUESTS_KEY = "findmyhome.demo-viewing-requests.v1";

export type ViewingRequest = {
  id: string;
  propertySlug: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

function isListing(value: unknown): value is PropertyListing {
  if (!value || typeof value !== "object") {
    return false;
  }

  const listing = value as Record<string, unknown>;
  return (
    typeof listing.id === "string" &&
    typeof listing.slug === "string" &&
    typeof listing.title === "string" &&
    typeof listing.monthlyRent === "number" &&
    (listing.status === "available" || listing.status === "occupied") &&
    Array.isArray(listing.images)
  );
}

export function readDemoListings(): PropertyListing[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(LISTINGS_KEY);
  if (!stored) {
    return [];
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Saved demo listings could not be read. Clear this browser's demo data and try again.");
    }
    throw error;
  }

  if (!Array.isArray(parsed) || !parsed.every(isListing)) {
    throw new Error("Saved demo listings have an invalid format. Clear this browser's demo data and try again.");
  }

  return parsed;
}

export function readAllDemoListings() {
  return [...DEMO_PROPERTIES, ...readDemoListings()];
}

export function saveDemoListings(listings: PropertyListing[]) {
  if (typeof window === "undefined") {
    throw new Error("Demo listings can only be saved in a browser.");
  }

  try {
    window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("This browser is out of demo storage. Remove a large photo and try again.");
    }
    throw error;
  }
}

export function saveDemoListing(listing: PropertyListing) {
  const listings = readDemoListings();
  saveDemoListings([listing, ...listings.filter((item) => item.id !== listing.id)]);
}

export function updateDemoListingStatus(id: string, status: PropertyListing["status"]) {
  const listings = readDemoListings();
  const listing = listings.find((item) => item.id === id);
  if (!listing) {
    throw new Error("That demo listing could not be found.");
  }

  saveDemoListings(listings.map((item) => (item.id === id ? { ...item, status } : item)));
}

export function saveDemoViewingRequest(request: ViewingRequest) {
  if (typeof window === "undefined") {
    throw new Error("Viewing requests can only be saved in a browser.");
  }

  const stored = window.localStorage.getItem(REQUESTS_KEY);
  let requests: ViewingRequest[] = [];
  if (stored) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(stored);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("Saved demo requests could not be read. Clear this browser's demo data and try again.");
      }
      throw error;
    }

    if (!Array.isArray(parsed)) {
      throw new Error("Saved demo requests have an invalid format. Clear this browser's demo data and try again.");
    }
    requests = parsed as ViewingRequest[];
  }

  try {
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify([request, ...requests]));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("This browser is out of demo storage. Try again without a photo attached.");
    }
    throw error;
  }
}
