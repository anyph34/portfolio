import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, BrainCircuit, House, MapPin, ShieldCheck } from "lucide-react";

import { PropertyArtwork } from "@/components/findmyhome/artwork";
import "@/components/findmyhome/findmyhome.css";
import { StockPilotPreview } from "@/components/stockpilot-preview";
import { SiteShell } from "@/components/site-shell";
import { DEMO_PROPERTIES } from "@/lib/findmyhome/properties";

export const metadata: Metadata = {
  title: "Projects | Anyph Kipngetich",
  description: "Selected software projects by Anyph Kipngetich, including FindMyHome and StockPilot AI.",
};

const projectHighlights = [
  {
    title: "Find homes by fit",
    description:
      "Filter by neighbourhood, home type, monthly rent, and availability across Kenya-first sample listings.",
    icon: MapPin,
  },
  {
    title: "Honest availability",
    description:
      "Available and occupied homes are clearly distinguished, and occupied listings cannot accept viewing requests.",
    icon: ShieldCheck,
  },
  {
    title: "A useful landlord workflow",
    description:
      "Create property listings, upload photos, and keep availability up to date from a focused dashboard.",
    icon: House,
  },
  {
    title: "Designed for local renting",
    description: "KES pricing, Nairobi neighbourhoods, and practical home details shape the renter experience.",
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

        <section aria-labelledby="findmyhome-title" className="case-study" id="case-studies">
          <div className="case-study-header">
            <div>
              <span className="project-number">01 / FLAGSHIP PROJECT</span>
              <h2 className="case-study-title" id="findmyhome-title">FindMyHome</h2>
            </div>
            <p className="case-study-summary">
              A Kenya-first rental marketplace for discovering available homes, reviewing clear
              property details, and helping landlords manage photos and occupancy.
            </p>
          </div>

          <div className="case-study-layout">
            <div className="case-visual">
              <PropertyArtwork large listing={DEMO_PROPERTIES[0]} />
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

          <ul aria-label="FindMyHome technologies" className="tag-list">
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Rental marketplace</li>
            <li>Supabase</li>
          </ul>

          <div className="button-row">
            <a
              className="button button-primary"
              href="https://biasharadesk.vercel.app"
              rel="noopener noreferrer"
              target="_blank"
            >
              Explore FindMyHome
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <Link className="button button-outline" href="/findmyhome">
              Open the demo
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </section>

        <section aria-labelledby="stockpilot-title" className="sp-case-study" id="stockpilot">
          <div className="sp-case-header">
            <div>
              <span className="sp-section-label">02 / INVENTORY PRODUCT CONCEPT</span>
              <h2 id="stockpilot-title">StockPilot AI</h2>
            </div>
            <p>
              A premium inventory management concept for Kenyan retailers and wholesalers. It
              brings product levels, stock movement, and decision-support ideas into one calm
              workspace.
            </p>
          </div>
          <div className="sp-case-layout">
            <div className="sp-portfolio-preview">
              <StockPilotPreview compact />
            </div>
            <div className="sp-case-points">
              <article>
                <Boxes aria-hidden="true" size={18} />
                <strong>Inventory at a glance</strong>
                <span>Product counts, reorder signals, and stock value in one view.</span>
              </article>
              <article>
                <BrainCircuit aria-hidden="true" size={18} />
                <strong>Insight-led workflows</strong>
                <span>Designed to make stock movement easier to notice and act on.</span>
              </article>
              <article>
                <ShieldCheck aria-hidden="true" size={18} />
                <strong>Built for Kenyan trade</strong>
                <span>Local currency and retail context shape the product experience.</span>
              </article>
            </div>
          </div>
          <div className="sp-case-actions">
            <Link className="sp-button sp-button-yellow" href="/stockpilot">
              Visit StockPilot <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
            <Link className="sp-button sp-button-cream" href="/stockpilot/dashboard">
              Open sample dashboard <ArrowRight aria-hidden="true" size={15} />
            </Link>
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
