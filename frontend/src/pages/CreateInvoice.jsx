function CreateInvoice() {
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
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Client</label>
                    <select className="form-select">
                      <option>Select client</option>
                      <option>John Doe</option>
                      <option>Acme Corp</option>
                      <option>Bright Media Ltd</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Invoice Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="INV-001"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="5000"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Status</label>
                    <select className="form-select">
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Due Date</label>
                    <input type="date" className="form-control" />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Optional invoice notes..."
                    ></textarea>
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3 px-0 pb-0">
                  <button type="submit" className="btn btn-primary">
                    Create Invoice
                  </button>
                  <button type="button" className="btn btn-link">
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