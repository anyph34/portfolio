import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { BiasharaMock } from "@/components/biashara-mock";
import { HeroSlider } from "@/components/hero-slider";
import { SiteShell } from "@/components/site-shell";
import { SkillCard } from "@/components/skill-card";
import { skillGroups } from "@/lib/portfolio";

export default function HomePage() {
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
              <h3 className="project-title">BiasharaDesk</h3>
              <p className="project-summary">
                A multi-tenant business operations platform shaped around the practical needs of
                East African businesses, with KES currency and Nairobi time defaults.
              </p>
              <ul aria-label="Project technologies" className="tag-list">
                <li>Next.js</li>
                <li>PostgreSQL</li>
                <li>Supabase</li>
                <li>Multi-tenant</li>
              </ul>
              <div className="button-row">
                <Link
                  className="button button-primary"
                  href="https://biasharadesk.vercel.app/login"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open BiasharaDesk
                  <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
                <Link className="button button-outline" href="/projects#case-studies">
                  Read the case study
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </div>
            <div className="product-visual">
              <BiasharaMock />
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
