import React from "react";
import { NavLink } from "react-router-dom";

const icons = {
  dashboard: (
    <>
      <path d="M4 4h6v8h-6z" />
      <path d="M4 16h6v4h-6z" />
      <path d="M14 12h6v8h-6z" />
      <path d="M14 4h6v4h-6z" />
    </>
  ),
  clients: (
    <>
      <path d="M9 7a4 4 0 1 0 0 8a4 4 0 0 0 0 -8" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </>
  ),
  createClient: (
    <>
      <path d="M8 7a4 4 0 1 0 0 8a4 4 0 0 0 0 -8" />
      <path d="M2 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M19 8v6" />
      <path d="M16 11h6" />
    </>
  ),
  invoices: (
    <>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M9 9h1" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </>
  ),
  createInvoice: (
    <>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </>
  ),
  logout: (
    <>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-5a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12" />
      <path d="M18 9l3 3l-3 3" />
    </>
  ),
};

function NavIcon({ name }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="icon icon-1"
    >
      {icons[name]}
    </svg>
  );
}

function Navbar() {
  return (
    <>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink to="/dashboard" className="navbar-brand navbar-brand-autodark pe-0 pe-md-3">
            <span className="fw-bold text-primary">PayOrbit</span>
          </NavLink>

          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a href="#" className="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown">
                <span className="avatar avatar-sm">PO</span>
                <div className="d-none d-xl-block ps-2">
                  <div>Admin User</div>
                  <div className="mt-1 small text-secondary">Administrator</div>
                </div>
              </a>

              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <NavLink className="dropdown-item" to="/dashboard">
                  <NavIcon name="dashboard" />
                  Dashboard
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item" to="/login">
                  <NavIcon name="logout" />
                  Sign out
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <NavIcon name="dashboard" />
                    </span>
                    <span className="nav-link-title">Dashboard</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/clients"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <NavIcon name="clients" />
                    </span>
                    <span className="nav-link-title">Clients</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/clients/create"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <NavIcon name="createClient" />
                    </span>
                    <span className="nav-link-title">Create Client</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/invoices"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <NavIcon name="invoices" />
                    </span>
                    <span className="nav-link-title">Invoices</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/invoices/create"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <NavIcon name="createInvoice" />
                    </span>
                    <span className="nav-link-title">Create Invoice</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
