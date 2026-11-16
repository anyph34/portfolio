import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileDown, GraduationCap } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { ProfilePhoto } from "@/components/profile-photo";
import { SkillCard } from "@/components/skill-card";
import { skillGroups } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "About | Anyph Kipngetich",
  description: "Learn about Anyph Kipngetich's background, technical skills, and education.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="main-content">
        <section className="page-top">
          <div>
            <p className="eyebrow">About / The person behind the work</p>
            <h1 className="page-title">
              Practical by nature.<br />
              <em>Curious by design.</em>
            </h1>
          </div>
          <p className="page-lede">
            I&apos;m Anyph Kipngetich, a software developer and IT specialist passionate about
            building practical business software, clean database architectures, and responsive
            web applications.
          </p>
        </section>

        <section aria-label="Profile" className="about-grid">
          <div>
            <p className="section-kicker">How I approach the work</p>
            <h2 className="section-title">
              Useful first.<br />
              <em>Well made always.</em>
            </h2>
          </div>
          <ProfilePhoto />
          <div className="about-copy">
            <p>
              I enjoy understanding the people and processes behind a software problem before
              choosing the technology. That perspective guides how I shape an interface, structure
              data, and make a system easier to maintain.
            </p>
            <p>
              My work brings together web development, database design, and IT systems thinking.
              I am especially interested in tools that help growing businesses spend less time
              juggling processes and more time serving their customers.
            </p>
            <blockquote className="about-pullquote">
              Good software should feel clear to use and make sense under the hood.
            </blockquote>
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="home-section" id="skills">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Tools I reach for</p>
              <h2 className="section-title" id="skills-heading">
                Technical <em>skills.</em>
              </h2>
            </div>
            <p className="section-intro">
              A broad foundation, applied with care to the needs of each project.
            </p>
          </div>
          <div className="skill-matrix">
            {skillGroups.map((group) => (
              <SkillCard
                icon={group.icon}
                key={group.title}
                skills={group.skills}
                title={group.title}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="education-heading" className="home-section" id="experience">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">A foundation for the work</p>
              <h2 className="section-title" id="education-heading">
                Education &amp; <em>training.</em>
              </h2>
            </div>
            <GraduationCap aria-hidden="true" size={25} strokeWidth={1.4} />
          </div>
          <ol className="timeline">
            <li className="timeline-item">
              <span className="timeline-date">Currently pursuing</span>
              <div>
                <h3 className="timeline-title">Bachelor of Information Technology (BIT)</h3>
                <p className="timeline-place">Undergraduate study</p>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-date">Diploma</span>
              <div>
                <h3 className="timeline-title">Diploma in Information Technology</h3>
                <p className="timeline-place">Laikipia University</p>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-date">Secondary education</span>
              <div>
                <h3 className="timeline-title">Kenya Certificate of Secondary Education (KCSE)</h3>
                <p className="timeline-place">Kipkabus High School</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="home-section">
          <div className="contact-cta">
            <div>
              <p className="section-kicker">Next chapter</p>
              <h2 className="section-title">
                Let&apos;s build something <em>considered.</em>
              </h2>
            </div>
            <div className="button-row about-cta-actions">
              <Link className="button button-primary" href="/contact">
                Get in touch
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <Link
                className="button button-outline"
                download="Anyph_Kipngetich_CV.pdf"
                href="/assets/Anyph_Kipngetich_CV.pdf"
                prefetch={false}
              >
                Download CV
                <FileDown aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
