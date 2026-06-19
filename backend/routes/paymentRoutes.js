import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import paymentController from '../controllers/paymentController.js';

const paymentRoutes = express.Router();

paymentRoutes.post(
    '/invoices/:id/payments/remita/generate',
    authMiddleware,
    paymentController.generateRemitaPayment
);

paymentRoutes.get(
    '/invoices/:id/payments/remita/status',
    authMiddleware,
    paymentController.getRemitaPaymentStatus
);

paymentRoutes.post(
    '/payments/remita/webhook',
    paymentController.handleRemitaWebhook
);

export default paymentRoutes;