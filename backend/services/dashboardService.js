import mockDb from '../models/mockDb.js';

const getDashboardSummary = () => {
    const totalClients = mockDb.clients.length;
    const totalInvoices = mockDb.invoices.length;

    const paidInvoices = mockDb.invoices.filter((invoice) => {
        return invoice.status === 'paid';
    });

    const unpaidInvoices = mockDb.invoices.filter((invoice) => {
        return invoice.status === 'unpaid';
    });

    const totalRevenue = paidInvoices.reduce((total, invoice) => {
        return total + invoice.amount;
    }, 0);

    // sorts invoices from newest to oldest
    const recentInvoices = [...mockDb.invoices]
        .sort((a, b) => {
            return new Date(b.issueDate) - new Date(a.issueDate);
        })
        .slice(0, 5);

    return {
        totalClients,
        totalInvoices,
        paidInvoices: paidInvoices.length,
        unpaidInvoices: unpaidInvoices.length,
        totalRevenue,
        recentInvoices
    };
};

export default {
    getDashboardSummary
};