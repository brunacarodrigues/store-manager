const { productsModel, salesModel } = require('../../../src/models');

const validateUpdateSale = async (req, res, next) => {
  const response = await productsModel.findByIdProducts(req.params.productId);
  if (!response) return res.status(404).json({ message: 'Product not found in sale' });
  
  const { quantity } = req.body;
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  const sale = await salesModel.findByIdSales(req.params.saleId);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = validateUpdateSale;