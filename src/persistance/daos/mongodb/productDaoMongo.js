import { ProductModel } from "./models/productModel.js";
import { fakerES_MX as faker } from "@faker-js/faker";
import { ProductModelMocks } from "./models/productModel_Mocks.js";
import { logger } from '../../../utils/logger.js';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_SORT = 1;

const logError = (error) => {
    logger.error ('Error Product Dao:', error);
  throw error;
};

export const getProducts = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, sort = DEFAULT_SORT, filter, filterValue) => {
  try {
    const filterOptions = filter && filterValue ? { [filter]: { $regex: filterValue, $options: 'i' } } : {};

    const sortOptions = sort === 'desc' ? -1 : 1;
    const sortField = sort === 'desc' ? '-price' : 'price';

    const options = {
      limit,
      page,
      sort: { [sortField]: sortOptions }
    };

    return await ProductModel.paginate(filterOptions, options);
  } catch (error) {
    logError(error);
  }
};

const getModelById = async (id, Model) => {
  try {
    return await Model.findById(id);
  } catch (error) {
    logError(error);
  }
};

export const getProductById = async (id) => {
  return getModelById(id, ProductModel);
};

export const addProduct = async (obj) => {
  return getModelById(await ProductModel.create(obj)._id, ProductModel);
};

export const updateProduct = async (id, obj) => {
  return getModelById(id, await ProductModel.findByIdAndUpdate(id, obj, { new: true }));
};

export const deleteProduct = async (id) => {
  return getModelById(id, await ProductModel.findByIdAndDelete(id));
};

export const createProductsMock = async (cant = 100) => {
  try {
    const products = Array.from({ length: cant }, () => ({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.commerce.isbn(),
      price: parseInt(faker.commerce.price()),
      stock: Math.floor(Math.random() * 99),
      category: faker.commerce.department(),
      thumbnails: faker.image.avatar()
    }));

    return products;
  } catch (error) {
    logError(error);
  }
};

export const getProductsMocks = async () => {
  return getModelById(await ProductModelMocks.find({}), ProductModelMocks);
};
