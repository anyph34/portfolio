import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Database, Layers3, ShieldCheck } from "lucide-react";

import { BiasharaMock } from "@/components/biashara-mock";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Projects | Anyph Kipngetich",
  description: "Selected software projects by Anyph Kipngetich, including the BiasharaDesk case study.",
};

const projectHighlights = [
  {
    title: "Tenant-aware data model",
    description:
      "A PostgreSQL/Supabase foundation for profiles, businesses, business_members, subscriptions, settings, and audit history.",
    icon: Database,
  },
  {
    title: "Roles and membership",
    description:
      "Business owner and employee roles represented in a membership model, ready for tenant-specific workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Reusable interface pieces",
    description:
      "Modular UI primitives and form validation utilities keep the product interface consistent as it grows.",
    icon: Layers3,
  },
  {
    title: "Regional defaults",
    description:
      "KES currency and the Africa/Nairobi timezone are first-class defaults for the intended market.",
    icon: Boxes,
  },
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <main className="main-content">
        <section className="page-top">
          <div>
            <p className="eyebrow">Projects / Selected builds</p>
            <h1 className="page-title">
              Software with a <em>point of view.</em>
            </h1>
          </div>
          <p className="page-lede">
            I am interested in the thoughtful details that make a product useful: a sound data
            model, a clear workflow, and an interface that gets out of the way.
          </p>
        </section>

        <section aria-labelledby="biasharadesk-title" className="case-study" id="case-studies">
          <div className="case-study-header">
            <div>
              <span className="project-number">01 / FLAGSHIP PROJECT</span>
              <h2 className="case-study-title" id="biasharadesk-title">BiasharaDesk</h2>
            </div>
            <p className="case-study-summary">
              A multi-tenant business operations and management SaaS concept tailored for East
              African businesses. The product direction brings everyday business work into one
              focused workspace, with KES currency and Africa/Nairobi timezone defaults.
            </p>
          </div>

          <div className="case-study-layout">
            <div className="case-visual">
              <BiasharaMock />
            </div>
            <div className="case-details">
              {projectHighlights.map(({ title, description, icon: Icon }) => (
                <article className="case-detail" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Icon aria-hidden="true" size={16} strokeWidth={1.5} />
                </article>
              ))}
            </div>
          </div>

          <ul aria-label="BiasharaDesk technologies" className="tag-list">
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>PostgreSQL</li>
            <li>Supabase</li>
          </ul>

          <div className="button-row">
            <Link className="button button-primary" href="/login">
              Open BiasharaDesk
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
            <a
              className="button button-outline"
              href="https://github.com/anyph34/biasharadesk"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub repository
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </section>

        <section className="home-section">
          <div className="contact-cta">
            <div>
              <p className="section-kicker">Have a good problem to solve?</p>
              <h2 className="section-title">
                I&apos;d like to <em>hear about it.</em>
              </h2>
            </div>
            <Link className="button button-primary" href="/contact">
              Contact me
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
