import {
    cleanCart,
    createCart,
    deleteProductInCart,
    getCart,
    getCartById,
    saveProductToCart,
    updateCart,
    updateQuantityInCart,
    generateOrder
} from "../persistance/daos/mongodb/cartDaoMongo.js";
import { logger } from "../utils/logger.js";

const executeService = async (func, ...args) => {
    try {
        const result = await func(...args);
        return result;
    } catch (error) {
        logger.error ('Error Cart Service:', error);
    }
};

export const getCartService = async () => {
    return executeService(getCart);
};

export const getCartByIdService = async (id) => {
    const cart = await executeService(getCartById, id);
    return cart || false;
};

export const createCartService = async () => {
    const cart = await executeService(createCart);
    return cart || false;
};

export const saveProductToCartService = async (id, productId) => {
    return executeService(saveProductToCart, id, productId);
};

export const deleteProductInCartService = async (id, productId) => {
    return executeService(deleteProductInCart, id, productId);
};

export const cleanCartService = async (id) => {
    return executeService(cleanCart, id);
};

export const updateQuantityInCartService = async (id, productId, quantity) => {
    return executeService(updateQuantityInCart, id, productId, quantity);
};

export const updateCartService = async (id, obj) => {
    return executeService(updateCart, id, obj);
};

export const generateOrderService = async (userID, cartID) => {
    const order = await executeService(generateOrder, userID, cartID);
    return order || false;
};
