function CreateClient() {
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
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label required">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3 px-0 pb-0">
                  <button type="submit" className="btn btn-primary">
                    Create Client
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

export default CreateClient;