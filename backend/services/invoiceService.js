import pool from '../config/db.js';

const invoiceSelect = `
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
`;

const getAllInvoices = async () => {
    const result = await pool.query(
        `
            ${invoiceSelect}
            ORDER BY id DESC
        `
    );

    return result.rows;
};

const getInvoiceById = async (id) => {
    const result = await pool.query(
        `
            ${invoiceSelect}
            WHERE id = $1
        `,
        [id]
    );

    const invoice = result.rows[0];

    if(!invoice) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }

    return invoice;
}

const generateInvoiceNumber = async () => {
    const result = await pool.query(
        `
            SELECT COUNT(*)::int AS count
            FROM invoices
        `
    );

    const nextInvoiceId = result.rows[0].count + 1;

    return `INV-${String(nextInvoiceId).padStart(3, '0')}`;
};

const createInvoice = async (invoiceData) => {
    const {
        clientId,
        title,
        amount,
        status,
        issueDate,
        dueDate
    } = invoiceData;

    if (!clientId || !title || !amount || !status || !issueDate || !dueDate) {
        const error = new Error('All invoice fields are required');
        error.status = 400;
        throw error;
    }

    const clientResult = await pool.query(
        `SELECT id FROM clients WHERE id = $1`,
        [clientId]
    );

    if(!clientResult.rows[0]) {
        const error = new Error('Client not found');
        error.status=404;
        throw error;
    }

    const invoiceNumber = await generateInvoiceNumber();

    const result = await pool.query(
        `
            INSERT INTO invoices (
                client_id,
                invoice_number,
                title,
                amount,
                status,
                issue_date,
                due_date
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                client_id AS "clientId",
                invoice_number AS "invoiceNumber",
                title,
                amount,
                status,
                issue_date AS "issueDate",
                due_date AS "dueDate"
        `,
        [clientId, invoiceNumber, title, amount, status, issueDate, dueDate]
    );

    return result.rows[0];
}

const updateInvoice = async (id, invoiceData) => {
   const existingInvoice = await getInvoiceById(id);

    const clientId = invoiceData.clientId ?? existingInvoice.clientId;
    const title = invoiceData.title ?? existingInvoice.title;
    const amount = invoiceData.amount ?? existingInvoice.amount;
    const status = invoiceData.status ?? existingInvoice.status;
    const issueDate = invoiceData.issueDate ?? existingInvoice.issueDate;
    const dueDate = invoiceData.dueDate ?? existingInvoice.dueDate;

    const clientResult = await pool.query(
        `
            SELECT id FROM clients WHERE id = $1
        `,
        [clientId]
    );

    if(!clientResult.rows[0]) {
        const error = new Error('Client not found');
        error.status = 400;
        throw error;
    }

    const result = await pool.query(
        `
            UPDATE invoices
            SET
            client_id = $1,
            title = $2,
            amount = $3,
            status = $4,
            issue_date = $5,
            due_date = $6
        WHERE id = $7
        RETURNING
            id,
            client_id AS "clientId",
            invoice_number AS "invoiceNumber",
            title,
            amount,
            status,
            issue_date AS "issueDate",
            due_date AS "dueDate"
        `,
        [clientId, title, amount, status, issueDate, dueDate, id]
    );

    return result.rows[0];
}

const deleteInvoice = async (id) => {
    const result = await pool.query(
        `
            DELETE FROM invoices
            WHERE id = $1
            RETURNING
                id,
                name,
                client_id AS "clientId",
                invoice_number AS "invoiceNumber",
                title,
                amount,
                status,
                issue_date AS "issueDate",
                due_date AS "dueDate"
        `,
        [id]
    );

    const deletedInvoice = result.rows[0];

    if(!deletedInvoice) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }

    return deletedInvoice;
};

export default {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
};