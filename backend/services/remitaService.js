const isMockMode = () =>  process.env.REMITA_MOCK_MODE === 'true';

const getEnvironment = () => process.env.REMITA_ENVIRONMENT || 'demo';

const generateReferencePart = () => {
    return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
};

const generateDemoPayment = async (invoice) => {
    if(!isMockMode()) {
        const error = new Error('Live Remita mode is not configured yet');
        error.status = 501;
        throw error;
    }

    const orderRef = `DEMO-ORDER-${generateReferencePart()}`;
    const rrr = `DEMO-RRR-${generateReferencePart()}`;
    const baseUrl = process.env.REMITA_DEMO_PAYMENT_BASE_URL || 'https://demo.remita.net/payment';

    return {
        provider: 'remita',
        environment: getEnvironment(),
        orderRef,
        rrr,
        status: 'pending',
        paymentUrl: `${baseUrl}?rrr=${rrr}&orderRef=${orderRef}`,
        rawResponse: {
            mock: true,
            invoiceId: invoice.id,
            orderRef,
            rrr,
            amount: invoice.amount,
            status: 'pending'
        }
    }
};

const isSuccessfulWebhook = (payload) => {
    const status = String(
        payload.status ||
        payload.paymentStatus ||
        payload.transactionStatus ||
        payload.statusCode ||
        ''
    ).toLowerCase();

    return ['paid', 'success', 'successful', 'approved', '00'].includes(status);
};

export default {
    generateDemoPayment,
    isSuccessfulWebhook
};