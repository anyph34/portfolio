import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

import { StockPilotPreview } from "@/components/stockpilot-preview";

export const metadata: Metadata = {
  title: "StockPilot AI | Inventory, in your control",
  description:
    "Smarter inventory management and AI-powered business insights for Kenyan retailers and wholesalers.",
};

const features = [
  {
    icon: Boxes,
    title: "Know what you have",
    description:
      "Keep products, stock levels, and reorder points in one clear view, built for the rhythm of retail.",
  },
  {
    icon: BrainCircuit,
    title: "See what is changing",
    description:
      "Bring movement patterns and useful prompts together so your next stock decision is easier to make.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Make the numbers useful",
    description:
      "Understand stock value, fast movers, and items needing attention without fighting a crowded dashboard.",
  },
];

export default function StockPilotPage() {
  return (
    <main className="sp-site">
      <header className="sp-header">
        <Link aria-label="StockPilot AI home" className="sp-brand" href="/stockpilot">
          <span className="sp-brand-mark">S</span>
          <span>StockPilot <b>AI</b></span>
        </Link>
        <nav aria-label="StockPilot navigation" className="sp-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#features">What you get</a>
        </nav>
        <Link className="sp-header-link" href="/stockpilot/dashboard">
          Explore demo <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </header>

      <section aria-labelledby="sp-hero-title" className="sp-hero">
        <div className="sp-hero-inner">
          <div className="sp-hero-copy">
            <span className="sp-eyebrow"><i /> INVENTORY, IN YOUR CONTROL</span>
            <h1 id="sp-hero-title">Take Control of Your Stock. <em>Grow Your Business.</em></h1>
            <p>
              Smarter inventory management and AI-powered business insights for Kenyan retailers
              and wholesalers.
            </p>
            <div className="sp-hero-actions">
              <Link className="sp-button sp-button-yellow" href="/stockpilot/dashboard">
                Explore the sample dashboard <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a className="sp-text-link" href="#features">
                Discover StockPilot <ArrowDownRight aria-hidden="true" size={16} />
              </a>
            </div>
            <div className="sp-trust-note">
              <ShieldCheck aria-hidden="true" size={17} />
              <span>Designed for the way Kenyan businesses work</span>
            </div>
          </div>
          <div className="sp-hero-visual">
            <span className="sp-visual-label">A CLEARER VIEW OF WHAT MOVES</span>
            <StockPilotPreview />
            <span className="sp-visual-caption">Sample dashboard · Illustrative data</span>
          </div>
        </div>
        <div aria-hidden="true" className="sp-hero-bottom">
          <span>LESS GUESSWORK</span><i /><span>MORE IN CONTROL</span><i /><span>BUILT FOR BUSINESS</span>
        </div>
      </section>

      <section aria-label="StockPilot introduction" className="sp-intro">
        <span className="sp-section-label">A BETTER WAY TO KEEP TRACK</span>
        <p>
          Good stock decisions start with a clear picture. StockPilot brings your inventory and
          business signals into one thoughtful workspace, so you can spend less time counting and
          more time growing.
        </p>
      </section>

      <section aria-labelledby="sp-features-title" className="sp-features" id="features">
        <div className="sp-section-heading">
          <div>
            <span className="sp-section-label">THE DETAILS THAT MATTER</span>
            <h2 id="sp-features-title">A calmer way to run <em>your stock.</em></h2>
          </div>
          <p>Purposeful tools for the everyday decisions behind a healthy business.</p>
        </div>
        <div className="sp-feature-grid">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article className="sp-feature-card" key={title}>
              <span className="sp-feature-number">0{index + 1}</span>
              <span className="sp-feature-icon"><Icon aria-hidden="true" size={21} strokeWidth={1.7} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="sp-how-title" className="sp-how" id="how-it-works">
        <div className="sp-how-copy">
          <span className="sp-section-label">BUILT AROUND YOUR DAY</span>
          <h2 id="sp-how-title">Clarity for today.<br /><em>Confidence for tomorrow.</em></h2>
          <p>
            Spot the items running low, follow what is selling, and get a more useful view of the
            capital sitting on your shelves.
          </p>
          <Link className="sp-button sp-button-cocoa" href="/stockpilot/dashboard">
            Step inside the demo <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="sp-how-stats">
          <article><BarChart3 aria-hidden="true" size={20} /><strong>One clear view</strong><span>Inventory, value, and movement together.</span></article>
          <article><Boxes aria-hidden="true" size={20} /><strong>Made for local trade</strong><span>Kenyan retail and wholesale workflows in mind.</span></article>
          <article><BrainCircuit aria-hidden="true" size={20} /><strong>Insight with context</strong><span>Decision support that keeps your business in focus.</span></article>
        </div>
      </section>

      <section className="sp-final-cta">
        <span className="sp-section-label">SEE THE PRODUCT IN CONTEXT</span>
        <h2>Your next stock decision<br /><em>starts with a better view.</em></h2>
        <Link className="sp-button sp-button-yellow" href="/stockpilot/dashboard">
          Open the sample dashboard <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>

      <footer className="sp-footer">
        <Link aria-label="StockPilot AI home" className="sp-brand sp-brand-footer" href="/stockpilot">
          <span className="sp-brand-mark">S</span>
          <span>StockPilot <b>AI</b></span>
        </Link>
        <span>Thoughtful stock management for growing businesses.</span>
        <Link href="/">Portfolio <ArrowUpRight aria-hidden="true" size={14} /></Link>
      </footer>
    </main>
  );
}
