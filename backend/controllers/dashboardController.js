import dashboardService  from "../services/dashboardService.js";

const getDashboard = ( req, res, next ) => {
    try {
        const summary = dashboardService.getDashboardSummary();

        res.status(200).json({
            success:true,
            message: 'Dashboard summary retrieved successfully',
            data: summary
        })
    } catch (error) {
        next(error);
    }
};

export default {
    getDashboard
};