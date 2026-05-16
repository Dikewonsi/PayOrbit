import invoiceService from '../services/invoiceService.js';

const getInvoices = ( req, res, next ) => {
    try {
        const invoices = invoiceService.getAllInvoices();

        res.status(200).json({
            message: 'Invoices retrieved successfully',
            count: invoices.length,
            invoices
        });
    } catch (error) {
        next(error);
    }
};

const getInvoice = ( req, res, next ) => {
    try {
        const invoice = invoiceService.getInvoiceById(req.params.id);

        res.status(200).json({
            message: 'Invoice retrieved successfully',
            invoice
        });
    } catch (error) {
        next(error);
    }
};

const createInvoice = ( req, res, next ) => {
    try {
        const invoice = invoiceService.createInvoice(req.body);

        res.status(201).json({
            message: 'Invoice created successfully',
            invoice
        })
    } catch (error) {
        next(error)
    }
};

const updateInvoice = ( req, res, next ) => {
    try {
        const invoice = invoiceService.updateInvoice(req.params.id, req.body);

        res.status(200).json({
            message: 'Invoice updated successfully',
            invoice
        })
    } catch (error) {
        next(error)
    }
};

const deleteInvoice = ( req, res, next ) => {
    try {
        const invoice = invoiceService.deleteInvoice(req.params.id);
        
        res.status(200).json({
            message: 'Invoice deleted successfully',
            invoice
        })
    } catch (error) {
        next(error);
    }    
};

export default {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
};