const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const getByIdSales = async (id) => {
  const sale = await salesModel.findByIdSales(id);

  if (sale.length === 0) {
    return { message: 'Sale not found' };
  }
  return sale;
};

const createSales = async (sale) => {
  const newIdSale = await salesModel.createSaleId();

  sale.map(async (product) => {
    await salesModel.createSales(newIdSale, product.productId, product.quantity);
  });
  return { id: newIdSale, itemsSold: sale };
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

const updateSale = async (saleId, productId, quantity) => {
  const updatedSale = await salesModel.updateSale(saleId, productId, quantity);
  return updatedSale;
};

module.exports = {
  getAllSales,
  getByIdSales,
  createSales,
  deleteSale,
  updateSale,
};