"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { PropertyCard } from "@/components/findmyhome/property-card";
import { readAllDemoListings } from "@/lib/findmyhome/demo-store";
import {
  propertyFromRow,
  type PropertyListing,
} from "@/lib/findmyhome/properties";
import { createClient } from "@/lib/supabase/client";

type DataMode = "loading" | "demo" | "live" | "fallback" | "error";

export function PropertyExplorer() {
  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [mode, setMode] = useState<DataMode>("loading");
  const [notice, setNotice] = useState("");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") ?? "");
  const [availability, setAvailability] = useState("all");
  const [maximumRent, setMaximumRent] = useState("");

  useEffect(() => {
    let active = true;

    async function loadListings() {
      if (!supabase) {
        try {
          if (active) {
            setListings(readAllDemoListings());
            setMode("demo");
          }
        } catch (error) {
          if (active) {
            setNotice(error instanceof Error ? error.message : "Could not read the demo listings.");
            setMode("error");
          }
        }
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (!error) {
        setListings((data ?? []).map(propertyFromRow));
        setMode("live");
        return;
      }

      try {
        setListings(readAllDemoListings());
        setNotice(`Live listings are unavailable (${error.message}). Showing sample listings instead.`);
        setMode("fallback");
      } catch (demoError) {
        setNotice(demoError instanceof Error ? demoError.message : error.message);
        setMode("error");
      }
    }

    void loadListings();
    return () => {
      active = false;
    };
  }, [supabase]);

  const filteredListings = useMemo(() => {
    const normalizedLocation = location.trim().toLowerCase();
    const maxRent = Number(maximumRent);

    return listings.filter((listing) => {
      const matchesLocation =
        !normalizedLocation ||
        `${listing.location} ${listing.neighborhood}`.toLowerCase().includes(normalizedLocation);
      const matchesType = !propertyType || listing.propertyType === propertyType;
      const matchesAvailability = availability === "all" || listing.status === availability;
      const matchesRent = !maximumRent || listing.monthlyRent <= maxRent;
      return matchesLocation && matchesType && matchesAvailability && matchesRent;
    });
  }, [availability, listings, location, maximumRent, propertyType]);

  return (
    <div>
      {mode === "fallback" ? <p className="fm-data-note is-error">{notice}</p> : null}
      {mode === "demo" ? (
        <p className="fm-data-note">Demo mode: sample listings and landlord changes stay in this browser and are not shared.</p>
      ) : null}
      {mode === "error" ? <p className="fm-data-note is-error">{notice}</p> : null}

      <form className="fm-filter-bar" onSubmit={(event) => event.preventDefault()}>
        <label>
          Area
          <input onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Kilimani" value={location} />
        </label>
        <label>
          Home type
          <select onChange={(event) => setPropertyType(event.target.value)} value={propertyType}>
            <option value="">Any type</option>
            <option>Apartment</option>
            <option>Townhouse</option>
            <option>Studio</option>
            <option>House</option>
          </select>
        </label>
        <label>
          Availability
          <select onChange={(event) => setAvailability(event.target.value)} value={availability}>
            <option value="all">All properties</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </label>
        <label>
          Max rent / month
          <input
            inputMode="numeric"
            min="0"
            onChange={(event) => setMaximumRent(event.target.value)}
            placeholder="KES"
            type="number"
            value={maximumRent}
          />
        </label>
        <button className="fm-button fm-button-primary" type="submit">
          <Search aria-hidden="true" size={16} /> Update results
        </button>
      </form>

      <div className="fm-results-summary">
        <span>{mode === "loading" ? "Loading homes…" : `${filteredListings.length} homes match your search`}</span>
        {mode === "live" ? <span>Live listings</span> : null}
      </div>

      {mode === "loading" ? (
        <div className="fm-loading-state">Finding homes…</div>
      ) : filteredListings.length ? (
        <div className="fm-property-grid">
          {filteredListings.map((listing) => <PropertyCard key={listing.id} listing={listing} />)}
        </div>
      ) : (
        <div className="fm-empty-state">
          <h2>No homes match those filters yet.</h2>
          <p>Try a nearby area or remove a filter to see more listings.</p>
        </div>
      )}
    </div>
  );
}
