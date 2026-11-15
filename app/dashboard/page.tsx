"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

type DashboardProfile = {
  email: string;
  businessName: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    const loadDashboard = async () => {
      try {
        const supabase = createClient();
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_OUT" || !session) {
            router.replace("/login");
          }
        });
        unsubscribe = () => authListener.subscription.unsubscribe();

        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) {
          throw authError;
        }
        if (!data.user) {
          router.replace("/login");
          return;
        }

        const { data: business, error: businessError } = await supabase
          .from("businesses")
          .select("name")
          .eq("owner_id", data.user.id)
          .maybeSingle();
        if (businessError) {
          throw businessError;
        }

        if (active) {
          setProfile({
            email: data.user.email ?? "",
            businessName: business?.name ?? null,
          });
          setStatus("ready");
        }
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : "Unable to load your business.");
          setStatus("error");
        }
      }
    };

    void loadDashboard();

    return () => {
      active = false;
      unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    setMessage("");

    try {
      const { error } = await createClient().auth.signOut();
      if (error) {
        throw error;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign out. Please try again.");
      setSigningOut(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-slate-600">
        Loading your business...
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-slate-900">
        <section className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Could not load your dashboard</h1>
          <p className="mt-3 text-sm text-red-700">{message}</p>
          <Link className="mt-6 inline-block text-sm font-medium text-emerald-700 underline" href="/login">
            Return to sign in
          </Link>
        </section>
      </main>
    );
  }

  const stats = [
    { label: "Sales today", value: "KES 0", detail: "Live records once enabled" },
    { label: "Monthly revenue", value: "KES 0", detail: "Live records once enabled" },
    { label: "Total customers", value: "0", detail: "Business records" },
    { label: "Pending bookings", value: "0", detail: "Appointments" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {profile?.businessName ?? "Business overview"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{profile?.email}</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              {profile?.businessName ? "Database connected" : "No business found for this account"}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="text-sm font-medium text-slate-700 underline disabled:opacity-60"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
            {message ? <p className="text-sm text-red-700">{message}</p> : null}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-3xl font-bold text-slate-900">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Card>
            <CardHeader>
              <CardTitle>Revenue overview</CardTitle>
              <CardDescription>This chart will be populated from the business sales table.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                Sales analytics will render here once sales tracking is enabled.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Business operations will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                No activity has been recorded yet.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
