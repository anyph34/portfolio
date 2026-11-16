import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { FindMyHomeLanding } from "@/components/findmyhome/landing";
import { HeroSlider } from "@/components/hero-slider";
import { PropertyArtwork } from "@/components/findmyhome/artwork";
import { SiteShell } from "@/components/site-shell";
import { SkillCard } from "@/components/skill-card";
import { StockPilotPreview } from "@/components/stockpilot-preview";
import { skillGroups } from "@/lib/portfolio";
import { DEMO_PROPERTIES } from "@/lib/findmyhome/properties";

const isFindMyHomeDeployment = process.env.VERCEL === "1" && process.env.GITHUB_PAGES !== "true";

export const metadata: Metadata = isFindMyHomeDeployment
  ? {
      metadataBase: new URL("https://biasharadesk.vercel.app"),
      title: "FindMyHome | Rental homes in Kenya",
      description: "Thoughtfully presented rental homes, clear details, and a simpler way to find your next neighbourhood.",
      alternates: { canonical: "/" },
      openGraph: {
        title: "FindMyHome | Rental homes in Kenya",
        description: "Explore rental homes across Nairobi and find a place to feel at home.",
        url: "https://biasharadesk.vercel.app/",
        siteName: "FindMyHome",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "FindMyHome | Rental homes in Kenya",
        description: "Explore rental homes across Nairobi and find a place to feel at home.",
      },
      icons: { icon: "/findmyhome.svg" },
    }
  : {
      title: "Anyph Kipngetich | Developer Portfolio",
      description: "Software developer and IT specialist building practical web applications and reliable data-backed products.",
    };

function PortfolioHome() {
  return (
    <SiteShell>
      <main className="main-content home-page">
        <div className="hero-intro">
          <p className="eyebrow">Portfolio / 2026</p>
          <span className="hero-location">
            <MapPin aria-hidden="true" size={14} />
            Kenya / East Africa
          </span>
        </div>

        <HeroSlider />

        <section aria-labelledby="featured-heading" className="home-section">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Selected work / 01</p>
              <h2 className="section-title" id="featured-heading">
                Built for <em>real work.</em>
              </h2>
            </div>
            <Link className="button button-outline" href="/projects">
              All projects
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <article className="featured-project">
            <div className="featured-copy">
              <span className="project-number">01 / FLAGSHIP PROJECT</span>
              <h3 className="project-title">FindMyHome</h3>
              <p className="project-summary">
                A Kenya-first rental marketplace for discovering homes, requesting viewings, and
                helping landlords keep property details and availability current.
              </p>
              <ul aria-label="Project technologies" className="tag-list">
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Supabase</li>
                <li>Property marketplace</li>
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
                <Link className="button button-outline" href="/projects#case-studies">
                  Read the case study
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </div>
            <div className="product-visual">
              <PropertyArtwork large listing={DEMO_PROPERTIES[0]} />
            </div>
          </article>
          <article className="sp-portfolio-showcase">
            <div className="sp-portfolio-copy">
              <span className="sp-section-label">02 / INVENTORY PRODUCT · STOCKPILOT AI</span>
              <h3>Take stock.<br />Move forward.</h3>
              <p>
                A considered inventory concept for Kenyan retailers, pairing clear stock control
                with thoughtful business insight.
              </p>
              <div className="sp-portfolio-actions">
                <Link className="sp-button sp-button-yellow" href="/stockpilot">
                  Discover StockPilot <ArrowRight aria-hidden="true" size={15} />
                </Link>
                <Link className="sp-button sp-button-cream" href="/stockpilot/dashboard">
                  Explore the demo <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </div>
            <div className="sp-portfolio-preview">
              <StockPilotPreview compact />
            </div>
          </article>
        </section>

        <section aria-labelledby="skills-heading" className="home-section" id="skills">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">A practical toolkit</p>
              <h2 className="section-title" id="skills-heading">
                Skills in <em>context.</em>
              </h2>
            </div>
            <p className="section-intro">
              A working set of languages, product tools, and systems knowledge for taking an idea
              from data model to interface.
            </p>
          </div>
          <div className="skills-strip">
            {skillGroups.map((group) => (
              <SkillCard
                compact
                icon={group.icon}
                key={group.title}
                skills={group.skills}
                title={group.title}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-cta-heading" className="home-section">
          <div className="contact-cta">
            <div>
              <p className="section-kicker">Have something in mind?</p>
              <h2 className="section-title" id="contact-cta-heading">
                Let&apos;s make it <em>useful.</em>
              </h2>
            </div>
            <Link className="button button-primary" href="/contact">
              Start a conversation
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export default function HomePage() {
  return isFindMyHomeDeployment ? <FindMyHomeLanding /> : <PortfolioHome />;
}
