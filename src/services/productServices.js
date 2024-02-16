import { 
    addProduct,
    createProductsMock,
    deleteProduct,
    getProductById,
    getProducts,
    getProductsMocks,
    updateProduct 
} from "../persistance/daos/mongodb/productDaoMongo.js";
import { logger } from "../utils/logger.js";


const performDatabaseOperation = async (dbOperation, ...args) => {
    try {
        const result = await dbOperation(...args);
        return result;
    } catch (error) {
        logger.error('Error Product Service:', error);
    }
};


import { createProdDTO, getByIdDTO } from "../persistance/repository/product.repository.js";

export const getProductsService = async (page, limit, sort, filter, filterValue) => {
    return performDatabaseOperation(getProducts, page, limit, sort, filter, filterValue);
};

export const getProductByIdService = async (id) => {
    const item = await performDatabaseOperation(getProductById, id);
    return item || false;
};

export const addProductService = async (obj) => {
    const newProduct = await performDatabaseOperation(addProduct, obj);
    return newProduct || false;
};

export const updateProductService = async (id, obj) => {
    return performDatabaseOperation(updateProduct, id, obj);
};

export const deleteProductService = async (id) => {
    return performDatabaseOperation(deleteProduct, id);
};

// DTO

export const getByIdDTOService = async (id) => {
    const item = await performDatabaseOperation(getByIdDTO, id);
    return item || false;
};

export const createProdDTOService = async (obj) => {
    const newProduct = await performDatabaseOperation(createProdDTO, obj);
    return newProduct || false;
};

// Mocks

export const createProductsMockService = async (prod) => {
    return performDatabaseOperation(createProductsMock, prod);
};

export const getProductsMocksService = async () => {
    const prod = await performDatabaseOperation(getProductsMocks);
    return prod || false;
};
