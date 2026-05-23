import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

function Invoices () {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        
        await apiClient(`/invoices/${invoiceId}`, {
          method: 'DELETE'
        });

        setInvoices((previousInvoices) => {
          const updatedInvoices = previousInvoices.filter((invoice) => invoice.id !== invoiceId);
          
          const newTotalPages = Math.ceil(updatedInvoices.length / itemsPerPage);

          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }

          return updatedInvoices;
        });
      } catch (error) {
        setError(error.message);
      }
    };

    const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentInvoices = invoices.slice(startIndex, endIndex);

    const showingFrom = invoices.length === 0 ? 0 : startIndex + 1;
    const showingTo = Math.min(endIndex, invoices.length);

    return (
        <div>
            <div className="page-wrapper">
                {/* <!-- BEGIN PAGE HEADER -->
                <!-- BEGIN PAGE HEADER --> */}
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                        <div className="col">
                            <h1 className="page-title">All Invoices</h1>
                        </div>
                        </div>
                    </div>
                </div>
                {/* <!-- END PAGE HEADER -->
                <!-- END PAGE HEADER -->
                <!-- BEGIN PAGE BODY --> */}
                <main id="content" className="page-body">
                  <div className="container-xl">
                    <div className="row row-cards">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">Invoices</h3>
                          </div>
                          <div className="card-body border-bottom py-3">
                            <div className="d-flex">
                              <div className="text-secondary">
                                Show
                                <div className="mx-2 d-inline-block">
                                  <input type="text" className="form-control form-control-sm" defaultValue="8" size="3" aria-label="Invoices count" />
                                </div>
                                entries
                              </div>
                              <div className="ms-auto text-secondary">
                                Search:
                                <div className="ms-2 d-inline-block">
                                  <input type="text" className="form-control form-control-sm" aria-label="Search invoice" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-selectable card-table table-vcenter text-nowrap datatable">
                              <thead>
                                <tr>
                                  <th className="w-1"><input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices" /></th>
                                  <th className="w-1">
                                    No.
                                    {/* <!-- Download SVG icon from http://tabler.io/icons/icon/chevron-up --> */}
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
                                      className="icon icon-sm icon-thick icon-2"
                                    >
                                      <path d="M6 15l6 -6l6 6" />
                                    </svg>
                                  </th>
                                  <th>Client ID</th>
                                  <th>Invoice No.</th>
                                  <th>Title</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                  <th>Date Issued</th>
                                  <th>Due Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentInvoices.length === 0 && (
                                  <tr>
                                    <td 
                                      colSpan="10"
                                      className="text-center text-secondary py-4">
                                        No invoices found
                                      </td>
                                  </tr>
                                )}
                                {currentInvoices.map((invoice, index) => (
                                  <tr key={invoice.id}>
                                    <td>
                                      <input 
                                          className="form-check-input m-0 align-middle"
                                          type="checkbox"
                                        />
                                    </td>
                                    <td>{invoice.id}</td>
                                    <td>{invoice.clientId}</td>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.title}</td>
                                    <td>{invoice.amount}</td>
                                    <td>{invoice.status}</td>
                                    <td>{invoice.issueDate}</td>
                                    <td>{invoice.dueDate}</td>
                                    <td>
                                      <span className="dropdown">
                                        <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                                        <div className="dropdown-menu dropdown-menu-end">
                                          <a className="dropdown-item" href="#"> Edit </a>
                                          <button
                                            className="dropdown-item text-danger"
                                            type="button"
                                            onClick={() => handleDeleteInvoice(invoice.id)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="card-footer">
                            <div className="row g-2 justify-content-center justify-content-sm-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="m-0 text-secondary">
                                  Showing <strong>{showingFrom}</strong> to{" "}
                                  <strong>{showingTo}</strong> of{" "}
                                  <strong>{invoices.length}</strong> entries
                                </p>  
                              </div>
                              <div className="col-auto">
                                {/* <!-- BEGIN PAGINATION --> */}
                                <ul className="pagination m-0 ms-auto">
                                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                      className="page-link"
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
                                        className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
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

                                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                      className="page-link"
                                      type="button"
                                      disabled={currentPage === totalPages}
                                      onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                                {/* <!-- END PAGINATION --> */}
                              </div>
                            </div>
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

export default Invoices
