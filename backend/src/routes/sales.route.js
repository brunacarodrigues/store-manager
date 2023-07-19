const express = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSale');

const salesRoute = express();

salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getByIdSales);
salesRoute.post('/', validateSales, salesController.createSales);

module.exports = salesRoute;