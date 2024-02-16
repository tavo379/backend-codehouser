import { logger } from "../utils/logger.js";
const logError = (error) => {
    logger.error('Error Auth Midleware:', error);
    throw error;
};

export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        const error = encodeURIComponent('Unauthorized. Please log in.');
        res.redirect(`/login?error=${error}`);
        logError(error);
    }
};
