"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, GitBranch, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

import { contactDetails, portfolioLinks } from "@/lib/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" onClick={() => setIsOpen(false)}>
        <span className="brand-mark" aria-hidden="true">A</span>
        <span>Anyph Kipngetich</span>
      </Link>
      <span className="header-note">Software / Systems / IT</span>
      <nav aria-label="Portfolio pages" className="header-nav">
        {portfolioLinks.map((item) => (
          <Link
            aria-current={pathname === item.href ? "page" : undefined}
            className={`header-nav-link${pathname === item.href ? " is-active" : ""}`}
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        aria-hidden={isOpen}
        aria-controls="site-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`menu-toggle${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        tabIndex={isOpen ? -1 : 0}
        type="button"
      >
        <Menu aria-hidden="true" size={17} />
        <span>Menu</span>
      </button>
      <button
        aria-label="Close navigation menu"
        aria-hidden={!isOpen}
        className={`menu-backdrop${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen(false)}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />
      <nav
        aria-hidden={!isOpen}
        aria-label="Main navigation"
        className={`menu-drawer${isOpen ? " is-open" : ""}`}
        id="site-navigation"
      >
        <div className="drawer-top">
          <p className="menu-overline">Navigate the portfolio</p>
          <button
            aria-label="Close navigation menu"
            className="drawer-close"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            <X aria-hidden="true" size={18} />
            <span>Close</span>
          </button>
        </div>
        <div className="drawer-links">
          {portfolioLinks.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={`drawer-link${pathname === item.href ? " is-active" : ""}`}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span>{item.number}</span>
              {item.label}
              <ArrowUpRight aria-hidden="true" size={20} />
            </Link>
          ))}
        </div>
        <div className="drawer-bottom">
          <span>Open to thoughtful projects</span>
          <div aria-label="Contact and social links" className="social-links">
            <a aria-label="GitHub profile" className="social-link" href={contactDetails.github} rel="noreferrer" target="_blank">
              <GitBranch aria-hidden="true" size={16} />
            </a>
            <a aria-label="Send an email" className="social-link" href={`mailto:${contactDetails.email}`}>
              <Mail aria-hidden="true" size={16} />
            </a>
            <a aria-label="Message on WhatsApp" className="social-link" href={contactDetails.whatsapp} rel="noreferrer" target="_blank">
              <MessageCircle aria-hidden="true" size={16} />
            </a>
            <a aria-label="Call Anyph" className="social-link" href={`tel:${contactDetails.phone}`}>
              <Phone aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
