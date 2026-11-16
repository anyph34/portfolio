"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  CircleHelp,
  LayoutDashboard,
  Package,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stockItems = [
  { sku: "SP-1042", name: "Pembe maize flour · 2kg", category: "Grains", quantity: 18, reorderAt: 24, price: 185 },
  { sku: "SP-1038", name: "Fresh cooking oil · 1L", category: "Cooking oil", quantity: 42, reorderAt: 20, price: 320 },
  { sku: "SP-1021", name: "White rice · 5kg", category: "Grains", quantity: 11, reorderAt: 16, price: 760 },
  { sku: "SP-1006", name: "Brown bread · 800g", category: "Bakery", quantity: 31, reorderAt: 18, price: 75 },
  { sku: "SP-1077", name: "Whole milk · 500ml", category: "Dairy", quantity: 9, reorderAt: 20, price: 65 },
  { sku: "SP-1092", name: "Laundry soap · 1kg", category: "Household", quantity: 27, reorderAt: 12, price: 240 },
];

type StockFilter = "all" | "attention";

export function StockPilotDashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StockFilter>("all");
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stockItems.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.sku.toLowerCase().includes(normalizedQuery);
      const needsAttention = item.quantity <= item.reorderAt;
      return matchesQuery && (filter === "all" || needsAttention);
    });
  }, [filter, query]);

  return (
    <main className="sp-dashboard">
      <aside aria-label="StockPilot dashboard sidebar" className="sp-dash-sidebar">
        <Link className="sp-dash-brand" href="/stockpilot">
          <span className="sp-brand-mark">S</span>
          <span>StockPilot <b>AI</b></span>
        </Link>
        <span className="sp-dash-nav-label">WORKSPACE</span>
        <nav aria-label="Dashboard sections" className="sp-dash-nav">
          <a className="is-active" href="#overview"><LayoutDashboard size={17} /> Overview</a>
          <a href="#inventory"><Boxes size={17} /> Inventory <span>1,284</span></a>
          <a href="#insights"><BrainCircuit size={17} /> Insights <i>3</i></a>
        </nav>
        <div className="sp-dash-sidebar-bottom">
          <a href="#demo-note"><CircleHelp size={17} /> About this demo</a>
          <div className="sp-dash-workspace"><span>MK</span><div><strong>Market Demo</strong><small>Sample workspace</small></div></div>
        </div>
      </aside>

      <div className="sp-dash-main">
        <header className="sp-dash-topbar">
          <Link className="sp-dash-back" href="/stockpilot"><ArrowLeft size={16} /> Product overview</Link>
          <div className="sp-dash-top-actions">
            <span className="sp-dash-demo-pill"><i /> DEMO MODE</span>
            <span className="sp-dash-avatar" aria-label="Demo account">MK</span>
          </div>
        </header>

        <div className="sp-dash-content">
          <section aria-labelledby="sp-dash-title" className="sp-dash-welcome" id="overview">
            <div>
              <span className="sp-section-label">MONDAY, 16 NOVEMBER 2026</span>
              <h1 id="sp-dash-title">Good morning, Market Demo.</h1>
              <p>Here&apos;s the shape of your stock this week.</p>
            </div>
            <label className="sp-dash-search">
              <Search aria-hidden="true" size={17} />
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or SKU"
                type="search"
                value={query}
              />
            </label>
          </section>

          <p className="sp-demo-disclaimer" id="demo-note">
            <Sparkles aria-hidden="true" size={16} />
            Demo workspace with sample data. Inventory is not connected to a live store; insight
            cards are illustrative and do not call an AI service.
          </p>

          <section aria-label="Inventory summary metrics" className="sp-dash-metrics">
            <article className="sp-dash-metric sp-dash-metric-primary">
              <span>STOCK VALUE <CircleHelp aria-hidden="true" size={14} /></span>
              <strong>KES 2,486,320</strong>
              <small><TrendingUp aria-hidden="true" size={13} /> 12.8% <i>vs. last month</i></small>
            </article>
            <article className="sp-dash-metric">
              <span>ITEMS IN STOCK <Boxes aria-hidden="true" size={15} /></span>
              <strong>1,284</strong>
              <small>Across 8 categories</small>
            </article>
            <article className="sp-dash-metric">
              <span>LOW-STOCK ITEMS <Package aria-hidden="true" size={15} /></span>
              <strong>08</strong>
              <small>Need a reorder review</small>
            </article>
          </section>

          <section aria-labelledby="sp-movement-title" className="sp-dash-chart-card">
            <div className="sp-dash-card-heading">
              <div><span className="sp-section-label">THE LAST SEVEN DAYS</span><h2 id="sp-movement-title">Stock movement</h2></div>
              <span className="sp-dash-change"><TrendingUp size={14} /> 18.4% <i>this week</i></span>
            </div>
            <div aria-label="Illustrative stock movement chart for Monday through Sunday" className="sp-dash-chart">
              {[36, 57, 46, 74, 62, 88, 69].map((height, index) => (
                <div className="sp-dash-chart-column" key={index}>
                  <span className="sp-dash-chart-bar" style={{ height: `${height}%` }} />
                  <small>{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index]}</small>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="sp-insights-title" className="sp-dash-insights" id="insights">
            <div className="sp-dash-section-heading">
              <div><span className="sp-section-label">A LITTLE MORE CONTEXT</span><h2 id="sp-insights-title">Insights to explore</h2></div>
              <span className="sp-dash-preview-label"><Sparkles size={14} /> PREVIEW CONTENT</span>
            </div>
            <div className="sp-dash-insight-grid">
              <article><span className="sp-dash-insight-icon"><ArrowUpRight size={17} /></span><small>REORDER WATCH</small><h3>Maize flour is moving faster.</h3><p>Sample prompt: review the reorder point before Friday.</p></article>
              <article><span className="sp-dash-insight-icon"><TrendingUp size={17} /></span><small>SALES PATTERN</small><h3>Cooking oil is a steady mover.</h3><p>Sample prompt: compare weekly demand before your next order.</p></article>
              <article><span className="sp-dash-insight-icon"><ArrowDown size={17} /></span><small>STOCK HEALTH</small><h3>Two products are below target.</h3><p>Sample prompt: check current supplier lead times.</p></article>
            </div>
          </section>

          <section aria-labelledby="sp-inventory-title" className="sp-dash-inventory" id="inventory">
            <div className="sp-dash-section-heading">
              <div><span className="sp-section-label">A FEW EXAMPLE PRODUCTS</span><h2 id="sp-inventory-title">Inventory overview</h2></div>
              <Settings2 aria-hidden="true" className="sp-dash-settings-icon" size={19} />
            </div>
            <div aria-label="Filter inventory list" className="sp-dash-filters">
              <button aria-pressed={filter === "all"} className={filter === "all" ? "is-selected" : ""} onClick={() => setFilter("all")} type="button">All stock</button>
              <button aria-pressed={filter === "attention"} className={filter === "attention" ? "is-selected" : ""} onClick={() => setFilter("attention")} type="button">Needs attention <span>08</span></button>
            </div>
            <div className="sp-dash-table-wrap">
              <table className="sp-dash-table">
                <thead><tr><th>PRODUCT</th><th>SKU</th><th>CATEGORY</th><th>IN STOCK</th><th>UNIT PRICE</th><th>STATUS</th></tr></thead>
                <tbody>
                  {visibleItems.map((item) => {
                    const lowStock = item.quantity <= item.reorderAt;
                    return (
                      <tr key={item.sku}>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.sku}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity} units</td>
                        <td>KES {item.price.toLocaleString("en-KE")}</td>
                        <td><span className={`sp-stock-status${lowStock ? " is-low" : ""}`}><i />{lowStock ? "Reorder soon" : "In stock"}</span></td>
                      </tr>
                    );
                  })}
                  {visibleItems.length === 0 && (
                    <tr><td className="sp-dash-empty" colSpan={6}>No sample products match that search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="sp-dash-footer">
            <span>STOCKPILOT AI · INTERACTIVE SAMPLE</span>
            <Link href="/stockpilot">Back to StockPilot <ArrowUpRight size={14} /></Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
