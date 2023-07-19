const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  return products;
};

const getByIdProducts = async (id) => {
  const product = await productsModel.findByIdProducts(id);
  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

const createProductByName = async (name) => {
  const product = await productsModel.createProductByName(name);
  return product;
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createProductByName,
};