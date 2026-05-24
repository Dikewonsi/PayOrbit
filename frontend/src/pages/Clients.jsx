import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

function Clients () {

  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      await apiClient(`/clients/${clientId}`, {
        method: 'DELETE'
      });

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
    }
  }

  const totalPages = Math.max(1, Math.ceil(clients.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentClients = clients.slice(startIndex, endIndex);

  const showingFrom = clients.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(endIndex, clients.length);

    return (
        <div>
            <div className="page-wrapper">
                {/* <!-- BEGIN PAGE HEADER -->
                <!-- BEGIN PAGE HEADER --> */}
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                        <div className="col">
                            <h1 className="page-title">All Clients</h1>
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
                            <h3 className="card-title">Clients</h3>
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
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Company</th>
                                  <th>Address</th>
                                  <th>Date Added</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentClients.map((client, index) => (
                                  <tr key={client.id}>
                                    <td>
                                      <input 
                                        className="form-check-input m-0 align-middle"
                                        type="checkbox"
                                      />
                                    </td>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.company}</td>
                                    <td>{client.address}</td>
                                    <td>{client.dateAdded}</td>
                                    <td>
                                      <span className="dropdown">
                                        <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                                        <div className="dropdown-menu dropdown-menu-end">
                                          <a className="dropdown-item" href="#"> Edit </a>
                                          <button
                                            className="dropdown-item text-danger"
                                            type="button"
                                            onClick={() => handleDeleteClient(client.id)}
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
                                  <strong>{clients.length}</strong> entries
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

export default Clients
