import type { Metadata } from "next";
import { ArrowUpRight, GitBranch, Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SiteShell } from "@/components/site-shell";
import { contactDetails } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Contact | Anyph Kipngetich",
  description: "Get in touch with Anyph Kipngetich about software, systems, and IT projects.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="main-content">
        <section className="page-top">
          <div>
            <p className="eyebrow">Contact / Say hello</p>
            <h1 className="page-title">
              Good work starts <em>with a conversation.</em>
            </h1>
          </div>
          <p className="page-lede">
            Have a project, a question, or an interesting problem? Choose a direct channel or send
            a note using the form.
          </p>
        </section>

        <section aria-label="Contact Anyph" className="contact-grid">
          <div>
            <p className="section-kicker">Find a direct line</p>
            <h2 className="section-title">
              Reach me <em>here.</em>
            </h2>
            <div className="contact-list">
              <a className="contact-card" href={`tel:${contactDetails.phone}`}>
                <span className="contact-icon"><Phone aria-hidden="true" size={17} /></span>
                <span>
                  <span className="contact-label">Call</span>
                  <span className="contact-value">{contactDetails.phoneDisplay}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <a
                className="contact-card"
                href={contactDetails.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                <span className="contact-icon"><MessageCircle aria-hidden="true" size={17} /></span>
                <span>
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">Send a message</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <a
                className="contact-card"
                href={`mailto:${contactDetails.email}?subject=Portfolio%20Inquiry`}
              >
                <span className="contact-icon"><Mail aria-hidden="true" size={17} /></span>
                <span>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{contactDetails.email}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <a
                className="contact-card"
                href={contactDetails.github}
                rel="noreferrer"
                target="_blank"
              >
                <span className="contact-icon"><GitBranch aria-hidden="true" size={17} /></span>
                <span>
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/anyph34</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
            <CopyEmailButton />
          </div>
          <ContactForm />
        </section>
      </main>
    </SiteShell>
  );
}
