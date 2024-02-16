import * as service from "../services/productServices.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
  logger.error("Error Product Controllers", error);
  throw error;
};

const httpResponse = new HttpResponse();

const buildPaginationLinks = (response, baseUrl) => {
  const nextPage = response.hasNextPage
    ? `${baseUrl}?page=${response.nextPage}`
    : null;
  const prevPage = response.hasPrevPage
    ? `${baseUrl}?page=${response.prevPage}`
    : null;

  return {
    nextPage,
    prevPage,
    existHasPrevPage: response.hasPrevPage,
    existHasNextPage: response.hasNextPage,
  };
};

export const getproduct = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue,
    );

    if (!response) {
      return httpResponse.NotFound(res, error.PRODUCT.NOT_CREATED);
    }

    const paginationLinks = buildPaginationLinks(response, "/api/products");

    return httpResponse.Ok(res, {
      payload: response.docs,
      totalPages: response.totalPages,
      page: response.page,
      ...paginationLinks,
    });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const getproductPaginate = async (req, res, next) => {
  try {
    console.log("Middleware de Passport JWT ejecutado correctamente");
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue,
    );

    const baseUrl = "http://localhost:8080/products";
    const paginationLinks = buildPaginationLinks(response, baseUrl);
    const userPrev = req.user;
    const users = userPrev ? userPrev.toObject() : null;

    res.status(200).render("products", {
      productsMap: response.docs.map((product) => product.toObject()),
      limit,
      page,
      totalPages: response.totalPages,
      products: response.docs,
      hasPrevPage: paginationLinks.existHasPrevPage,
      hasNextPage: paginationLinks.existHasNextPage,
      nextPage: paginationLinks.nextPage,
      prevPage: paginationLinks.prevPage,
      users,
    });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductByIdService(id);
    if (!product) return httpResponse.NotFoud(res, error.PRODUCT.NOT_FOUND);
    else return httpResponse.Ok(res, { product });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await service.addProductService(req.body);

    if (!product) return httpResponse.NotFoud(res, error.PRODUCT.INVALID);
    else return httpResponse.Ok(res, { "Created product": product });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productUpdated = await service.updateProductService(id, req.body);

    if (!productUpdated)
      return httpResponse.NotFoud(res, error.PRODUCT.NOT_UPDATED);
    else return httpResponse.Ok(res, { "Updated product": productUpdated });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProd = await service.deleteProductService(id);

    if (!deletedProd)
      return httpResponse.NotFoud(res, error.PRODUCT.NOT_DELETED);
    else return httpResponse.Ok(res, { deleteProduct });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const getByIdDTO = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getByIdDTOService(id);

    if (!product) return httpResponse.NotFoud(res, error.PRODUCT.NOT_FOUND);
    else return httpResponse.Ok(res, { product });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const createProdDTO = async (req, res, next) => {
  try {
    const product = await service.createProdDTOService(req.body);
    if (!product) return httpResponse.NotFoud(res, error.PRODUCT.NOT_CREATED);
    else return httpResponse.Ok(res, { product });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const createProductsMocks = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await service.createProductsMockService(cant);
    if (!response) return httpResponse.NotFoud(res, error.PRODUCT.NOT_FOUND);
    else return httpResponse.Ok(res, { "Mock Products": response });
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const getProductsMocks = async (req, res, next) => {
  try {
    const response = await service.getProductsMocksService();
    if (!response) return httpResponse.NotFound(res, error.PRODUCT.NOT_FOUND);
    else return httpResponse.Ok(res, response);
  } catch (error) {
    next(error.message);
    logError(error);
  }
};
