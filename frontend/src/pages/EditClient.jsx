import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';

function EditClient() {

    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        dateAdded: ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getClient = async () => {
            try {
                const response = await apiClient(`/clients/${id}`);
                const client = response.data.client;

                setFormData({
                    name: client.name,
                    email: client.email,
                    phone: client.phone,
                    company: client.company,
                    address: client.address,
                    dateAdded: client.dateAdded
                })
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getClient();
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

            const response = await apiClient(`/clients/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData)
            });

            showNotification('success', response.message);
            navigate('/clients');
        } catch (error) {
            setError(error.message);
            showNotification('error', error.message);
        } finally {
            setSubmitting(false);
        }
    }

    if(loading) {
        return <div className="page-wrapper p-4">Loading Client...</div>;
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
                    Client Management
                  </span>
                  <h1 className="fw-bold mb-1">Edit Client</h1>
                  <p className="text-secondary mb-0">
                    Update client contact details and billing information.
                  </p>
                </div>

                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-white rounded-4 shadow-sm"
                    onClick={() => navigate("/clients")}
                  >
                    Back to clients
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
                          Client Information
                        </h3>
                        <p className="text-secondary mb-0">
                          Keep this information accurate for invoices and client records.
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
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold required">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              placeholder="+234 800 000 0000"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Company</label>
                            <input
                              type="text"
                              name="company"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              placeholder="Acme Inc."
                              value={formData.company}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              placeholder="Manhattan, New York"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Date Added</label>
                            <input
                              type="date"
                              name="dateAdded"
                              className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                              value={formData.dateAdded}
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
                            onClick={() => navigate("/clients")}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="card border-0 shadow-sm rounded-5 mt-4">
                    <div className="card-body p-4">
                      <h3 className="card-title fw-bold mb-1">Client record note</h3>
                      <p className="text-secondary mb-0">
                        Changes made here will reflect across client listings and invoice records.
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

export default EditClient;