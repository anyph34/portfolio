"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, ImagePlus, LogOut, Plus } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { PropertyArtwork } from "@/components/findmyhome/artwork";
import { PropertyCard } from "@/components/findmyhome/property-card";
import { readDemoListings, saveDemoListing, updateDemoListingStatus } from "@/lib/findmyhome/demo-store";
import {
  formatRent,
  propertyFromRow,
  type PropertyListing,
  type PropertyStatus,
} from "@/lib/findmyhome/properties";
import { createClient } from "@/lib/supabase/client";

type DashboardMode = "checking" | "demo" | "auth" | "live" | "error";
type AuthMode = "sign-in" | "sign-up";

function errorText(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error(`Could not preview ${file.name}.`));
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

export function LandlordDashboard() {
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<DashboardMode>(supabase ? "checking" : "demo");
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const loadOwnerListings = useCallback(async (ownerId: string) => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(propertyFromRow);
  }, [supabase]);

  useEffect(() => {
    let active = true;
    if (!supabase) {
      async function loadDemoListings() {
        await Promise.resolve();
        if (!active) return;
        try {
          setListings(readDemoListings());
          setMode("demo");
        } catch (error) {
          setMessage(errorText(error));
          setMessageIsError(true);
          setMode("error");
        }
      }
      void loadDemoListings();
      return () => {
        active = false;
      };
    }

    const client = supabase;
    const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setListings([]);
        setMode("auth");
      }
    });

    async function loadAccount() {
      const { data, error } = await client.auth.getSession();
      if (!active) return;
      if (error) {
        setMessage(error.message);
        setMessageIsError(true);
        setMode("error");
        return;
      }
      if (!data.session) {
        setMode("auth");
        return;
      }
      setUser(data.session.user);
      try {
        const ownerListings = await loadOwnerListings(data.session.user.id);
        if (active) {
          setListings(ownerListings);
          setMode("live");
        }
      } catch (loadError) {
        if (active) {
          setMessage(errorText(loadError));
          setMessageIsError(true);
          setMode("error");
        }
      }
    }

    void loadAccount();
    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [loadOwnerListings, supabase]);

  async function handleAuthentication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setBusy(true);
    setMessage("");
    setMessageIsError(false);

    try {
      if (authMode === "sign-up") {
        const fullName = String(form.get("fullName") ?? "").trim();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        if (!data.session || !data.user) {
          setMessage("Check your email to confirm your account, then sign in to continue.");
          return;
        }
        setUser(data.user);
        setListings(await loadOwnerListings(data.user.id));
        setMode("live");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!data.user) throw new Error("The sign-in completed without returning an account.");
        setUser(data.user);
        setListings(await loadOwnerListings(data.user.id));
        setMode("live");
      }
    } catch (error) {
      setMessage(errorText(error));
      setMessageIsError(true);
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
      setMessageIsError(true);
    }
    setBusy(false);
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    const maximumBytes = supabase ? 5_000_000 : 650_000;
    if (selected.length > 3) {
      setMessage("Choose up to three photos.");
      setMessageIsError(true);
      event.target.value = "";
      return;
    }
    if (selected.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setMessage("Photos must be JPG, PNG, or WebP files.");
      setMessageIsError(true);
      event.target.value = "";
      return;
    }
    if (selected.some((file) => file.size > maximumBytes)) {
      setMessage(
        supabase
          ? "Each photo must be 5 MB or smaller."
          : "Demo photos must be 650 KB or smaller so they fit in this browser's storage.",
      );
      setMessageIsError(true);
      event.target.value = "";
      return;
    }

    try {
      const nextPreviews = await Promise.all(selected.map(readFileAsDataUrl));
      setFiles(selected);
      setPreviews(nextPreviews);
      setMessage("");
      setMessageIsError(false);
    } catch (error) {
      setMessage(errorText(error));
      setMessageIsError(true);
      setFiles([]);
      setPreviews([]);
    }
  }

  async function uploadPhotos(ownerId: string, listingId: string) {
    if (!supabase) return [];
    const paths: string[] = [];
    const urls: string[] = [];
    for (const file of files) {
      const safeName = file.name.replace(/[^\w.-]+/g, "-");
      const path = `${ownerId}/${listingId}-${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage
        .from("property-photos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) {
        if (paths.length) {
          const { error: cleanupError } = await supabase.storage.from("property-photos").remove(paths);
          if (cleanupError) {
            throw new Error(`${error.message} Photo cleanup also failed: ${cleanupError.message}`);
          }
        }
        throw error;
      }
      paths.push(path);
      urls.push(supabase.storage.from("property-photos").getPublicUrl(path).data.publicUrl);
    }
    return urls;
  }

  async function handleCreateListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const title = String(form.get("title") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const neighborhood = String(form.get("neighborhood") ?? "").trim();
    const propertyType = String(form.get("propertyType") ?? "");
    const monthlyRent = Number(form.get("monthlyRent"));
    const bedrooms = Number(form.get("bedrooms"));
    const bathrooms = Number(form.get("bathrooms"));
    const areaSqm = Number(form.get("areaSqm"));
    const description = String(form.get("description") ?? "").trim();
    const amenities = String(form.get("amenities") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const status = String(form.get("status")) as PropertyStatus;

    if (
      !title ||
      !location ||
      !neighborhood ||
      !description ||
      !Number.isFinite(monthlyRent) ||
      monthlyRent <= 0 ||
      !Number.isInteger(bedrooms) ||
      bedrooms < 0 ||
      !Number.isInteger(bathrooms) ||
      bathrooms < 1 ||
      !Number.isFinite(areaSqm) ||
      areaSqm <= 0 ||
      !["Apartment", "Townhouse", "Studio", "House"].includes(propertyType) ||
      !["available", "occupied"].includes(status)
    ) {
      setMessage("Complete the required fields with valid rent, room, and floor-area details.");
      setMessageIsError(true);
      return;
    }

    setBusy(true);
    setMessage("");
    setMessageIsError(false);
    const randomId = crypto.randomUUID();
    const slug = `${slugify(neighborhood)}-${randomId.slice(0, 8)}`;

    try {
      if (mode === "live" && supabase && user) {
        const photoUrls = await uploadPhotos(user.id, randomId);
        const { data, error } = await supabase
          .from("properties")
          .insert({
            owner_id: user.id,
            slug,
            title,
            location,
            neighborhood,
            property_type: propertyType,
            monthly_rent: monthlyRent,
            bedrooms,
            bathrooms,
            area_sqm: areaSqm,
            description,
            amenities,
            status,
            photo_urls: photoUrls,
          })
          .select("*")
          .single();
        if (error) throw error;
        setListings((current) => [propertyFromRow(data), ...current]);
        setMessage("Your property is now listed.");
      } else {
        const listing: PropertyListing = {
          id: randomId,
          slug,
          title,
          location,
          neighborhood,
          propertyType,
          monthlyRent,
          bedrooms,
          bathrooms,
          areaSqm,
          description,
          amenities,
          status,
          images: previews,
        };
        saveDemoListing(listing);
        setListings((current) => [listing, ...current]);
        setMessage("Listing saved in this browser demo. It is not shared with other visitors.");
      }
      formElement.reset();
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      setMessage(errorText(error));
      setMessageIsError(true);
    } finally {
      setBusy(false);
    }
  }

  async function handleStatusChange(listing: PropertyListing, status: PropertyStatus) {
    setBusy(true);
    setMessage("");
    setMessageIsError(false);
    try {
      if (mode === "live" && supabase && user) {
        const { error } = await supabase
          .from("properties")
          .update({ status })
          .eq("id", listing.id)
          .eq("owner_id", user.id);
        if (error) throw error;
      } else {
        updateDemoListingStatus(listing.id, status);
      }
      setListings((current) =>
        current.map((item) => (item.id === listing.id ? { ...item, status } : item)),
      );
    } catch (error) {
      setMessage(errorText(error));
      setMessageIsError(true);
    } finally {
      setBusy(false);
    }
  }

  function switchToDemo() {
    try {
      setListings(readDemoListings());
      setMessage("You are using local demo data. Changes are saved only in this browser.");
      setMessageIsError(false);
      setUser(null);
      setMode("demo");
    } catch (error) {
      setMessage(errorText(error));
      setMessageIsError(true);
    }
  }

  if (mode === "checking") {
    return <div className="fm-loading-state">Preparing your landlord workspace…</div>;
  }

  if (mode === "auth") {
    return (
      <section className="fm-panel fm-auth-card">
        <div className="fm-panel-heading">
          <div>
            <h2>{authMode === "sign-in" ? "Welcome back" : "Create a landlord account"}</h2>
            <p>Sign in to manage listings stored in your FindMyHome database.</p>
          </div>
          <span className="fm-mode-pill">Supabase</span>
        </div>
        <form className="fm-auth-form" onSubmit={handleAuthentication}>
          {authMode === "sign-up" ? (
            <label>
              Your name
              <input autoComplete="name" name="fullName" required />
            </label>
          ) : null}
          <label>
            Email
            <input autoComplete="email" name="email" required type="email" />
          </label>
          <label>
            Password
            <input autoComplete={authMode === "sign-in" ? "current-password" : "new-password"} minLength={8} name="password" required type="password" />
          </label>
          <button className="fm-button fm-button-primary" disabled={busy} type="submit">
            {busy ? "Please wait…" : authMode === "sign-in" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="fm-auth-toggle">
          {authMode === "sign-in" ? "New to FindMyHome? " : "Already have an account? "}
          <button onClick={() => setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in")} type="button">
            {authMode === "sign-in" ? "Create an account" : "Sign in"}
          </button>
        </p>
        {message ? <p className={`fm-message${messageIsError ? " is-error" : ""}`}>{message}</p> : null}
      </section>
    );
  }

  if (mode === "error") {
    return (
      <div className="fm-empty-state">
        <h2>Could not open the landlord workspace.</h2>
        <p>{message}</p>
        {supabase ? <button className="fm-button fm-button-primary" onClick={switchToDemo} type="button">Continue in local demo</button> : null}
      </div>
    );
  }

  const availableCount = listings.filter((listing) => listing.status === "available").length;
  const occupiedCount = listings.filter((listing) => listing.status === "occupied").length;

  return (
    <div>
      {mode === "demo" ? (
        <p className="fm-data-note">Demo mode: listings, photos, and availability are saved only in this browser. Other visitors cannot see them.</p>
      ) : null}
      <div className="fm-page-heading fm-dashboard-heading">
        <div>
          <p className="fm-eyebrow">Landlord workspace</p>
          <h1>Manage your <em>homes.</em></h1>
        </div>
        <div className="fm-inline-actions">
          {mode === "live" && user ? <span className="fm-results-summary">{user.email}</span> : null}
          {mode === "live" && user ? (
            <button disabled={busy} onClick={handleSignOut} type="button"><LogOut aria-hidden="true" size={14} /> Sign out</button>
          ) : null}
          {mode === "live" && supabase ? (
            <span className="fm-mode-pill">Live database</span>
          ) : (
            <span className="fm-mode-pill">Local demo</span>
          )}
        </div>
      </div>

      <div className="fm-dashboard-grid">
        <section className="fm-panel">
          <div className="fm-panel-heading">
            <div>
              <h2><Plus aria-hidden="true" size={18} /> Add a property</h2>
              <p>Use clear, accurate details so renters know what to expect.</p>
            </div>
          </div>
          <form onSubmit={handleCreateListing}>
            <div className="fm-form-grid">
              <label className="fm-field-full">
                Listing title
                <input maxLength={100} name="title" placeholder="A bright two-bedroom near the park" required />
              </label>
              <label>
                Area and town
                <input maxLength={100} name="location" placeholder="Kilimani, Nairobi" required />
              </label>
              <label>
                Neighbourhood
                <input maxLength={60} name="neighborhood" placeholder="Kilimani" required />
              </label>
              <label>
                Home type
                <select defaultValue="Apartment" name="propertyType">
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Studio</option>
                  <option>House</option>
                </select>
              </label>
              <label>
                Monthly rent (KES)
                <input min="1" name="monthlyRent" required type="number" />
              </label>
              <label>
                Bedrooms
                <input min="0" name="bedrooms" required type="number" />
              </label>
              <label>
                Bathrooms
                <input min="1" name="bathrooms" required type="number" />
              </label>
              <label>
                Floor area (m²)
                <input min="1" name="areaSqm" required type="number" />
              </label>
              <label>
                Availability
                <select defaultValue="available" name="status">
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
              </label>
              <label className="fm-field-full">
                Description
                <textarea maxLength={1200} name="description" placeholder="Describe the home, its layout, and nearby essentials." required />
              </label>
              <label className="fm-field-full">
                Amenities (comma separated)
                <input maxLength={250} name="amenities" placeholder="Parking, balcony, security" />
              </label>
              <label className="fm-field-full">
                <span><ImagePlus aria-hidden="true" size={14} /> Photos</span>
                <input accept="image/jpeg,image/png,image/webp" multiple name="photos" onChange={handlePhotoChange} type="file" />
                <span className="fm-upload-hint">
                  Up to 3 JPG, PNG, or WebP photos. {supabase ? "5 MB maximum per photo." : "650 KB maximum per photo in demo mode."}
                </span>
              </label>
              {previews.length ? (
                <div aria-label="Selected photo previews" className="fm-upload-previews fm-field-full">
                  {previews.map((preview, index) => (
                    <div className="fm-upload-preview" key={`${files[index]?.name ?? "photo"}-${index}`}>
                      <Image alt={`Selected property photo ${index + 1}`} fill sizes="62px" src={preview} unoptimized />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <button className="fm-button fm-button-primary fm-form-submit" disabled={busy} type="submit">
              {busy ? "Saving property…" : "Add property"} <ArrowUpRight aria-hidden="true" size={16} />
            </button>
          </form>
          {message ? <p className={`fm-message${messageIsError ? " is-error" : ""}`}>{message}</p> : null}
        </section>

        <section className="fm-panel">
          <div className="fm-panel-heading">
            <div>
              <h2>Your listings</h2>
              <p>{availableCount} available · {occupiedCount} occupied</p>
            </div>
            <span className="fm-mode-pill">{listings.length} total</span>
          </div>
          {listings.length ? (
            <div className="fm-listing-stack">
              {listings.map((listing) => (
                <article className="fm-owner-listing" key={listing.id}>
                  <PropertyArtwork listing={listing} />
                  <div>
                    <h3>{listing.title}</h3>
                    <p>{listing.location} · {formatRent(listing.monthlyRent)} / month</p>
                  </div>
                  <select
                    aria-label={`Availability for ${listing.title}`}
                    className="fm-status-select"
                    disabled={busy}
                    onChange={(event) => void handleStatusChange(listing, event.target.value as PropertyStatus)}
                    value={listing.status}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </article>
              ))}
            </div>
          ) : (
            <div className="fm-empty-state">
              <h2>No landlord listings yet.</h2>
              <p>Add a home to see how it appears in the property marketplace.</p>
            </div>
          )}
        </section>
      </div>

      {mode === "demo" && listings.length ? (
        <section aria-label="Demo listing preview" className="fm-section">
          <div className="fm-section-heading">
            <div><p className="fm-eyebrow">Preview</p><h2>Your homes in <em>the marketplace.</em></h2></div>
          </div>
          <div className="fm-property-grid">
            {listings.slice(0, 3).map((listing) => <PropertyCard key={listing.id} listing={listing} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
