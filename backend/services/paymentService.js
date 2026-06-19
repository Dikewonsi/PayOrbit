import pool from '../config/db.js';
import remitaService from './remitaService.js';

const paymentSelect = `
    SELECT
        id,
        invoice_id AS "invoiceId",
        provider,
        environment,
        order_ref AS "orderRef",
        rrr,
        amount,
        status,
        payment_url AS "paymentUrl",
        raw_provider_response AS "rawProviderResponse",
        paid_at AS "paidAt",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    FROM invoice_payments
`;

const getInvoiceById = async (invoiceId) => {
    const result = await pool.query(
        `
            SELECT 
                id,
                client_id AS "clientId",
                invoice_number AS "invoiceNumber",
                title,
                amount,
                status
            FROM invoices
            WHERE id = $1  
        `,
        [invoiceId]
    );

    const invoice = result.rows[0];

    if(!invoice) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }

    return invoice;
};

const getLatestRemitaPaymentByInvoiceId = async (invoiceId) => {
    const result = await pool.query(
        `
            ${paymentSelect}
            WHERE invoice_id = $1
            AND provider = 'remita'
            ORDER BY id DESC
            LIMIT 1
        `,
        [invoiceId]
    );

    return result.rows[0];
};


const generateRemitaPayment = async (invoiceId) => {
    const invoice = await getInvoiceById(invoiceId);

    if(invoice.status === 'paid') {
        const error = new Error('Invoice is already paid');
        error.status = 400;
        throw error;
    }

    const remitaPayment = await remitaService.generateDemoPayment(invoice);

    const result = await pool.query(
        `
            INSERT INTO invoice_payments (
                invoice_id,
                provider,
                environment,
                order_ref,
                rrr,
                amount,
                status,
                payment_url,
                raw_provider_response
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING
                id,
                invoice_id AS "invoiceId",
                provider,
                environment,
                order_ref AS "orderRef",
                rrr,
                amount,
                status,
                payment_url AS "paymentUrl",
                raw_provider_response AS "rawProviderResponse",
                paid_at AS "paidAt",
                created_at AS "createdAt",
                updated_at AS "updatedAt"
        `,
        [
            invoice.id,
            remitaPayment.provider,
            remitaPayment.environment,
            remitaPayment.orderRef,
            remitaPayment.rrr,
            invoice.amount,
            remitaPayment.status,
            remitaPayment.paymentUrl,
            remitaPayment.rawResponse
        ]
    );

    return result.rows[0];
};

const getRemitaPaymentStatus = async (invoiceId) => {
    await getInvoiceById(invoiceId);

    const payment = await getLatestRemitaPaymentByInvoiceId(invoiceId);

    if(!payment) {
        const error = new Error('Remita payment not found for this invoice');
        error.status = 404;
        throw error;
    }

    return payment;
};

const handleRemitaWebhook = async (payload) => {
    const orderRef = payload.orderRef || payload.order_ref || payload.orderId;
    const rrr = payload.rrr || payload.RRR || payload.paymentReference;

    if(!orderRef && !rrr) {
        const error = new Error('Webhook payload must include orderRef or rrr');
        error.status = 400;
        throw error;
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const paymentResult = await client.query(
            `
                ${paymentSelect}
                WHERE provider = 'remita'
                AND (
                    order_ref = $1
                    OR rrr = $2
                )
                LIMIT 1
            `,
            [orderRef || null, rrr || null]
        );

        const payment = paymentResult.rows[0];

        if(!payment) {
            const error = new Error('Matching payment not found');
            error.status = 404;
            throw error;
        }

        const isSuccessful = remitaService.isSuccessfulWebhook(payload);
        const nextStatus = isSuccessful ? 'paid' : payment.status;

        const updatedPaymentResult = await client.query(
            `
                UPDATE invoice_payments
                SET
                    status = $1::varchar,
                    raw_provider_response = $2::jsonb,
                    paid_at = CASE
                        WHEN $1::varchar = 'paid' THEN COALESCE(paid_at, CURRENT_TIMESTAMP)
                        ELSE paid_at
                    END,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $3
                RETURNING
                    id,
                    invoice_id AS "invoiceId",
                    provider,
                    environment,
                    order_ref AS "orderRef",
                    rrr,
                    amount,
                    status,
                    payment_url AS "paymentUrl",
                    raw_provider_response AS "rawProviderResponse",
                    paid_at AS "paidAt",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
            `,
            [nextStatus, JSON.stringify(payload), payment.id]
        );

        if (isSuccessful) {
            await client.query(
                `
                    UPDATE invoices
                    SET status = 'paid'
                    WHERE id = $1
                `,
                [payment.invoiceId]
            );
        }

        await client.query('COMMIT');

        return updatedPaymentResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export default {
    generateRemitaPayment,
    getRemitaPaymentStatus,
    handleRemitaWebhook
};
