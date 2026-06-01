import pool from '../config/db.js';

const getDashboardSummary = async () => {

    const totalClientsResult = await pool.query(
        `SELECT COUNT(*)::int AS count
        FROM clients`
    );

    const totalInvoicesResult = await pool.query(
        `SELECT COUNT(*)::int AS count
        FROM invoices`
    );

    const paidInvoiceResult = await pool.query(
        `SELECT COUNT(*)::int AS count
        FROM invoices
        WHERE status = 'paid'`
    );

    const unpaidInvoiceResult = await pool.query(
        `SELECT COUNT(*)::int AS count
        FROM invoices
        WHERE status = 'unpaid'
        `
    );

    const totalRevenueResult = await pool.query(
        `
            SELECT COALESCE(SUM(amount), 0)::int AS total
            FROM invoices
            WHERE status = 'paid'
        `
    )

    const recentInvoicesResult = await pool.query(`
        SELECT
            id,
            client_id AS "clientId",
            invoice_number AS "invoiceNumber",
            title,
            amount,
            status,
            TO_CHAR(issue_date, 'YYYY-MM-DD') AS "issueDate",
            TO_CHAR(due_date, 'YYYY-MM-DD') AS "dueDate"
        FROM invoices
        ORDER BY issue_date DESC
        LIMIT 6
    `);

    return {
        totalClients: totalClientsResult.rows[0].count,
        totalInvoices: totalInvoicesResult.rows[0].count,
        paidInvoices: paidInvoiceResult.rows[0].count,
        unpaidInvoices: unpaidInvoiceResult.rows[0].count,
        totalRevenue: totalRevenueResult.rows[0].total,
        recentInvoices: recentInvoicesResult.rows
    };
};

export default {
    getDashboardSummary
};