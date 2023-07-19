const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express();

salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getByIdSales);
salesRoute.post('/', salesController.createSales);

module.exports = salesRoute;