const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getByIdProducts);

module.exports = productsRoute;