const stats = [
  {
    title: "Total Revenue",
    value: "$48,240",
    change: "+12.5%",
    trend: "up",
    color: "primary",
    icon: (
      <>
        <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
        <path d="M12 3v3m0 12v3" />
      </>
    ),
  },
  {
    title: "Outstanding Balance",
    value: "$12,860",
    change: "8 unpaid",
    trend: "neutral",
    color: "warning",
    icon: (
      <>
        <path d="M9 14l6 -6" />
        <circle cx="9.5" cy="8.5" r=".5" fill="currentColor" />
        <circle cx="14.5" cy="13.5" r=".5" fill="currentColor" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2z" />
      </>
    ),
  },
  {
    title: "Overdue Invoices",
    value: "6",
    change: "$4,180 due",
    trend: "down",
    color: "danger",
    icon: (
      <>
        <path d="M12 8v4l2 2" />
        <path d="M3.05 11a9 9 0 1 1 .5 4" />
        <path d="M3 16v-5h5" />
      </>
    ),
  },
  {
    title: "Active Clients",
    value: "42",
    change: "+4 this month",
    trend: "up",
    color: "success",
    icon: (
      <>
        <path d="M9 7a4 4 0 1 0 0 8a4 4 0 0 0 0 -8" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </>
    ),
  },
];

const invoices = [
  ["INV-1048", "Website redesign", "Carlson Limited", "Due today", "Pending", "$2,400"],
  ["INV-1047", "Monthly retainer", "Adobe", "Paid Apr 28", "Paid", "$1,200"],
  ["INV-1046", "Brand identity", "Bluewolf", "3 days overdue", "Overdue", "$3,650"],
  ["INV-1045", "Landing page", "Salesforce", "Due May 6", "Sent", "$1,500"],
  ["INV-1044", "Consulting", "Apple", "Paid Apr 22", "Paid", "$2,950"],
];

const overdueItems = [
  ["Bluewolf", "$3,650", "3 days late"],
  ["Printic", "$530", "8 days late"],
  ["Tabdaq", "$300", "12 days late"],
];

function Icon({ children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="icon icon-2"
    >
      {children}
    </svg>
  );
}

function StatCard({ stat }) {

  const trendClass = {
    up: "text-success",
    down: "text-danger",
    neutral: "text-warning",
  }[stat.trend] || "text-muted";;

  return (
    <div className="col-sm-6 col-xl-3">
      <div className="card card-sm">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-auto">
              <span className={`bg-${stat.color} text-white avatar avatar-square`}>
                <Icon>{stat.icon}</Icon>
              </span>
            </div>
            <div className="col">
              <div className="font-weight-medium">{stat.title}</div>
              <div className="h2 mb-1">{stat.value}</div>
              <div className={`text-secondary ${trendClass}`}>{stat.change}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusClass(status) {
  return {
    Paid: "success",
    Pending: "warning",
    Overdue: "danger",
    Sent: "primary",
  }[status];
}

function Dashboard() {
  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Overview</div>
                <h2 className="page-title">Dashboard</h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <a href="/clients/create" className="btn btn-outline-primary">
                    New client
                  </a>
                  <a href="/invoices/create" className="btn btn-primary">
                    Create invoice
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              {stats.map((stat) => (
                <StatCard key={stat.title} stat={stat} />
              ))}
            </div>
            <div className="row row-cards mt-3">
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Recent invoices</h3>
                      <p className="card-subtitle">Latest client billing activity</p>
                    </div>
                    <div className="card-actions">
                      <a href="/invoices" className="btn btn-2">
                        View all
                      </a>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap">
                      <thead>
                        <tr>
                          <th>Invoice</th>
                          <th>Subject</th>
                          <th>Client</th>
                          <th>Due status</th>
                          <th>Status</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map(([number, subject, client, due, status, amount]) => (
                          <tr key={number}>
                            <td className="text-secondary">{number}</td>
                            <td>
                              <a href="/invoices" className="text-reset">
                                {subject}
                              </a>
                            </td>
                            <td>{client}</td>
                            <td className="text-secondary">{due}</td>
                            <td>
                              <span className={`badge bg-${statusClass(status)} me-1`}></span>
                              {status}
                            </td>
                            <td className="text-end fw-medium">{amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Collections health</h3>
                    <div className="d-flex align-items-center mb-2">
                      <div className="subheader">Paid vs outstanding</div>
                      <div className="ms-auto text-secondary">74%</div>
                    </div>
                    <div className="progress progress-separated mb-3">
                      <div className="progress-bar bg-success" style={{ width: "74%" }} aria-label="Paid"></div>
                      <div className="progress-bar bg-warning" style={{ width: "18%" }} aria-label="Outstanding"></div>
                      <div className="progress-bar bg-danger" style={{ width: "8%" }} aria-label="Overdue"></div>
                    </div>
                    <div className="row g-2">
                      <div className="col">
                        <div className="h3 mb-0">$36.1k</div>
                        <div className="text-secondary">Collected</div>
                      </div>
                      <div className="col">
                        <div className="h3 mb-0">$12.9k</div>
                        <div className="text-secondary">Open</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h3 className="card-title">Overdue watchlist</h3>
                  </div>
                  <div className="list-group list-group-flush">
                    {overdueItems.map(([client, amount, age]) => (
                      <div className="list-group-item" key={client}>
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot status-dot-animated bg-danger d-block"></span>
                          </div>
                          <div className="col text-truncate">
                            <div className="text-body d-block">{client}</div>
                            <div className="d-block text-secondary text-truncate mt-n1">{age}</div>
                          </div>
                          <div className="col-auto fw-medium">{amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
