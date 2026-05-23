import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';


function CreateInvoice() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientId: '',
    invoiceNumber: '',
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

      await apiClient('/invoices', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          clientId: Number(formData.clientId),
          amount: Number(formData.amount)
        })
      });

      navigate('/invoices');
    } catch (error) {
      setError(error.message);
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
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title">Create Invoice</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Invoice Details</h3>
            </div>

            <div className="card-body">
              {error && (
                <div className='alert alert-danger'>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Client</label>
                    <select 
                      required
                      name="clientId"
                      value={formData.clientId}
                      onChange={handleChange}
                      className="form-select">
                      <option value="">Select client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} - {client.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Invoice Number</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="INV-001"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Title</label>
                    <input
                      required
                      type='text'
                      name="title"
                      className="form-control"
                      placeholder="Web Design"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Amount</label>
                    <input
                      required
                      type="number"
                      name="amount"
                      className="form-control"
                      placeholder="5000"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Status</label>
                    <select 
                      required
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Issue Date</label>
                    <input
                      required
                      type="date" 
                      name='issueDate'
                      className="form-control"
                      value={formData.issueDate}
                      onChange={handleChange}  
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Due Date</label>
                    <input
                      required
                      type="date" 
                      name='dueDate'
                      className="form-control"
                      value={formData.dueDate}
                      onChange={handleChange}  
                    />
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3 px-0 pb-0">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create Invoice'}
                  </button>
                  <button 
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate('/invoices')}>
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

export default CreateInvoice;