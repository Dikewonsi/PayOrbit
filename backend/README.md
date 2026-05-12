# PayOrbit Backend

Express API service for PayOrbit. This backend is currently wired as the application entry point with shared middleware, route mounting, and centralized error handling.

## Tech Stack

- Node.js
- Express
- Helmet
- ES modules

## Getting Started

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Run in watch mode with environment variables loaded from `.env`:

```bash
npm run dev
```

By default, the API runs on port `8000` unless `PORT` is set in the environment.

## Current API Structure

The server mounts the main route groups under these base paths:

- `/api/auth`
- `/api/clients`
- `/api/invoices`
- `/api/dashboard`

Each route file currently exports an Express router as its default export. Endpoint handlers can be added inside the matching route module as controllers and services are implemented.

## Project Structure

```text
backend/
  middleware/
    errorHandler.js
    notFound.js
  routes/
    authRoutes.js
    clientRoutes.js
    dashboardRoutes.js
    invoiceRoutes.js
  package.json
  server.js
```

## Middleware

`server.js` configures the shared middleware used by every API route:

- `helmet()` for secure HTTP headers
- `express.json({ limit: '10kb' })` for JSON request bodies
- `express.urlencoded({ extended: false, limit: '10kb' })` for form-encoded payloads
- `notFound` for unmatched routes
- `errorHandler` for consistent JSON error responses

## Development Notes

- Keep route modules focused on routing and delegate business logic to controllers or services.
- Keep `.env` out of version control.
- Keep `node_modules` out of version control; dependencies should be restored with `npm install`.
