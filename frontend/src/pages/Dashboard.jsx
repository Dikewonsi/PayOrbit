import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const statTemplates = [
  {
    title: "Total Revenue",
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

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

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
    paid: "success",
    pending: "warning",
    overdue: "danger",
    sent: "primary",
    Paid: "success",
    Pending: "warning",
    Overdue: "danger",
    Sent: "primary",
  }[status] || "secondary";
}

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDashboard = async () => {
      try {
          const response = await apiClient('/dashboard');
          setSummary(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  if (loading) {
    return <div className='page-wrapper p-4'>Loading Dashboard...</div>;
  }

  if (error) {
    return <div className='page-wrapper p-4 text-danger'>{error}</div>
  }

  const stats = [
    {
      ...statTemplates[0],
      title: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      change: `${summary.paidInvoices} paid invoices`,
      trend: "up",
      color: "primary"
    },
    {
      ...statTemplates[1],
      title: "Total Invoices",
      value: summary.totalInvoices,
      change: `${summary.unpaidInvoices} unpaid`,
      trend: "neutral",
      color: "warning"
    },
    {
      ...statTemplates[2],
      title: "Paid Invoices",
      value: summary.paidInvoices,
      change: `${summary.totalInvoices} total invoices`,
      trend: "up",
      color: "success"
    },
    {
      ...statTemplates[3],
      title: "Total Clients",
      value: summary.totalClients,
      change: "Active clients",
      trend: "up",
      color: "primary"
    }
  ];

  const recentInvoices = summary.recentInvoices;

  const paidPercent = summary.totalInvoices
    ? Math.round((summary.paidInvoices / summary.totalInvoices) * 100)
    : 0;

  const unpaidPercent = summary.totalInvoices
    ? Math.round((summary.unpaidInvoices / summary.totalInvoices) * 100)
    : 0;

    
  return (
    <div
      className="page min-vh-100"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(32, 107, 196, 0.14), transparent 34%), linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #ffffff 100%)",
      }}
    >
      <div className="page-wrapper">
        <div className="page-header d-print-none border-0">
          <div className="container-xl py-4">
            <div className="row g-3 align-items-center">
              <div className="col">
                <span className="badge bg-primary-lt text-primary rounded-pill px-3 py-2 mb-3">
                  Overview
                </span>
                <h1 className="fw-bold mb-1">Dashboard</h1>
                <p className="text-secondary mb-0">
                  Track clients, invoices, payments, and collection performance.
                </p>
              </div>

              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <a href="/clients/create" className="btn btn-white rounded-4 shadow-sm">
                    New client
                  </a>
                  <a href="/invoices/create" className="btn btn-primary rounded-4 shadow-sm">
                    Create invoice
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body mt-0">
          <div className="container-xl pb-5">
            <div className="row row-deck row-cards">
              {stats.map((stat) => (
                <StatCard key={stat.title} stat={stat} />
              ))}
            </div>

            <div className="row row-cards mt-4">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                  <div className="card-header border-0 bg-white p-4">
                    <div>
                      <h3 className="card-title fw-bold mb-1">Recent invoices</h3>
                      <p className="text-secondary mb-0">
                        Latest client billing activity
                      </p>
                    </div>

                    <div className="card-actions">
                      <a href="/invoices" className="btn btn-light rounded-4">
                        View all
                      </a>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="text-secondary fw-semibold">Invoice</th>
                          <th className="text-secondary fw-semibold">Title</th>
                          <th className="text-secondary fw-semibold">Client</th>
                          <th className="text-secondary fw-semibold">Amount</th>
                          <th className="text-secondary fw-semibold">Status</th>
                          <th className="text-secondary fw-semibold">Due Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentInvoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td className="text-primary fw-semibold">
                              {invoice.invoiceNumber}
                            </td>
                            <td className="fw-medium">{invoice.title}</td>
                            <td className="text-secondary">{invoice.clientId}</td>
                            <td className="fw-semibold">
                              {formatCurrency(invoice.amount)}
                            </td>
                            <td>
                              <span
                                className={`badge bg-${statusClass(
                                  invoice.status
                                )}-lt text-${statusClass(invoice.status)} rounded-pill px-3 py-2`}
                              >
                                {invoice.status}
                              </span>
                            </td>
                            <td className="text-secondary">{invoice.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-5 mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div>
                        <h3 className="card-title fw-bold mb-1">
                          Collections health
                        </h3>
                        <p className="text-secondary mb-0">
                          Paid invoices compared to outstanding invoices.
                        </p>
                      </div>

                      <span className="badge bg-success-lt text-success rounded-pill px-3 py-2">
                        {paidPercent}%
                      </span>
                    </div>

                    <div className="progress progress-separated mb-4" style={{ height: "10px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${paidPercent}%` }}
                        aria-label="Paid"
                      ></div>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: `${unpaidPercent}%` }}
                        aria-label="Outstanding"
                      ></div>
                    </div>

                    <div className="row g-3">
                      <div className="col-6">
                        <div className="p-3 rounded-4 bg-light">
                          <div className="h3 fw-bold mb-1">
                            {formatCurrency(summary.totalRevenue)}
                          </div>
                          <div className="text-secondary small">Collected</div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="p-3 rounded-4 bg-light">
                          <div className="h3 fw-bold mb-1">
                            {summary.unpaidInvoices}
                          </div>
                          <div className="text-secondary small">Open invoices</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm rounded-5">
                  <div className="card-body p-4">
                    <h3 className="card-title fw-bold mb-1">Quick actions</h3>
                    <p className="text-secondary mb-4">
                      Manage common billing tasks faster.
                    </p>

                    <div className="d-grid gap-2">
                      <a href="/invoices/create" className="btn btn-primary rounded-4">
                        Create new invoice
                      </a>
                      <a href="/clients/create" className="btn btn-light rounded-4">
                        Add new client
                      </a>
                      <a href="/invoices" className="btn btn-light rounded-4">
                        Review invoices
                      </a>
                    </div>
                  </div>
                </div>

                {/* Overdue invoices can go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
