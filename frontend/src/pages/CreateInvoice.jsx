import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';


function CreateInvoice() {

  const navigate = useNavigate();
  const { showNotification } = useNotification();


  const [formData, setFormData] = useState({
    clientId: '',
    title: '',
    amount: '',
    status: 'unpaid',
    issueDate: '',
    dueDate: '',
  });

  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      const getClients = async () => {
        try {
          const response = await apiClient('/clients');
          setClients(response.data.clients);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoadingClients(false);
        }
    };

    getClients();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setSubmitting(true);

      const response = await apiClient('/invoices', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          clientId: Number(formData.clientId),
          amount: Number(formData.amount)
        })
      });

      showNotification('success', response.message);
      navigate('/invoices');
    } catch (error) {
      setError(error.message);
      showNotification('error', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingClients) {
    return (
      <div className='page-wrapper p-4'>
        Loading...
      </div>
    )
  }

  return (
  <div
    className="page min-vh-100"
    style={{
      background:
        "radial-gradient(circle at top left, rgba(45, 206, 137, 0.12), transparent 34%), linear-gradient(135deg, #f8fbff 0%, #eefcf7 45%, #ffffff 100%)",
    }}
  >
    <div className="page-wrapper">
      <div className="page-header d-print-none border-0">
        <div className="container-xl py-4">
          <div className="row g-3 align-items-center">
            <div className="col">
              <span className="badge bg-primary-lt text-primary rounded-pill px-3 py-2 mb-3">
                Invoice Management
              </span>

              <h1 className="fw-bold mb-1">Create Invoice</h1>

              <p className="text-secondary mb-0">
                Create a new invoice and assign it to a client profile.
              </p>
            </div>

            <div className="col-auto">
              <button
                type="button"
                className="btn btn-white rounded-4 shadow-sm"
                onClick={() => navigate("/invoices")}
              >
                Back to invoices
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body mt-0">
        <div className="container-xl pb-5">
          <div className="row justify-content-center g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                <div className="card-header border-0 bg-white p-4">
                  <div>
                    <h3 className="card-title fw-bold mb-1">
                      Invoice Details
                    </h3>

                    <p className="text-secondary mb-0">
                      Fill in the billing details below.
                    </p>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
                  {error && (
                    <div className="alert alert-danger rounded-4 border-0" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Client
                        </label>

                        <select
                          required
                          name="clientId"
                          value={formData.clientId}
                          onChange={handleChange}
                          className="form-select form-select-lg rounded-4 border-0 shadow-sm"
                        >
                          <option value="">Select client</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name} - {client.company}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Title
                        </label>

                        <input
                          required
                          type="text"
                          name="title"
                          className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                          placeholder="Web Design"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Amount
                        </label>

                        <input
                          required
                          type="number"
                          name="amount"
                          className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                          placeholder="5000"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Status
                        </label>

                        <select
                          required
                          name="status"
                          className="form-select form-select-lg rounded-4 border-0 shadow-sm"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Issue Date
                        </label>

                        <input
                          required
                          type="date"
                          name="issueDate"
                          className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                          value={formData.issueDate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold required">
                          Due Date
                        </label>

                        <input
                          required
                          type="date"
                          name="dueDate"
                          className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                          value={formData.dueDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-2 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-4 fw-semibold shadow-sm"
                        disabled={submitting}
                      >
                        {submitting ? "Creating..." : "Create Invoice"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-light btn-lg rounded-4"
                        onClick={() => navigate("/invoices")}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-5">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-primary-lt text-primary d-flex align-items-center justify-content-center mb-3 fw-bold"
                    style={{
                      width: "56px",
                      height: "56px",
                      fontSize: "24px",
                    }}
                  >
                    +
                  </div>

                  <h3 className="fw-bold mb-2">New invoice setup</h3>

                  <p className="text-secondary mb-4">
                    Complete invoice details help you track billing status and
                    keep dashboard totals accurate.
                  </p>

                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      1
                    </span>
                    <span className="text-secondary">
                      Select the billing client
                    </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      2
                    </span>
                    <span className="text-secondary">
                      Add invoice amount and dates
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      3
                    </span>
                    <span className="text-secondary">
                      Save and track payment status
                    </span>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-5 mt-4">
                <div className="card-body p-4">
                  <div className="small text-uppercase text-secondary mb-2">
                    Required Fields
                  </div>

                  <h3 className="fw-bold mb-2">Client, amount & dates</h3>

                  <p className="text-secondary mb-0">
                    These fields keep every invoice tied to the right client and
                    make payment tracking reliable.
                  </p>
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

export default CreateInvoice;
