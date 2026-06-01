import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount);
};

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

const Invoices = () => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { showNotification } = useNotification();

    useEffect(() => {
      const getInvoices = async () => {
        try {
          const response = await apiClient('/invoices');

          setInvoices(response.data.invoices);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      getInvoices();
    }, []);

    if (loading) {
      return <div className='page-wraper p-4'>Loading Invoices</div>
    }

    if (error) {
      return <div className="page-wrapper p-4 text-danger">{error}</div>
    }

    const handleDeleteInvoice = async (invoiceId) => {
      const confirmed = window.confirm('Are you sure you want to delete this invoice?');

      if (!confirmed) {
        return;
      }

      try {
        setError('');
        
        const response = await apiClient(`/invoices/${invoiceId}`, {
          method: 'DELETE'
        });

        showNotification('success', response.message);

        setInvoices((previousInvoices) => {
          const updatedInvoices = previousInvoices.filter((invoice) => invoice.id !== invoiceId);
          
          const newTotalPages = Math.ceil(updatedInvoices.length / itemsPerPage);

          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }

          return updatedInvoices;
        });
      } catch (error) {
        setError(error.message)
        showNotification('error', error.message);
      }
    };

    const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentInvoices = invoices.slice(startIndex, endIndex);

    const showingFrom = invoices.length === 0 ? 0 : startIndex + 1;
    const showingTo = Math.min(endIndex, invoices.length);

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
                    Invoice Center
                  </span>
                  <h1 className="fw-bold mb-1">All Invoices</h1>
                  <p className="text-secondary mb-0">
                    Track invoice totals, payment status, issue dates, and due dates.
                  </p>
                </div>

                <div className="col-auto">
                  <a href="/invoices/create" className="btn btn-primary rounded-4 shadow-sm">
                    Create invoice
                  </a>
                </div>
              </div>
            </div>
          </div>

          <main id="content" className="page-body mt-0">
            <div className="container-xl pb-5">
              <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                <div className="card-header border-0 bg-white p-4">
                  <div>
                    <h3 className="card-title fw-bold mb-1">Invoices</h3>
                    <p className="text-secondary mb-0">
                      View, edit, and manage all customer invoices.
                    </p>
                  </div>
                </div>

                <div className="card-body border-bottom p-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center text-secondary">
                        Show
                        <div className="mx-2">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-3"
                            defaultValue="8"
                            size="3"
                            aria-label="Invoices count"
                          />
                        </div>
                        entries
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex justify-content-md-end align-items-center text-secondary">
                        Search:
                        <div className="ms-2">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-3"
                            placeholder="Search invoices..."
                            aria-label="Search invoice"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-vcenter text-nowrap card-table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="w-1">
                          <input
                            className="form-check-input m-0 align-middle"
                            type="checkbox"
                            aria-label="Select all invoices"
                          />
                        </th>
                        <th className="text-secondary fw-semibold">ID</th>
                        <th className="text-secondary fw-semibold">Client ID</th>
                        <th className="text-secondary fw-semibold">Invoice No.</th>
                        <th className="text-secondary fw-semibold">Title</th>
                        <th className="text-secondary fw-semibold">Amount</th>
                        <th className="text-secondary fw-semibold">Status</th>
                        <th className="text-secondary fw-semibold">Date Issued</th>
                        <th className="text-secondary fw-semibold">Due Date</th>
                        <th className="text-secondary fw-semibold text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentInvoices.length === 0 && (
                        <tr>
                          <td colSpan="10" className="text-center text-secondary py-4">
                            No invoices found
                          </td>
                        </tr>
                      )}

                      {currentInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>
                            <input
                              className="form-check-input m-0 align-middle"
                              type="checkbox"
                            />
                          </td>

                          <td className="text-secondary">#{invoice.id}</td>
                          <td className="text-secondary">#{invoice.clientId}</td>
                          <td className="fw-semibold">{invoice.invoiceNumber}</td>
                          <td>{invoice.title}</td>
                          <td className="fw-semibold">{formatCurrency(invoice.amount)}</td>
                          <td>
                            <span className={`badge bg-${statusClass(invoice.status)}-lt text-${statusClass(invoice.status)} rounded-pill px-3 py-2`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="text-secondary">{invoice.issueDate}</td>
                          <td className="text-secondary">{invoice.dueDate}</td>

                          <td className="text-end">
                            <span className="dropdown">
                              <button
                                className="btn btn-light rounded-4 dropdown-toggle"
                                data-bs-boundary="viewport"
                                data-bs-toggle="dropdown"
                              >
                                Actions
                              </button>

                              <div className="dropdown-menu dropdown-menu-end shadow-sm rounded-4 border-0">
                                <a
                                  className="dropdown-item"
                                  href={`/invoices/${invoice.id}/edit`}
                                >
                                  Edit invoice
                                </a>

                                <button
                                  className="dropdown-item text-danger"
                                  type="button"
                                  onClick={() => handleDeleteInvoice(invoice.id)}
                                >
                                  Delete invoice
                                </button>
                              </div>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card-footer bg-white border-0 p-4">
                  <div className="row g-3 justify-content-center justify-content-sm-between align-items-center">
                    <div className="col-auto">
                      <p className="m-0 text-secondary">
                        Showing <strong>{showingFrom}</strong> to{" "}
                        <strong>{showingTo}</strong> of{" "}
                        <strong>{invoices.length}</strong> entries
                      </p>
                    </div>

                    <div className="col-auto">
                      <ul className="pagination m-0">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button
                            className="page-link rounded-start-4"
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNumber = index + 1;

                          return (
                            <li
                              className={`page-item ${
                                currentPage === pageNumber ? "active" : ""
                              }`}
                              key={pageNumber}
                            >
                              <button
                                className="page-link"
                                type="button"
                                onClick={() => setCurrentPage(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          );
                        })}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link rounded-end-4"
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
}

export default Invoices;
