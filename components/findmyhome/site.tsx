import Link from "next/link";
import { ArrowUpRight, House } from "lucide-react";

import "./findmyhome.css";

const isVercelApp = process.env.VERCEL === "1" && process.env.GITHUB_PAGES !== "true";

export function FindMyHomeShell({ children }: { children: React.ReactNode }) {
  const homeHref = isVercelApp ? "/" : "/findmyhome";

  return (
    <div className="fm-site">
      <header className="fm-header">
        <div className="fm-header-inner">
          <Link className="fm-brand" href={homeHref}>
            <span className="fm-brand-mark"><House aria-hidden="true" size={18} /></span>
            <span>FindMyHome<span className="fm-brand-period">.</span></span>
          </Link>
          <nav aria-label="FindMyHome" className="fm-nav">
            <Link href="/properties">Find a home</Link>
            <Link href="/landlord">For landlords</Link>
          </nav>
          <Link className="fm-header-cta" href="/landlord">
            List your property <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </header>
      {children}
      <footer className="fm-footer">
        <Link className="fm-brand" href={homeHref}>
          <span className="fm-brand-mark"><House aria-hidden="true" size={16} /></span>
          <span>FindMyHome<span className="fm-brand-period">.</span></span>
        </Link>
        <span>Thoughtful rental search for Kenya.</span>
        <Link href="/properties">Browse homes <ArrowUpRight aria-hidden="true" size={14} /></Link>
      </footer>
    </div>
  );
}
