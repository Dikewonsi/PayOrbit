import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import dashboardController from '../controllers/dashboardController.js';


const dashboardRoutes = express.Router();

dashboardRoutes.get('/', authMiddleware, dashboardController.getDashboard);

export default dashboardRoutes;