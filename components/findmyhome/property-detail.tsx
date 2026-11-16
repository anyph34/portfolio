"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { PropertyArtwork } from "@/components/findmyhome/artwork";
import { readAllDemoListings, saveDemoViewingRequest } from "@/lib/findmyhome/demo-store";
import {
  formatRent,
  propertyFromRow,
  type PropertyListing,
} from "@/lib/findmyhome/properties";
import { createClient } from "@/lib/supabase/client";

type DetailMode = "loading" | "demo" | "live" | "fallback" | "error" | "missing";

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

export function PropertyDetail() {
  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [listing, setListing] = useState<PropertyListing | null>(null);
  const [mode, setMode] = useState<DetailMode>(slug ? "loading" : "missing");
  const [notice, setNotice] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    if (!slug) return;

    async function loadListing() {
      if (!slug) {
        setMode("missing");
        return;
      }

      if (!supabase) {
        await Promise.resolve();
        try {
          const found = readAllDemoListings().find((item) => item.slug === slug) ?? null;
          if (active) {
            setListing(found);
            setMode(found ? "demo" : "missing");
          }
        } catch (error) {
          if (active) {
            setNotice(messageFrom(error));
            setMode("error");
          }
        }
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!active) return;
      if (!error) {
        setListing(data ? propertyFromRow(data) : null);
        setMode(data ? "live" : "missing");
        return;
      }

      try {
        const found = readAllDemoListings().find((item) => item.slug === slug) ?? null;
        setListing(found);
        setNotice(`Live property details are unavailable (${error.message}).`);
        setMode(found ? "fallback" : "error");
      } catch (demoError) {
        setNotice(messageFrom(demoError));
        setMode("error");
      }
    }

    void loadListing();
    return () => {
      active = false;
    };
  }, [slug, supabase]);

  async function submitViewingRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!listing || listing.status !== "available") return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !email.includes("@")) {
      setRequestMessage("Enter your name and a valid email address.");
      setRequestError(true);
      return;
    }

    setSubmitting(true);
    setRequestMessage("");
    setRequestError(false);
    try {
      if (supabase && mode === "live") {
        const { error } = await supabase.from("property_viewing_requests").insert({
          property_id: listing.id,
          name,
          email,
          message,
        });
        if (error) throw error;
        setRequestMessage("Your viewing request has been sent to the property owner.");
      } else {
        saveDemoViewingRequest({
          id: crypto.randomUUID(),
          propertySlug: listing.slug,
          name,
          email,
          message,
          createdAt: new Date().toISOString(),
        });
        setRequestMessage("Request saved in this browser demo. The property owner has not been notified.");
      }
      formElement.reset();
    } catch (error) {
      setRequestMessage(messageFrom(error));
      setRequestError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (mode === "loading") {
    return <div className="fm-loading-state">Loading property details…</div>;
  }

  if (!listing) {
    return (
      <div className="fm-empty-state">
        <h2>{mode === "missing" ? "This home could not be found." : "Property details are unavailable."}</h2>
        <p>{notice || "Try returning to the listings and choosing another home."}</p>
      </div>
    );
  }

  return (
    <div>
      {mode === "demo" ? <p className="fm-data-note">Demo property: data shown here is sample content.</p> : null}
      {mode === "fallback" ? <p className="fm-data-note is-error">{notice} Showing the saved demo listing.</p> : null}
      <div className="fm-detail-layout">
        <div className="fm-detail-gallery">
          <PropertyArtwork large listing={listing} />
        </div>
        <aside className="fm-detail-side">
          <p className="fm-card-location"><MapPin aria-hidden="true" size={14} />{listing.location}</p>
          <h1 className="fm-detail-title">{listing.title}</h1>
          <p className="fm-detail-price">{formatRent(listing.monthlyRent)} <span>/ month</span></p>
          <div className="fm-detail-specs">
            <span><strong>{listing.bedrooms}</strong>Bedrooms</span>
            <span><strong>{listing.bathrooms}</strong>Bathrooms</span>
            <span><strong>{listing.areaSqm} m²</strong>Floor area</span>
          </div>
          <p className="fm-detail-description">{listing.description}</p>
          <ul aria-label="Property amenities" className="fm-amenities">
            {listing.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}
          </ul>

          {listing.status === "occupied" ? (
            <div className="fm-occupied-panel">
              <strong>Currently occupied</strong>
              This home is not accepting viewing requests while it is occupied.
            </div>
          ) : (
            <form className="fm-request-form" onSubmit={submitViewingRequest}>
              <h3>Request a viewing</h3>
              <label>
                Your name
                <input autoComplete="name" name="name" required />
              </label>
              <label>
                Email address
                <input autoComplete="email" name="email" required type="email" />
              </label>
              <label>
                Note (optional)
                <textarea name="message" placeholder="When would you like to visit?" />
              </label>
              <button className="fm-button fm-button-primary" disabled={submitting} type="submit">
                {submitting ? "Sending request…" : "Send viewing request"}
              </button>
              {requestMessage ? <p className={`fm-message${requestError ? " is-error" : ""}`}>{requestMessage}</p> : null}
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
