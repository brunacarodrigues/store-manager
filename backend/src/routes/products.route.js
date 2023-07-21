const express = require('express');
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/validateProductName');

const productsRoute = express();

productsRoute.get('/search', productsController.searchByNameProducts);
productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getByIdProducts);
productsRoute.post('/', validateProductName, productsController.createProductByName);
productsRoute.put('/:id', validateProductName, productsController.updateProduct);
productsRoute.delete('/:id', productsController.deleteProduct);

module.exports = productsRoute;