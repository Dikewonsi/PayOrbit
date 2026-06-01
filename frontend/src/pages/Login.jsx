import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';
import Footer from '../components/Footer';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);

            const response = await apiClient('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            localStorage.setItem('payorbit_token', response.data.token);
            localStorage.setItem('payorbit_admin', JSON.stringify(response.data.admin));

            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <div
  className="min-vh-100 d-flex align-items-center justify-content-center"
  style={{
    background:
      "radial-gradient(circle at top left, rgba(32, 107, 196, 0.22), transparent 35%), linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #ffffff 100%)",
  }}
>
  <div className="container py-5">
    <div className="row justify-content-center align-items-center g-5">
      
      {/* Left Side */}
      <div className="col-lg-5 d-none d-lg-block">
        <div className="mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-4 mb-4 shadow-sm"
            style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, #206bc4, #4dabf7)",
              color: "#fff",
              fontSize: "32px",
              fontWeight: "800",
            }}
          >
            P
          </div>

          <h1 className="display-5 fw-bold mb-3">
            Manage your business money flow with{" "}
            <span className="text-primary">PayOrbit</span>
          </h1>

          <p className="text-secondary fs-4">
            Track clients, invoices, payments, and revenue from one clean dashboard.
          </p>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h3 className="fw-bold mb-1">₦1.2M+</h3>
                <p className="text-secondary mb-0">Invoices tracked</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h3 className="fw-bold mb-1">24+</h3>
                <p className="text-secondary mb-0">Active clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="col-lg-5 col-md-8 col-sm-11">
        <div
          className="card border-0 rounded-5 shadow-lg"
          style={{
            backdropFilter: "blur(18px)",
            background: "rgba(255, 255, 255, 0.88)",
          }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4 d-lg-none">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "62px",
                  height: "62px",
                  background: "linear-gradient(135deg, #206bc4, #4dabf7)",
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: "800",
                }}
              >
                P
              </div>

              <h1 className="fw-bold mb-1">
                Pay<span className="text-primary">Orbit</span>
              </h1>

              <p className="text-secondary mb-0">
                Manage clients and invoices from one dashboard.
              </p>
            </div>

            <div className="mb-4">
              <span className="badge bg-primary-lt text-primary mb-3 px-3 py-2 rounded-pill">
                Admin access
              </span>

              <h2 className="fw-bold mb-1">Welcome back</h2>
              <p className="text-secondary mb-0">
                Sign in to continue managing your workspace.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger rounded-4 border-0" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                  placeholder="admin@email.com"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group input-group-lg shadow-sm rounded-4 overflow-hidden">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0"
                    placeholder="Enter your password"
                    autoComplete="off"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-light border-0 px-3"
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <br />

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-4 fw-bold shadow-sm"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="text-center mt-4">
              <small className="text-secondary">
                Protected admin workspace for PayOrbit.
              </small>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
    <Footer />
    </>
  );
}

export default Login;
