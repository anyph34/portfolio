"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowRight, FileDown } from "lucide-react";

import { AvailabilityBadge } from "@/components/availability-badge";

const slides = [
  {
    number: "01",
    category: "About / Full-stack software developer & IT specialist",
    title: (
      <>
        Anyph<br />
        <em>Kipngetich</em>
      </>
    ),
    subtitle: "Full-Stack Software Developer & IT Specialist",
    description:
      "I build scalable web applications and focused SaaS tools, designed around the people and work behind them.",
    asideTitle: "Thoughtful software, built to work.",
    asideText: "Product-minded development with a practical systems perspective.",
    action: { href: "/about", label: "More about me" },
  },
  {
    number: "02",
    category: "Systems / Data / Engineering",
    title: (
      <>
        Database &amp;<br />
        <em>Systems Architecture</em>
      </>
    ),
    subtitle: "Java, C, SQL, and relational data design.",
    description:
      "From relational data design to tenant-aware systems, I care about the foundations that keep software dependable.",
    asideTitle: "Java / C / SQL",
    asideText: "Relational design, data integrity, and clear application boundaries.",
    action: { href: "/about#skills", label: "Explore my skills" },
  },
  {
    number: "03",
    category: "Selected work / 01",
    title: (
      <>
        Featured Build:<br />
        <em>BiasharaDesk</em>
      </>
    ),
    subtitle: "A multi-tenant operations platform for East African businesses.",
    description:
      "BiasharaDesk brings everyday business operations into one workspace, with Kenyan defaults at its core.",
    asideTitle: "BiasharaDesk",
    asideText: "A multi-tenant operations platform for East African businesses.",
    action: { href: "/projects#biasharadesk", label: "View the case study" },
  },
];

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused]);

  const showSlide = (nextIndex: number) => {
    setActiveSlide((nextIndex + slides.length) % slides.length);
  };

  return (
    <section
      aria-label="Introduction"
      aria-roledescription="carousel"
      className="hero-slider"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-live="off" className="hero-copy" key={slide.number}>
        <span className="section-kicker">{slide.category}</span>
        <h1 className="hero-title hero-slide-enter">{slide.title}</h1>
        <p className="hero-subtitle">{slide.subtitle}</p>
        <p className="hero-description">{slide.description}</p>
        <AvailabilityBadge />
        <div className="button-row">
          <Link className="button button-primary" href={slide.action.href}>
            {slide.action.label}
            <ArrowDownRight aria-hidden="true" size={15} />
          </Link>
          <Link
            className="button button-outline"
            download="Anyph_Kipngetich_CV.pdf"
            href="/assets/Anyph_Kipngetich_CV.pdf"
          >
            Download CV
            <FileDown aria-hidden="true" size={15} />
          </Link>
        </div>
        <div aria-label="Slide controls" className="slider-controls">
          <button
            aria-label="Previous slide"
            className="slider-arrow"
            onClick={() => showSlide(activeSlide - 1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={16} />
          </button>
          <div className="slider-dots">
            {slides.map((item, index) => (
              <button
                aria-label={`Go to slide ${index + 1}: ${item.category}`}
                aria-pressed={activeSlide === index}
                className={`slider-dot${activeSlide === index ? " is-active" : ""}`}
                key={item.number}
                onClick={() => showSlide(index)}
                type="button"
              />
            ))}
          </div>
          <button
            aria-label="Next slide"
            className="slider-arrow"
            onClick={() => showSlide(activeSlide + 1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
      <aside className="hero-aside">
        <span aria-hidden="true" className="hero-aside-index">{slide.number} / 03</span>
        <div>
          <div className="hero-aside-rule" />
          <h2 className="hero-aside-title">{slide.asideTitle}</h2>
          <p className="hero-aside-text">{slide.asideText}</p>
        </div>
      </aside>
    </section>
  );
}
