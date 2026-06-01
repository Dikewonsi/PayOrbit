import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';

const EditInvoice = () => {

    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        clientId: '',
        title: '',
        amount: '',
        status: 'unpaid',
        issueDate: '',
        dueDate: '',
    });

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getEditData = async () => {
            try {
                const clientsResponse = await apiClient('/clients');
                const invoiceResponse = await apiClient(`/invoices/${id}`);

                const invoice = invoiceResponse.data.invoice;

                setClients(clientsResponse.data.clients);

                setFormData({
                    clientId: String(invoice.clientId),
                    title: invoice.title,
                    amount: String(invoice.amount),
                    status: invoice.status,
                    issueDate: invoice.issueDate,
                    dueDate: invoice.dueDate,
                })
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getEditData();
    }, [id]);

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

            const response = await apiClient(`/invoices/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...formData,
                    clientId: Number(formData.clientId),
                    amount: Number(formData.amount)
                })
            });

            showNotification('success', response.message)
            navigate('/invoices')
        } catch (error) {
            setError(error.message);
            showNotification('error', error.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div className="page-wrapper p-4">Loading invoice...</div>
    }

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
                    Invoice Management
                  </span>
                  <h1 className="fw-bold mb-1">Edit Invoice</h1>
                  <p className="text-secondary mb-0">
                    Update invoice details, payment status, and billing dates.
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
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                    <div className="card-header border-0 bg-white p-4">
                      <div>
                        <h3 className="card-title fw-bold mb-1">
                          Invoice Details
                        </h3>
                        <p className="text-secondary mb-0">
                          Keep this invoice accurate for reporting, payment tracking, and client records.
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
                            {submitting ? "Saving changes..." : "Save Changes"}
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

                  <div className="card border-0 shadow-sm rounded-5 mt-4">
                    <div className="card-body p-4">
                      <h3 className="card-title fw-bold mb-1">Invoice record note</h3>
                      <p className="text-secondary mb-0">
                        Changes made here will update invoice listings, dashboard summaries, and status tracking.
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

export default EditInvoice;
