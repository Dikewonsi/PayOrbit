import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';
import { useNotification } from '../context/NotificationContext';


function CreateClient() {

  const navigate = useNavigate();
  const { showNotification } = useNotification();
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    dateAdded: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setLoading(true);

      const response = await apiClient('/clients', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      showNotification('success', response.message)
      navigate('/clients');
    } catch (error) {
      setError(error.message);
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
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
                Client Management
              </span>

              <h1 className="fw-bold mb-1">Create Client</h1>

              <p className="text-secondary mb-0">
                Add a new client profile to your PayOrbit workspace.
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
          <div className="row justify-content-center g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                <div className="card-header border-0 bg-white p-4">
                  <div>
                    <h3 className="card-title fw-bold mb-1">
                      Client Information
                    </h3>

                    <p className="text-secondary mb-0">
                      Fill in the client details below.
                    </p>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
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
                        <label className="form-label fw-semibold">
                          Date Added
                        </label>

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
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Client"}
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

                  <h3 className="fw-bold mb-2">New client setup</h3>

                  <p className="text-secondary mb-4">
                    Complete client details help you create cleaner invoices and
                    maintain better billing records.
                  </p>

                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      1
                    </span>
                    <span className="text-secondary">
                      Add client contact details
                    </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      2
                    </span>
                    <span className="text-secondary">
                      Save the client profile
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary-lt text-primary rounded-pill me-2">
                      3
                    </span>
                    <span className="text-secondary">
                      Create invoices for this client
                    </span>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-5 mt-4">
                <div className="card-body p-4">
                  <div className="small text-uppercase text-secondary mb-2">
                    Required Fields
                  </div>

                  <h3 className="fw-bold mb-2">Name & Email</h3>

                  <p className="text-secondary mb-0">
                    These two fields should stay required so every client has a
                    proper identity and contact record.
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

export default CreateClient;