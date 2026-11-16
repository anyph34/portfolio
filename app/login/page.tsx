import Link from "next/link";

import { LoginForm } from "../auth-forms";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--text)]">
            BiasharaDesk
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Create account
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Secure onboarding</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)]">
              Manage business operations from one secure dashboard.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">
              BiasharaDesk gives SMEs in Kenya a multi-tenant platform for customers, sales,
              bookings, employees, expenses and subscriptions in one place.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["10x", "Faster workflow"],
                ["24/7", "Cloud access"],
                ["KES", "Local currency"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <div className="text-2xl font-semibold text-[var(--text)]">{value}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
