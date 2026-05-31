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
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title">Create Client</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Client Information</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Manhattan, New York"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date Added</label>
                    <input
                      type="date"
                      name="dateAdded"
                      className="form-control"
                      placeholder="Acme Inc."
                      value={formData.dateAdded}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3 px-0 pb-0">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Client'}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-link"
                    onClick={() => navigate('/clients')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateClient;