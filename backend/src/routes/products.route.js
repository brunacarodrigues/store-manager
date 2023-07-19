const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getByIdProducts);
productsRoute.post('/', productsController.createProductByName);

module.exports = productsRoute;