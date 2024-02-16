import fs from 'fs/promises';
import { resolve } from 'path';
const pathFile = resolve('db/products.json');
import { logger } from "../../../utils/logger.js";

const logError = (error) => {
  logger.error ('Error Product Dao:', error);
throw error;
};

const readProductsFile = async () => {
  try {
    const data = await fs.readFile(pathFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logError(error);
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeProductsFile = async (data) => {
  await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
};

export const addProduct = async ({ title, description, price, thumbnails, code, status, category, stock }) => {
  try {
    if (!title || !description || !price || !thumbnails || !status || !category || !stock) {
      console.log(`Todos los parámetros son obligatorios, solo el stock puede ser 0`);
      return false;
    }

    const products = await readProductsFile();

    if (products.some((product) => product.code === code)) {
      console.log(`El producto ${code} ya existe`);
      return `El producto ${code} ya existe`;
    }

    const maxId = Math.max(...products.map((product) => product.id), 0);
    const newProduct = {
      id: maxId + 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    products.push(newProduct);
    await writeProductsFile(products);

    console.log(`Producto ${code} creado`);
    return `Producto ${code} creado`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (id, { title, description, price, thumbnails, code, status, category, stock }) => {
  try {
    const products = await readProductsFile();
    const productIndex = products.findIndex((product) => product.id === parseInt(id));

    if (productIndex !== -1) {
      const productToUpdate = products[productIndex];
      productToUpdate.title = title || productToUpdate.title;
      productToUpdate.description = description || productToUpdate.description;
      productToUpdate.price = price || productToUpdate.price;
      productToUpdate.thumbnails = thumbnails || productToUpdate.thumbnails;
      productToUpdate.code = code || productToUpdate.code;
      productToUpdate.status = status || productToUpdate.status;
      productToUpdate.category = category || productToUpdate.category;
      productToUpdate.stock = stock || productToUpdate.stock;

      await writeProductsFile(products);

      console.log(`Producto con ID ${id} actualizado`);
      return `Producto con ID ${id} actualizado`;
    } else {
      console.log(`El ID del producto ${id} no existe`);
      return `El ID del producto ${id} no existe`;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const products = await readProductsFile();
    const product = products.find((p) => p.id === productId);

    if (product) {
      console.log(product);
      return product;
    } else {
      console.log(`El ID del producto ${productId} no existe`);
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const products = await readProductsFile();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMaxID = async () => {
  try {
    const products = await readProductsFile();
    const maxId = Math.max(...products.map((product) => product.id), 0);
    return maxId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkCode = async (codeProduct) => {
  try {
    const products = await readProductsFile();
    const isCodeUnique = !products.some((product) => product.code === codeProduct);

    if (isCodeUnique) {
      return 'OK';
    } else {
      return 'Error';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const products = await readProductsFile();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await writeProductsFile(products);

      console.log(`Producto con ID ${id} eliminado`);
      return `Producto con ID ${id} eliminado`;
    } else {
      console.log(`El ID del producto ${id} no existe`);
      return `El ID del producto ${id} no existe`;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFile = async (pathFile) => {
  try {
    await fs.unlink(pathFile);
    console.log(`El archivo ${pathFile} ha sido eliminado.`);
  } catch (error) {
    console.error(`Error al eliminar el archivo ${pathFile}: ${error}`);
  }
};
