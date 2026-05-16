import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Dashboard route is protected',
        user: req.user
    });
});

export default dashboardRoutes;