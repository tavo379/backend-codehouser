import * as cartService from '../services/cartServices.js';
import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
    logger.error('Error Cart Controller:', error);
    throw error;
};


const httpResponse = new HttpResponse();

const sendHttpResponse = (res, data, errorMessage) => {
    if (!data) {
        return httpResponse.NotFound(res, errorMessage);
    }
    return httpResponse.Ok(res, data);
};

export const getCart = async (req, res, next) => {
    try {
        const data = await cartService.getCartService();
        sendHttpResponse(res, { 'cart ': data }, error.CART.NOT_FOUND);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await cartService.getCartByIdService(id);
        sendHttpResponse(res, { cart }, error.CART.NOT_FOUND);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const createCart = async (req, res, next) => {
    try {
        const cart = await cartService.createCartService();
        sendHttpResponse(res, { cart }, error.CART.NOT_CREATED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const saveProductToCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const cart = await cartService.saveProductToCartService(id, productId);
        sendHttpResponse(res, { cart }, error.CART.NOT_UPDATED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const deleteProductInCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const cart = await cartService.deleteProductInCartService(id, productId);
        sendHttpResponse(res, { cart }, error.CART.NOT_DELETED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const cleanCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await cartService.cleanCartService(id);
        sendHttpResponse(res, { cart }, error.CART.NOT_EMPTIED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const updateQuantityInCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const { quantity } = req.body;
        const cart = await cartService.updateQuantityInCartService(id, productId, quantity);
        sendHttpResponse(res, { cart }, error.CART.NOT_UPDATED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const cart = await cartService.updateCartService(id, obj);
        sendHttpResponse(res, { cart }, error.CART.NOT_UPDATED);
    } catch (error) {
        next(error.message);
        logError(error);
    }
};

export const generateOrder = async (req, res, next) => {
    try {
        const users = await getUserByID(req.users);
        if (!users) {
            return httpResponse.NotFound(res, error.USER.NOT_FOUND);
        }

        const { id } = req.params;
        const cartID = id ? id : users.cart[0].CartID;
        const userID = users.id;

        const order = await cartService.generateOrderService(userID, cartID);
        sendHttpResponse(res, order, error.ORDER.NOT_CREATED);
    } catch (error) {
        logError(error);
        next(error.message);
    }
};
