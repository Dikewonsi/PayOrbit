import clientService from '../services/clientService.js';

const getClients =( req, res, next ) => {
    try {
        const clients = clientService.getAllClients();

        res.status(200).json({
            success: true,
            message: 'Clients retrieved successfully',
            data: {
                count: clients.length,
                clients
            }
        });
    } catch (error) {
        next(error)
    }
};

const getClient = ( req, res, next ) => {
    try {
        const client = clientService.getClientById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Client retrieved successfully',
            data: {
                client
            }
        });
    } catch(error) {
        next(error)
    }
};

const createClient = ( req, res, next ) => {
    try {
        const client = clientService.createClient(req.body);

        res.status(201).json({
            success: true,
            message: 'Client created successfuly',
            data: {
                client
            }
        })
    } catch (error) {
        next(error)
    }
};

const updateClient = ( req, res, next ) => {
    try {
        const client = clientService.updateClient(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Client updated successfuly',
            data: {
                client
            }
        });
    } catch (error) {
        next(error)
    }
};

const deleteClient = ( req, res, next ) => {
    try {
        const client = clientService.deleteClient(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Client deleted successfully',
            data: {
                client
            }
        })
    } catch (error) {
        next(error);
    }
};

export default {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};