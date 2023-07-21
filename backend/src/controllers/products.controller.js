const { productsService } = require('../services');
const productsModel = require('../models/products.model');

const ERROR_MSG = 'Internal server error';
const NOT_FOUND = 'Product not found';

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const getByIdProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getByIdProducts(id);

    if (product.message) {
      return res.status(404).json(product);
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const createProductByName = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.createProductByName(name);
    
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const productBD = await productsModel.findByIdProducts(id);
    if (productBD) {
      const updatedProduct = await productsService.updateProduct(id, product.name);
      return res.status(200).json(updatedProduct);
    }
    return res.status(404).json({ message: NOT_FOUND });
  } catch (err) {
    res.status(500).json({ message: ERROR_MSG });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productBD = await productsModel.findByIdProducts(id);
    if (!productBD) {
      return res.status(404).json({ message: NOT_FOUND });
    }
    const product = await productsService.deleteProduct(id);
    return res.status(204).json(product);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const searchByNameProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const productsList = await productsService.searchByNameProducts(q);
    return res.status(200).json(productsList);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createProductByName,
  updateProduct,
  deleteProduct,
  searchByNameProducts,
};