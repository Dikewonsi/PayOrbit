# PayOrbit Frontend

React/Vite frontend for the PayOrbit invoice and client management interface.

## Tech Stack

- React
- React Router
- Vite
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Current Routes

The app uses React Router with a shared `MainLayout` for authenticated application pages.

- `/login` - login page
- `/` - redirects to `/dashboard`
- `/dashboard` - dashboard overview
- `/clients` - client list
- `/clients/create` - create client page
- `/invoices` - invoice list
- `/invoices/create` - create invoice page

## Project Structure

```text
frontend/
  public/
    favicon.svg
    icons.svg
  src/
    components/
      Navbar.jsx
    layouts/
      MainLayout.jsx
    pages/
      Clients.jsx
      CreateClient.jsx
      CreateInvoice.jsx
      Dashboard.jsx
      Invoices.jsx
      Login.jsx
    App.jsx
    main.jsx
  package.json
  vite.config.js
```

## Application Notes

- `src/App.jsx` owns the route configuration.
- `src/layouts/MainLayout.jsx` wraps the main application pages and renders the navigation.
- `src/components/Navbar.jsx` contains the PayOrbit navigation links and active route styling.
- Page-level UI belongs in `src/pages`.
- Static assets belong in `public` when they need stable public URLs, or `src/assets` when they are imported by components.
