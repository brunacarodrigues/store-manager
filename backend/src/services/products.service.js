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

const updateProduct = async (id, name) => {
  const product = await productsModel.updateProducts(Number(id), name);
  return product;
};

const deleteProduct = async (id) => {
  const product = await productsModel.deleteProduct(id);
  return product;
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createProductByName,
  updateProduct,
  deleteProduct,
};