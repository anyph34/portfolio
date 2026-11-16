import Link from "next/link";

import { RegisterForm } from "../auth-forms";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--text)]">
            BiasharaDesk
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Sign in
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Phase 1</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)]">
              Launch your business in under 10 minutes.
            </h1>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              {[
                "Business registration and onboarding",
                "Tenant-aware access control",
                "Database schema for multi-business operations",
                "Dashboard metrics based on your live records",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-xs font-medium text-[var(--text)]">
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
