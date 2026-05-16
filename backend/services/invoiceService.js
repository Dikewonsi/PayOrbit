import mockDb from '../models/mockDb.js';

const getAllInvoices = () => {
    return mockDb.invoices;
};

const getInvoiceById = (id) => {
    const invoiceId = Number(id);

    //find invoice where invoice id is equal to param id
    const invoice = mockDb.invoices.find((invoice) => invoice.id === invoiceId);

    if (!invoice) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }

    return invoice
};

const createInvoice = (invoiceData) => {
    const {
        clientId,
        invoiceNumber,
        title,
        amount,
        status,
        issueDate,
        dueDate
    } = invoiceData;

    // Run basic validation
    if(
        !clientId ||
        !invoiceNumber ||
        !title ||
        !amount ||
        !status ||
        !issueDate ||
        !dueDate
    ) {
        const error = new Error(
            'All invoice fields are required'
        );

        error.status = 400;
        throw error;
    }

    // PRepare new invoice insert
    const newInvoice = {
        id: mockDb.invoices.length + 1,
        clientId,
        invoiceNumber,
        title,
        amount,
        status,
        issueDate,
        dueDate
    };

    // Save to mock DB
    mockDb.invoices.push(newInvoice);

    return newInvoice;
}

const updateInvoice = (id, invoiceData) => {
    const invoice = getInvoiceById(id);

    invoice.clientId = invoiceData.clientId || invoice.clientId; 
    invoice.invoiceNumber = invoiceData.invoiceNumber || invoice.invoiceNumber;
    invoice.title = invoiceData.title || invoice.title;
    invoice.amount = invoiceData.amount || invoice.amount;
    invoice.status = invoiceData.status || invoice.status;
    invoice.issueDate = invoiceData.issueDate || invoice.issueDate;
    invoice.dueDate = invoiceData.dueDate || invoice.dueDate;

    return invoice;
}

const deleteInvoice = (id) => {
    const invoiceId = Number(id);

    const invoiceIndex = mockDb.invoices.findIndex((invoice) => invoice.id === invoiceId);

    if(invoiceIndex === -1) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }

    const deletedInvoice = mockDb.invoices.splice(invoiceIndex, 1);

    return deletedInvoice[0];
};

export default {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
};