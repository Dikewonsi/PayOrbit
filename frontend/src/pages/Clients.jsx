import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';

function Clients () {

  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { showNotification } = useNotification();

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await apiClient('/clients');

        setClients(response.data.clients);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

   if (loading) {
    return <div className='page-wrapper p-4'>Loading Clients...</div>;
  }

  if (error) {
    return <div className='page-wrapper p-4 text-danger'>{error}</div>
  }

  const handleDeleteClient = async (clientId) => {
    const confirmed = window.confirm('Are you sure you want to delete this client?');

    if(!confirmed) {
      return;
    }

    try {
      setError('');

      const response = await apiClient(`/clients/${clientId}`, {
        method: 'DELETE'
      });

      showNotification('success', response.message);

      setClients((previousClients) => {
        const updatedClients = previousClients.filter((client) => client.id !== clientId);
        
        const newTotalPages = Math.ceil(updatedClients.length / itemsPerPage);

        if(currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }

        return updatedClients;
      });
    } catch (error) {
      setError(error.message)
      showNotification('error', error.message);
    }
  }

  const totalPages = Math.max(1, Math.ceil(clients.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentClients = clients.slice(startIndex, endIndex);

  const showingFrom = clients.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(endIndex, clients.length);

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
                Client Directory
              </span>
              <h1 className="fw-bold mb-1">All Clients</h1>
              <p className="text-secondary mb-0">
                Manage customer records, contact details, and billing profiles.
              </p>
            </div>

            <div className="col-auto">
              <a href="/clients/create" className="btn btn-primary rounded-4 shadow-sm">
                Add new client
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
                <h3 className="card-title fw-bold mb-1">Clients</h3>
                <p className="text-secondary mb-0">
                  View, edit, and manage all saved clients.
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
                        aria-label="Clients count"
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
                        placeholder="Search clients..."
                        aria-label="Search client"
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
                        aria-label="Select all clients"
                      />
                    </th>
                    <th className="text-secondary fw-semibold">ID</th>
                    <th className="text-secondary fw-semibold">Name</th>
                    <th className="text-secondary fw-semibold">Email</th>
                    <th className="text-secondary fw-semibold">Phone</th>
                    <th className="text-secondary fw-semibold">Company</th>
                    <th className="text-secondary fw-semibold">Address</th>
                    <th className="text-secondary fw-semibold">Date Added</th>
                    <th className="text-secondary fw-semibold text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentClients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <input
                          className="form-check-input m-0 align-middle"
                          type="checkbox"
                        />
                      </td>

                      <td className="text-secondary">#{client.id}</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-primary-lt text-primary d-flex align-items-center justify-content-center me-3 fw-bold"
                            style={{ width: "38px", height: "38px" }}
                          >
                            {client.name?.charAt(0)}
                          </div>

                          <div>
                            <div className="fw-semibold">{client.name}</div>
                            <div className="text-secondary small">{client.company}</div>
                          </div>
                        </div>
                      </td>

                      <td className="text-secondary">{client.email}</td>
                      <td className="text-secondary">{client.phone}</td>
                      <td>{client.company}</td>
                      <td className="text-secondary">{client.address}</td>
                      <td className="text-secondary">{client.dateAdded}</td>

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
                              href={`/clients/${client.id}/edit`}
                            >
                              Edit client
                            </a>

                            <button
                              className="dropdown-item text-danger"
                              type="button"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              Delete client
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
                    <strong>{clients.length}</strong> entries
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
);
}

export default Clients
