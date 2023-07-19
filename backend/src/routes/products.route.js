const express = require('express');
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/validateProductName');

const productsRoute = express();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getByIdProducts);
productsRoute.post('/', validateProductName, productsController.createProductByName);

module.exports = productsRoute;