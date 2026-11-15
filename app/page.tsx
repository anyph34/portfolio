import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <div className="text-lg font-bold tracking-tight text-slate-900">BiasharaDesk</div>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/login" className="rounded-full px-3 py-2 transition hover:bg-slate-100">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
            >
              Start free
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Multi-tenant SaaS platform</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Modern operations for growing Kenyan businesses.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Manage sales, customers, bookings, inventory, expenses and subscriptions from one secure workspace built for small and medium-sized businesses.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-500"
              >
                Create business
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 font-medium text-slate-800 transition hover:border-slate-300"
              >
                View dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4">
              {[
                { label: "Total sales today", value: "KES 124,500" },
                { label: "Customers", value: "1,482" },
                { label: "Bookings", value: "39" },
                { label: "Net profit", value: "KES 41,200" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
