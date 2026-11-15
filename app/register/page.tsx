import Link from "next/link";

import { RegisterForm } from "../auth-forms";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
            BiasharaDesk
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
          >
            Sign in
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Phase 1</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Launch your business in under 10 minutes.
            </h1>
            <ul className="mt-6 space-y-4 text-slate-600">
              {[
                "Business registration and onboarding",
                "Tenant-aware access control",
                "Database schema for multi-business operations",
                "Dashboard metrics based on your live records",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
