import invoiceService from '../services/invoiceService.js';

const getInvoices =  async( req, res, next ) => {
    try {
        const invoices = await invoiceService.getAllInvoices();

        res.status(200).json({
            success: true,
            message: 'Invoices retrieved successfully',
            data: {
                count: invoices.length,
                invoices
            }
        });
    } catch (error) {
        next(error);
    }
};

const getInvoice = async ( req, res, next ) => {
    try {
        const invoice = await invoiceService.getInvoiceById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Invoice retrieved successfully',
            data: {
                invoice
            }
        });
    } catch (error) {
        next(error);
    }
};

const createInvoice = async ( req, res, next ) => {
    try {
        const invoice = await invoiceService.createInvoice(req.body);

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            data: {
                invoice
            }
        })
    } catch (error) {
        next(error)
    }
};

const updateInvoice = async ( req, res, next ) => {
    try {
        const invoice = await invoiceService.updateInvoice(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Invoice updated successfully',
            data: {
                invoice
            }
        })
    } catch (error) {
        next(error)
    }
};

const deleteInvoice = async ( req, res, next ) => {
    try {
        const invoice = await invoiceService.deleteInvoice(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Invoice deleted successfully',
            data: {
                invoice
            }
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