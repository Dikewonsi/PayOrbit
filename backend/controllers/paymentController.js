import paymentService from "../services/paymentService.js";

const generateRemitaPayment = async (req, res, next) => {
    try {
        const payment = await paymentService.generateRemitaPayment(req.params.id);

        res.status(201).json({
            success: true,
            message: 'Demo Remita payment generated successfully',
            data: {
                payment
            }
        });
    } catch (error) {
        next(error);
    }
};

const getRemitaPaymentStatus = async (req, res, next) => {
    try {
        const payment = await paymentService.getRemitaPaymentStatus(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Demo Remita payment status retrieved successfully',
            data: {
                payment
            }
        });
    } catch (error) {
        next(error);
    }
};

const handleRemitaWebhook = async (req, res, next) => {
    try {
        const payment = await paymentService.handleRemitaWebhook(req.body);

        res.status(200).json({
            success: true,
            message: 'Demo Remita webhook processed successfully',
            data: {
                payment
            }
        });
    } catch (error) {
        next(error);
    }
};

export default {
    generateRemitaPayment,
    getRemitaPaymentStatus,
    handleRemitaWebhook
};