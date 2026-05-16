import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import clientController from '../controllers/clientController.js';

const clientRoutes = express.Router();

clientRoutes.use(authMiddleware);

clientRoutes.get('/', clientController.getClients);
clientRoutes.get('/:id', clientController.getClient);
clientRoutes.post('/', clientController.createClient);
clientRoutes.put('/:id', clientController.updateClient);
clientRoutes.delete('/:id', clientController.deleteClient);


export default clientRoutes;