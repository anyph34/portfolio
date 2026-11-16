"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";

export function HomeSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams();
    if (location.trim()) query.set("location", location.trim());
    if (propertyType) query.set("type", propertyType);
    const search = query.toString();
    router.push(`/properties${search ? `?${search}` : ""}`);
  }

  return (
    <form className="fm-search-panel" onSubmit={submitSearch}>
      <label className="fm-search-field">
        <span>Where do you want to live?</span>
        <span className="fm-search-input">
          <MapPin aria-hidden="true" size={17} />
          <input onChange={(event) => setLocation(event.target.value)} placeholder="Area or neighbourhood" value={location} />
        </span>
      </label>
      <label className="fm-search-field">
        <span>Home type</span>
        <select onChange={(event) => setPropertyType(event.target.value)} value={propertyType}>
          <option value="">Any type</option>
          <option>Apartment</option>
          <option>Townhouse</option>
          <option>Studio</option>
          <option>House</option>
        </select>
      </label>
      <button className="fm-button fm-button-primary" type="submit">
        Explore homes <ArrowRight aria-hidden="true" size={17} />
      </button>
    </form>
  );
}
