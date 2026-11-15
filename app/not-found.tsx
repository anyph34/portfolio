import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="main-content not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1 className="page-title">
          This page took <em>a different route.</em>
        </h1>
        <Link className="button button-primary" href="/">
          Back to the homepage
        </Link>
      </main>
    </SiteShell>
  );
}
