const { productsService } = require('../services');
const productsModel = require('../models/products.model');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
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
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createProductByName = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.createProductByName(name);
    
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
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
    return res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createProductByName,
  updateProduct,
};