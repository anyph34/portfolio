import { ArrowUpRight, Boxes, CircleDollarSign, PackageCheck } from "lucide-react";

export function StockPilotPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-label="StockPilot AI inventory dashboard preview with sample data"
      className={`sp-preview${compact ? " sp-preview--compact" : ""}`}
    >
      <aside aria-hidden="true" className="sp-preview-rail">
        <span className="sp-preview-mark">S</span>
        <span className="sp-preview-rail-item is-active"><Boxes size={16} /></span>
        <span className="sp-preview-rail-item"><PackageCheck size={16} /></span>
        <span className="sp-preview-rail-item"><CircleDollarSign size={16} /></span>
      </aside>
      <div className="sp-preview-content">
        <div className="sp-preview-topbar">
          <span>Overview / Inventory</span>
          <span className="sp-preview-demo">SAMPLE DATA</span>
        </div>
        <div className="sp-preview-heading">
          <div>
            <span className="sp-preview-kicker">MONDAY, 16 NOVEMBER</span>
            <strong>Your stock, at a glance.</strong>
          </div>
          <span className="sp-preview-period">This month</span>
        </div>
        <div className="sp-preview-metrics">
          <article>
            <span>Stock value</span>
            <strong>KES 2.4m</strong>
            <small>+12.8% this month</small>
          </article>
          <article>
            <span>Items in stock</span>
            <strong>1,284</strong>
            <small>Across 8 categories</small>
          </article>
          <article className="sp-preview-alert">
            <span>Needs attention</span>
            <strong>08 items</strong>
            <small>Below reorder point</small>
          </article>
        </div>
        <div className="sp-preview-lower">
          <div className="sp-preview-chart">
            <div className="sp-preview-chart-heading">
              <span>Stock movement</span>
              <strong>+18.4%</strong>
            </div>
            <div aria-hidden="true" className="sp-preview-bars">
              <i /><i /><i /><i /><i /><i /><i />
            </div>
            <div aria-hidden="true" className="sp-preview-week">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>
          <div className="sp-preview-insight">
            <span className="sp-preview-insight-icon"><ArrowUpRight size={15} /></span>
            <span>STOCKPILOT INSIGHT</span>
            <strong>Maize flour is moving faster this week.</strong>
            <small>Review your reorder point before Friday.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
