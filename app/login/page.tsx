import Link from "next/link";

import { LoginForm } from "../auth-forms";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
            BiasharaDesk
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
          >
            Create account
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Secure onboarding</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Manage business operations from one secure dashboard.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              BiasharaDesk gives SMEs in Kenya a multi-tenant platform for customers, sales,
              bookings, employees, expenses and subscriptions in one place.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["10x", "Faster workflow"],
                ["24/7", "Cloud access"],
                ["KES", "Local currency"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-2xl font-bold text-slate-900">{value}</div>
                  <div className="mt-1 text-sm text-slate-600">{label}</div>
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
