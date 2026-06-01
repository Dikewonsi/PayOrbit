# PayOrbit

PayOrbit is a full-stack invoice and client management application built with React, Express, and PostgreSQL. It gives an admin user a clean dashboard for tracking clients, invoices, invoice status, due dates, and revenue summaries.

Live demo: `https://payorbit.dikewonsi.cloud`

## Features

- Admin login with JWT authentication
- Protected dashboard routes
- Client create, read, update, and delete workflows
- Invoice create, read, update, and delete workflows
- Dashboard summary backed by PostgreSQL data
- Invoice status tracking for paid, unpaid, and overdue records
- Global success and error notifications
- Responsive Tabler-based UI
- Production deployment with Nginx, PM2, SSL, and PostgreSQL

## Tech Stack

### Frontend

- React
- React Router
- Vite
- Tabler UI assets

### Backend

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens
- Helmet
- CORS
- PM2 for process management

## Project Structure

```text
PayOrbit/
  backend/
    config/
    controllers/
    middleware/
    routes/
    services/
    server.js
    package.json

  frontend/
    public/
    src/
      api/
      components/
      context/
      layouts/
      pages/
    index.html
    package.json
```

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

## Environment Variables

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

If `.env.example` is not present yet, create `backend/.env` with:

```env
PORT=8000
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=1d
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payorbit
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

Create frontend environment files:

```env
# frontend/.env.development
VITE_API_BASE_URL=http://localhost:8000/api
```

```env
# frontend/.env.production
VITE_API_BASE_URL=https://payorbit.dikewonsi.cloud/api
```

Do not commit real `.env` files.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Running Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Frontend local URL:

```text
http://localhost:5173
```

Backend local API:

```text
http://localhost:8000/api
```

## Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

The production build is generated in:

```text
frontend/dist
```

Start the backend in production:

```bash
cd backend
npm start
```

With PM2:

```bash
cd backend
pm2 start npm --name payorbit-api -- start
pm2 save
```

## VPS Deployment Overview

PayOrbit is designed to run on a VPS with:

- Nginx serving `frontend/dist`
- Nginx reverse proxying `/api` to the Express backend
- PM2 keeping the backend process alive
- PostgreSQL running on the server
- SSL enabled for the domain

Example Nginx route structure:

```nginx
location / {
    try_files $uri /index.html;
}

location /api/ {
    proxy_pass http://127.0.0.1:8000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## API Routes

Base API path:

```text
/api
```

Main route groups:

- `/api/auth`
- `/api/clients`
- `/api/invoices`
- `/api/dashboard`

## Security Notes

- Passwords are hashed with bcrypt
- Authentication uses JWT
- Protected routes require a bearer token
- Helmet adds common secure HTTP headers
- CORS is restricted to local development and the production domain
- Environment files are ignored by Git

## What This Project Demonstrates

- Full-stack application architecture
- REST API design with controllers and services
- PostgreSQL integration
- Authentication and protected frontend routes
- Production deployment workflow
- Environment-based configuration
- User feedback through success and error notifications
- Responsive dashboard UI development

## Future Improvements

- Add Docker and Docker Compose
- Add GitHub Actions for CI checks
- Add automated tests for services and API routes
- Add database migrations and seed scripts
- Add API documentation with request and response examples
- Add search and filtering for clients and invoices
- Add invoice PDF export
- Add role-based access control

## Author

Developed by Dikewonsi.
