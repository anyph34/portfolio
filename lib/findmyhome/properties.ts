export type PropertyStatus = "available" | "occupied";

export type PropertyListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  neighborhood: string;
  propertyType: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  description: string;
  amenities: string[];
  status: PropertyStatus;
  images: string[];
};

export type PropertyRow = {
  id: string;
  slug: string;
  title: string;
  location: string;
  neighborhood: string;
  property_type: string;
  monthly_rent: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  description: string;
  amenities: string[] | null;
  status: PropertyStatus;
  photo_urls: string[] | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export const DEMO_PROPERTIES: PropertyListing[] = [
  {
    id: "demo-kilimani",
    slug: "sunlit-kilimani-apartment",
    title: "Sunlit apartment with a quiet balcony",
    location: "Kilimani, Nairobi",
    neighborhood: "Kilimani",
    propertyType: "Apartment",
    monthlyRent: 85000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 96,
    description:
      "A bright, well-kept home close to Yaya Centre, cafes, and everyday essentials. The open living area leads onto a private balcony.",
    amenities: ["Balcony", "24-hour security", "Parking", "Lift"],
    status: "available",
    images: [],
  },
  {
    id: "demo-westlands",
    slug: "westlands-garden-residence",
    title: "Garden residence near the city",
    location: "Westlands, Nairobi",
    neighborhood: "Westlands",
    propertyType: "Townhouse",
    monthlyRent: 145000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 148,
    description:
      "A spacious three-bedroom home with a private garden and easy access to Westlands offices, shops, and restaurants.",
    amenities: ["Private garden", "Fitted kitchen", "Parking", "Security"],
    status: "available",
    images: [],
  },
  {
    id: "demo-lavington",
    slug: "lavington-courtyard-home",
    title: "Calm courtyard home in Lavington",
    location: "Lavington, Nairobi",
    neighborhood: "Lavington",
    propertyType: "Apartment",
    monthlyRent: 112000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 112,
    description:
      "A modern, generously sized apartment in a leafy compound, with a bright kitchen and a shared landscaped courtyard.",
    amenities: ["Courtyard", "Gym", "Backup water", "Parking"],
    status: "available",
    images: [],
  },
  {
    id: "demo-ruaka",
    slug: "ruaka-modern-studio",
    title: "Modern studio with everything close by",
    location: "Ruaka, Kiambu",
    neighborhood: "Ruaka",
    propertyType: "Studio",
    monthlyRent: 32000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 42,
    description:
      "A neat studio with smart storage and reliable access to public transport, shops, and Two Rivers Mall.",
    amenities: ["Fitted kitchen", "Water storage", "Security"],
    status: "available",
    images: [],
  },
  {
    id: "demo-kileleshwa",
    slug: "kileleshwa-family-apartment",
    title: "Room to settle in, in Kileleshwa",
    location: "Kileleshwa, Nairobi",
    neighborhood: "Kileleshwa",
    propertyType: "Apartment",
    monthlyRent: 98000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 126,
    description:
      "A comfortable family apartment with generous rooms, a practical layout, and a short drive to schools and shopping.",
    amenities: ["Balcony", "Play area", "Lift", "Parking"],
    status: "available",
    images: [],
  },
  {
    id: "demo-south-b",
    slug: "south-b-gated-community-home",
    title: "Gated-community home in South B",
    location: "South B, Nairobi",
    neighborhood: "South B",
    propertyType: "Apartment",
    monthlyRent: 58000,
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 78,
    description:
      "A practical two-bedroom home in a secure community, within reach of schools, shops, and the Mombasa Road corridor.",
    amenities: ["Gated entry", "Water storage", "Parking"],
    status: "occupied",
    images: [],
  },
];

export function propertyFromRow(row: PropertyRow): PropertyListing {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    neighborhood: row.neighborhood,
    propertyType: row.property_type,
    monthlyRent: Number(row.monthly_rent),
    bedrooms: Number(row.bedrooms),
    bathrooms: Number(row.bathrooms),
    areaSqm: Number(row.area_sqm),
    description: row.description,
    amenities: row.amenities ?? [],
    status: row.status,
    images: row.photo_urls ?? [],
  };
}

export function formatRent(amount: number) {
  return `KES ${new Intl.NumberFormat("en-KE").format(amount)}`;
}
