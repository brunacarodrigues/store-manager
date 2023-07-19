const productsModel = require('../models/products.model');

const validateSales = async (req, res, next) => {
  const sale = req.body;
  const productIds = sale.map((el) => el.productId);
  const quantities = sale.map((el) => el.quantity);
  const products = await productsModel.findAllProducts();
  const accProductIds = products.map((product) => product.id);

  if (productIds.some((id) => id === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!productIds.every((id) => accProductIds.includes(id))) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (quantities.some((quantity) => quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantities.some((quantity) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validateSales,
};