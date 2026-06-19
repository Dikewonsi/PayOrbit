import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 8000;

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

// Adds secure HTTP headers
app.use(helmet());

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

//Prevent huge payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({
    extended: false,
    limit: '10kb'
}));

// Add cors so frontend and backend can communicate
const allowedOrigins = [
    'http://localhost:5173',
    'https://payorbit.dikewonsi.cloud'
];

app.use(cors({
    origin: allowedOrigins
}));

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', paymentRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

// 404 handler
app.use(notFound);

// GLobal error handler
app.use(errorHandler);


/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});