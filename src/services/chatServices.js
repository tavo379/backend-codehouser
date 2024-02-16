import { createChat, getChat } from "../daos/mongodb/chatDao.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
    logger.error('Error Chat Services:', error);
    throw error;
};


export const getChatService = async () => {
    try {
        return await getChat();
    } catch (error) {
        logError(error);
    }
}

export const createService = async (obj) => {
    try {
        const message = {
            user: obj.username,
            message: obj.message
        };
        return await createChat(message);
    } catch (error) {
        logError(error);
    }
}
