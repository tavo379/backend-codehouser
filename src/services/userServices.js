import { generateToken } from "../jwt/auth.js";
import {
    registerUser,
    loginUser,
    getAll,
    createUsersMock,
    getUsersMocks,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import { getByIdDTO } from "../persistance/repository/user.repository.js";
import { logger } from "../utils/logger.js";
import { UserModel } from "../persistance/daos/mongodb/models/userModel.js";

const handleServiceError = (error) => {
    logger.error('Error User Services:', error);
};

export const registerUserService = async (users) => {
    try {
        return await registerUser(users);
    } catch (error) {
        handleServiceError(error);
    }
};

export const loginUserServices = async (users) => {
    try {
        console.log('Contenido de users en loginUserService:', users);
        const userExist = await loginUser(users);
        return userExist ? generateToken(userExist) : false;
    } catch (error) {
        console.log('Contenido de users en loginUserService en le catch:', users);
        handleServiceError(error);
    }
};

export const getAllService = async () => {
    try {
        const cart = await getAll();
        return cart || false;
    } catch (error) {
        handleServiceError(error);
    }
};

export const currentUserResDTOService = async (id) => {
    try {
        const response = await getByIdDTO(id);
        return response || false;
    } catch (error) {
        handleServiceError(error);
    }
};

// MOCKS //

export const createUsersMockService = async (user) => {
    try {
        return await createUsersMock(users);
    } catch (error) {
        handleServiceError(error);
    }
};

export const getUsersMocksService = async () => {
    try {
        const cart = await getUsersMocks();
        return cart || false;
    } catch (error) {
        handleServiceError(error);
    }
};
