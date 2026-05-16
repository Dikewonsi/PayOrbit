import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import invoiceController from '../controllers/invoiceController.js';

const invoiceRoutes = express.Router();

invoiceRoutes.use(authMiddleware);

invoiceRoutes.get('/', invoiceController.getInvoices);
invoiceRoutes.get('/:id', invoiceController.getInvoice);
invoiceRoutes.post('/', invoiceController.createInvoice);
invoiceRoutes.put('/:id', invoiceController.updateInvoice);
invoiceRoutes.delete('/:id', invoiceController.deleteInvoice);

export default invoiceRoutes;