import {
	  Route,
	  createBrowserRouter,
	  createRoutesFromElements,
	  Navigate,
	  RouterProvider
	} from 'react-router-dom'

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from './components/ProtectedRoute';
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import CreateClient from "./pages/CreateClient";
import EditInvoice from './pages/EditInvoice';
import EditClient from "./pages/EditClient";

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/create" element={<CreateInvoice />} />
                <Route path="/invoices/:id/edit" element={<EditInvoice />} />
                <Route path="/clients/create" element={<CreateClient />} />
                <Route path="/clients/:id/edit" element={<EditClient />} />
            </Route>
          </Route>
        </>
        
      )
    );

    return <RouterProvider router={router} />;
}

export default App;
