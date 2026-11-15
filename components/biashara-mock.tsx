export function BiasharaMock() {
  return (
    <div aria-label="Illustrated preview of the BiasharaDesk business dashboard" className="dashboard-mock">
      <div className="mock-topbar">
        <span aria-hidden="true" className="mock-dot" />
        <span>Workspace overview</span>
        <span className="mock-name">BiasharaDesk</span>
      </div>
      <div className="mock-body">
        <span className="mock-label">Business overview</span>
        <h3 className="mock-heading">Good morning, Mary</h3>
        <div className="mock-metrics">
          <div className="mock-metric">
            <span>Today&apos;s sales</span>
            <strong>KES 42.8k</strong>
          </div>
          <div className="mock-metric">
            <span>Customers</span>
            <strong>128</strong>
          </div>
          <div className="mock-metric">
            <span>Bookings</span>
            <strong>06</strong>
          </div>
        </div>
        <div aria-hidden="true" className="mock-chart">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
