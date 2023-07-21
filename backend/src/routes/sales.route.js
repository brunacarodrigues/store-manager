const express = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSale');
const validateUpdateSale = require('../../tests/unit/middlewares/validateUpdateSale');

const salesRoute = express();

salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getByIdSales);
salesRoute.post('/', validateSales, salesController.createSales);
salesRoute.delete('/:id', salesController.deleteSale);
salesRoute.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSale,
  salesController.updateSale,
);

module.exports = salesRoute;