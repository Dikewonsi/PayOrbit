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
                          <th>Title</th>
                          <th>Client</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentInvoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td className='text-secondary'>{invoice.invoiceNumber}</td>
                            <td>{invoice.title}</td>
                            <td>{invoice.clientId}</td>
                            <td>{formatCurrency(invoice.amount)}</td>
                            <td><span className={`badge bg-${statusClass(invoice.status)} me-1`}></span>{invoice.status}</td>
                            <td>{invoice.dueDate}</td>
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
                      <div className="ms-auto text-secondary">{paidPercent}%</div>
                    </div>
                    <div className="progress progress-separated mb-3">
                      <div className="progress-bar bg-success" style={{ width: `${paidPercent}%` }} aria-label="Paid"></div>
                      <div className="progress-bar bg-warning" style={{ width: `${unpaidPercent}%` }} aria-label="Outstanding"></div>
                    </div>
                    <div className="row g-2">
                      <div className="col">
                        <div className="h3 mb-0">{formatCurrency(summary.totalRevenue)}</div>
                        <div className="text-secondary">Collected</div>
                      </div>
                      <div className="col">
                        <div className="h3 mb-0">{summary.unpaidInvoices}</div>
                        <div className="text-secondary">Open Invoices</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Over Due Invoices Here*/}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
